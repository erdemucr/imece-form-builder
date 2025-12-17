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
var _UUID = _interopRequireDefault(require("./UUID"));
var _IntlMessages = _interopRequireDefault(require("./language-provider/IntlMessages"));
function _callSuper(t, o, e) { return o = (0, _getPrototypeOf2["default"])(o), (0, _possibleConstructorReturn2["default"])(t, _isNativeReflectConstruct() ? Reflect.construct(o, e || [], (0, _getPrototypeOf2["default"])(t).constructor) : o.apply(t, e)); }
function _isNativeReflectConstruct() { try { var t = !Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); } catch (t) {} return (_isNativeReflectConstruct = function _isNativeReflectConstruct() { return !!t; })(); } /**
  * <DynamicOptionList />
  */
var DynamicOptionList = exports["default"] = /*#__PURE__*/function (_React$Component) {
  function DynamicOptionList(props) {
    var _this;
    (0, _classCallCheck2["default"])(this, DynamicOptionList);
    _this = _callSuper(this, DynamicOptionList, [props]);
    _this.state = {
      element: _this.props.element,
      data: _this.props.data,
      dirty: false
    };
    return _this;
  }
  (0, _inherits2["default"])(DynamicOptionList, _React$Component);
  return (0, _createClass2["default"])(DynamicOptionList, [{
    key: "_setValue",
    value: function _setValue(text) {
      return text.replace(/[^A-Z0-9]+/ig, '_').toLowerCase();
    }
  }, {
    key: "editOption",
    value: function editOption(option_index, e) {
      var this_element = this.state.element;
      var val = this_element.options[option_index].value !== this._setValue(this_element.options[option_index].text) ? this_element.options[option_index].value : this._setValue(e.target.value);
      this_element.options[option_index].text = e.target.value;
      this_element.options[option_index].value = val;
      this.setState({
        element: this_element,
        dirty: true
      });
    }
  }, {
    key: "editValue",
    value: function editValue(option_index, e) {
      var this_element = this.state.element;
      var val = e.target.value === '' ? this._setValue(this_element.options[option_index].text) : e.target.value;
      this_element.options[option_index].value = val;
      this.setState({
        element: this_element,
        dirty: true
      });
    }

    // eslint-disable-next-line no-unused-vars
  }, {
    key: "editOptionCorrect",
    value: function editOptionCorrect(option_index, e) {
      var this_element = this.state.element;
      if (this_element.options[option_index].hasOwnProperty('correct')) {
        delete this_element.options[option_index].correct;
      } else {
        this_element.options[option_index].correct = true;
      }
      this.setState({
        element: this_element
      });
      this.props.updateElement.call(this.props.preview, this_element);
    }
  }, {
    key: "updateOption",
    value: function updateOption() {
      var this_element = this.state.element;
      // to prevent ajax calls with no change
      if (this.state.dirty) {
        this.props.updateElement.call(this.props.preview, this_element);
        this.setState({
          dirty: false
        });
      }
    }
  }, {
    key: "addOption",
    value: function addOption(index) {
      var this_element = this.state.element;
      var groupKey = this_element.element.toLowerCase();
      this_element.options.splice(index + 1, 0, {
        value: '',
        text: '',
        key: "".concat(groupKey, "_option_").concat(_UUID["default"].uuid())
      });
      this.props.updateElement.call(this.props.preview, this_element);
    }
  }, {
    key: "removeOption",
    value: function removeOption(index) {
      var this_element = this.state.element;
      this_element.options.splice(index, 1);
      this.props.updateElement.call(this.props.preview, this_element);
    }
  }, {
    key: "render",
    value: function render() {
      var _this2 = this;
      if (this.state.dirty) {
        this.state.element.dirty = true;
      }
      return /*#__PURE__*/_react["default"].createElement("div", {
        className: "dynamic-option-list"
      }, /*#__PURE__*/_react["default"].createElement("ul", null, /*#__PURE__*/_react["default"].createElement("li", null, /*#__PURE__*/_react["default"].createElement("div", {
        className: "row"
      }, /*#__PURE__*/_react["default"].createElement("div", {
        className: "col-sm-6"
      }, /*#__PURE__*/_react["default"].createElement("b", null, /*#__PURE__*/_react["default"].createElement(_IntlMessages["default"], {
        id: "options"
      }))), this.props.canHaveOptionValue && /*#__PURE__*/_react["default"].createElement("div", {
        className: "col-sm-2"
      }, /*#__PURE__*/_react["default"].createElement("b", null, /*#__PURE__*/_react["default"].createElement(_IntlMessages["default"], {
        id: "value"
      }))), this.props.canHaveOptionValue && this.props.canHaveOptionCorrect && /*#__PURE__*/_react["default"].createElement("div", {
        className: "col-sm-4"
      }, /*#__PURE__*/_react["default"].createElement("b", null, /*#__PURE__*/_react["default"].createElement(_IntlMessages["default"], {
        id: "correct"
      }))))), this.props.element.options.map(function (option, index) {
        var this_key = "edit_".concat(option.key);
        var val = option.value !== _this2._setValue(option.text) ? option.value : '';
        return /*#__PURE__*/_react["default"].createElement("li", {
          className: "clearfix",
          key: this_key
        }, /*#__PURE__*/_react["default"].createElement("div", {
          className: "row"
        }, /*#__PURE__*/_react["default"].createElement("div", {
          className: "col-sm-6"
        }, /*#__PURE__*/_react["default"].createElement("input", {
          tabIndex: index + 1,
          className: "form-control",
          style: {
            width: '100%'
          },
          type: "text",
          name: "text_".concat(index),
          placeholder: "Option text",
          value: option.text,
          onBlur: _this2.updateOption.bind(_this2),
          onChange: _this2.editOption.bind(_this2, index)
        })), _this2.props.canHaveOptionValue && /*#__PURE__*/_react["default"].createElement("div", {
          className: "col-sm-2"
        }, /*#__PURE__*/_react["default"].createElement("input", {
          className: "form-control",
          type: "text",
          name: "value_".concat(index),
          value: val,
          onChange: _this2.editValue.bind(_this2, index)
        })), _this2.props.canHaveOptionValue && _this2.props.canHaveOptionCorrect && /*#__PURE__*/_react["default"].createElement("div", {
          className: "col-sm-1"
        }, /*#__PURE__*/_react["default"].createElement("input", {
          className: "form-control",
          type: "checkbox",
          value: "1",
          onChange: _this2.editOptionCorrect.bind(_this2, index),
          checked: option.hasOwnProperty('correct')
        })), /*#__PURE__*/_react["default"].createElement("div", {
          className: "col-sm-3"
        }, /*#__PURE__*/_react["default"].createElement("div", {
          className: "dynamic-options-actions-buttons"
        }, /*#__PURE__*/_react["default"].createElement("button", {
          onClick: _this2.addOption.bind(_this2, index),
          className: "btn btn-success"
        }, /*#__PURE__*/_react["default"].createElement("i", {
          className: "fas fa-plus-circle"
        })), index > 0 && /*#__PURE__*/_react["default"].createElement("button", {
          onClick: _this2.removeOption.bind(_this2, index),
          className: "btn btn-danger"
        }, /*#__PURE__*/_react["default"].createElement("i", {
          className: "fas fa-minus-circle"
        }))))));
      })));
    }
  }]);
}(_react["default"].Component);