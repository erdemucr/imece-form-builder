import React from "react";
import { useSortable, useDroppable } from "@dnd-kit/core";
import { CSS } from "@dnd-kit/utilities";

// SortableElement HOC (Higher Order Component) - Ana export
export const SortableElement = (WrappedComponent) => {
  return function SortableWrapper(props) {
    const {
      id,
      index,
      isDraggable = true,
      data,
      moveCard, // Legacy prop, dnd-kit ile gerekli değil
      insertCard,
      ...restProps
    } = props;

    const {
      attributes,
      listeners,
      setNodeRef,
      transform,
      transition,
      isDragging,
      isOver,
      over,
    } = useSortable({
      id: id?.toString() || `sortable-${Date.now()}`,
      disabled: !isDraggable,
      data: {
        type: "FORM_ELEMENT",
        index,
        id,
        data,
        moveCard,
        insertCard,
        ...restProps,
      },
    });

    const style = {
      transform: CSS.Translate.toString(transform),
      transition: transition || undefined,
      opacity: isDragging ? 0.5 : 1,
      cursor: isDraggable ? (isDragging ? "grabbing" : "grab") : "default",
      position: "relative",
      zIndex: isDragging ? 1000 : 1,
    };

    return (
      <div
        ref={setNodeRef}
        style={style}
        {...attributes}
        {...listeners}
        className="sortable-element"
        data-sortable-id={id}
        data-index={index}
      >
        <WrappedComponent
          {...restProps}
          id={id}
          index={index}
          data={data}
          isDragging={isDragging}
          isOver={isOver}
          dragAttributes={attributes}
          dragListeners={listeners}
        />
      </div>
    );
  };
};

// Direkt kullanılabilir SortableItem bileşeni
export const SortableItem = (props) => {
  const { id, children, isDraggable = true, data, index, ...restProps } = props;

  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({
    id: id?.toString() || `item-${Date.now()}`,
    disabled: !isDraggable,
    data: {
      type: "ITEM",
      index,
      id,
      data,
      ...restProps,
    },
  });

  const style = {
    transform: CSS.Translate.toString(transform),
    transition: transition || undefined,
    opacity: isDragging ? 0.5 : 1,
    cursor: isDraggable ? (isDragging ? "grabbing" : "grab") : "default",
  };

  return (
    <div
      ref={setNodeRef}
      style={style}
      {...attributes}
      {...listeners}
      className="sortable-item"
    >
      {typeof children === "function"
        ? children({ isDragging, attributes, listeners })
        : children}
    </div>
  );
};

// PlaceHolder bileşeni - Ayrı bir dosya olabilir ama burada export ediyoruz
export const PlaceHolder = (props) => {
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

  const defaultStyle = {
    minHeight: "60px",
    border: `2px ${isOver ? "dashed #007bff" : "dashed #ccc"}`,
    borderRadius: "4px",
    margin: "8px 0",
    padding: "16px",
    backgroundColor: isOver ? "rgba(0, 123, 255, 0.05)" : "transparent",
    transition: "all 0.2s ease",
    textAlign: "center",
    color: "#6c757d",
    cursor: "pointer",
  };

  if (!show) return null;

  const handleClick = (e) => {
    if (insertCard && e) {
      e.preventDefault();
      // Boş placeholder'a tıklanırsa yeni öğe eklemek için kullanılabilir
    }
  };

  return (
    <div
      ref={setNodeRef}
      style={{ ...defaultStyle, ...customStyle }}
      className={`form-place-holder ${className}`}
      data-placeholder-index={index}
      onClick={handleClick}
    >
      {children || (
        <>
          <i className="fas fa-plus-circle" style={{ marginRight: "8px" }} />
          Drop form elements here
        </>
      )}
    </div>
  );
};

// Varsayılan export - Eski kodla uyumluluk için
const defaultExport = {
  SortableElement,
  SortableItem,
  PlaceHolder,
};

export default defaultExport;
