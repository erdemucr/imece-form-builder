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
var _defineProperty2 = _interopRequireDefault(require("@babel/runtime/helpers/defineProperty"));
var _react = _interopRequireDefault(require("react"));
var _dateFns = require("date-fns");
var _reactDatepicker = _interopRequireDefault(require("react-datepicker"));
var _componentHeader = _interopRequireDefault(require("./component-header"));
var _componentLabel = _interopRequireDefault(require("./component-label"));
function ownKeys(e, r) { var t = Object.keys(e); if (Object.getOwnPropertySymbols) { var o = Object.getOwnPropertySymbols(e); r && (o = o.filter(function (r) { return Object.getOwnPropertyDescriptor(e, r).enumerable; })), t.push.apply(t, o); } return t; }
function _objectSpread(e) { for (var r = 1; r < arguments.length; r++) { var t = null != arguments[r] ? arguments[r] : {}; r % 2 ? ownKeys(Object(t), !0).forEach(function (r) { (0, _defineProperty2["default"])(e, r, t[r]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys(Object(t)).forEach(function (r) { Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(t, r)); }); } return e; }
function _callSuper(t, o, e) { return o = (0, _getPrototypeOf2["default"])(o), (0, _possibleConstructorReturn2["default"])(t, _isNativeReflectConstruct() ? Reflect.construct(o, e || [], (0, _getPrototypeOf2["default"])(t).constructor) : o.apply(t, e)); }
function _isNativeReflectConstruct() { try { var t = !Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); } catch (t) {} return (_isNativeReflectConstruct = function _isNativeReflectConstruct() { return !!t; })(); }
var DatePicker = /*#__PURE__*/function (_React$Component) {
  function DatePicker(props) {
    var _this;
    (0, _classCallCheck2["default"])(this, DatePicker);
    _this = _callSuper(this, DatePicker, [props]);
    // formatMask = '';
    (0, _defineProperty2["default"])(_this, "handleChange", function (dt) {
      var placeholder;
      var formatMask = _this.state.formatMask;
      if (dt && dt.target) {
        placeholder = dt && dt.target && dt.target.value === '' ? formatMask.toLowerCase() : '';
        var formattedDate = dt.target.value ? (0, _dateFns.format)((0, _dateFns.parseISO)(dt.target.value), formatMask) : '';
        _this.setState({
          value: formattedDate,
          internalValue: formattedDate,
          placeholder: placeholder
        });
      } else {
        _this.setState({
          value: dt ? (0, _dateFns.format)(dt, formatMask) : '',
          internalValue: dt,
          placeholder: placeholder
        });
      }
    });
    _this.inputField = /*#__PURE__*/_react["default"].createRef();
    var _DatePicker$updateFor = DatePicker.updateFormat(props, null),
      _formatMask = _DatePicker$updateFor.formatMask;
    _this.state = DatePicker.updateDateTime(props, {
      formatMask: _formatMask
    }, _formatMask);
    return _this;
  }
  (0, _inherits2["default"])(DatePicker, _React$Component);
  return (0, _createClass2["default"])(DatePicker, [{
    key: "render",
    value: function render() {
      var _this$props$data = this.props.data,
        showTimeSelect = _this$props$data.showTimeSelect,
        showTimeSelectOnly = _this$props$data.showTimeSelectOnly,
        showTimeInput = _this$props$data.showTimeInput;
      var props = {};
      props.type = 'date';
      props.className = 'form-control';
      props.name = this.props.data.field_name;
      var readOnly = this.props.data.readOnly || this.props.read_only;
      var iOS = /iPad|iPhone|iPod/.test(navigator.userAgent) && !window.MSStream;
      var placeholderText = this.state.formatMask.toLowerCase();
      if (this.props.mutable) {
        props.defaultValue = this.props.defaultValue;
        props.ref = this.inputField;
      }
      var baseClasses = 'SortableItem rfb-item';
      if (this.props.data.pageBreakBefore) {
        baseClasses += ' alwaysbreak';
      }
      return /*#__PURE__*/_react["default"].createElement("div", {
        className: baseClasses,
        style: _objectSpread({}, this.props.style)
      }, /*#__PURE__*/_react["default"].createElement(_componentHeader["default"], this.props), /*#__PURE__*/_react["default"].createElement("div", {
        className: "form-group"
      }, /*#__PURE__*/_react["default"].createElement(_componentLabel["default"], this.props), /*#__PURE__*/_react["default"].createElement("div", null, readOnly && /*#__PURE__*/_react["default"].createElement("input", {
        type: "text",
        name: props.name,
        ref: props.ref,
        readOnly: readOnly,
        placeholder: this.state.placeholder,
        value: this.state.value,
        className: "form-control"
      }), iOS && !readOnly && /*#__PURE__*/_react["default"].createElement("input", {
        type: "date",
        name: props.name,
        ref: props.ref,
        onChange: this.handleChange,
        dateFormat: "MM/DD/YYYY",
        value: this.state.value,
        className: "form-control"
      }), !iOS && !readOnly && /*#__PURE__*/_react["default"].createElement(_reactDatepicker["default"], {
        name: props.name,
        ref: props.ref,
        onChange: this.handleChange,
        selected: this.state.internalValue,
        todayButton: 'Today',
        className: "form-control",
        isClearable: true,
        showTimeSelect: showTimeSelect,
        showTimeSelectOnly: showTimeSelectOnly,
        showTimeInput: showTimeInput,
        dateFormat: this.state.formatMask,
        portalId: "root-portal",
        autoComplete: "off",
        placeholderText: placeholderText
      }))));
    }
  }], [{
    key: "updateFormat",
    value: function updateFormat(props, oldFormatMask) {
      var _props$data = props.data,
        showTimeSelect = _props$data.showTimeSelect,
        showTimeSelectOnly = _props$data.showTimeSelectOnly,
        showTimeInput = _props$data.showTimeInput;
      var dateFormat = showTimeSelect && showTimeSelectOnly ? '' : props.data.dateFormat;
      var timeFormat = showTimeSelect || showTimeInput ? props.data.timeFormat : '';
      var formatMask = "".concat(dateFormat, " ").concat(timeFormat).trim();
      var updated = formatMask !== oldFormatMask;
      return {
        updated: updated,
        formatMask: formatMask
      };
    }
  }, {
    key: "updateDateTime",
    value: function updateDateTime(props, state, formatMask) {
      var value;
      var internalValue;
      var defaultToday = props.data.defaultToday;
      if (defaultToday && (props.defaultValue === '' || props.defaultValue === undefined)) {
        value = (0, _dateFns.format)(new Date(), formatMask);
        internalValue = new Date();
      } else {
        value = props.defaultValue;
        if (value === '' || value === undefined) {
          internalValue = undefined;
        } else {
          internalValue = (0, _dateFns.parse)(value, state.formatMask, new Date());
        }
      }
      return {
        value: value,
        internalValue: internalValue,
        placeholder: formatMask.toLowerCase(),
        defaultToday: defaultToday,
        formatMask: state.formatMask
      };
    }

    // componentWillReceiveProps(props) {
    //   const formatUpdated = this.updateFormat(props);
    //   if ((props.data.defaultToday !== !this.state.defaultToday) || formatUpdated) {
    //     const state = this.updateDateTime(props, this.formatMask);
    //     this.setState(state);
    //   }
    // }
  }, {
    key: "getDerivedStateFromProps",
    value: function getDerivedStateFromProps(props, state) {
      var _DatePicker$updateFor2 = DatePicker.updateFormat(props, state.formatMask),
        updated = _DatePicker$updateFor2.updated,
        formatMask = _DatePicker$updateFor2.formatMask;
      if (props.data.defaultToday !== state.defaultToday || updated) {
        var newState = DatePicker.updateDateTime(props, state, formatMask);
        return newState;
      }
      return null;
    }
  }]);
}(_react["default"].Component);
var _default = exports["default"] = DatePicker;