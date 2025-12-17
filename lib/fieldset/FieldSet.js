"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
var _typeof = require("@babel/runtime/helpers/typeof");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = FieldSetBase;
var _extends2 = _interopRequireDefault(require("@babel/runtime/helpers/extends"));
var _defineProperty2 = _interopRequireDefault(require("@babel/runtime/helpers/defineProperty"));
var _objectWithoutProperties2 = _interopRequireDefault(require("@babel/runtime/helpers/objectWithoutProperties"));
var _slicedToArray2 = _interopRequireDefault(require("@babel/runtime/helpers/slicedToArray"));
var _react = _interopRequireWildcard(require("react"));
var _componentHeader = _interopRequireDefault(require("../form-elements/component-header"));
var _componentLabel = _interopRequireDefault(require("../form-elements/component-label"));
var _dustbin = _interopRequireDefault(require("../multi-column/dustbin"));
var _ItemTypes = _interopRequireDefault(require("../ItemTypes"));
var _excluded = ["data", "class_name"];
/* eslint-disable camelcase */
function _interopRequireWildcard(e, t) { if ("function" == typeof WeakMap) var r = new WeakMap(), n = new WeakMap(); return (_interopRequireWildcard = function _interopRequireWildcard(e, t) { if (!t && e && e.__esModule) return e; var o, i, f = { __proto__: null, "default": e }; if (null === e || "object" != _typeof(e) && "function" != typeof e) return f; if (o = t ? n : r) { if (o.has(e)) return o.get(e); o.set(e, f); } for (var _t in e) "default" !== _t && {}.hasOwnProperty.call(e, _t) && ((i = (o = Object.defineProperty) && Object.getOwnPropertyDescriptor(e, _t)) && (i.get || i.set) ? o(f, _t, i) : f[_t] = e[_t]); return f; })(e, t); }
function ownKeys(e, r) { var t = Object.keys(e); if (Object.getOwnPropertySymbols) { var o = Object.getOwnPropertySymbols(e); r && (o = o.filter(function (r) { return Object.getOwnPropertyDescriptor(e, r).enumerable; })), t.push.apply(t, o); } return t; }
function _objectSpread(e) { for (var r = 1; r < arguments.length; r++) { var t = null != arguments[r] ? arguments[r] : {}; r % 2 ? ownKeys(Object(t), !0).forEach(function (r) { (0, _defineProperty2["default"])(e, r, t[r]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys(Object(t)).forEach(function (r) { Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(t, r)); }); } return e; }
var accepts = [_ItemTypes["default"].BOX, _ItemTypes["default"].CARD];
function FieldSetBase(props) {
  var _useState = (0, _react.useState)({}),
    _useState2 = (0, _slicedToArray2["default"])(_useState, 2),
    childData = _useState2[0],
    setChildData = _useState2[1];
  var _useState3 = (0, _react.useState)(null),
    _useState4 = (0, _slicedToArray2["default"])(_useState3, 2),
    childItems = _useState4[0],
    setChildItems = _useState4[1];
  (0, _react.useEffect)(function () {
    var data = props.data,
      class_name = props.class_name,
      rest = (0, _objectWithoutProperties2["default"])(props, _excluded);
    setChildData(data);
    var count = 1;
    createChild(count, data);
  }, [props]);
  var addNewChild = function addNewChild() {
    var data = props.data;
    var colCount = data.childItems.length + 1;
    var oldChilds = data.childItems;
    data.childItems = Array.from({
      length: colCount
    }, function (v, i) {
      return oldChilds[i] ? oldChilds[i] : null;
    });
    setChildItems(data.childItems);
  };
  var _onDropSuccess = function onDropSuccess(droppedIndex) {
    var totalChild = childItems ? childItems.length : 0;
    var isLastChild = totalChild === droppedIndex + 1;
    if (isLastChild) {
      addNewChild();
    }
  };
  var createChild = function createChild(count, data) {
    var colCount = count;
    var className = data.class_name || "col-md-12";
    if (!data.childItems) {
      // eslint-disable-next-line no-param-reassign
      data.childItems = Array.from({
        length: colCount
      }, function (v, i) {
        return null;
      });
      data.isContainer = true;
    }
    setChildItems(data.childItems);
  };
  var controls = props.controls,
    editModeOn = props.editModeOn,
    getDataById = props.getDataById,
    setAsChild = props.setAsChild,
    removeChild = props.removeChild,
    seq = props.seq,
    className = props.className,
    index = props.index;
  var pageBreakBefore = childData.pageBreakBefore;
  var baseClasses = "SortableItem rfb-item";
  if (pageBreakBefore) {
    baseClasses += " alwaysbreak";
  }
  return /*#__PURE__*/_react["default"].createElement("div", {
    style: _objectSpread({}, props.style),
    className: baseClasses
  }, /*#__PURE__*/_react["default"].createElement(_componentHeader["default"], (0, _extends2["default"])({}, props, {
    isFieldSet: true
  })), /*#__PURE__*/_react["default"].createElement("div", null, /*#__PURE__*/_react["default"].createElement(_componentLabel["default"], props), /*#__PURE__*/_react["default"].createElement("div", {
    className: "row"
  }, childItems === null || childItems === void 0 ? void 0 : childItems.map(function (x, i) {
    return /*#__PURE__*/_react["default"].createElement("div", {
      key: "".concat(i, "_").concat(x || "_"),
      className: "col-md-12"
    }, controls ? controls[i] : /*#__PURE__*/_react["default"].createElement(_dustbin["default"], {
      style: {
        width: "100%"
      },
      data: childData,
      accepts: accepts,
      items: childItems,
      key: i,
      col: i,
      onDropSuccess: function onDropSuccess() {
        return _onDropSuccess(i);
      },
      parentIndex: index,
      editModeOn: editModeOn,
      _onDestroy: function _onDestroy() {
        return removeChild(childData, i);
      },
      getDataById: getDataById,
      setAsChild: setAsChild,
      seq: seq,
      rowNo: i
    }));
  }))));
}