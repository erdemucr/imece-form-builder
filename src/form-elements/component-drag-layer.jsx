import React from "react";
import {
  useDndMonitor,
  useDndContext,
  DragOverlay,
  defaultDropAnimationSideEffects,
} from "@dnd-kit/core";
import { CSS } from "@dnd-kit/utilities";
import { BoxDragPreview } from "./component-drag-preview";

const dropAnimationConfig = {
  sideEffects: defaultDropAnimationSideEffects({
    styles: {
      active: {
        opacity: "0.4",
      },
    },
  }),
};

const CustomDragLayer = () => {
  const { active, over } = useDndContext();
  const [draggedItem, setDraggedItem] = React.useState(null);
  const [clientOffset, setClientOffset] = React.useState(null);

  useDndMonitor({
    onDragStart(event) {
      setDraggedItem(event.active.data.current);
      setClientOffset({
        x: event.initialCoordinates.client.x,
        y: event.initialCoordinates.client.y,
      });
    },
    onDragMove(event) {
      if (event.delta) {
        setClientOffset({
          x: event.initialCoordinates.client.x + event.delta.x,
          y: event.initialCoordinates.client.y + event.delta.y,
        });
      }
    },
    onDragEnd() {
      // Sürükleme bittiğinde state'i temizle
      setTimeout(() => {
        setDraggedItem(null);
        setClientOffset(null);
      }, 0);
    },
    onDragCancel() {
      setDraggedItem(null);
      setClientOffset(null);
    },
  });

  // Aktif sürükleme yoksa render etme
  if (!active || !draggedItem) {
    return null;
  }

  const renderItem = () => {
    const itemType = draggedItem?.type;

    switch (itemType) {
      case "BOX":
      case "CARD":
        return <BoxDragPreview item={draggedItem} />;
      default:
        return null;
    }
  };

  // DragOverlay ile daha basit ve efektif çözüm
  return (
    <DragOverlay
      dropAnimation={dropAnimationConfig}
      modifiers={
        [
          // İsteğe bağlı: sürükleme sırasında dönüşüm efekti ekleyebilirsiniz
        ]
      }
    >
      {renderItem()}
    </DragOverlay>
  );
};

// Alternatif: Özel stillerle daha gelişmiş katman (eğer DragOverlay yeterli değilse)
export const AdvancedCustomDragLayer = () => {
  const { active, over } = useDndContext();
  const [draggedItem, setDraggedItem] = React.useState(null);
  const [position, setPosition] = React.useState({ x: 0, y: 0 });

  useDndMonitor({
    onDragStart(event) {
      setDraggedItem(event.active.data.current);
    },
    onDragMove(event) {
      if (event.delta) {
        setPosition({
          x: event.delta.x,
          y: event.delta.y,
        });
      }
    },
    onDragEnd() {
      setDraggedItem(null);
      setPosition({ x: 0, y: 0 });
    },
    onDragCancel() {
      setDraggedItem(null);
      setPosition({ x: 0, y: 0 });
    },
  });

  if (!active || !draggedItem) {
    return null;
  }

  const transform = CSS.Translate.toString({
    x: position.x,
    y: position.y,
  });

  const layerStyles = {
    position: "fixed",
    pointerEvents: "none",
    zIndex: 9999,
    left: 0,
    top: 0,
    width: "100%",
    height: "100%",
  };

  const itemStyles = {
    transform,
    position: "absolute",
    top: 0,
    left: 0,
  };

  const renderItem = () => {
    const itemType = draggedItem?.type;

    switch (itemType) {
      case "BOX":
      case "CARD":
        return <BoxDragPreview item={draggedItem} />;
      default:
        return null;
    }
  };

  return (
    <div style={layerStyles}>
      <div style={itemStyles}>{renderItem()}</div>
    </div>
  );
};

export default CustomDragLayer;
