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
  if (!Element) {
    console.warn(
      `Element ${item.element || item.key} not found in FormElements`
    );
    return null;
  }

  return <Element {...props} key={`form_${item.id}`} data={item} />;
}

function getStyle(backgroundColor, isOver, sameCard) {
  return {
    border: `1px ${
      isOver && !sameCard ? "dashed #007bff" : "solid rgba(0,0,0,0.2)"
    }`,
    minHeight: "2rem",
    minWidth: "7rem",
    width: "100%",
    backgroundColor,
    padding: 0,
    float: "left",
    transition: "background-color 0.2s ease, border 0.2s ease",
    position: "relative",
    outline: isOver && !sameCard ? "2px dashed #007bff" : "none",
    outlineOffset: "-2px",
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
  style,
  data,
  col,
  parentIndex,
  accept = ["CARD", "BOX", "TOOLBAR_ITEM"],
  children,
}) => {
  const { setNodeRef, isOver, over } = useDroppable({
    id: id || `dustbin-${Date.now()}`,
    data: {
      type: "DROP_ZONE",
      col,
      parentIndex,
      parentData: data,
      accept,
    },
  });

  const dropStyle = {
    ...style,
    minHeight: "60px",
    border: `2px ${isOver ? "dashed #007bff" : "dashed #e0e0e0"}`,
    borderRadius: "4px",
    padding: "10px",
    backgroundColor: isOver ? "rgba(0, 123, 255, 0.05)" : "transparent",
    transition: "all 0.2s ease",
  };

  return (
    <div ref={setNodeRef} style={dropStyle} className="dustbin">
      {children || (
        <div style={{ textAlign: "center", color: "#999" }}>
          <i className="fas fa-plus" style={{ marginRight: "8px" }} />
          Drop here
        </div>
      )}
    </div>
  );
};
export default Dustbin;
