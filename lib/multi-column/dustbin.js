"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _defineProperty2 = _interopRequireDefault(require("@babel/runtime/helpers/defineProperty"));
var _extends2 = _interopRequireDefault(require("@babel/runtime/helpers/extends"));
var _react = _interopRequireDefault(require("react"));
var _core = require("@dnd-kit/core");
var _formElements = _interopRequireDefault(require("../form-elements"));
var _ItemTypes = _interopRequireDefault(require("../ItemTypes"));
var _customElement = _interopRequireDefault(require("../form-elements/custom-element"));
var _registry = _interopRequireDefault(require("../stores/registry"));
function ownKeys(e, r) { var t = Object.keys(e); if (Object.getOwnPropertySymbols) { var o = Object.getOwnPropertySymbols(e); r && (o = o.filter(function (r) { return Object.getOwnPropertyDescriptor(e, r).enumerable; })), t.push.apply(t, o); } return t; }
function _objectSpread(e) { for (var r = 1; r < arguments.length; r++) { var t = null != arguments[r] ? arguments[r] : {}; r % 2 ? ownKeys(Object(t), !0).forEach(function (r) { (0, _defineProperty2["default"])(e, r, t[r]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys(Object(t)).forEach(function (r) { Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(t, r)); }); } return e; }
/* ---------------- helpers ---------------- */

function getCustomElement(item, props) {
  if (!item.component || typeof item.component !== "function") {
    item.component = _registry["default"].get(item.key);
    if (!item.component) {
      console.error("".concat(item.element, " was not registered"));
    }
  }
  return /*#__PURE__*/_react["default"].createElement(_customElement["default"], (0, _extends2["default"])({}, props, {
    mutable: false,
    key: "form_".concat(item.id),
    data: item
  }));
}
function getElement(item, props) {
  if (!item) return null;
  if (item.custom) return getCustomElement(item, props);
  var Element = _formElements["default"][item.element || item.key];
  if (!Element) {
    console.warn("Element ".concat(item.element || item.key, " not found in FormElements"));
    return null;
  }
  return /*#__PURE__*/_react["default"].createElement(Element, (0, _extends2["default"])({}, props, {
    key: "form_".concat(item.id),
    data: item
  }));
}
function getStyle(backgroundColor, isOver, sameCard) {
  return {
    border: "1px ".concat(isOver && !sameCard ? "dashed #007bff" : "solid rgba(0,0,0,0.2)"),
    minHeight: "2rem",
    minWidth: "7rem",
    width: "100%",
    backgroundColor: backgroundColor,
    padding: 0,
    "float": "left",
    transition: "background-color 0.2s ease, border 0.2s ease",
    position: "relative",
    outline: isOver && !sameCard ? "2px dashed #007bff" : "none",
    outlineOffset: "-2px"
  };
}

/**
 * 🔧 CUSTOM FIX
 * - fieldset
 * - _col_row
 * - isContainer flag
 */
function isContainer(item) {
  if (!item) return false;
  if (item.itemType !== _ItemTypes["default"].CARD) {
    var data = item.data;
    if (data) {
      if (data.isContainer) return true;
      if (data.field_name) {
        return data.field_name.indexOf("_col_row") > -1 || data.field_name.indexOf("fieldset") > -1;
      }
    }
  }
  return false;
}

/* ---------------- component ---------------- */

var Dustbin = function Dustbin(_ref) {
  var id = _ref.id,
    style = _ref.style,
    data = _ref.data,
    col = _ref.col,
    parentIndex = _ref.parentIndex,
    _ref$accept = _ref.accept,
    accept = _ref$accept === void 0 ? ["CARD", "BOX", "TOOLBAR_ITEM"] : _ref$accept,
    children = _ref.children;
  var _useDroppable = (0, _core.useDroppable)({
      id: id || "dustbin-".concat(Date.now()),
      data: {
        type: "DROP_ZONE",
        col: col,
        parentIndex: parentIndex,
        parentData: data,
        accept: accept
      }
    }),
    setNodeRef = _useDroppable.setNodeRef,
    isOver = _useDroppable.isOver,
    over = _useDroppable.over;
  var dropStyle = _objectSpread(_objectSpread({}, style), {}, {
    minHeight: "60px",
    border: "2px ".concat(isOver ? "dashed #007bff" : "dashed #e0e0e0"),
    borderRadius: "4px",
    padding: "10px",
    backgroundColor: isOver ? "rgba(0, 123, 255, 0.05)" : "transparent",
    transition: "all 0.2s ease"
  });
  return /*#__PURE__*/_react["default"].createElement("div", {
    ref: setNodeRef,
    style: dropStyle,
    className: "dustbin"
  }, children || /*#__PURE__*/_react["default"].createElement("div", {
    style: {
      textAlign: "center",
      color: "#999"
    }
  }, /*#__PURE__*/_react["default"].createElement("i", {
    className: "fas fa-plus",
    style: {
      marginRight: "8px"
    }
  }), "Drop here"));
};
var _default = exports["default"] = Dustbin;