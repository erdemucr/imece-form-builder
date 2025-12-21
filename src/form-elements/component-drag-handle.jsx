import React from "react";
import { useDraggable } from "@dnd-kit/core";

const style = {
  cursor: "grab",
};

const DragHandle = ({ data, index, onDestroy, setAsChild, getDataById }) => {
  const { attributes, listeners, setNodeRef, isDragging } = useDraggable({
    id: data.id,
    data: {
      itemType: "BOX",
      index: data.parentId ? -1 : index,
      parentIndex: data.parentIndex,
      id: data.id,
      col: data.col,
      onDestroy,
      setAsChild,
      getDataById,
      data,
    },
  });

  return (
    <div
      ref={setNodeRef}
      {...listeners}
      {...attributes}
      className="btn is-isolated"
      style={{
        ...style,
        opacity: isDragging ? 0.5 : 1,
      }}
    >
      <i className="is-isolated fas fa-grip-vertical" />
    </div>
  );
};

export default DragHandle;
