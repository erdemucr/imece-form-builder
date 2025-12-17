"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime/helpers/classCallCheck"));
var _createClass2 = _interopRequireDefault(require("@babel/runtime/helpers/createClass"));
var _possibleConstructorReturn2 = _interopRequireDefault(require("@babel/runtime/helpers/possibleConstructorReturn"));
var _getPrototypeOf2 = _interopRequireDefault(require("@babel/runtime/helpers/getPrototypeOf"));
var _inherits2 = _interopRequireDefault(require("@babel/runtime/helpers/inherits"));
var _react = _interopRequireDefault(require("react"));
var _componentDragHandle = _interopRequireDefault(require("./component-drag-handle"));
function _callSuper(t, o, e) { return o = (0, _getPrototypeOf2["default"])(o), (0, _possibleConstructorReturn2["default"])(t, _isNativeReflectConstruct() ? Reflect.construct(o, e || [], (0, _getPrototypeOf2["default"])(t).constructor) : o.apply(t, e)); }
function _isNativeReflectConstruct() { try { var t = !Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); } catch (t) {} return (_isNativeReflectConstruct = function _isNativeReflectConstruct() { return !!t; })(); } /**
 * <HeaderBar />
 */ // import Grip from '../multi-column/grip';
var HeaderBar = exports["default"] = /*#__PURE__*/function (_React$Component) {
  function HeaderBar() {
    (0, _classCallCheck2["default"])(this, HeaderBar);
    return _callSuper(this, HeaderBar, arguments);
  }
  (0, _inherits2["default"])(HeaderBar, _React$Component);
  return (0, _createClass2["default"])(HeaderBar, [{
    key: "render",
    value: function render() {
      return /*#__PURE__*/_react["default"].createElement("div", {
        className: "toolbar-header"
      }, /*#__PURE__*/_react["default"].createElement("span", {
        className: "badge badge-secondary"
      }, this.props.data.text), /*#__PURE__*/_react["default"].createElement("div", {
        className: "toolbar-header-buttons"
      }, this.props.data.element !== 'LineBreak' && /*#__PURE__*/_react["default"].createElement("div", {
        className: "btn is-isolated",
        onClick: this.props.editModeOn.bind(this.props.parent, this.props.data)
      }, /*#__PURE__*/_react["default"].createElement("i", {
        className: "is-isolated fas fa-edit"
      })), /*#__PURE__*/_react["default"].createElement("div", {
        className: "btn is-isolated",
        onClick: this.props.onDestroy.bind(this, this.props.data)
      }, /*#__PURE__*/_react["default"].createElement("i", {
        className: "is-isolated fas fa-trash"
      })), /*#__PURE__*/_react["default"].createElement(_componentDragHandle["default"], {
        data: this.props.data,
        index: this.props.index,
        onDestroy: this.props.onDestroy,
        setAsChild: this.props.setAsChild
      })));
    }
  }]);
}(_react["default"].Component);