"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.TwoColumnRow = exports.ThreeColumnRow = exports.MultiColumnRow = void 0;
var _extends2 = _interopRequireDefault(require("@babel/runtime/helpers/extends"));
var _objectWithoutProperties2 = _interopRequireDefault(require("@babel/runtime/helpers/objectWithoutProperties"));
var _defineProperty2 = _interopRequireDefault(require("@babel/runtime/helpers/defineProperty"));
var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime/helpers/classCallCheck"));
var _createClass2 = _interopRequireDefault(require("@babel/runtime/helpers/createClass"));
var _possibleConstructorReturn2 = _interopRequireDefault(require("@babel/runtime/helpers/possibleConstructorReturn"));
var _getPrototypeOf2 = _interopRequireDefault(require("@babel/runtime/helpers/getPrototypeOf"));
var _inherits2 = _interopRequireDefault(require("@babel/runtime/helpers/inherits"));
var _react = _interopRequireDefault(require("react"));
var _componentHeader = _interopRequireDefault(require("../form-elements/component-header"));
var _componentLabel = _interopRequireDefault(require("../form-elements/component-label"));
var _dustbin = _interopRequireDefault(require("./dustbin"));
var _ItemTypes = _interopRequireDefault(require("../ItemTypes"));
var _excluded = ["data", "class_name"],
  _excluded2 = ["data", "class_name"],
  _excluded3 = ["data"];
function ownKeys(e, r) { var t = Object.keys(e); if (Object.getOwnPropertySymbols) { var o = Object.getOwnPropertySymbols(e); r && (o = o.filter(function (r) { return Object.getOwnPropertyDescriptor(e, r).enumerable; })), t.push.apply(t, o); } return t; }
function _objectSpread(e) { for (var r = 1; r < arguments.length; r++) { var t = null != arguments[r] ? arguments[r] : {}; r % 2 ? ownKeys(Object(t), !0).forEach(function (r) { (0, _defineProperty2["default"])(e, r, t[r]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys(Object(t)).forEach(function (r) { Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(t, r)); }); } return e; }
function _callSuper(t, o, e) { return o = (0, _getPrototypeOf2["default"])(o), (0, _possibleConstructorReturn2["default"])(t, _isNativeReflectConstruct() ? Reflect.construct(o, e || [], (0, _getPrototypeOf2["default"])(t).constructor) : o.apply(t, e)); }
function _isNativeReflectConstruct() { try { var t = !Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); } catch (t) {} return (_isNativeReflectConstruct = function _isNativeReflectConstruct() { return !!t; })(); } /* eslint-disable camelcase */
var accepts = [_ItemTypes["default"].BOX, _ItemTypes["default"].CARD];
var MultiColumnRowBase = /*#__PURE__*/function (_React$Component) {
  function MultiColumnRowBase() {
    (0, _classCallCheck2["default"])(this, MultiColumnRowBase);
    return _callSuper(this, MultiColumnRowBase, arguments);
  }
  (0, _inherits2["default"])(MultiColumnRowBase, _React$Component);
  return (0, _createClass2["default"])(MultiColumnRowBase, [{
    key: "render",
    value: function render() {
      var _this$props = this.props,
        controls = _this$props.controls,
        data = _this$props.data,
        editModeOn = _this$props.editModeOn,
        getDataById = _this$props.getDataById,
        setAsChild = _this$props.setAsChild,
        removeChild = _this$props.removeChild,
        seq = _this$props.seq,
        className = _this$props.className,
        index = _this$props.index;
      var childItems = data.childItems,
        pageBreakBefore = data.pageBreakBefore;
      var baseClasses = 'SortableItem rfb-item';
      if (pageBreakBefore) {
        baseClasses += ' alwaysbreak';
      }
      return /*#__PURE__*/_react["default"].createElement("div", {
        style: _objectSpread({}, this.props.style),
        className: baseClasses
      }, /*#__PURE__*/_react["default"].createElement(_componentHeader["default"], this.props), /*#__PURE__*/_react["default"].createElement("div", null, /*#__PURE__*/_react["default"].createElement(_componentLabel["default"], this.props), /*#__PURE__*/_react["default"].createElement("div", {
        className: "row"
      }, childItems.map(function (x, i) {
        return /*#__PURE__*/_react["default"].createElement("div", {
          key: "".concat(i, "_").concat(x || '_'),
          className: className
        }, controls ? controls[i] : /*#__PURE__*/_react["default"].createElement(_dustbin["default"], {
          style: {
            width: '100%'
          },
          data: data,
          accepts: accepts,
          items: childItems,
          col: i,
          parentIndex: index,
          editModeOn: editModeOn,
          _onDestroy: function _onDestroy() {
            return removeChild(data, i);
          },
          getDataById: getDataById,
          setAsChild: setAsChild,
          seq: seq
        }));
      }))));
    }
  }]);
}(_react["default"].Component);
var TwoColumnRow = exports.TwoColumnRow = function TwoColumnRow(_ref) {
  var data = _ref.data,
    class_name = _ref.class_name,
    rest = (0, _objectWithoutProperties2["default"])(_ref, _excluded);
  var className = class_name || 'col-md-6';
  if (!data.childItems) {
    // eslint-disable-next-line no-param-reassign
    data.childItems = [null, null];
    data.isContainer = true;
  }
  return /*#__PURE__*/_react["default"].createElement(MultiColumnRowBase, (0, _extends2["default"])({}, rest, {
    className: className,
    data: data
  }));
};
var ThreeColumnRow = exports.ThreeColumnRow = function ThreeColumnRow(_ref2) {
  var data = _ref2.data,
    class_name = _ref2.class_name,
    rest = (0, _objectWithoutProperties2["default"])(_ref2, _excluded2);
  var className = class_name || 'col-md-4';
  if (!data.childItems) {
    // eslint-disable-next-line no-param-reassign
    data.childItems = [null, null, null];
    data.isContainer = true;
  }
  return /*#__PURE__*/_react["default"].createElement(MultiColumnRowBase, (0, _extends2["default"])({}, rest, {
    className: className,
    data: data
  }));
};
var MultiColumnRow = exports.MultiColumnRow = function MultiColumnRow(_ref3) {
  var data = _ref3.data,
    rest = (0, _objectWithoutProperties2["default"])(_ref3, _excluded3);
  var colCount = data.col_count || 4;
  var className = data.class_name || (colCount === 4 ? 'col-md-3' : 'col');
  if (!data.childItems) {
    // eslint-disable-next-line no-param-reassign
    data.childItems = Array.from({
      length: colCount
    }, function (v, i) {
      return null;
    });
    data.isContainer = true;
  }
  return /*#__PURE__*/_react["default"].createElement(MultiColumnRowBase, (0, _extends2["default"])({}, rest, {
    className: className,
    data: data
  }));
};