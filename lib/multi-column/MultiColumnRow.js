"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
var _typeof = require("@babel/runtime/helpers/typeof");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.TwoColumnRow = exports.ThreeColumnRow = exports.MultiColumnRow = exports.FourColumnRow = void 0;
var _extends2 = _interopRequireDefault(require("@babel/runtime/helpers/extends"));
var _objectWithoutProperties2 = _interopRequireDefault(require("@babel/runtime/helpers/objectWithoutProperties"));
var _defineProperty2 = _interopRequireDefault(require("@babel/runtime/helpers/defineProperty"));
var _react = _interopRequireWildcard(require("react"));
var _core = require("@dnd-kit/core");
var _componentHeader = _interopRequireDefault(require("../form-elements/component-header"));
var _componentLabel = _interopRequireDefault(require("../form-elements/component-label"));
var _dustbin = _interopRequireDefault(require("./dustbin"));
var _store = _interopRequireDefault(require("../stores/store"));
var _ItemTypes = _interopRequireDefault(require("../ItemTypes"));
var _excluded = ["data", "class_name"],
  _excluded2 = ["data", "class_name"],
  _excluded3 = ["data", "class_name"],
  _excluded4 = ["data"];
function _interopRequireWildcard(e, t) { if ("function" == typeof WeakMap) var r = new WeakMap(), n = new WeakMap(); return (_interopRequireWildcard = function _interopRequireWildcard(e, t) { if (!t && e && e.__esModule) return e; var o, i, f = { __proto__: null, "default": e }; if (null === e || "object" != _typeof(e) && "function" != typeof e) return f; if (o = t ? n : r) { if (o.has(e)) return o.get(e); o.set(e, f); } for (var _t in e) "default" !== _t && {}.hasOwnProperty.call(e, _t) && ((i = (o = Object.defineProperty) && Object.getOwnPropertyDescriptor(e, _t)) && (i.get || i.set) ? o(f, _t, i) : f[_t] = e[_t]); return f; })(e, t); }
function ownKeys(e, r) { var t = Object.keys(e); if (Object.getOwnPropertySymbols) { var o = Object.getOwnPropertySymbols(e); r && (o = o.filter(function (r) { return Object.getOwnPropertyDescriptor(e, r).enumerable; })), t.push.apply(t, o); } return t; }
function _objectSpread(e) { for (var r = 1; r < arguments.length; r++) { var t = null != arguments[r] ? arguments[r] : {}; r % 2 ? ownKeys(Object(t), !0).forEach(function (r) { (0, _defineProperty2["default"])(e, r, t[r]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys(Object(t)).forEach(function (r) { Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(t, r)); }); } return e; } /* eslint-disable camelcase */
/* ---------------- helpers ---------------- */

function isContainer(item) {
  if (!item) return false;
  if (item.itemType !== _ItemTypes["default"].CARD) {
    var data = item.data;
    if (data) {
      if (data.isContainer) return true;
      if (data.field_name) {
        return data.field_name.includes("_col_row") || data.field_name.includes("fieldset");
      }
    }
  }
  return false;
}

/* ---------------- base ---------------- */

var MultiColumnRowBase = function MultiColumnRowBase(props) {
  var controls = props.controls,
    data = props.data,
    editModeOn = props.editModeOn,
    getDataById = props.getDataById,
    setAsChild = props.setAsChild,
    removeChild = props.removeChild,
    seq = props.seq,
    className = props.className,
    index = props.index,
    style = props.style,
    id = props.id;
  var _data$childItems = data.childItems,
    childItems = _data$childItems === void 0 ? [] : _data$childItems,
    pageBreakBefore = data.pageBreakBefore;
  var baseClasses = "SortableItem rfb-item";
  if (pageBreakBefore) baseClasses += " alwaysbreak";
  var handleDragEnd = (0, _react.useCallback)(function (_ref) {
    var _active$data, _over$data, _droppedItem$data, _droppedItem$onCreate;
    var active = _ref.active,
      over = _ref.over;
    if (!over) return;
    var droppedItem = (_active$data = active.data) === null || _active$data === void 0 ? void 0 : _active$data.current;
    var target = (_over$data = over.data) === null || _over$data === void 0 ? void 0 : _over$data.current;
    if (!droppedItem || !target) return;

    // same column + same parent → no-op
    if (droppedItem.col === target.col && droppedItem.parentIndex === target.parentIndex) {
      return;
    }

    // container cannot be dropped
    if (isContainer(droppedItem)) return;
    var isBusy = Array.isArray(childItems) && childItems[target.col] !== null;
    var isNew = !((_droppedItem$data = droppedItem.data) !== null && _droppedItem$data !== void 0 && _droppedItem$data.id);
    var itemData = isNew ? (_droppedItem$onCreate = droppedItem.onCreate) === null || _droppedItem$onCreate === void 0 ? void 0 : _droppedItem$onCreate.call(droppedItem, droppedItem.data) : droppedItem.data;
    setAsChild === null || setAsChild === void 0 || setAsChild(data, itemData, target.col, isBusy);
    if (isNew && droppedItem.onCreate) {
      _store["default"].dispatch("deleteLastItem");
    }
  }, [childItems, data, setAsChild]);
  return /*#__PURE__*/_react["default"].createElement(_core.DndContext, {
    onDragEnd: handleDragEnd
  }, /*#__PURE__*/_react["default"].createElement("div", {
    style: _objectSpread({}, style),
    className: baseClasses,
    "data-row-id": id
  }, /*#__PURE__*/_react["default"].createElement(_componentHeader["default"], props), /*#__PURE__*/_react["default"].createElement("div", null, /*#__PURE__*/_react["default"].createElement(_componentLabel["default"], props), /*#__PURE__*/_react["default"].createElement("div", {
    className: "row"
  }, childItems.map(function (x, i) {
    return /*#__PURE__*/_react["default"].createElement("div", {
      key: "".concat(data.id, "-col-").concat(i, "-").concat(x || "_"),
      className: className
    }, controls ? controls[i] : /*#__PURE__*/_react["default"].createElement(_dustbin["default"], {
      id: "".concat(data.id, "-col-").concat(i),
      style: {
        width: "100%"
      },
      data: data,
      items: childItems,
      col: i,
      parentIndex: index,
      editModeOn: editModeOn,
      _onDestroy: function _onDestroy() {
        return removeChild(data, i);
      },
      getDataById: getDataById,
      setAsChild: setAsChild,
      seq: seq,
      accept: ["CARD", "BOX", "TOOLBAR_ITEM"]
    }));
  })))));
};

/* ---------------- wrappers ---------------- */

var TwoColumnRow = exports.TwoColumnRow = function TwoColumnRow(_ref2) {
  var data = _ref2.data,
    class_name = _ref2.class_name,
    rest = (0, _objectWithoutProperties2["default"])(_ref2, _excluded);
  var className = class_name || "col-md-6";

  // React.useEffect ile güvenli şekilde state güncelle
  _react["default"].useEffect(function () {
    if (!data.childItems) {
      data.childItems = [null, null];
      data.isContainer = true;
    }
  }, [data]);
  return /*#__PURE__*/_react["default"].createElement(MultiColumnRowBase, (0, _extends2["default"])({}, rest, {
    className: className,
    data: data
  }));
};
var ThreeColumnRow = exports.ThreeColumnRow = function ThreeColumnRow(_ref3) {
  var data = _ref3.data,
    class_name = _ref3.class_name,
    rest = (0, _objectWithoutProperties2["default"])(_ref3, _excluded2);
  var className = class_name || "col-md-4";
  _react["default"].useEffect(function () {
    if (!data.childItems) {
      data.childItems = [null, null, null];
      data.isContainer = true;
    }
  }, [data]);
  return /*#__PURE__*/_react["default"].createElement(MultiColumnRowBase, (0, _extends2["default"])({}, rest, {
    className: className,
    data: data
  }));
};
var FourColumnRow = exports.FourColumnRow = function FourColumnRow(_ref4) {
  var data = _ref4.data,
    class_name = _ref4.class_name,
    rest = (0, _objectWithoutProperties2["default"])(_ref4, _excluded3);
  var className = class_name || "col-md-3";
  _react["default"].useEffect(function () {
    if (!data.childItems) {
      data.childItems = [null, null, null, null];
      data.isContainer = true;
    }
  }, [data]);
  return /*#__PURE__*/_react["default"].createElement(MultiColumnRowBase, (0, _extends2["default"])({}, rest, {
    className: className,
    data: data
  }));
};
var MultiColumnRow = exports.MultiColumnRow = function MultiColumnRow(_ref5) {
  var data = _ref5.data,
    rest = (0, _objectWithoutProperties2["default"])(_ref5, _excluded4);
  var colCount = data.col_count || 4;
  var className = data.class_name || (colCount === 4 ? "col-md-3" : "col");
  _react["default"].useEffect(function () {
    if (!data.childItems) {
      data.childItems = Array.from({
        length: colCount
      }, function () {
        return null;
      });
      data.isContainer = true;
    }
  }, [data, colCount]);
  return /*#__PURE__*/_react["default"].createElement(MultiColumnRowBase, (0, _extends2["default"])({}, rest, {
    className: className,
    data: data
  }));
};