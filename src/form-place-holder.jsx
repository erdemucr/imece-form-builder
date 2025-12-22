// form-place-holder.js
import React from "react";
import { useDroppable } from "@dnd-kit/core";

const PlaceHolder = (props) => {
  const {
    id,
    show,
    index,
    moveCard,
    insertCard,
    style: customStyle,
    children,
    className = "",
  } = props;

  const { setNodeRef, isOver } = useDroppable({
    id: id || `placeholder-${index}`,
    data: {
      type: "PLACEHOLDER",
      index,
      moveCard,
      insertCard,
    },
  });

  if (!show) return null;

  const style = {
    minHeight: "60px",
    border: `2px ${isOver ? "dashed #007bff" : "dashed #ccc"}`,
    borderRadius: "4px",
    margin: "8px 0",
    padding: "16px",
    backgroundColor: isOver ? "rgba(0, 123, 255, 0.05)" : "transparent",
    transition: "all 0.2s ease",
    textAlign: "center",
    color: "#6c757d",
    ...customStyle,
  };

  return (
    <div
      ref={setNodeRef}
      style={style}
      className={`form-place-holder ${className}`}
      data-placeholder-index={index}
    >
      {children || "Drop form elements here"}
    </div>
  );
};

// Named export olarak export edin
export { PlaceHolder };

// Ayrıca default export da sağlayın (eski kodlarla uyumluluk için)
export default PlaceHolder;
