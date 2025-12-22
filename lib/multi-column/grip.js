"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = exports.GripIcon = exports.DragHandle = void 0;
var _extends2 = _interopRequireDefault(require("@babel/runtime/helpers/extends"));
var _defineProperty2 = _interopRequireDefault(require("@babel/runtime/helpers/defineProperty"));
var _objectWithoutProperties2 = _interopRequireDefault(require("@babel/runtime/helpers/objectWithoutProperties"));
var _react = _interopRequireDefault(require("react"));
var _core = require("@dnd-kit/core");
var _utilities = require("@dnd-kit/utilities");
var _excluded = ["data", "index", "onDestroy", "setAsChild", "getDataById", "isDraggable", "dragType", "className", "style", "children"],
  _excluded2 = ["id", "data", "children", "className"];
function ownKeys(e, r) { var t = Object.keys(e); if (Object.getOwnPropertySymbols) { var o = Object.getOwnPropertySymbols(e); r && (o = o.filter(function (r) { return Object.getOwnPropertyDescriptor(e, r).enumerable; })), t.push.apply(t, o); } return t; }
function _objectSpread(e) { for (var r = 1; r < arguments.length; r++) { var t = null != arguments[r] ? arguments[r] : {}; r % 2 ? ownKeys(Object(t), !0).forEach(function (r) { (0, _defineProperty2["default"])(e, r, t[r]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys(Object(t)).forEach(function (r) { Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(t, r)); }); } return e; }
var Grip = function Grip(props) {
  var _data$id;
  var data = props.data,
    index = props.index,
    onDestroy = props.onDestroy,
    setAsChild = props.setAsChild,
    getDataById = props.getDataById,
    _props$isDraggable = props.isDraggable,
    isDraggable = _props$isDraggable === void 0 ? true : _props$isDraggable,
    _props$dragType = props.dragType,
    dragType = _props$dragType === void 0 ? "BOX" : _props$dragType,
    _props$className = props.className,
    className = _props$className === void 0 ? "" : _props$className,
    _props$style = props.style,
    customStyle = _props$style === void 0 ? {} : _props$style,
    children = props.children,
    restProps = (0, _objectWithoutProperties2["default"])(props, _excluded);
  var _useDraggable = (0, _core.useDraggable)({
      id: (data === null || data === void 0 || (_data$id = data.id) === null || _data$id === void 0 ? void 0 : _data$id.toString()) || "grip-".concat(Date.now()),
      disabled: !isDraggable,
      data: _objectSpread({
        type: dragType,
        index: data !== null && data !== void 0 && data.parentId ? -1 : index,
        parentIndex: data === null || data === void 0 ? void 0 : data.parentIndex,
        id: data === null || data === void 0 ? void 0 : data.id,
        col: data === null || data === void 0 ? void 0 : data.col,
        onDestroy: onDestroy,
        setAsChild: setAsChild,
        getDataById: getDataById,
        data: data
      }, restProps.data)
    }),
    attributes = _useDraggable.attributes,
    listeners = _useDraggable.listeners,
    setNodeRef = _useDraggable.setNodeRef,
    transform = _useDraggable.transform,
    isDragging = _useDraggable.isDragging,
    active = _useDraggable.active;
  var gripStyle = _objectSpread({
    cursor: isDraggable ? isDragging ? "grabbing" : "grab" : "default",
    opacity: isDragging ? 0.4 : 1,
    transform: _utilities.CSS.Translate.toString(transform),
    transition: isDragging ? "none" : "transform 200ms ease, opacity 200ms ease",
    display: "inline-flex",
    alignItems: "center",
    justifyContent: "center"
  }, customStyle);

  // Eğer data yoksa veya draggable değilse render etme
  if (!data) {
    console.warn("Grip component received no data");
    return null;
  }
  return /*#__PURE__*/_react["default"].createElement("div", (0, _extends2["default"])({
    ref: setNodeRef
  }, listeners, attributes, {
    className: "btn grip-handle ".concat(className, " ").concat(isDragging ? "is-dragging" : ""),
    style: gripStyle,
    title: isDraggable ? "Drag to move" : "Not draggable",
    "data-grip-id": data.id,
    "data-parent-id": data.parentId,
    "data-col-index": data.col
  }), children || /*#__PURE__*/_react["default"].createElement("i", {
    className: "fas fa-grip-vertical",
    "aria-hidden": "true"
  }));
};

// Yardımcı bileşen: Sadece drag handle olarak kullanım
var DragHandle = exports.DragHandle = function DragHandle(props) {
  var id = props.id,
    data = props.data,
    children = props.children,
    _props$className2 = props.className,
    className = _props$className2 === void 0 ? "drag-handle" : _props$className2,
    rest = (0, _objectWithoutProperties2["default"])(props, _excluded2);
  var _useDraggable2 = (0, _core.useDraggable)({
      id: (id === null || id === void 0 ? void 0 : id.toString()) || "drag-handle-".concat(Date.now()),
      data: data
    }),
    attributes = _useDraggable2.attributes,
    listeners = _useDraggable2.listeners,
    setNodeRef = _useDraggable2.setNodeRef,
    isDragging = _useDraggable2.isDragging;
  return /*#__PURE__*/_react["default"].createElement("div", (0, _extends2["default"])({
    ref: setNodeRef
  }, listeners, attributes, {
    className: "".concat(className, " ").concat(isDragging ? "dragging" : ""),
    style: {
      cursor: "grab",
      opacity: isDragging ? 0.7 : 1,
      display: "inline-flex",
      alignItems: "center"
    }
  }, rest), children || /*#__PURE__*/_react["default"].createElement("span", null, "\u22EE\u22EE"));
};

// Alternatif: Sadece görsel grip ikonu
var GripIcon = exports.GripIcon = function GripIcon(_ref) {
  var _ref$size = _ref.size,
    size = _ref$size === void 0 ? 16 : _ref$size,
    _ref$color = _ref.color,
    color = _ref$color === void 0 ? "#666" : _ref$color;
  return /*#__PURE__*/_react["default"].createElement("svg", {
    width: size,
    height: size,
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: color,
    strokeWidth: "2",
    strokeLinecap: "round",
    strokeLinejoin: "round"
  }, /*#__PURE__*/_react["default"].createElement("circle", {
    cx: "9",
    cy: "5",
    r: "1"
  }), /*#__PURE__*/_react["default"].createElement("circle", {
    cx: "9",
    cy: "12",
    r: "1"
  }), /*#__PURE__*/_react["default"].createElement("circle", {
    cx: "9",
    cy: "19",
    r: "1"
  }), /*#__PURE__*/_react["default"].createElement("circle", {
    cx: "15",
    cy: "5",
    r: "1"
  }), /*#__PURE__*/_react["default"].createElement("circle", {
    cx: "15",
    cy: "12",
    r: "1"
  }), /*#__PURE__*/_react["default"].createElement("circle", {
    cx: "15",
    cy: "19",
    r: "1"
  }));
};
var _default = exports["default"] = Grip;