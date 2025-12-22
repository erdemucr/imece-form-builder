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
var _excluded = ["id", "col", "items", "parentIndex", "data", "getDataById", "onDropSuccess", "setAsChild", "accept"];
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
  var _active$data;
  var id = _ref.id,
    col = _ref.col,
    items = _ref.items,
    parentIndex = _ref.parentIndex,
    data = _ref.data,
    getDataById = _ref.getDataById,
    onDropSuccess = _ref.onDropSuccess,
    setAsChild = _ref.setAsChild,
    _ref$accept = _ref.accept,
    accept = _ref$accept === void 0 ? ["CARD", "BOX", "TOOLBAR_ITEM"] : _ref$accept,
    rest = (0, _objectWithoutProperties2["default"])(_ref, _excluded);
  var item = getDataById(items[col]);
  var _useDroppable = (0, _core.useDroppable)({
      id: id || "dustbin-".concat(parentIndex, "-").concat(col),
      data: {
        type: "DUSTBIN",
        col: col,
        parentIndex: parentIndex,
        containerData: data,
        acceptTypes: accept
      }
    }),
    isOver = _useDroppable.isOver,
    setNodeRef = _useDroppable.setNodeRef,
    active = _useDroppable.active,
    over = _useDroppable.over;
  var draggedItem = active === null || active === void 0 || (_active$data = active.data) === null || _active$data === void 0 ? void 0 : _active$data.current;
  var sameCard = draggedItem && draggedItem.parentIndex === parentIndex;

  // Aktif öğe bu dustbin'e uyuyor mu kontrol et
  var canDrop = draggedItem && accept.includes(draggedItem.type);
  var backgroundColor = "rgba(0, 0, 0, .03)";
  if (isOver && canDrop && !sameCard && !isContainer(draggedItem)) {
    backgroundColor = "#F7F589";
  } else if (isOver && canDrop && isContainer(draggedItem)) {
    backgroundColor = "#D4EDDA"; // Konteyner için farklı renk
  }

  // Drop işlemi başarılı olduğunda callback çağır
  _react["default"].useEffect(function () {
    if ((over === null || over === void 0 ? void 0 : over.id) === id && onDropSuccess && draggedItem) {
      onDropSuccess(draggedItem, {
        col: col,
        parentIndex: parentIndex,
        data: data
      });
    }
  }, [over, id, onDropSuccess, draggedItem, col, parentIndex, data]);
  var element = getElement(item, rest);
  return /*#__PURE__*/_react["default"].createElement("div", {
    ref: setNodeRef,
    style: getStyle(backgroundColor, isOver && canDrop, sameCard),
    className: "dustbin",
    "data-dustbin-col": col,
    "data-parent-index": parentIndex
  }, isOver && canDrop && !sameCard && /*#__PURE__*/_react["default"].createElement("div", {
    style: {
      position: "absolute",
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      backgroundColor: "rgba(247, 245, 137, 0.3)",
      zIndex: 1,
      pointerEvents: "none"
    }
  }), /*#__PURE__*/_react["default"].createElement("div", {
    style: {
      position: "relative",
      zIndex: 2
    }
  }, !element ? /*#__PURE__*/_react["default"].createElement("div", {
    style: {
      padding: "1rem",
      textAlign: "center",
      color: "#6c757d",
      fontStyle: "italic"
    }
  }, "Element'i buraya s\xFCr\xFCkleyin") : element));
};
var _default = exports["default"] = Dustbin;