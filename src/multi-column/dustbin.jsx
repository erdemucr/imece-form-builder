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
  col,
  items,
  parentIndex,
  data,
  getDataById,
  onDropSuccess,
  setAsChild,
  accept = ["CARD", "BOX", "TOOLBAR_ITEM"], // Kabul edilen drag tipleri
  ...rest
}) => {
  const item = getDataById(items[col]);

  const { isOver, setNodeRef, active, over } = useDroppable({
    id: id || `dustbin-${parentIndex}-${col}`,
    data: {
      type: "DUSTBIN",
      col,
      parentIndex,
      containerData: data,
      acceptTypes: accept,
    },
  });

  const draggedItem = active?.data?.current;
  const sameCard = draggedItem && draggedItem.parentIndex === parentIndex;

  // Aktif öğe bu dustbin'e uyuyor mu kontrol et
  const canDrop = draggedItem && accept.includes(draggedItem.type);

  let backgroundColor = "rgba(0, 0, 0, .03)";

  if (isOver && canDrop && !sameCard && !isContainer(draggedItem)) {
    backgroundColor = "#F7F589";
  } else if (isOver && canDrop && isContainer(draggedItem)) {
    backgroundColor = "#D4EDDA"; // Konteyner için farklı renk
  }

  // Drop işlemi başarılı olduğunda callback çağır
  React.useEffect(() => {
    if (over?.id === id && onDropSuccess && draggedItem) {
      onDropSuccess(draggedItem, { col, parentIndex, data });
    }
  }, [over, id, onDropSuccess, draggedItem, col, parentIndex, data]);

  const element = getElement(item, rest);

  return (
    <div
      ref={setNodeRef}
      style={getStyle(backgroundColor, isOver && canDrop, sameCard)}
      className="dustbin"
      data-dustbin-col={col}
      data-parent-index={parentIndex}
    >
      {/* Drop alanı overlay'i (isteğe bağlı) */}
      {isOver && canDrop && !sameCard && (
        <div
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundColor: "rgba(247, 245, 137, 0.3)",
            zIndex: 1,
            pointerEvents: "none",
          }}
        />
      )}

      {/* İçerik */}
      <div style={{ position: "relative", zIndex: 2 }}>
        {!element ? (
          <div
            style={{
              padding: "1rem",
              textAlign: "center",
              color: "#6c757d",
              fontStyle: "italic",
            }}
          >
            Element'i buraya sürükleyin
          </div>
        ) : (
          element
        )}
      </div>
    </div>
  );
};

export default Dustbin;
