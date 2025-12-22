"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = exports.createDraggableCard = exports.SortableItem = exports.SortableElement = exports.PlaceHolder = exports.DraggableDropCard = exports.DraggableCard = void 0;
exports.makeSortable = makeSortable;
exports.withDraggable = void 0;
var _extends2 = _interopRequireDefault(require("@babel/runtime/helpers/extends"));
var _defineProperty2 = _interopRequireDefault(require("@babel/runtime/helpers/defineProperty"));
var _typeof2 = _interopRequireDefault(require("@babel/runtime/helpers/typeof"));
var _objectWithoutProperties2 = _interopRequireDefault(require("@babel/runtime/helpers/objectWithoutProperties"));
var _react = _interopRequireDefault(require("react"));
var _propTypes = _interopRequireDefault(require("prop-types"));
var _sortable = require("@dnd-kit/sortable");
var _utilities = require("@dnd-kit/utilities");
var _core = require("@dnd-kit/core");
var _excluded = ["index", "id", "moveCard", "seq", "component", "data", "setAsChild", "parentIndex", "col", "isDraggable", "style"],
  _excluded2 = ["index", "id", "moveCard", "seq", "component", "data", "setAsChild", "parentIndex", "col", "isDraggable", "acceptTypes", "children"],
  _excluded3 = ["id", "index", "data", "isDraggable", "dragType"],
  _excluded4 = ["id", "index", "isDraggable", "data", "moveCard", "insertCard"],
  _excluded5 = ["id", "children", "isDraggable", "data", "index"]; // useDraggable ve useDroppable hook'larını doğru yerde import et
function ownKeys(e, r) { var t = Object.keys(e); if (Object.getOwnPropertySymbols) { var o = Object.getOwnPropertySymbols(e); r && (o = o.filter(function (r) { return Object.getOwnPropertyDescriptor(e, r).enumerable; })), t.push.apply(t, o); } return t; }
function _objectSpread(e) { for (var r = 1; r < arguments.length; r++) { var t = null != arguments[r] ? arguments[r] : {}; r % 2 ? ownKeys(Object(t), !0).forEach(function (r) { (0, _defineProperty2["default"])(e, r, t[r]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys(Object(t)).forEach(function (r) { Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(t, r)); }); } return e; }
var style = {
  border: "1px dashed gray",
  padding: "0.5rem 1rem",
  marginBottom: ".5rem",
  backgroundColor: "white",
  cursor: "pointer"
};
var DebugComponent = function DebugComponent(_ref) {
  var data = _ref.data,
    element = _ref.element,
    error = _ref.error;
  return /*#__PURE__*/_react["default"].createElement("div", {
    style: {
      border: "2px dashed #ff6b6b",
      padding: "15px",
      marginBottom: "10px",
      backgroundColor: "#ffeaea",
      color: "#d63031"
    }
  }, /*#__PURE__*/_react["default"].createElement("h4", {
    style: {
      margin: "0 0 10px 0"
    }
  }, "\u26A0\uFE0F Component Error"), /*#__PURE__*/_react["default"].createElement("p", null, /*#__PURE__*/_react["default"].createElement("strong", null, "Element Type:"), " ", element || "undefined"), /*#__PURE__*/_react["default"].createElement("p", null, /*#__PURE__*/_react["default"].createElement("strong", null, "Data ID:"), " ", data === null || data === void 0 ? void 0 : data.id), /*#__PURE__*/_react["default"].createElement("p", null, /*#__PURE__*/_react["default"].createElement("strong", null, "Available keys:"), " ", data ? Object.keys(data).join(", ") : "no data"), error && /*#__PURE__*/_react["default"].createElement("p", null, /*#__PURE__*/_react["default"].createElement("strong", null, "Error:"), " ", error), /*#__PURE__*/_react["default"].createElement("p", {
    style: {
      fontSize: "12px",
      marginTop: "10px"
    }
  }, "This component could not be loaded. Check console for details."));
};
DebugComponent.propTypes = {
  data: _propTypes["default"].object,
  element: _propTypes["default"].string,
  error: _propTypes["default"].string
};

// Önbellek: sonsuz döngüyü önlemek için
var componentCache = new WeakMap();
var DraggableCard = exports.DraggableCard = function DraggableCard(props) {
  var index = props.index,
    id = props.id,
    moveCard = props.moveCard,
    _props$seq = props.seq,
    seq = _props$seq === void 0 ? -1 : _props$seq,
    ComposedComponent = props.component,
    data = props.data,
    setAsChild = props.setAsChild,
    parentIndex = props.parentIndex,
    col = props.col,
    _props$isDraggable = props.isDraggable,
    isDraggable = _props$isDraggable === void 0 ? true : _props$isDraggable,
    _props$style = props.style,
    customStyle = _props$style === void 0 ? {} : _props$style,
    restProps = (0, _objectWithoutProperties2["default"])(props, _excluded);

  // DEBUG: Konsola bilgi yazdır
  if (process.env.NODE_ENV === "development") {
    console.log("🚨 DraggableCard DEBUG:", {
      id: id,
      index: index,
      data: data,
      element: data === null || data === void 0 ? void 0 : data.element,
      ComposedComponent: ComposedComponent,
      type: (0, _typeof2["default"])(ComposedComponent),
      isFunction: typeof ComposedComponent === "function"
    });
  }

  // ComposedComponent kontrolü
  if (!ComposedComponent || typeof ComposedComponent !== "function") {
    console.error("❌ DraggableCard received invalid component:", {
      id: id,
      data: data,
      element: data === null || data === void 0 ? void 0 : data.element,
      ComposedComponent: ComposedComponent,
      availableProps: Object.keys(props)
    });

    // Fallback bileşeni göster
    return /*#__PURE__*/_react["default"].createElement(DebugComponent, {
      data: data,
      element: data === null || data === void 0 ? void 0 : data.element
    });
  }
  var _useSortable = (0, _sortable.useSortable)({
      id: (id === null || id === void 0 ? void 0 : id.toString()) || "card-".concat(Date.now()),
      disabled: !isDraggable,
      data: {
        type: "FORM_ELEMENT",
        index: index,
        id: id,
        data: data,
        setAsChild: setAsChild,
        parentIndex: parentIndex,
        col: col,
        isDraggable: isDraggable
      }
    }),
    attributes = _useSortable.attributes,
    listeners = _useSortable.listeners,
    setNodeRef = _useSortable.setNodeRef,
    transform = _useSortable.transform,
    transition = _useSortable.transition,
    isDragging = _useSortable.isDragging,
    isOver = _useSortable.isOver,
    over = _useSortable.over;
  var dragStyle = _objectSpread({
    transform: _utilities.CSS.Translate.toString(transform),
    transition: transition || undefined,
    opacity: isDragging ? 0.5 : 1,
    cursor: isDraggable ? isDragging ? "grabbing" : "grab" : "default",
    position: "relative",
    zIndex: isDragging ? 1000 : 1
  }, customStyle);
  try {
    var _ref2, _ref3, _ref4, _data$element;
    return /*#__PURE__*/_react["default"].createElement("div", (0, _extends2["default"])({
      ref: setNodeRef,
      style: dragStyle
    }, attributes, listeners, {
      className: "draggable-card",
      "data-element-type": (_ref2 = (_ref3 = (_ref4 = (_data$element = data === null || data === void 0 ? void 0 : data.element) !== null && _data$element !== void 0 ? _data$element : data === null || data === void 0 ? void 0 : data.type) !== null && _ref4 !== void 0 ? _ref4 : ComposedComponent === null || ComposedComponent === void 0 ? void 0 : ComposedComponent.displayName) !== null && _ref3 !== void 0 ? _ref3 : ComposedComponent === null || ComposedComponent === void 0 ? void 0 : ComposedComponent.name) !== null && _ref2 !== void 0 ? _ref2 : "unknown",
      "data-card-id": id
    }), /*#__PURE__*/_react["default"].createElement(ComposedComponent, (0, _extends2["default"])({}, restProps, {
      index: index,
      id: id,
      moveCard: moveCard,
      seq: seq,
      data: data,
      setAsChild: setAsChild,
      parentIndex: parentIndex,
      col: col,
      isDragging: isDragging,
      isOver: isOver,
      dragAttributes: attributes,
      dragListeners: listeners
    })));
  } catch (error) {
    console.error("💥 Error rendering ComposedComponent:", error);
    return /*#__PURE__*/_react["default"].createElement(DebugComponent, {
      data: data,
      element: data === null || data === void 0 ? void 0 : data.element,
      error: error.message
    });
  }
};
DraggableCard.propTypes = {
  component: _propTypes["default"].elementType.isRequired,
  index: _propTypes["default"].number.isRequired,
  id: _propTypes["default"].any.isRequired,
  moveCard: _propTypes["default"].func,
  seq: _propTypes["default"].number,
  data: _propTypes["default"].object,
  setAsChild: _propTypes["default"].func,
  parentIndex: _propTypes["default"].number,
  col: _propTypes["default"].number,
  isDraggable: _propTypes["default"].bool,
  style: _propTypes["default"].object
};
DraggableCard.defaultProps = {
  seq: -1,
  moveCard: function moveCard() {},
  isDraggable: true,
  style: {}
};

// Alternatif: useDraggable ve useDroppable kullanan versiyon
var DraggableDropCard = exports.DraggableDropCard = function DraggableDropCard(props) {
  var index = props.index,
    id = props.id,
    moveCard = props.moveCard,
    _props$seq2 = props.seq,
    seq = _props$seq2 === void 0 ? -1 : _props$seq2,
    ComposedComponent = props.component,
    data = props.data,
    setAsChild = props.setAsChild,
    parentIndex = props.parentIndex,
    col = props.col,
    _props$isDraggable2 = props.isDraggable,
    isDraggable = _props$isDraggable2 === void 0 ? true : _props$isDraggable2,
    _props$acceptTypes = props.acceptTypes,
    acceptTypes = _props$acceptTypes === void 0 ? ["CARD", "BOX"] : _props$acceptTypes,
    children = props.children,
    restProps = (0, _objectWithoutProperties2["default"])(props, _excluded2);
  if (!ComposedComponent) {
    console.error("❌ DraggableDropCard received undefined component", props);
    return null;
  }
  var _useDraggable = (0, _core.useDraggable)({
      id: id.toString(),
      disabled: !isDraggable,
      data: {
        type: "CARD",
        index: index,
        id: id,
        data: data,
        setAsChild: setAsChild,
        parentIndex: parentIndex,
        col: col,
        isDraggable: isDraggable
      }
    }),
    attributes = _useDraggable.attributes,
    listeners = _useDraggable.listeners,
    setDragRef = _useDraggable.setNodeRef,
    transform = _useDraggable.transform,
    isDragging = _useDraggable.isDragging;
  var _useDroppable = (0, _core.useDroppable)({
      id: "drop-".concat(id),
      data: {
        type: "DROP_ZONE",
        index: index,
        id: id,
        acceptTypes: acceptTypes
      }
    }),
    setDropRef = _useDroppable.setNodeRef,
    isOver = _useDroppable.isOver;

  // Hem drag hem drop için ref birleştirme
  var setCombinedRef = function setCombinedRef(node) {
    setDragRef(node);
    setDropRef(node);
  };
  var dragStyle = _objectSpread(_objectSpread({}, style), {}, {
    transform: _utilities.CSS.Translate.toString(transform),
    opacity: isDragging ? 0.5 : isOver ? 0.8 : 1,
    cursor: isDraggable ? isDragging ? "grabbing" : "grab" : "default",
    position: "relative",
    zIndex: isDragging ? 1000 : isOver ? 500 : 1,
    borderColor: isOver ? "#007bff" : "gray",
    borderStyle: isOver ? "solid" : "dashed"
  });
  return /*#__PURE__*/_react["default"].createElement("div", (0, _extends2["default"])({
    ref: setCombinedRef,
    style: dragStyle
  }, attributes, listeners), /*#__PURE__*/_react["default"].createElement(ComposedComponent, (0, _extends2["default"])({}, restProps, {
    index: index,
    id: id,
    moveCard: moveCard,
    seq: seq,
    data: data,
    setAsChild: setAsChild,
    parentIndex: parentIndex,
    col: col,
    isDragging: isDragging,
    isOver: isOver,
    dragAttributes: attributes,
    dragListeners: listeners,
    style: {
      opacity: isDragging ? 0.7 : 1
    }
  }), children));
};

// Yardımcı HOC: Herhangi bir bileşeni draggable yapar
var withDraggable = exports.withDraggable = function withDraggable(WrappedComponent) {
  var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
  return function DraggableWrapper(props) {
    var id = props.id,
      index = props.index,
      data = props.data,
      _props$isDraggable3 = props.isDraggable,
      isDraggable = _props$isDraggable3 === void 0 ? true : _props$isDraggable3,
      _props$dragType = props.dragType,
      dragType = _props$dragType === void 0 ? "CARD" : _props$dragType,
      restProps = (0, _objectWithoutProperties2["default"])(props, _excluded3);
    var _useDraggable2 = (0, _core.useDraggable)({
        id: (id === null || id === void 0 ? void 0 : id.toString()) || "draggable-".concat(Date.now()),
        disabled: !isDraggable,
        data: _objectSpread({
          type: dragType,
          index: index,
          id: id,
          data: data
        }, options.data)
      }),
      attributes = _useDraggable2.attributes,
      listeners = _useDraggable2.listeners,
      setNodeRef = _useDraggable2.setNodeRef,
      transform = _useDraggable2.transform,
      isDragging = _useDraggable2.isDragging;
    var dragStyle = {
      transform: _utilities.CSS.Translate.toString(transform),
      opacity: isDragging ? 0.5 : 1,
      cursor: isDraggable ? isDragging ? "grabbing" : "grab" : "default",
      transition: transform ? "transform 200ms ease" : undefined
    };
    return /*#__PURE__*/_react["default"].createElement("div", (0, _extends2["default"])({
      ref: setNodeRef,
      style: dragStyle
    }, attributes, listeners), /*#__PURE__*/_react["default"].createElement(WrappedComponent, (0, _extends2["default"])({}, restProps, {
      isDragging: isDragging,
      dragAttributes: attributes,
      dragListeners: listeners
    })));
  };
};

// SortableElement HOC (Alternatif) - Bu ana export olmalı
var SortableElement = exports.SortableElement = function SortableElement(WrappedComponent) {
  if (!WrappedComponent) {
    console.error("❌ SortableElement called with undefined component");
    var ErrorComponent = function ErrorComponent() {
      return /*#__PURE__*/_react["default"].createElement("div", {
        style: {
          color: "red",
          padding: "10px",
          border: "1px solid red"
        }
      }, "Error: Invalid component");
    };
    return ErrorComponent;
  }

  // Önbellekte var mı kontrol et
  if (componentCache.has(WrappedComponent)) {
    return componentCache.get(WrappedComponent);
  }
  var SortableWrapper = function SortableWrapper(props) {
    var id = props.id,
      index = props.index,
      _props$isDraggable4 = props.isDraggable,
      isDraggable = _props$isDraggable4 === void 0 ? true : _props$isDraggable4,
      data = props.data,
      moveCard = props.moveCard,
      insertCard = props.insertCard,
      restProps = (0, _objectWithoutProperties2["default"])(props, _excluded4);
    var _useSortable2 = (0, _sortable.useSortable)({
        id: (id === null || id === void 0 ? void 0 : id.toString()) || "sortable-".concat(Date.now()),
        disabled: !isDraggable,
        data: {
          type: "FORM_ELEMENT",
          index: index,
          id: id,
          data: data,
          moveCard: moveCard,
          insertCard: insertCard
        }
      }),
      attributes = _useSortable2.attributes,
      listeners = _useSortable2.listeners,
      setNodeRef = _useSortable2.setNodeRef,
      transform = _useSortable2.transform,
      transition = _useSortable2.transition,
      isDragging = _useSortable2.isDragging,
      isOver = _useSortable2.isOver;
    var sortableStyle = {
      transform: _utilities.CSS.Translate.toString(transform),
      transition: transition || undefined,
      opacity: isDragging ? 0.5 : 1,
      cursor: isDraggable ? isDragging ? "grabbing" : "grab" : "default",
      position: "relative",
      zIndex: isDragging ? 1000 : 1
    };
    return /*#__PURE__*/_react["default"].createElement("div", (0, _extends2["default"])({
      ref: setNodeRef,
      style: sortableStyle
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
  SortableWrapper.displayName = "Sortable".concat(WrappedComponent.displayName || WrappedComponent.name || "Component");

  // Önbelleğe ekle
  componentCache.set(WrappedComponent, SortableWrapper);
  return SortableWrapper;
};

// SortableItem bileşeni
var SortableItem = exports.SortableItem = function SortableItem(props) {
  var id = props.id,
    children = props.children,
    _props$isDraggable5 = props.isDraggable,
    isDraggable = _props$isDraggable5 === void 0 ? true : _props$isDraggable5,
    data = props.data,
    index = props.index,
    restProps = (0, _objectWithoutProperties2["default"])(props, _excluded5);
  var _useSortable3 = (0, _sortable.useSortable)({
      id: (id === null || id === void 0 ? void 0 : id.toString()) || "item-".concat(Date.now()),
      disabled: !isDraggable,
      data: _objectSpread({
        type: "ITEM",
        index: index,
        id: id,
        data: data
      }, restProps)
    }),
    attributes = _useSortable3.attributes,
    listeners = _useSortable3.listeners,
    setNodeRef = _useSortable3.setNodeRef,
    transform = _useSortable3.transform,
    transition = _useSortable3.transition,
    isDragging = _useSortable3.isDragging;
  var itemStyle = {
    transform: _utilities.CSS.Translate.toString(transform),
    transition: transition || undefined,
    opacity: isDragging ? 0.5 : 1,
    cursor: isDraggable ? isDragging ? "grabbing" : "grab" : "default"
  };
  return /*#__PURE__*/_react["default"].createElement("div", (0, _extends2["default"])({
    ref: setNodeRef,
    style: itemStyle
  }, attributes, listeners, {
    className: "sortable-item"
  }), typeof children === "function" ? children({
    isDragging: isDragging,
    attributes: attributes,
    listeners: listeners
  }) : children);
};

// PlaceHolder bileşeni
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
  var _useDroppable2 = (0, _core.useDroppable)({
      id: id || "placeholder-".concat(index),
      data: {
        type: "PLACEHOLDER",
        index: index,
        moveCard: moveCard,
        insertCard: insertCard
      }
    }),
    setNodeRef = _useDroppable2.setNodeRef,
    isOver = _useDroppable2.isOver;
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
  return /*#__PURE__*/_react["default"].createElement("div", {
    ref: setNodeRef,
    style: _objectSpread(_objectSpread({}, defaultStyle), customStyle),
    className: "form-place-holder ".concat(className),
    "data-placeholder-index": index
  }, children || /*#__PURE__*/_react["default"].createElement(_react["default"].Fragment, null, /*#__PURE__*/_react["default"].createElement("i", {
    className: "fas fa-plus-circle",
    style: {
      marginRight: "8px"
    }
  }), "Drop form elements here"));
};

// Ana factory fonksiyonu - sonsuz döngüyü önlemek için önbellek kullanıyor
var createDraggableCard = exports.createDraggableCard = function createDraggableCard(ComposedComponent) {
  var _ComposedComponent$di, _ComposedComponent$na;
  // Önbellekte var mı kontrol et
  if (componentCache.has(ComposedComponent)) {
    return componentCache.get(ComposedComponent);
  }
  if (!ComposedComponent) {
    console.error("❌ createDraggableCard called with undefined component");
    var SafeFallback = function SafeDraggableCard(props) {
      console.warn("⚠️ SafeDraggableCard rendering (missing component)");
      return /*#__PURE__*/_react["default"].createElement(DraggableCard, (0, _extends2["default"])({}, props, {
        component: DebugComponent,
        data: _objectSpread(_objectSpread({}, props.data), {}, {
          error: "Missing component"
        })
      }));
    };
    SafeFallback.displayName = "SafeDraggableCard";
    componentCache.set(ComposedComponent, SafeFallback);
    return SafeFallback;
  }

  // Bileşen zaten draggable mı kontrol et
  if ((_ComposedComponent$di = ComposedComponent.displayName) !== null && _ComposedComponent$di !== void 0 && _ComposedComponent$di.includes("Draggable") || (_ComposedComponent$na = ComposedComponent.name) !== null && _ComposedComponent$na !== void 0 && _ComposedComponent$na.includes("Draggable") || componentCache.has(ComposedComponent)) {
    console.warn("⚠️ Component is already draggable:", ComposedComponent.name);
    componentCache.set(ComposedComponent, ComposedComponent);
    return ComposedComponent;
  }
  var WrappedDraggableCard = function WrappedDraggableCard(props) {
    return /*#__PURE__*/_react["default"].createElement(DraggableCard, (0, _extends2["default"])({}, props, {
      component: ComposedComponent
    }));
  };

  // Display name ayarla
  WrappedDraggableCard.displayName = "Draggable".concat(ComposedComponent.displayName || ComposedComponent.name || "Component");

  // Orijinal bileşeni sakla (forward props için)
  WrappedDraggableCard.OriginalComponent = ComposedComponent;

  // Önbelleğe ekle
  componentCache.set(ComposedComponent, WrappedDraggableCard);
  return WrappedDraggableCard;
};

// Kullanım kolaylığı için yardımcı fonksiyon
function makeSortable(Component) {
  var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
  return createDraggableCard(Component);
}

// TÜM EXPORT'LARI TEK BİR YERDE YAP
// Default export olarak da export et
var _default = exports["default"] = createDraggableCard;