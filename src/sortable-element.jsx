import React from "react";
import PropTypes from "prop-types";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";

const style = {
  border: "1px dashed gray",
  padding: "0.5rem 1rem",
  marginBottom: ".5rem",
  backgroundColor: "white",
  cursor: "pointer",
};

const DebugComponent = ({ data, element }) => (
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
    <p style={{ fontSize: "12px", marginTop: "10px" }}>
      This component could not be loaded. Check console for details.
    </p>
  </div>
);

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
  console.log("🚨 DraggableCard DEBUG:", {
    id,
    index,
    data,
    element: data?.element,
    ComposedComponent,
    type: typeof ComposedComponent,
    isFunction: typeof ComposedComponent === "function",
    props: props,
  });

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
        data-element-type={data?.element}
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

// Alternatif: useDraggable ve useDroppable kullanan versiyon (daha gelişmiş kontrol için)
export const DraggableDropCard = (props) => {
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
    onDrop,
    onHover,
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

  const {
    setNodeRef: setDropRef,
    isOver,
    over,
  } = useDroppable({
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

export default function createDraggableCard(ComposedComponent) {
  if (!ComposedComponent) {
    console.error("❌ createDraggableCard called with undefined component");

    return function SafeDraggableCard(props) {
      console.warn("⚠️ SafeDraggableCard rendering (missing component)");
      return (
        <DraggableCard
          {...props}
          component={DebugComponent}
          data={{ ...props.data, error: "Missing component" }}
        />
      );
    };
  }

  return function WrappedDraggableCard(props) {
    return <DraggableCard {...props} component={ComposedComponent} />;
  };
}
// Yardımcı fonksiyon: @dnd-kit için useDraggable ve useDroppable hook'larını içe aktar
import { useDraggable, useDroppable } from "@dnd-kit/core";

// Yardımcı HOC: Herhangi bir bileşeni draggable yapar
export const withDraggable = (WrappedComponent, options = {}) => {
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

    const style = {
      transform: CSS.Translate.toString(transform),
      opacity: isDragging ? 0.5 : 1,
      cursor: isDraggable ? (isDragging ? "grabbing" : "grab") : "default",
      transition: transform ? "transform 200ms ease" : undefined,
    };

    return (
      <div ref={setNodeRef} style={style} {...attributes} {...listeners}>
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

// Kullanım örneği:
/*
import { withDraggable } from './DraggableCard';

const MyComponent = ({ isDragging, ...props }) => (
  <div style={{ opacity: isDragging ? 0.7 : 1 }}>
    My Content
  </div>
);

const DraggableMyComponent = withDraggable(MyComponent, {
  data: { customField: 'value' }
});

// Veya doğrudan createDraggableCard kullanımı:
const DraggableHeader = createDraggableCard(HeaderComponent);
*/
