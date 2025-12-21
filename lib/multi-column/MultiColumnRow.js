"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
var _defineProperty2 = _interopRequireDefault(require("@babel/runtime/helpers/defineProperty"));
var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime/helpers/classCallCheck"));
var _createClass2 = _interopRequireDefault(require("@babel/runtime/helpers/createClass"));
var _possibleConstructorReturn2 = _interopRequireDefault(require("@babel/runtime/helpers/possibleConstructorReturn"));
var _getPrototypeOf2 = _interopRequireDefault(require("@babel/runtime/helpers/getPrototypeOf"));
var _inherits2 = _interopRequireDefault(require("@babel/runtime/helpers/inherits"));
var _react = _interopRequireDefault(require("react"));
var _core = require("@dnd-kit/core");
var _componentHeader = _interopRequireDefault(require("../form-elements/component-header"));
var _componentLabel = _interopRequireDefault(require("../form-elements/component-label"));
var _dustbin = _interopRequireDefault(require("./dustbin"));
var _store = _interopRequireDefault(require("../stores/store"));
function ownKeys(e, r) { var t = Object.keys(e); if (Object.getOwnPropertySymbols) { var o = Object.getOwnPropertySymbols(e); r && (o = o.filter(function (r) { return Object.getOwnPropertyDescriptor(e, r).enumerable; })), t.push.apply(t, o); } return t; }
function _objectSpread(e) { for (var r = 1; r < arguments.length; r++) { var t = null != arguments[r] ? arguments[r] : {}; r % 2 ? ownKeys(Object(t), !0).forEach(function (r) { (0, _defineProperty2["default"])(e, r, t[r]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys(Object(t)).forEach(function (r) { Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(t, r)); }); } return e; }
function _callSuper(t, o, e) { return o = (0, _getPrototypeOf2["default"])(o), (0, _possibleConstructorReturn2["default"])(t, _isNativeReflectConstruct() ? Reflect.construct(o, e || [], (0, _getPrototypeOf2["default"])(t).constructor) : o.apply(t, e)); }
function _isNativeReflectConstruct() { try { var t = !Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); } catch (t) {} return (_isNativeReflectConstruct = function _isNativeReflectConstruct() { return !!t; })(); } /* eslint-disable camelcase */
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
      var baseClasses = "SortableItem rfb-item";
      if (pageBreakBefore) baseClasses += " alwaysbreak";
      return /*#__PURE__*/_react["default"].createElement(_core.DndContext, {
        onDragEnd: function onDragEnd(_ref) {
          var _droppedItem$data;
          var active = _ref.active,
            over = _ref.over;
          if (!over) return;
          var droppedItem = active.data.current;
          var target = over.data.current;
          if (!droppedItem || !target) return;
          if (droppedItem.col === target.col) return;
          var isBusy = !!childItems[target.col];
          if (!(droppedItem !== null && droppedItem !== void 0 && (_droppedItem$data = droppedItem.data) !== null && _droppedItem$data !== void 0 && _droppedItem$data.isContainer)) {
            var _droppedItem$data2;
            var isNew = !((_droppedItem$data2 = droppedItem.data) !== null && _droppedItem$data2 !== void 0 && _droppedItem$data2.id);
            var itemData = isNew ? droppedItem.onCreate(droppedItem.data) : droppedItem.data;
            setAsChild === null || setAsChild === void 0 || setAsChild(data, itemData, target.col, isBusy);
            _store["default"].dispatch("deleteLastItem");
          }
        }
      }, /*#__PURE__*/_react["default"].createElement("div", {
        style: _objectSpread({}, this.props.style),
        className: baseClasses
      }, /*#__PURE__*/_react["default"].createElement(_componentHeader["default"], this.props), /*#__PURE__*/_react["default"].createElement("div", null, /*#__PURE__*/_react["default"].createElement(_componentLabel["default"], this.props), /*#__PURE__*/_react["default"].createElement("div", {
        className: "row"
      }, childItems.map(function (x, i) {
        return /*#__PURE__*/_react["default"].createElement("div", {
          key: "".concat(i, "_").concat(x || "_"),
          className: className
        }, controls ? controls[i] : /*#__PURE__*/_react["default"].createElement(_dustbin["default"], {
          id: "col-".concat(index, "-").concat(i),
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
          seq: seq
        }));
      })))));
    }
  }]);
}(_react["default"].Component);