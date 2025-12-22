"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _extends2 = _interopRequireDefault(require("@babel/runtime/helpers/extends"));
var _defineProperty2 = _interopRequireDefault(require("@babel/runtime/helpers/defineProperty"));
var _react = _interopRequireDefault(require("react"));
var _core = require("@dnd-kit/core");
var _utilities = require("@dnd-kit/utilities");
var _UUID = _interopRequireDefault(require("./UUID"));
function ownKeys(e, r) { var t = Object.keys(e); if (Object.getOwnPropertySymbols) { var o = Object.getOwnPropertySymbols(e); r && (o = o.filter(function (r) { return Object.getOwnPropertyDescriptor(e, r).enumerable; })), t.push.apply(t, o); } return t; }
function _objectSpread(e) { for (var r = 1; r < arguments.length; r++) { var t = null != arguments[r] ? arguments[r] : {}; r % 2 ? ownKeys(Object(t), !0).forEach(function (r) { (0, _defineProperty2["default"])(e, r, t[r]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys(Object(t)).forEach(function (r) { Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(t, r)); }); } return e; }
var ToolbarItem = function ToolbarItem(_ref) {
  var data = _ref.data,
    onCreate = _ref.onCreate,
    onClick = _ref.onClick;
  var _useDraggable = (0, _core.useDraggable)({
      id: "toolbar-".concat(data.key || data.name, "-").concat(_UUID["default"].uuid()),
      data: {
        type: "TOOLBAR_ITEM",
        toolbarData: data,
        onCreate: onCreate,
        isNewItem: true
      }
    }),
    attributes = _useDraggable.attributes,
    listeners = _useDraggable.listeners,
    setNodeRef = _useDraggable.setNodeRef,
    setActivatorNodeRef = _useDraggable.setActivatorNodeRef,
    transform = _useDraggable.transform,
    isDragging = _useDraggable.isDragging;
  var style = {
    transform: _utilities.CSS.Translate.toString(transform),
    opacity: isDragging ? 0.5 : 1,
    cursor: isDragging ? "grabbing" : "grab",
    transition: isDragging ? "none" : "transform 200ms ease, opacity 200ms ease",
    position: "relative"
  };
  var handleClick = function handleClick(e) {
    // Eğer sürükleme aktifse tıklamayı engelle
    if (isDragging) {
      e.preventDefault();
      return;
    }
    if (onClick) {
      onClick(e);
    }
    if (onCreate) {
      var newItem = _objectSpread({
        id: _UUID["default"].uuid(),
        element: data.element,
        text: data.name,
        "static": data["static"],
        required: data.required,
        bold: false,
        italic: false,
        content: data.content || ""
      }, data.defaultProps);
      onCreate(newItem);
    }
  };
  return /*#__PURE__*/_react["default"].createElement("li", {
    ref: setNodeRef,
    style: style,
    onClick: handleClick,
    className: "toolbar-item"
  }, /*#__PURE__*/_react["default"].createElement("div", (0, _extends2["default"])({
    ref: setActivatorNodeRef
  }, attributes, listeners, {
    style: {
      cursor: "move",
      display: "inline-flex",
      alignItems: "center",
      justifyContent: "center",
      padding: "4px",
      marginRight: "8px"
    },
    className: "drag-handle"
  }), /*#__PURE__*/_react["default"].createElement("i", {
    className: "fa fa-arrows",
    style: {
      fontSize: "12px"
    }
  })), /*#__PURE__*/_react["default"].createElement("i", {
    className: data.icon,
    style: {
      marginRight: "8px"
    }
  }), /*#__PURE__*/_react["default"].createElement("span", null, data.name));
};
var _default = exports["default"] = ToolbarItem;