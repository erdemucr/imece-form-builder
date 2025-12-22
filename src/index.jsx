import React, { useState, useCallback } from "react";
import {
  DndContext,
  PointerSensor,
  KeyboardSensor,
  TouchSensor,
  useSensor,
  useSensors,
  DragOverlay,
  defaultDropAnimationSideEffects,
  MeasuringStrategy,
  closestCenter,
} from "@dnd-kit/core";
import {
  SortableContext,
  sortableKeyboardCoordinates,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import { IntlProvider } from "react-intl";

import Preview from "./preview";
import Toolbar from "./toolbar";
import FormGenerator from "./form";
import store from "./stores/store";
import Registry from "./stores/registry";
import AppLocale from "./language-provider";

const dropAnimation = {
  sideEffects: defaultDropAnimationSideEffects({
    styles: {
      active: {
        opacity: "0.5",
      },
    },
  }),
};

const ReactFormBuilder = (props) => {
  const [editMode, setEditMode] = useState(false);
  const [editElement, setEditElement] = useState(null);
  const [activeId, setActiveId] = useState(null);
  const [activeItem, setActiveItem] = useState(null);

  // Sensörleri konfigüre et
  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 8, // 8px hareket ettikten sonra drag başlasın
      },
    }),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    }),
    useSensor(TouchSensor, {
      activationConstraint: {
        delay: 250, // 250ms dokunma süresi
        tolerance: 5, // 5px tolerans
      },
    })
  );

  const editModeOn = useCallback((data, e) => {
    if (e) {
      e.preventDefault();
      e.stopPropagation();
    }

    setEditMode((prev) => !prev);
    setEditElement((prev) => (prev ? null : data));
  }, []);

  const manualEditModeOff = useCallback(() => {
    if (editMode) {
      setEditMode(false);
      setEditElement(null);
    }
  }, [editMode]);

  const handleDragStart = useCallback((event) => {
    setActiveId(event.active.id);
    setActiveItem(event.active.data.current);
  }, []);

  const handleDragEnd = useCallback((event) => {
    const { active, over } = event;
    setActiveId(null);
    setActiveItem(null);

    // Burada global drag & drop işlemlerini yönetebilirsiniz
    if (active && over && active.id !== over.id) {
      console.log("Global drag end:", { active: active.id, over: over.id });
    }
  }, []);

  const handleDragCancel = useCallback(() => {
    setActiveId(null);
    setActiveItem(null);
  }, []);

  const toolbarProps = {
    showDescription: props.show_description,
    items: props.toolbarItems,
    customItems: props.customToolbarItems,
  };

  const language = props.locale || "en";
  const currentAppLocale = AppLocale[language];

  return (
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
      <IntlProvider
        locale={currentAppLocale.locale}
        messages={currentAppLocale.messages}
      >
        <div className="react-form-builder clearfix">
          <div className="form-builder-container">
            <Preview
              files={props.files}
              manualEditModeOff={manualEditModeOff}
              showCorrectColumn={props.showCorrectColumn}
              parent={this}
              data={props.data}
              url={props.url}
              saveUrl={props.saveSaveUrl}
              onLoad={props.onLoad}
              onPost={props.onPost}
              editModeOn={editModeOn}
              editMode={editMode}
              variables={props.variables}
              registry={Registry}
              editElement={editElement}
              renderEditForm={props.renderEditForm}
              saveAlways={props.saveAlways}
            />

            <Toolbar {...toolbarProps} />
          </div>
        </div>

        {/* Global Drag Overlay */}
        <DragOverlay dropAnimation={dropAnimation}>
          {activeItem ? (
            <div
              style={{
                opacity: 0.8,
                cursor: "grabbing",
                backgroundColor: "white",
                padding: "8px 12px",
                borderRadius: "4px",
                boxShadow: "0 4px 8px rgba(0,0,0,0.2)",
                transform: "rotate(-2deg)",
              }}
            >
              {activeItem.toolbarData?.name || activeItem.data?.text || "Item"}
            </div>
          ) : null}
        </DragOverlay>
      </IntlProvider>
    </DndContext>
  );
};

/* ---------------- FORM GENERATOR ---------------- */

const ReactFormGenerator = (props) => {
  const language = props.locale || "en";
  const currentAppLocale = AppLocale[language];

  return (
    <IntlProvider
      locale={currentAppLocale.locale}
      messages={currentAppLocale.messages}
    >
      <FormGenerator {...props} />
    </IntlProvider>
  );
};

/* ---------------- EXPORTS ---------------- */

const FormBuilders = {
  ReactFormBuilder,
  ReactFormGenerator,
  ElementStore: store,
  Registry,
};

export default FormBuilders;

export {
  ReactFormBuilder,
  ReactFormGenerator,
  store as ElementStore,
  Registry,
};
