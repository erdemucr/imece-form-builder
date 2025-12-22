import React from "react";
import PropTypes from "prop-types";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
// useDraggable ve useDroppable hook'larını doğru yerde import et
import { useDraggable, useDroppable } from "@dnd-kit/core";

const style = {
  border: "1px dashed gray",
  padding: "0.5rem 1rem",
  marginBottom: ".5rem",
  backgroundColor: "white",
  cursor: "pointer",
};

const DebugComponent = ({ data, element, error }) => (
  <div
    style={{
      border: "2px dashed #ff6b6b",
      padding: "15px",
      marginBottom: "10px",
      backgroundColor: "#ffeaea",
      color: "#d63031",
    }}
  >
    <h4 style={{ margin: "0 0 10px 0" }}>⚠️ Component Error</h4>
    <p>
      <strong>Element Type:</strong> {element || "undefined"}
    </p>
    <p>
      <strong>Data ID:</strong> {data?.id}
    </p>
    <p>
      <strong>Available keys:</strong>{" "}
      {data ? Object.keys(data).join(", ") : "no data"}
    </p>
    {error && (
      <p>
        <strong>Error:</strong> {error}
      </p>
    )}
    <p style={{ fontSize: "12px", marginTop: "10px" }}>
      This component could not be loaded. Check console for details.
    </p>
  </div>
);

DebugComponent.propTypes = {
  data: PropTypes.object,
  element: PropTypes.string,
  error: PropTypes.string,
};

// Önbellek: sonsuz döngüyü önlemek için
const componentCache = new WeakMap();

const DraggableCard = (props) => {
  const {
    index,
    id,
    moveCard,
    seq = -1,
    component: ComposedComponent,
    data,
    setAsChild,
    parentIndex,
    col,
    isDraggable = true,
    style: customStyle = {},
    ...restProps
  } = props;

  // DEBUG: Konsola bilgi yazdır
  if (process.env.NODE_ENV === "development") {
    console.log("🚨 DraggableCard DEBUG:", {
      id,
      index,
      data,
      element: data?.element,
      ComposedComponent,
      type: typeof ComposedComponent,
      isFunction: typeof ComposedComponent === "function",
    });
  }

  // ComposedComponent kontrolü
  if (!ComposedComponent || typeof ComposedComponent !== "function") {
    console.error("❌ DraggableCard received invalid component:", {
      id,
      data,
      element: data?.element,
      ComposedComponent,
      availableProps: Object.keys(props),
    });

    // Fallback bileşeni göster
    return <DebugComponent data={data} element={data?.element} />;
  }

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
    id: id?.toString() || `card-${Date.now()}`,
    disabled: !isDraggable,
    data: {
      type: "FORM_ELEMENT",
      index,
      id,
      data,
      setAsChild,
      parentIndex,
      col,
      isDraggable,
    },
  });

  const dragStyle = {
    transform: CSS.Translate.toString(transform),
    transition: transition || undefined,
    opacity: isDragging ? 0.5 : 1,
    cursor: isDraggable ? (isDragging ? "grabbing" : "grab") : "default",
    position: "relative",
    zIndex: isDragging ? 1000 : 1,
    ...customStyle,
  };

  try {
    return (
      <div
        ref={setNodeRef}
        style={dragStyle}
        {...attributes}
        {...listeners}
        className="draggable-card"
        data-element-type={
          data?.element ??
          data?.type ??
          ComposedComponent?.displayName ??
          ComposedComponent?.name ??
          "unknown"
        }
        data-card-id={id}
      >
        <ComposedComponent
          {...restProps}
          index={index}
          id={id}
          moveCard={moveCard}
          seq={seq}
          data={data}
          setAsChild={setAsChild}
          parentIndex={parentIndex}
          col={col}
          isDragging={isDragging}
          isOver={isOver}
          dragAttributes={attributes}
          dragListeners={listeners}
        />
      </div>
    );
  } catch (error) {
    console.error("💥 Error rendering ComposedComponent:", error);
    return (
      <DebugComponent
        data={data}
        element={data?.element}
        error={error.message}
      />
    );
  }
};

DraggableCard.propTypes = {
  component: PropTypes.elementType.isRequired,
  index: PropTypes.number.isRequired,
  id: PropTypes.any.isRequired,
  moveCard: PropTypes.func,
  seq: PropTypes.number,
  data: PropTypes.object,
  setAsChild: PropTypes.func,
  parentIndex: PropTypes.number,
  col: PropTypes.number,
  isDraggable: PropTypes.bool,
  style: PropTypes.object,
};

DraggableCard.defaultProps = {
  seq: -1,
  moveCard: () => {},
  isDraggable: true,
  style: {},
};

// Alternatif: useDraggable ve useDroppable kullanan versiyon
const DraggableDropCard = (props) => {
  const {
    index,
    id,
    moveCard,
    seq = -1,
    component: ComposedComponent,
    data,
    setAsChild,
    parentIndex,
    col,
    isDraggable = true,
    acceptTypes = ["CARD", "BOX"],
    children,
    ...restProps
  } = props;

  if (!ComposedComponent) {
    console.error("❌ DraggableDropCard received undefined component", props);
    return null;
  }

  const {
    attributes,
    listeners,
    setNodeRef: setDragRef,
    transform,
    isDragging,
  } = useDraggable({
    id: id.toString(),
    disabled: !isDraggable,
    data: {
      type: "CARD",
      index,
      id,
      data,
      setAsChild,
      parentIndex,
      col,
      isDraggable,
    },
  });

  const { setNodeRef: setDropRef, isOver } = useDroppable({
    id: `drop-${id}`,
    data: {
      type: "DROP_ZONE",
      index,
      id,
      acceptTypes,
    },
  });

  // Hem drag hem drop için ref birleştirme
  const setCombinedRef = (node) => {
    setDragRef(node);
    setDropRef(node);
  };

  const dragStyle = {
    ...style,
    transform: CSS.Translate.toString(transform),
    opacity: isDragging ? 0.5 : isOver ? 0.8 : 1,
    cursor: isDraggable ? (isDragging ? "grabbing" : "grab") : "default",
    position: "relative",
    zIndex: isDragging ? 1000 : isOver ? 500 : 1,
    borderColor: isOver ? "#007bff" : "gray",
    borderStyle: isOver ? "solid" : "dashed",
  };

  return (
    <div ref={setCombinedRef} style={dragStyle} {...attributes} {...listeners}>
      <ComposedComponent
        {...restProps}
        index={index}
        id={id}
        moveCard={moveCard}
        seq={seq}
        data={data}
        setAsChild={setAsChild}
        parentIndex={parentIndex}
        col={col}
        isDragging={isDragging}
        isOver={isOver}
        dragAttributes={attributes}
        dragListeners={listeners}
        style={{ opacity: isDragging ? 0.7 : 1 }}
      >
        {children}
      </ComposedComponent>
    </div>
  );
};

// Yardımcı HOC: Herhangi bir bileşeni draggable yapar
const withDraggable = (WrappedComponent, options = {}) => {
  return function DraggableWrapper(props) {
    const {
      id,
      index,
      data,
      isDraggable = true,
      dragType = "CARD",
      ...restProps
    } = props;

    const { attributes, listeners, setNodeRef, transform, isDragging } =
      useDraggable({
        id: id?.toString() || `draggable-${Date.now()}`,
        disabled: !isDraggable,
        data: {
          type: dragType,
          index,
          id,
          data,
          ...options.data,
        },
      });

    const dragStyle = {
      transform: CSS.Translate.toString(transform),
      opacity: isDragging ? 0.5 : 1,
      cursor: isDraggable ? (isDragging ? "grabbing" : "grab") : "default",
      transition: transform ? "transform 200ms ease" : undefined,
    };

    return (
      <div ref={setNodeRef} style={dragStyle} {...attributes} {...listeners}>
        <WrappedComponent
          {...restProps}
          isDragging={isDragging}
          dragAttributes={attributes}
          dragListeners={listeners}
        />
      </div>
    );
  };
};

// SortableElement HOC (Alternatif) - Bu ana export olmalı
const SortableElement = (WrappedComponent) => {
  if (!WrappedComponent) {
    console.error("❌ SortableElement called with undefined component");

    const ErrorComponent = () => (
      <div style={{ color: "red", padding: "10px", border: "1px solid red" }}>
        Error: Invalid component
      </div>
    );

    return ErrorComponent;
  }

  // Önbellekte var mı kontrol et
  if (componentCache.has(WrappedComponent)) {
    return componentCache.get(WrappedComponent);
  }

  const SortableWrapper = (props) => {
    const {
      id,
      index,
      isDraggable = true,
      data,
      moveCard,
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
      },
    });

    const sortableStyle = {
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
        style={sortableStyle}
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

  SortableWrapper.displayName = `Sortable${
    WrappedComponent.displayName || WrappedComponent.name || "Component"
  }`;

  // Önbelleğe ekle
  componentCache.set(WrappedComponent, SortableWrapper);

  return SortableWrapper;
};

// SortableItem bileşeni
const SortableItem = (props) => {
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

  const itemStyle = {
    transform: CSS.Translate.toString(transform),
    transition: transition || undefined,
    opacity: isDragging ? 0.5 : 1,
    cursor: isDraggable ? (isDragging ? "grabbing" : "grab") : "default",
  };

  return (
    <div
      ref={setNodeRef}
      style={itemStyle}
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

// PlaceHolder bileşeni
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

  return (
    <div
      ref={setNodeRef}
      style={{ ...defaultStyle, ...customStyle }}
      className={`form-place-holder ${className}`}
      data-placeholder-index={index}
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

// Ana factory fonksiyonu - sonsuz döngüyü önlemek için önbellek kullanıyor
const createDraggableCard = (ComposedComponent) => {
  // Önbellekte var mı kontrol et
  if (componentCache.has(ComposedComponent)) {
    return componentCache.get(ComposedComponent);
  }

  if (!ComposedComponent) {
    console.error("❌ createDraggableCard called with undefined component");

    const SafeFallback = function SafeDraggableCard(props) {
      console.warn("⚠️ SafeDraggableCard rendering (missing component)");
      return (
        <DraggableCard
          {...props}
          component={DebugComponent}
          data={{ ...props.data, error: "Missing component" }}
        />
      );
    };

    SafeFallback.displayName = "SafeDraggableCard";
    componentCache.set(ComposedComponent, SafeFallback);
    return SafeFallback;
  }

  // Bileşen zaten draggable mı kontrol et
  if (
    ComposedComponent.displayName?.includes("Draggable") ||
    ComposedComponent.name?.includes("Draggable") ||
    componentCache.has(ComposedComponent)
  ) {
    console.warn("⚠️ Component is already draggable:", ComposedComponent.name);
    componentCache.set(ComposedComponent, ComposedComponent);
    return ComposedComponent;
  }

  const WrappedDraggableCard = function WrappedDraggableCard(props) {
    return <DraggableCard {...props} component={ComposedComponent} />;
  };

  // Display name ayarla
  WrappedDraggableCard.displayName = `Draggable${
    ComposedComponent.displayName || ComposedComponent.name || "Component"
  }`;

  // Orijinal bileşeni sakla (forward props için)
  WrappedDraggableCard.OriginalComponent = ComposedComponent;

  // Önbelleğe ekle
  componentCache.set(ComposedComponent, WrappedDraggableCard);

  return WrappedDraggableCard;
};

// Kullanım kolaylığı için yardımcı fonksiyon
function makeSortable(Component, options = {}) {
  return createDraggableCard(Component);
}

// TÜM EXPORT'LARI TEK BİR YERDE YAP
export {
  SortableElement,
  SortableItem,
  PlaceHolder,
  DraggableCard,
  DraggableDropCard,
  withDraggable,
  makeSortable,
  createDraggableCard,
};

// Default export olarak da export et
export default createDraggableCard;
