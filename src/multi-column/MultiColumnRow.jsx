/* eslint-disable camelcase */
import React, { useCallback } from "react";
import { DndContext, useDndMonitor, DragOverlay } from "@dnd-kit/core";

import ComponentHeader from "../form-elements/component-header";
import ComponentLabel from "../form-elements/component-label";
import Dustbin from "./dustbin";
import store from "../stores/store";
import ItemTypes from "../ItemTypes";

/* ---------------- helpers ---------------- */

function isContainer(item) {
  if (!item) return false;

  if (item.itemType !== ItemTypes.CARD) {
    const { data } = item;
    if (data) {
      if (data.isContainer) return true;
      if (data.field_name) {
        return (
          data.field_name.includes("_col_row") ||
          data.field_name.includes("fieldset")
        );
      }
    }
  }
  return false;
}

/* ---------------- base ---------------- */

const MultiColumnRowBase = (props) => {
  const {
    controls,
    data,
    editModeOn,
    getDataById,
    setAsChild,
    removeChild,
    seq,
    className,
    index,
    style,
    id,
  } = props;

  const { childItems = [], pageBreakBefore } = data;

  let baseClasses = "SortableItem rfb-item";
  if (pageBreakBefore) baseClasses += " alwaysbreak";

  const handleDragEnd = useCallback(
    ({ active, over }) => {
      if (!over) return;

      const droppedItem = active.data?.current;
      const target = over.data?.current;

      if (!droppedItem || !target) return;

      // same column + same parent → no-op
      if (
        droppedItem.col === target.col &&
        droppedItem.parentIndex === target.parentIndex
      ) {
        return;
      }

      // container cannot be dropped
      if (isContainer(droppedItem)) return;

      const isBusy =
        Array.isArray(childItems) && childItems[target.col] !== null;

      const isNew = !droppedItem.data?.id;
      const itemData = isNew
        ? droppedItem.onCreate?.(droppedItem.data)
        : droppedItem.data;

      setAsChild?.(data, itemData, target.col, isBusy);

      if (isNew && droppedItem.onCreate) {
        store.dispatch("deleteLastItem");
      }
    },
    [childItems, data, setAsChild]
  );

  // İsteğe bağlı: Drag overlay için
  const [activeItem, setActiveItem] = React.useState(null);

  useDndMonitor({
    onDragStart(event) {
      setActiveItem(event.active.data.current);
    },
    onDragEnd() {
      setActiveItem(null);
    },
    onDragCancel() {
      setActiveItem(null);
    },
  });

  return (
    <DndContext onDragEnd={handleDragEnd}>
      <div style={{ ...style }} className={baseClasses} data-row-id={id}>
        <ComponentHeader {...props} />
        <div>
          <ComponentLabel {...props} />
          <div className="row">
            {childItems.map((x, i) => (
              <div
                key={`${data.id}-col-${i}-${x || "_"}`}
                className={className}
              >
                {controls ? (
                  controls[i]
                ) : (
                  <Dustbin
                    id={`${data.id}-col-${i}`}
                    style={{ width: "100%" }}
                    data={data}
                    items={childItems}
                    col={i}
                    parentIndex={index}
                    editModeOn={editModeOn}
                    _onDestroy={() => removeChild(data, i)}
                    getDataById={getDataById}
                    setAsChild={setAsChild}
                    seq={seq}
                    accept={["CARD", "BOX", "TOOLBAR_ITEM"]}
                  />
                )}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* İsteğe bağlı: Drag overlay */}
      <DragOverlay>
        {activeItem && !isContainer(activeItem) ? (
          <div
            style={{
              opacity: 0.8,
              cursor: "grabbing",
              backgroundColor: "white",
              padding: "8px",
              borderRadius: "4px",
              boxShadow: "0 4px 8px rgba(0,0,0,0.2)",
            }}
          >
            {activeItem.data?.text || activeItem.toolbarData?.name || "Item"}
          </div>
        ) : null}
      </DragOverlay>
    </DndContext>
  );
};

/* ---------------- wrappers ---------------- */

const TwoColumnRow = ({ data, class_name, ...rest }) => {
  const className = class_name || "col-md-6";

  // React.useEffect ile güvenli şekilde state güncelle
  React.useEffect(() => {
    if (!data.childItems) {
      data.childItems = [null, null];
      data.isContainer = true;
    }
  }, [data]);

  return <MultiColumnRowBase {...rest} className={className} data={data} />;
};

const ThreeColumnRow = ({ data, class_name, ...rest }) => {
  const className = class_name || "col-md-4";

  React.useEffect(() => {
    if (!data.childItems) {
      data.childItems = [null, null, null];
      data.isContainer = true;
    }
  }, [data]);

  return <MultiColumnRowBase {...rest} className={className} data={data} />;
};

const FourColumnRow = ({ data, class_name, ...rest }) => {
  const className = class_name || "col-md-3";

  React.useEffect(() => {
    if (!data.childItems) {
      data.childItems = [null, null, null, null];
      data.isContainer = true;
    }
  }, [data]);

  return <MultiColumnRowBase {...rest} className={className} data={data} />;
};

const MultiColumnRow = ({ data, ...rest }) => {
  const colCount = data.col_count || 4;
  const className = data.class_name || (colCount === 4 ? "col-md-3" : "col");

  React.useEffect(() => {
    if (!data.childItems) {
      data.childItems = Array.from({ length: colCount }, () => null);
      data.isContainer = true;
    }
  }, [data, colCount]);

  return <MultiColumnRowBase {...rest} className={className} data={data} />;
};

export { TwoColumnRow, ThreeColumnRow, FourColumnRow, MultiColumnRow };
