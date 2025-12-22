import React from "react";
import { useDraggable } from "@dnd-kit/core";
import { CSS } from "@dnd-kit/utilities";
import ID from "./UUID";

const ToolbarItem = ({ data, onCreate, onClick }) => {
  const {
    attributes,
    listeners,
    setNodeRef,
    setActivatorNodeRef,
    transform,
    isDragging,
  } = useDraggable({
    id: `toolbar-${data.key || data.name}-${ID.uuid()}`,
    data: {
      type: "TOOLBAR_ITEM",
      toolbarData: data,
      onCreate,
      isNewItem: true,
    },
  });

  const style = {
    transform: CSS.Translate.toString(transform),
    opacity: isDragging ? 0.5 : 1,
    cursor: isDragging ? "grabbing" : "grab",
    transition: isDragging
      ? "none"
      : "transform 200ms ease, opacity 200ms ease",
    position: "relative",
  };

  const handleClick = (e) => {
    // Eğer sürükleme aktifse tıklamayı engelle
    if (isDragging) {
      e.preventDefault();
      return;
    }

    if (onClick) {
      onClick(e);
    }

    if (onCreate) {
      const newItem = {
        id: ID.uuid(),
        element: data.element,
        text: data.name,
        static: data.static,
        required: data.required,
        bold: false,
        italic: false,
        content: data.content || "",
        ...data.defaultProps,
      };
      onCreate(newItem);
    }
  };

  return (
    <li
      ref={setNodeRef}
      style={style}
      onClick={handleClick}
      className="toolbar-item"
    >
      {/* Sürükleme handle'ı */}
      <div
        ref={setActivatorNodeRef}
        {...attributes}
        {...listeners}
        style={{
          cursor: "move",
          display: "inline-flex",
          alignItems: "center",
          justifyContent: "center",
          padding: "4px",
          marginRight: "8px",
        }}
        className="drag-handle"
      >
        <i className="fa fa-arrows" style={{ fontSize: "12px" }}></i>
      </div>

      <i className={data.icon} style={{ marginRight: "8px" }}></i>
      <span>{data.name}</span>
    </li>
  );
};

export default ToolbarItem;
