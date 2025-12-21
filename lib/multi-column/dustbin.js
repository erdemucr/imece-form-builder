"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _objectWithoutProperties2 = _interopRequireDefault(require("@babel/runtime/helpers/objectWithoutProperties"));
var _extends2 = _interopRequireDefault(require("@babel/runtime/helpers/extends"));
var _react = _interopRequireDefault(require("react"));
var _core = require("@dnd-kit/core");
var _formElements = _interopRequireDefault(require("../form-elements"));
var _ItemTypes = _interopRequireDefault(require("../ItemTypes"));
var _customElement = _interopRequireDefault(require("../form-elements/custom-element"));
var _registry = _interopRequireDefault(require("../stores/registry"));
var _excluded = ["id", "col", "items", "parentIndex", "data", "getDataById", "onDropSuccess", "setAsChild"];
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
  return /*#__PURE__*/_react["default"].createElement(Element, (0, _extends2["default"])({}, props, {
    key: "form_".concat(item.id),
    data: item
  }));
}
function getStyle(backgroundColor) {
  return {
    border: "1px solid rgba(0,0,0,0.2)",
    minHeight: "2rem",
    minWidth: "7rem",
    width: "100%",
    backgroundColor: backgroundColor,
    padding: 0,
    "float": "left"
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
  var _active$data;
  var id = _ref.id,
    col = _ref.col,
    items = _ref.items,
    parentIndex = _ref.parentIndex,
    data = _ref.data,
    getDataById = _ref.getDataById,
    onDropSuccess = _ref.onDropSuccess,
    setAsChild = _ref.setAsChild,
    rest = (0, _objectWithoutProperties2["default"])(_ref, _excluded);
  var item = getDataById(items[col]);
  var _useDroppable = (0, _core.useDroppable)({
      id: id,
      data: {
        col: col,
        parentIndex: parentIndex,
        containerData: data
      }
    }),
    isOver = _useDroppable.isOver,
    setNodeRef = _useDroppable.setNodeRef,
    active = _useDroppable.active;
  var draggedItem = active === null || active === void 0 || (_active$data = active.data) === null || _active$data === void 0 ? void 0 : _active$data.current;
  var sameCard = draggedItem && draggedItem.parentIndex === parentIndex;
  var backgroundColor = "rgba(0, 0, 0, .03)";
  if (!sameCard && isOver && draggedItem && !isContainer(draggedItem)) {
    backgroundColor = "#F7F589";
  }
  var element = getElement(item, rest);
  return /*#__PURE__*/_react["default"].createElement("div", {
    ref: setNodeRef,
    style: getStyle(sameCard ? "rgba(0,0,0,.03)" : backgroundColor)
  }, !element && /*#__PURE__*/_react["default"].createElement("span", null, "Drop your element here"), element);
};
var _default = exports["default"] = Dustbin;