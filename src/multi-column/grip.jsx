import React from "react";
import { useDraggable } from "@dnd-kit/core";
import { CSS } from "@dnd-kit/utilities";

const Grip = (props) => {
  const {
    data,
    index,
    onDestroy,
    setAsChild,
    getDataById,
    isDraggable = true,
    dragType = "BOX",
    className = "",
    style: customStyle = {},
    children,
    ...restProps
  } = props;

  const { attributes, listeners, setNodeRef, transform, isDragging, active } =
    useDraggable({
      id: data?.id?.toString() || `grip-${Date.now()}`,
      disabled: !isDraggable,
      data: {
        type: dragType,
        index: data?.parentId ? -1 : index,
        parentIndex: data?.parentIndex,
        id: data?.id,
        col: data?.col,
        onDestroy,
        setAsChild,
        getDataById,
        data,
        ...restProps.data,
      },
    });

  const gripStyle = {
    cursor: isDraggable ? (isDragging ? "grabbing" : "grab") : "default",
    opacity: isDragging ? 0.4 : 1,
    transform: CSS.Translate.toString(transform),
    transition: isDragging
      ? "none"
      : "transform 200ms ease, opacity 200ms ease",
    display: "inline-flex",
    alignItems: "center",
    justifyContent: "center",
    ...customStyle,
  };

  // Eğer data yoksa veya draggable değilse render etme
  if (!data) {
    console.warn("Grip component received no data");
    return null;
  }

  return (
    <div
      ref={setNodeRef}
      {...listeners}
      {...attributes}
      className={`btn grip-handle ${className} ${
        isDragging ? "is-dragging" : ""
      }`}
      style={gripStyle}
      title={isDraggable ? "Drag to move" : "Not draggable"}
      data-grip-id={data.id}
      data-parent-id={data.parentId}
      data-col-index={data.col}
    >
      {children || <i className="fas fa-grip-vertical" aria-hidden="true" />}
    </div>
  );
};

// Yardımcı bileşen: Sadece drag handle olarak kullanım
export const DragHandle = (props) => {
  const { id, data, children, className = "drag-handle", ...rest } = props;

  const { attributes, listeners, setNodeRef, isDragging } = useDraggable({
    id: id?.toString() || `drag-handle-${Date.now()}`,
    data,
  });

  return (
    <div
      ref={setNodeRef}
      {...listeners}
      {...attributes}
      className={`${className} ${isDragging ? "dragging" : ""}`}
      style={{
        cursor: "grab",
        opacity: isDragging ? 0.7 : 1,
        display: "inline-flex",
        alignItems: "center",
      }}
      {...rest}
    >
      {children || <span>⋮⋮</span>}
    </div>
  );
};

// Alternatif: Sadece görsel grip ikonu
export const GripIcon = ({ size = 16, color = "#666" }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    stroke={color}
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <circle cx="9" cy="5" r="1" />
    <circle cx="9" cy="12" r="1" />
    <circle cx="9" cy="19" r="1" />
    <circle cx="15" cy="5" r="1" />
    <circle cx="15" cy="12" r="1" />
    <circle cx="15" cy="19" r="1" />
  </svg>
);

export default Grip;
