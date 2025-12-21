import React from "react";
import { useDroppable } from "@dnd-kit/core";
import FormElements from "../form-elements";
import ItemTypes from "../ItemTypes";
import CustomElement from "../form-elements/custom-element";
import Registry from "../stores/registry";

/* ---------------- helpers ---------------- */

function getCustomElement(item, props) {
  if (!item.component || typeof item.component !== "function") {
    item.component = Registry.get(item.key);
    if (!item.component) {
      console.error(`${item.element} was not registered`);
    }
  }

  return (
    <CustomElement
      {...props}
      mutable={false}
      key={`form_${item.id}`}
      data={item}
    />
  );
}

function getElement(item, props) {
  if (!item) return null;
  if (item.custom) return getCustomElement(item, props);

  const Element = FormElements[item.element || item.key];
  return <Element {...props} key={`form_${item.id}`} data={item} />;
}

function getStyle(backgroundColor) {
  return {
    border: "1px solid rgba(0,0,0,0.2)",
    minHeight: "2rem",
    minWidth: "7rem",
    width: "100%",
    backgroundColor,
    padding: 0,
    float: "left",
  };
}

/**
 * 🔧 CUSTOM FIX
 * - fieldset
 * - _col_row
 * - isContainer flag
 */
function isContainer(item) {
  if (!item) return false;

  if (item.itemType !== ItemTypes.CARD) {
    const { data } = item;
    if (data) {
      if (data.isContainer) return true;
      if (data.field_name) {
        return (
          data.field_name.indexOf("_col_row") > -1 ||
          data.field_name.indexOf("fieldset") > -1
        );
      }
    }
  }
  return false;
}

/* ---------------- component ---------------- */

const Dustbin = ({
  id,
  col,
  items,
  parentIndex,
  data,
  getDataById,
  onDropSuccess,
  setAsChild,
  ...rest
}) => {
  const item = getDataById(items[col]);

  const { isOver, setNodeRef, active } = useDroppable({
    id,
    data: {
      col,
      parentIndex,
      containerData: data,
    },
  });

  const draggedItem = active?.data?.current;
  const sameCard = draggedItem && draggedItem.parentIndex === parentIndex;

  let backgroundColor = "rgba(0, 0, 0, .03)";

  if (!sameCard && isOver && draggedItem && !isContainer(draggedItem)) {
    backgroundColor = "#F7F589";
  }

  const element = getElement(item, rest);

  return (
    <div
      ref={setNodeRef}
      style={getStyle(sameCard ? "rgba(0,0,0,.03)" : backgroundColor)}
    >
      {!element && <span>Drop your element here</span>}
      {element}
    </div>
  );
};

export default Dustbin;
