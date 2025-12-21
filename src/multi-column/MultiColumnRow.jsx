/* eslint-disable camelcase */
import React from "react";
import { DndContext } from "@dnd-kit/core";

import ComponentHeader from "../form-elements/component-header";
import ComponentLabel from "../form-elements/component-label";
import Dustbin from "./dustbin";
import store from "../stores/store";

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
    } = this.props;

    const { childItems, pageBreakBefore } = data;

    let baseClasses = "SortableItem rfb-item";
    if (pageBreakBefore) baseClasses += " alwaysbreak";

    return (
      <DndContext
        onDragEnd={({ active, over }) => {
          if (!over) return;

          const droppedItem = active.data.current;
          const target = over.data.current;

          if (!droppedItem || !target) return;

          if (droppedItem.col === target.col) return;

          const isBusy = !!childItems[target.col];

          if (!droppedItem?.data?.isContainer) {
            const isNew = !droppedItem.data?.id;
            const itemData = isNew
              ? droppedItem.onCreate(droppedItem.data)
              : droppedItem.data;

            setAsChild?.(data, itemData, target.col, isBusy);
            store.dispatch("deleteLastItem");
          }
        }}
      >
        <div style={{ ...this.props.style }} className={baseClasses}>
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
