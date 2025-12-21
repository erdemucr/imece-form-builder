/**
 * <ReactFormBuilder />
 */

import React from "react";
import {
  DndContext,
  PointerSensor,
  useSensor,
  useSensors,
} from "@dnd-kit/core";
import { IntlProvider } from "react-intl";

import Preview from "./preview";
import Toolbar from "./toolbar";
import FormGenerator from "./form";
import store from "./stores/store";
import Registry from "./stores/registry";
import AppLocale from "./language-provider";

class ReactFormBuilder extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      editMode: false,
      editElement: null,
    };

    this.editModeOn = this.editModeOn.bind(this);
    this.manualEditModeOff = this.manualEditModeOff.bind(this);
  }

  editModeOn(data, e) {
    e.preventDefault();
    e.stopPropagation();

    this.setState((prev) => ({
      editMode: !prev.editMode,
      editElement: prev.editMode ? null : data,
    }));
  }

  manualEditModeOff() {
    if (this.state.editMode) {
      this.setState({
        editMode: false,
        editElement: null,
      });
    }
  }

  render() {
    const toolbarProps = {
      showDescription: this.props.show_description,
    };

    if (this.props.toolbarItems) {
      toolbarProps.items = this.props.toolbarItems;
    }

    const language = this.props.locale || "en";
    const currentAppLocale = AppLocale[language];

    return (
      <DndContext>
        <IntlProvider
          locale={currentAppLocale.locale}
          messages={currentAppLocale.messages}
        >
          <div className="react-form-builder clearfix">
            <div>
              <Preview
                files={this.props.files}
                manualEditModeOff={this.manualEditModeOff}
                showCorrectColumn={this.props.showCorrectColumn}
                parent={this}
                data={this.props.data}
                url={this.props.url}
                saveUrl={this.props.saveUrl}
                onLoad={this.props.onLoad}
                onPost={this.props.onPost}
                editModeOn={this.editModeOn}
                editMode={this.state.editMode}
                variables={this.props.variables}
                registry={Registry}
                editElement={this.state.editElement}
                renderEditForm={this.props.renderEditForm}
                saveAlways={this.props.saveAlways}
              />

              <Toolbar
                {...toolbarProps}
                customItems={this.props.customToolbarItems}
              />
            </div>
          </div>
        </IntlProvider>
      </DndContext>
    );
  }
}

/* ---------------- FORM GENERATOR ---------------- */

function ReactFormGenerator(props) {
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
}

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
