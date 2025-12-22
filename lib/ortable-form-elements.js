"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = exports.SortableItem = exports.SortableElement = exports.PlaceHolder = void 0;
var _extends2 = _interopRequireDefault(require("@babel/runtime/helpers/extends"));
var _defineProperty2 = _interopRequireDefault(require("@babel/runtime/helpers/defineProperty"));
var _objectWithoutProperties2 = _interopRequireDefault(require("@babel/runtime/helpers/objectWithoutProperties"));
var _react = _interopRequireDefault(require("react"));
var _core = require("@dnd-kit/core");
var _utilities = require("@dnd-kit/utilities");
var _excluded = ["id", "index", "isDraggable", "data", "moveCard", "insertCard"],
  _excluded2 = ["id", "children", "isDraggable", "data", "index"];
function ownKeys(e, r) { var t = Object.keys(e); if (Object.getOwnPropertySymbols) { var o = Object.getOwnPropertySymbols(e); r && (o = o.filter(function (r) { return Object.getOwnPropertyDescriptor(e, r).enumerable; })), t.push.apply(t, o); } return t; }
function _objectSpread(e) { for (var r = 1; r < arguments.length; r++) { var t = null != arguments[r] ? arguments[r] : {}; r % 2 ? ownKeys(Object(t), !0).forEach(function (r) { (0, _defineProperty2["default"])(e, r, t[r]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys(Object(t)).forEach(function (r) { Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(t, r)); }); } return e; }
// SortableElement HOC (Higher Order Component) - Ana export
var SortableElement = exports.SortableElement = function SortableElement(WrappedComponent) {
  return function SortableWrapper(props) {
    var id = props.id,
      index = props.index,
      _props$isDraggable = props.isDraggable,
      isDraggable = _props$isDraggable === void 0 ? true : _props$isDraggable,
      data = props.data,
      moveCard = props.moveCard,
      insertCard = props.insertCard,
      restProps = (0, _objectWithoutProperties2["default"])(props, _excluded);
    var _useSortable = (0, _core.useSortable)({
        id: (id === null || id === void 0 ? void 0 : id.toString()) || "sortable-".concat(Date.now()),
        disabled: !isDraggable,
        data: _objectSpread({
          type: "FORM_ELEMENT",
          index: index,
          id: id,
          data: data,
          moveCard: moveCard,
          insertCard: insertCard
        }, restProps)
      }),
      attributes = _useSortable.attributes,
      listeners = _useSortable.listeners,
      setNodeRef = _useSortable.setNodeRef,
      transform = _useSortable.transform,
      transition = _useSortable.transition,
      isDragging = _useSortable.isDragging,
      isOver = _useSortable.isOver,
      over = _useSortable.over;
    var style = {
      transform: _utilities.CSS.Translate.toString(transform),
      transition: transition || undefined,
      opacity: isDragging ? 0.5 : 1,
      cursor: isDraggable ? isDragging ? "grabbing" : "grab" : "default",
      position: "relative",
      zIndex: isDragging ? 1000 : 1
    };
    return /*#__PURE__*/_react["default"].createElement("div", (0, _extends2["default"])({
      ref: setNodeRef,
      style: style
    }, attributes, listeners, {
      className: "sortable-element",
      "data-sortable-id": id,
      "data-index": index
    }), /*#__PURE__*/_react["default"].createElement(WrappedComponent, (0, _extends2["default"])({}, restProps, {
      id: id,
      index: index,
      data: data,
      isDragging: isDragging,
      isOver: isOver,
      dragAttributes: attributes,
      dragListeners: listeners
    })));
  };
};

// Direkt kullanılabilir SortableItem bileşeni
var SortableItem = exports.SortableItem = function SortableItem(props) {
  var id = props.id,
    children = props.children,
    _props$isDraggable2 = props.isDraggable,
    isDraggable = _props$isDraggable2 === void 0 ? true : _props$isDraggable2,
    data = props.data,
    index = props.index,
    restProps = (0, _objectWithoutProperties2["default"])(props, _excluded2);
  var _useSortable2 = (0, _core.useSortable)({
      id: (id === null || id === void 0 ? void 0 : id.toString()) || "item-".concat(Date.now()),
      disabled: !isDraggable,
      data: _objectSpread({
        type: "ITEM",
        index: index,
        id: id,
        data: data
      }, restProps)
    }),
    attributes = _useSortable2.attributes,
    listeners = _useSortable2.listeners,
    setNodeRef = _useSortable2.setNodeRef,
    transform = _useSortable2.transform,
    transition = _useSortable2.transition,
    isDragging = _useSortable2.isDragging;
  var style = {
    transform: _utilities.CSS.Translate.toString(transform),
    transition: transition || undefined,
    opacity: isDragging ? 0.5 : 1,
    cursor: isDraggable ? isDragging ? "grabbing" : "grab" : "default"
  };
  return /*#__PURE__*/_react["default"].createElement("div", (0, _extends2["default"])({
    ref: setNodeRef,
    style: style
  }, attributes, listeners, {
    className: "sortable-item"
  }), typeof children === "function" ? children({
    isDragging: isDragging,
    attributes: attributes,
    listeners: listeners
  }) : children);
};

// PlaceHolder bileşeni - Ayrı bir dosya olabilir ama burada export ediyoruz
var PlaceHolder = exports.PlaceHolder = function PlaceHolder(props) {
  var id = props.id,
    show = props.show,
    index = props.index,
    moveCard = props.moveCard,
    insertCard = props.insertCard,
    customStyle = props.style,
    children = props.children,
    _props$className = props.className,
    className = _props$className === void 0 ? "" : _props$className;
  var _useDroppable = (0, _core.useDroppable)({
      id: id || "placeholder-".concat(index),
      data: {
        type: "PLACEHOLDER",
        index: index,
        moveCard: moveCard,
        insertCard: insertCard
      }
    }),
    setNodeRef = _useDroppable.setNodeRef,
    isOver = _useDroppable.isOver;
  var defaultStyle = {
    minHeight: "60px",
    border: "2px ".concat(isOver ? "dashed #007bff" : "dashed #ccc"),
    borderRadius: "4px",
    margin: "8px 0",
    padding: "16px",
    backgroundColor: isOver ? "rgba(0, 123, 255, 0.05)" : "transparent",
    transition: "all 0.2s ease",
    textAlign: "center",
    color: "#6c757d",
    cursor: "pointer"
  };
  if (!show) return null;
  var handleClick = function handleClick(e) {
    if (insertCard && e) {
      e.preventDefault();
      // Boş placeholder'a tıklanırsa yeni öğe eklemek için kullanılabilir
    }
  };
  return /*#__PURE__*/_react["default"].createElement("div", {
    ref: setNodeRef,
    style: _objectSpread(_objectSpread({}, defaultStyle), customStyle),
    className: "form-place-holder ".concat(className),
    "data-placeholder-index": index,
    onClick: handleClick
  }, children || /*#__PURE__*/_react["default"].createElement(_react["default"].Fragment, null, /*#__PURE__*/_react["default"].createElement("i", {
    className: "fas fa-plus-circle",
    style: {
      marginRight: "8px"
    }
  }), "Drop form elements here"));
};

// Varsayılan export - Eski kodla uyumluluk için
var defaultExport = {
  SortableElement: SortableElement,
  SortableItem: SortableItem,
  PlaceHolder: PlaceHolder
};
var _default = exports["default"] = defaultExport;