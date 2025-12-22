"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
var _typeof = require("@babel/runtime/helpers/typeof");
Object.defineProperty(exports, "__esModule", {
  value: true
});
Object.defineProperty(exports, "ElementStore", {
  enumerable: true,
  get: function get() {
    return _store["default"];
  }
});
exports.ReactFormGenerator = exports.ReactFormBuilder = void 0;
Object.defineProperty(exports, "Registry", {
  enumerable: true,
  get: function get() {
    return _registry["default"];
  }
});
exports["default"] = void 0;
var _slicedToArray2 = _interopRequireDefault(require("@babel/runtime/helpers/slicedToArray"));
var _react = _interopRequireWildcard(require("react"));
var _core = require("@dnd-kit/core");
var _sortable = require("@dnd-kit/sortable");
var _reactIntl = require("react-intl");
var _preview = _interopRequireDefault(require("./preview"));
var _toolbar = _interopRequireDefault(require("./toolbar"));
var _form = _interopRequireDefault(require("./form"));
var _store = _interopRequireDefault(require("./stores/store"));
var _registry = _interopRequireDefault(require("./stores/registry"));
var _languageProvider = _interopRequireDefault(require("./language-provider"));
var _this = void 0;
function _interopRequireWildcard(e, t) { if ("function" == typeof WeakMap) var r = new WeakMap(), n = new WeakMap(); return (_interopRequireWildcard = function _interopRequireWildcard(e, t) { if (!t && e && e.__esModule) return e; var o, i, f = { __proto__: null, "default": e }; if (null === e || "object" != _typeof(e) && "function" != typeof e) return f; if (o = t ? n : r) { if (o.has(e)) return o.get(e); o.set(e, f); } for (var _t in e) "default" !== _t && {}.hasOwnProperty.call(e, _t) && ((i = (o = Object.defineProperty) && Object.getOwnPropertyDescriptor(e, _t)) && (i.get || i.set) ? o(f, _t, i) : f[_t] = e[_t]); return f; })(e, t); }
var dropAnimation = {
  sideEffects: (0, _core.defaultDropAnimationSideEffects)({
    styles: {
      active: {
        opacity: "0.5"
      }
    }
  })
};
var ReactFormBuilder = exports.ReactFormBuilder = function ReactFormBuilder(props) {
  var _activeItem$toolbarDa, _activeItem$data;
  var _useState = (0, _react.useState)(false),
    _useState2 = (0, _slicedToArray2["default"])(_useState, 2),
    editMode = _useState2[0],
    setEditMode = _useState2[1];
  var _useState3 = (0, _react.useState)(null),
    _useState4 = (0, _slicedToArray2["default"])(_useState3, 2),
    editElement = _useState4[0],
    setEditElement = _useState4[1];
  var _useState5 = (0, _react.useState)(null),
    _useState6 = (0, _slicedToArray2["default"])(_useState5, 2),
    activeId = _useState6[0],
    setActiveId = _useState6[1];
  var _useState7 = (0, _react.useState)(null),
    _useState8 = (0, _slicedToArray2["default"])(_useState7, 2),
    activeItem = _useState8[0],
    setActiveItem = _useState8[1];

  // Sensörleri konfigüre et
  var sensors = (0, _core.useSensors)((0, _core.useSensor)(_core.PointerSensor, {
    activationConstraint: {
      distance: 8 // 8px hareket ettikten sonra drag başlasın
    }
  }), (0, _core.useSensor)(_core.KeyboardSensor, {
    coordinateGetter: _sortable.sortableKeyboardCoordinates
  }), (0, _core.useSensor)(_core.TouchSensor, {
    activationConstraint: {
      delay: 250,
      // 250ms dokunma süresi
      tolerance: 5 // 5px tolerans
    }
  }));
  var editModeOn = (0, _react.useCallback)(function (data, e) {
    if (e) {
      e.preventDefault();
      e.stopPropagation();
    }
    setEditMode(function (prev) {
      return !prev;
    });
    setEditElement(function (prev) {
      return prev ? null : data;
    });
  }, []);
  var manualEditModeOff = (0, _react.useCallback)(function () {
    if (editMode) {
      setEditMode(false);
      setEditElement(null);
    }
  }, [editMode]);
  var handleDragStart = (0, _react.useCallback)(function (event) {
    setActiveId(event.active.id);
    setActiveItem(event.active.data.current);
  }, []);
  var handleDragEnd = (0, _react.useCallback)(function (event) {
    var active = event.active,
      over = event.over;
    setActiveId(null);
    setActiveItem(null);

    // Burada global drag & drop işlemlerini yönetebilirsiniz
    if (active && over && active.id !== over.id) {
      console.log("Global drag end:", {
        active: active.id,
        over: over.id
      });
    }
  }, []);
  var handleDragCancel = (0, _react.useCallback)(function () {
    setActiveId(null);
    setActiveItem(null);
  }, []);
  var toolbarProps = {
    showDescription: props.show_description,
    items: props.toolbarItems,
    customItems: props.customToolbarItems
  };
  var language = props.locale || "en";
  var currentAppLocale = _languageProvider["default"][language];
  return /*#__PURE__*/_react["default"].createElement(_core.DndContext, {
    sensors: sensors,
    collisionDetection: _core.closestCenter,
    onDragStart: handleDragStart,
    onDragEnd: handleDragEnd,
    onDragCancel: handleDragCancel,
    measuring: {
      droppable: {
        strategy: _core.MeasuringStrategy.Always
      }
    }
  }, /*#__PURE__*/_react["default"].createElement(_reactIntl.IntlProvider, {
    locale: currentAppLocale.locale,
    messages: currentAppLocale.messages
  }, /*#__PURE__*/_react["default"].createElement("div", {
    className: "react-form-builder clearfix"
  }, /*#__PURE__*/_react["default"].createElement("div", {
    className: "form-builder-container"
  }, /*#__PURE__*/_react["default"].createElement(_preview["default"], {
    files: props.files,
    manualEditModeOff: manualEditModeOff,
    showCorrectColumn: props.showCorrectColumn,
    parent: _this,
    data: props.data,
    url: props.url,
    saveUrl: props.saveSaveUrl,
    onLoad: props.onLoad,
    onPost: props.onPost,
    editModeOn: editModeOn,
    editMode: editMode,
    variables: props.variables,
    registry: _registry["default"],
    editElement: editElement,
    renderEditForm: props.renderEditForm,
    saveAlways: props.saveAlways
  }), /*#__PURE__*/_react["default"].createElement(_toolbar["default"], toolbarProps))), /*#__PURE__*/_react["default"].createElement(_core.DragOverlay, {
    dropAnimation: dropAnimation
  }, activeItem ? /*#__PURE__*/_react["default"].createElement("div", {
    style: {
      opacity: 0.8,
      cursor: "grabbing",
      backgroundColor: "white",
      padding: "8px 12px",
      borderRadius: "4px",
      boxShadow: "0 4px 8px rgba(0,0,0,0.2)",
      transform: "rotate(-2deg)"
    }
  }, ((_activeItem$toolbarDa = activeItem.toolbarData) === null || _activeItem$toolbarDa === void 0 ? void 0 : _activeItem$toolbarDa.name) || ((_activeItem$data = activeItem.data) === null || _activeItem$data === void 0 ? void 0 : _activeItem$data.text) || "Item") : null)));
};

/* ---------------- FORM GENERATOR ---------------- */

var ReactFormGenerator = exports.ReactFormGenerator = function ReactFormGenerator(props) {
  var language = props.locale || "en";
  var currentAppLocale = _languageProvider["default"][language];
  return /*#__PURE__*/_react["default"].createElement(_reactIntl.IntlProvider, {
    locale: currentAppLocale.locale,
    messages: currentAppLocale.messages
  }, /*#__PURE__*/_react["default"].createElement(_form["default"], props));
};

/* ---------------- EXPORTS ---------------- */

var FormBuilders = {
  ReactFormBuilder: ReactFormBuilder,
  ReactFormGenerator: ReactFormGenerator,
  ElementStore: _store["default"],
  Registry: _registry["default"]
};
var _default = exports["default"] = FormBuilders;