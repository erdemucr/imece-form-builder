import React, { useState, useEffect, useRef, useCallback } from "react";
import {
  DndContext,
  DragOverlay,
  closestCenter,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
  MeasuringStrategy,
  defaultDropAnimationSideEffects,
} from "@dnd-kit/core";
import {
  arrayMove,
  SortableContext,
  sortableKeyboardCoordinates,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import update from "immutability-helper";
import store from "./stores/store";
import FormElementsEdit from "./form-dynamic-edit";
import SortableFormElements from "./sortable-form-elements";
import CustomDragLayer from "./form-elements/component-drag-layer";
import { SortableItem } from "./sortable-form-elements";

const { PlaceHolder } = SortableFormElements;

const dropAnimation = {
  sideEffects: defaultDropAnimationSideEffects({
    styles: {
      active: {
        opacity: "0.5",
      },
    },
  }),
};

const Preview = (props) => {
  const {
    onLoad,
    onPost,
    data: propsData,
    url,
    saveUrl,
    saveAlways,
    variables,
    editElement,
    editMode,
    className = "col-md-9 react-form-builder-preview float-left",
    renderEditForm = (props) => <FormElementsEdit {...props} />,
    showCorrectColumn = false,
    files = [],
    manualEditModeOff,
    editModeOn,
    parent,
  } = props;

  const [data, setData] = useState(propsData || []);
  const [answerData, setAnswerData] = useState({});
  const [activeId, setActiveId] = useState(null);
  const [activeItem, setActiveItem] = useState(null);
  const editForm = useRef(null);
  const seq = useRef(0);

  // Store initialization
  useEffect(() => {
    store.setExternalHandler(onLoad, onPost);
    store.subscribe((state) => handleStoreUpdate(state.data));
    store.dispatch("load", {
      loadUrl: url,
      saveUrl,
      data: propsData || [],
      saveAlways,
    });
  }, []);

  // Mouse down listener for edit mode
  useEffect(() => {
    const handleMouseDown = (e) => {
      if (editForm.current && !editForm.current.contains(e.target)) {
        manualEditModeOffHandler();
      }
    };

    document.addEventListener("mousedown", handleMouseDown);
    return () => {
      document.removeEventListener("mousedown", handleMouseDown);
    };
  }, []);

  // Configure sensors for drag and drop
  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 8,
      },
    }),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

  const handleStoreUpdate = (newData) => {
    const newAnswerData = {};

    newData.forEach((item) => {
      if (item && item.readOnly && variables && variables[item.variableKey]) {
        newAnswerData[item.field_name] = variables[item.variableKey];
      }
    });

    setData(newData);
    setAnswerData(newAnswerData);
  };

  const manualEditModeOffHandler = () => {
    if (editElement && editElement.dirty) {
      editElement.dirty = false;
      updateElement(editElement);
    }
    manualEditModeOff();
  };

  const _setValue = (text) => {
    return text.replace(/[^A-Z0-9]+/gi, "_").toLowerCase();
  };

  const updateElement = (element) => {
    const newData = [...data];
    let found = false;

    for (let i = 0, len = newData.length; i < len; i++) {
      if (element.id === newData[i].id) {
        newData[i] = element;
        found = true;
        break;
      }
    }

    if (found) {
      seq.current = seq.current > 100000 ? 0 : seq.current + 1;
      store.dispatch("updateOrder", newData);
      setData(newData);
    }
  };

  const getDataById = useCallback(
    (id) => {
      return data.find((x) => x && x.id === id);
    },
    [data]
  );

  const handleDragStart = (event) => {
    const { active } = event;
    const item = getDataById(active.id);
    setActiveId(active.id);
    setActiveItem(item);
  };

  const handleDragEnd = (event) => {
    const { active, over } = event;
    setActiveId(null);
    setActiveItem(null);

    if (active.id !== over?.id) {
      // Move within main container
      const oldIndex = data.findIndex((item) => item?.id === active.id);
      const newIndex = data.findIndex((item) => item?.id === over?.id);

      if (oldIndex !== -1 && newIndex !== -1) {
        const newData = arrayMove(data, oldIndex, newIndex);
        setData(newData);
        store.dispatch("updateOrder", newData);
      }
    }
  };

  const handleDragCancel = () => {
    setActiveId(null);
    setActiveItem(null);
  };

  const insertCard = (item, hoverIndex, id) => {
    if (id) {
      restoreCard(item, id);
    } else {
      const newData = [...data];
      newData.splice(hoverIndex, 0, item);
      setData(newData);
      store.dispatch("insertItem", item);
    }
  };

  const restoreCard = (item, id) => {
    const parent = getDataById(item.data.parentId);
    const oldItem = getDataById(id);

    if (parent && oldItem) {
      const newIndex = data.indexOf(oldItem);
      const newData = [...data];

      if (oldItem.col !== undefined && parent.childItems) {
        parent.childItems[oldItem.col] = null;
      }

      delete oldItem.parentId;
      delete oldItem.setAsChild;
      delete oldItem.parentIndex;

      item.index = newIndex;
      seq.current = seq.current > 100000 ? 0 : seq.current + 1;

      store.dispatch("updateOrder", newData);
      setData(newData);
    }
  };

  const setAsChild = (item, child, col, isBusy) => {
    const newData = [...data];

    if (swapChildren(newData, item, child, col)) {
      return;
    }

    if (isBusy) {
      return;
    }

    const oldParent = getDataById(child.parentId);
    const oldCol = child.col;

    item.childItems[col] = child.id;
    child.col = col;
    child.parentId = item.id;
    child.parentIndex = newData.indexOf(item);

    if (oldParent && oldParent.childItems) {
      oldParent.childItems[oldCol] = null;
    }

    const list = newData.filter((x) => x && x.parentId === item.id);
    const toRemove = list.filter((x) => item.childItems.indexOf(x.id) === -1);

    if (toRemove.length > 0) {
      const filteredData = newData.filter((x) => !toRemove.includes(x));
      setData(filteredData);
      store.dispatch("updateOrder", filteredData);
    } else {
      if (!getDataById(child.id)) {
        newData.push(child);
      }
      setData(newData);
      store.dispatch("updateOrder", newData);
    }
  };

  const swapChildren = (dataArray, item, child, col) => {
    if (child.col !== undefined && item.id !== child.parentId) {
      return false;
    }

    if (
      !(child.col !== undefined && child.col !== col && item.childItems[col])
    ) {
      return false;
    }

    const oldId = item.childItems[col];
    const oldItem = getDataById(oldId);
    const oldCol = child.col;

    item.childItems[oldCol] = oldId;
    oldItem.col = oldCol;
    item.childItems[col] = child.id;
    child.col = col;

    store.dispatch("updateOrder", dataArray);
    return true;
  };

  const removeChild = (item, col) => {
    const newData = [...data];
    const oldId = item.childItems[col];
    const oldItem = getDataById(oldId);

    if (oldItem) {
      item.childItems[col] = null;

      const filteredData = newData.filter((x) => x !== oldItem);
      seq.current = seq.current > 100000 ? 0 : seq.current + 1;

      store.dispatch("updateOrder", filteredData);
      setData(filteredData);
    }
  };

  const _onDestroy = (item) => {
    if (item.childItems) {
      item.childItems.forEach((x) => {
        const child = getDataById(x);
        if (child) {
          store.dispatch("delete", child);
        }
      });
    }
    store.dispatch("delete", item);
  };

  const getElement = (item, index) => {
    console.log("getElement called:", { item, index, element: item?.element });

    if (!item || !item.element) {
      console.warn("⚠️ Invalid item in getElement:", item);
      return (
        <div
          className="form-element-error"
          style={{
            border: "1px solid #ff6b6b",
            padding: "10px",
            margin: "5px 0",
            backgroundColor: "#ffeaea",
          }}
        >
          Error: Invalid item (no element property)
        </div>
      );
    }

    // Custom element kontrolü
    if (item.custom) {
      console.log("🛠️ Custom element detected:", item.key);
      if (!item.component || typeof item.component !== "function") {
        item.component = this.props.registry.get(item.key);
        if (!item.component) {
          console.error(`❌ Custom element "${item.key}" was not registered`);
          return (
            <div
              className="custom-element-error"
              style={{
                border: "1px solid #ffc107",
                padding: "10px",
                margin: "5px 0",
                backgroundColor: "#fff3cd",
              }}
            >
              Error: Custom element "{item.key}" not found in registry
            </div>
          );
        }
      }
    }

    // Form elementini bul
    console.log("🔎 Looking for element:", item.element);
    console.log(
      "📚 Available SortableFormElements:",
      Object.keys(SortableFormElements || {})
    );

    const SortableFormElement = SortableFormElements
      ? SortableFormElements[item.element]
      : undefined;

    if (!SortableFormElement) {
      console.error(`❌ Form element "${item.element}" not found!`, {
        item,
        availableElements: Object.keys(SortableFormElements || {}),
        SortableFormElements,
      });

      // Fallback için basit bir bileşen
      const FallbackComponent = (props) => (
        <div
          style={{
            border: "2px dashed #6c757d",
            padding: "15px",
            marginBottom: "10px",
            backgroundColor: "#f8f9fa",
            color: "#6c757d",
          }}
        >
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <div>
              <strong>Missing: {item.element}</strong>
              <div style={{ fontSize: "12px", marginTop: "5px" }}>
                ID: {item.id} | Type: {item.element}
              </div>
            </div>
            <button
              onClick={() =>
                console.log("Debug:", { item, SortableFormElements })
              }
              style={{ padding: "5px 10px", fontSize: "12px" }}
            >
              Debug
            </button>
          </div>
        </div>
      );

      return <FallbackComponent key={item.id} />;
    }

    console.log("✅ Found element:", item.element, SortableFormElement);

    return (
      <SortableFormElement
        id={item.id}
        seq={this.seq}
        index={index}
        moveCard={this.moveCard}
        insertCard={this.insertCard}
        mutable={false}
        parent={this.props.parent}
        editModeOn={this.props.editModeOn}
        isDraggable={true}
        key={item.id}
        sortData={item.id}
        data={item}
        getDataById={this.getDataById}
        setAsChild={this.setAsChild}
        removeChild={this.removeChild}
        _onDestroy={this._onDestroy}
      />
    );
  };

  const showEditForm = () => {
    const handleUpdateElement = (element) => updateElement(element);

    const formElementEditProps = {
      showCorrectColumn,
      files,
      manualEditModeOff: manualEditModeOffHandler,
      preview: this,
      element: editElement,
      updateElement: handleUpdateElement,
    };

    return renderEditForm(formElementEditProps);
  };

  const filteredData = data.filter((x) => !!x && !x.parentId);
  const items = filteredData.map((item, index) => getElement(item, index));
  const itemIds = filteredData.map((item) => item?.id).filter(Boolean);

  const classes = editMode ? `${className} is-editing` : className;

  return (
    <div className={classes}>
      <div className="edit-form" ref={editForm}>
        {editElement !== null && showEditForm()}
      </div>

      <DndContext
        sensors={sensors}
        collisionDetection={closestCenter}
        onDragStart={handleDragStart}
        onDragEnd={handleDragEnd}
        onDragCancel={handleDragCancel}
        measuring={{
          droppable: {
            strategy: MeasuringStrategy.Always,
          },
        }}
      >
        <SortableContext items={itemIds} strategy={verticalListSortingStrategy}>
          <div className="Sortable">{items}</div>
        </SortableContext>

        <DragOverlay dropAnimation={dropAnimation}>
          {activeItem ? (
            <div style={{ opacity: 0.8, cursor: "grabbing" }}>
              {getElement(
                activeItem,
                data.findIndex((item) => item?.id === activeId)
              )}
            </div>
          ) : null}
        </DragOverlay>
      </DndContext>

      <PlaceHolder
        id="form-place-holder"
        show={items.length === 0}
        index={items.length}
        moveCard={() => {}}
        insertCard={insertCard}
      />
    </div>
  );
};

export default Preview;
