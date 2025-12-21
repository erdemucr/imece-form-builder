/**
 * <HeaderBar />
 */

import React from "react";
import DragHandle from "./component-drag-handle";

export default class HeaderBar extends React.Component {
  render() {
    const { data, index, onDestroy, setAsChild, editModeOn, parent } =
      this.props;

    return (
      <div className="toolbar-header">
        <span className="badge badge-secondary">{data.text}</span>

        <div className="toolbar-header-buttons">
          {data.element !== "LineBreak" && (
            <div
              className="btn is-isolated"
              onClick={editModeOn.bind(parent, data)}
            >
              <i className="is-isolated fas fa-edit"></i>
            </div>
          )}

          {/* 🔥 Manuel eklenen confirm logic */}
          <div
            className="btn is-isolated"
            onClick={() => {
              if (window.confirm("Silmek istediğinize emin misiniz?")) {
                onDestroy(data);
              }
            }}
          >
            <i className="is-isolated fas fa-trash"></i>
          </div>

          <DragHandle
            data={data}
            index={index}
            onDestroy={onDestroy}
            setAsChild={setAsChild}
          />
        </div>
      </div>
    );
  }
}
