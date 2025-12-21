import React, { useRef } from "react";
import PropTypes from "prop-types";
import { useDrag, useDrop } from "react-dnd";
import ItemTypes from "./ItemTypes";

const style = {
  border: "1px dashed gray",
  padding: "0.5rem 1rem",
  marginBottom: ".5rem",
  backgroundColor: "white",
  cursor: "pointer",
};

const useDragAndDrop = (props) => {
  const ref = useRef(null);

  const [{ isDragging }, drag, preview] = useDrag({
    type: ItemTypes.CARD,
    item: () => ({
      itemType: ItemTypes.CARD,
      id: props.id,
      index: props.index,
      data: props.data,
      onCreate: props.onCreate,
      setAsChild: props.setAsChild,
      parentIndex: props.parentIndex,
      col: props.col,
    }),
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  });

  const [, drop] = useDrop({
    accept: [ItemTypes.CARD, ItemTypes.BOX],
    hover: () => {},
    drop: () => {},
  });

  return {
    ref: (node) => {
      ref.current = node;
      drop(node);
      drag(node);
    },
    previewRef: preview,
    isDragging,
  };
};

const DraggableCard = (props) => {
  const {
    index,
    id,
    moveCard,
    seq = -1,
    component: ComposedComponent,
    ...restProps
  } = props;

  if (!ComposedComponent) {
    console.error("❌ DraggableCard received undefined component", props);
    return null;
  }

  const { ref, previewRef, isDragging } = useDragAndDrop(props);
  const opacity = isDragging ? 0 : 1;

  return (
    <div ref={previewRef}>
      <div ref={ref}>
        <ComposedComponent
          {...restProps}
          index={index}
          id={id}
          moveCard={moveCard}
          seq={seq}
          style={{ ...style, opacity }}
        />
      </div>
    </div>
  );
};

DraggableCard.propTypes = {
  component: PropTypes.elementType.isRequired,
  index: PropTypes.number.isRequired,
  id: PropTypes.any.isRequired,
  moveCard: PropTypes.func.isRequired,
  seq: PropTypes.number,
};

DraggableCard.defaultProps = {
  seq: -1,
};

export default function createDraggableCard(ComposedComponent) {
  if (!ComposedComponent) {
    console.error("❌ createDraggableCard called with undefined component");
    return () => null;
  }

  return function WrappedDraggableCard(props) {
    return <DraggableCard {...props} component={ComposedComponent} />;
  };
}
