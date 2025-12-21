/* eslint-disable camelcase */
import React from "react";
import { DndContext } from "@dnd-kit/core";

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

class MultiColumnRowBase extends React.Component {
  render() {
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
    } = this.props;

    const { childItems = [], pageBreakBefore } = data;

    let baseClasses = "SortableItem rfb-item";
    if (pageBreakBefore) baseClasses += " alwaysbreak";

    return (
      <DndContext
        onDragEnd={({ active, over }) => {
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
            ? droppedItem.onCreate(droppedItem.data)
            : droppedItem.data;

          setAsChild?.(data, itemData, target.col, isBusy);

          if (isNew) {
            store.dispatch("deleteLastItem");
          }
        }}
      >
        <div style={{ ...style }} className={baseClasses}>
          <ComponentHeader {...this.props} />
          <div>
            <ComponentLabel {...this.props} />
            <div className="row">
              {childItems.map((x, i) => (
                <div key={`${i}_${x || "_"}`} className={className}>
                  {controls ? (
                    controls[i]
                  ) : (
                    <Dustbin
                      id={`col-${index}-${i}`}
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
                    />
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      </DndContext>
    );
  }
}

/* ---------------- wrappers ---------------- */

const TwoColumnRow = ({ data, class_name, ...rest }) => {
  const className = class_name || "col-md-6";

  if (!data.childItems) {
    // eslint-disable-next-line no-param-reassign
    data.childItems = [null, null];
    data.isContainer = true;
  }

  return <MultiColumnRowBase {...rest} className={className} data={data} />;
};

const ThreeColumnRow = ({ data, class_name, ...rest }) => {
  const className = class_name || "col-md-4";

  if (!data.childItems) {
    // eslint-disable-next-line no-param-reassign
    data.childItems = [null, null, null];
    data.isContainer = true;
  }

  return <MultiColumnRowBase {...rest} className={className} data={data} />;
};

const MultiColumnRow = ({ data, ...rest }) => {
  const colCount = data.col_count || 4;
  const className = data.class_name || (colCount === 4 ? "col-md-3" : "col");

  if (!data.childItems) {
    // eslint-disable-next-line no-param-reassign
    data.childItems = Array.from({ length: colCount }, () => null);
    data.isContainer = true;
  }

  return <MultiColumnRowBase {...rest} className={className} data={data} />;
};

export { TwoColumnRow, ThreeColumnRow, MultiColumnRow };
