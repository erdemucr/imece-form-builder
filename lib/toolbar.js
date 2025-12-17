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
var _reactIntl = require("react-intl");
var _toolbarDraggableItem = _interopRequireDefault(require("./toolbar-draggable-item"));
var _toolbarGroupItem = _interopRequireDefault(require("./toolbar-group-item"));
var _UUID = _interopRequireDefault(require("./UUID"));
var _store = _interopRequireDefault(require("./stores/store"));
var _functions = require("./functions");
function _callSuper(t, o, e) { return o = (0, _getPrototypeOf2["default"])(o), (0, _possibleConstructorReturn2["default"])(t, _isNativeReflectConstruct() ? Reflect.construct(o, e || [], (0, _getPrototypeOf2["default"])(t).constructor) : o.apply(t, e)); }
function _isNativeReflectConstruct() { try { var t = !Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); } catch (t) {} return (_isNativeReflectConstruct = function _isNativeReflectConstruct() { return !!t; })(); }
function ownKeys(e, r) { var t = Object.keys(e); if (Object.getOwnPropertySymbols) { var o = Object.getOwnPropertySymbols(e); r && (o = o.filter(function (r) { return Object.getOwnPropertyDescriptor(e, r).enumerable; })), t.push.apply(t, o); } return t; }
function _objectSpread(e) { for (var r = 1; r < arguments.length; r++) { var t = null != arguments[r] ? arguments[r] : {}; r % 2 ? ownKeys(Object(t), !0).forEach(function (r) { (0, _defineProperty2["default"])(e, r, t[r]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys(Object(t)).forEach(function (r) { Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(t, r)); }); } return e; } /**
  * <Toolbar />
  */
// function isDefaultItem(item) {
//   const keys = Object.keys(item);
//   return keys.filter(x => x !== 'element' && x !== 'key' && x !== 'group_name').length === 0;
// }

function buildItems(items, defaultItems) {
  if (!items) {
    return defaultItems;
  }
  return items.map(function (x) {
    var found = defaultItems.find(function (y) {
      return x.element === y.element && y.key === x.key;
    });
    if (!found) {
      found = defaultItems.find(function (y) {
        return (x.element || x.key) === (y.element || y.key);
      });
    }
    if (found) {
      if (x.inherited !== false) {
        found = _objectSpread(_objectSpread({}, found), x);
      } else if (x.group_name) {
        found.group_name = x.group_name;
      }
    }
    return found || x;
  });
}
function buildGroupItems(allItems) {
  var items = allItems.filter(function (x) {
    return !x.group_name;
  });
  var gItems = allItems.filter(function (x) {
    return !!x.group_name;
  });
  var grouped = (0, _functions.groupBy)(gItems, function (x) {
    return x.group_name;
  });
  var groupKeys = gItems.map(function (x) {
    return x.group_name;
  }).filter(function (v, i, self) {
    return self.indexOf(v) === i;
  });
  return {
    items: items,
    grouped: grouped,
    groupKeys: groupKeys
  };
}
var Toolbar = /*#__PURE__*/function (_React$Component) {
  function Toolbar(props) {
    var _this;
    (0, _classCallCheck2["default"])(this, Toolbar);
    _this = _callSuper(this, Toolbar, [props]);
    (0, _defineProperty2["default"])(_this, "renderItem", function (item) {
      return /*#__PURE__*/_react["default"].createElement(_toolbarDraggableItem["default"], {
        data: item,
        key: item.key,
        onClick: _this._onClick.bind(_this, item),
        onCreate: _this.create
      });
    });
    var intl = _this.props.intl;
    var items = buildItems(props.items, _this._defaultItems(intl));
    _this.state = {
      items: items
    };
    _this.create = _this.create.bind(_this);
    return _this;
  }
  (0, _inherits2["default"])(Toolbar, _React$Component);
  return (0, _createClass2["default"])(Toolbar, [{
    key: "componentDidMount",
    value: function componentDidMount() {
      var _this2 = this;
      _store["default"].subscribe(function (state) {
        return _this2.setState({
          store: state
        });
      });
    }
  }, {
    key: "_defaultItems",
    value: function _defaultItems(intl) {
      return [{
        key: 'Header',
        name: intl.formatMessage({
          id: 'header-text'
        }),
        icon: 'fas fa-heading',
        "static": true,
        content: intl.formatMessage({
          id: 'place-holder-text'
        })
      }, {
        key: 'Label',
        name: intl.formatMessage({
          id: 'label'
        }),
        "static": true,
        icon: 'fas fa-font',
        content: intl.formatMessage({
          id: 'place-holder-text'
        })
      }, {
        key: 'Paragraph',
        name: intl.formatMessage({
          id: 'paragraph'
        }),
        "static": true,
        icon: 'fas fa-paragraph',
        content: intl.formatMessage({
          id: 'place-holder-text'
        })
      }, {
        key: 'LineBreak',
        name: intl.formatMessage({
          id: 'line-break'
        }),
        "static": true,
        icon: 'fas fa-arrows-alt-h'
      }, {
        key: 'Dropdown',
        canHaveAnswer: true,
        name: intl.formatMessage({
          id: 'dropdown'
        }),
        icon: 'far fa-caret-square-down',
        label: intl.formatMessage({
          id: 'place-holder-label'
        }),
        field_name: 'dropdown_',
        options: []
      }, {
        key: 'Tags',
        canHaveAnswer: true,
        name: intl.formatMessage({
          id: 'tags'
        }),
        icon: 'fas fa-tags',
        label: intl.formatMessage({
          id: 'place-holder-label'
        }),
        field_name: 'tags_',
        options: []
      }, {
        key: 'Checkboxes',
        canHaveAnswer: true,
        name: intl.formatMessage({
          id: 'checkboxes'
        }),
        icon: 'far fa-check-square',
        label: intl.formatMessage({
          id: 'place-holder-label'
        }),
        field_name: 'checkboxes_',
        options: []
      }, {
        key: 'RadioButtons',
        canHaveAnswer: true,
        name: intl.formatMessage({
          id: 'multiple-choice'
        }),
        icon: 'far fa-dot-circle',
        label: intl.formatMessage({
          id: 'place-holder-label'
        }),
        field_name: 'radiobuttons_',
        options: []
      }, {
        key: 'TextInput',
        canHaveAnswer: true,
        name: intl.formatMessage({
          id: 'text-input'
        }),
        label: intl.formatMessage({
          id: 'place-holder-label'
        }),
        icon: 'fas fa-font',
        field_name: 'text_input_'
      }, {
        key: 'EmailInput',
        canHaveAnswer: true,
        name: intl.formatMessage({
          id: 'email-input'
        }),
        label: intl.formatMessage({
          id: 'place-holder-email'
        }),
        icon: 'fas fa-envelope',
        field_name: 'email_input_'
      }, {
        key: 'NumberInput',
        canHaveAnswer: true,
        name: intl.formatMessage({
          id: 'number-input'
        }),
        label: intl.formatMessage({
          id: 'place-holder-label'
        }),
        icon: 'fas fa-plus',
        field_name: 'number_input_'
      }, {
        key: 'PhoneNumber',
        canHaveAnswer: true,
        name: intl.formatMessage({
          id: 'phone-input'
        }),
        label: intl.formatMessage({
          id: 'place-holder-phone-number'
        }),
        icon: 'fas fa-phone',
        field_name: 'phone_input_'
      }, {
        key: 'TextArea',
        canHaveAnswer: true,
        name: intl.formatMessage({
          id: 'multi-line-input'
        }),
        label: intl.formatMessage({
          id: 'place-holder-label'
        }),
        icon: 'fas fa-text-height',
        field_name: 'text_area_'
      }, {
        key: 'FieldSet',
        canHaveAnswer: false,
        name: intl.formatMessage({
          id: 'fieldset'
        }),
        label: intl.formatMessage({
          id: 'fieldset'
        }),
        icon: 'fas fa-bars',
        field_name: 'fieldset-element'
      }, {
        key: 'TwoColumnRow',
        canHaveAnswer: false,
        name: intl.formatMessage({
          id: 'two-columns-row'
        }),
        label: '',
        icon: 'fas fa-columns',
        field_name: 'two_col_row_'
      }, {
        key: 'ThreeColumnRow',
        canHaveAnswer: false,
        name: intl.formatMessage({
          id: 'three-columns-row'
        }),
        label: '',
        icon: 'fas fa-columns',
        field_name: 'three_col_row_'
      }, {
        key: 'FourColumnRow',
        element: 'MultiColumnRow',
        canHaveAnswer: false,
        name: intl.formatMessage({
          id: 'four-columns-row'
        }),
        label: '',
        icon: 'fas fa-columns',
        field_name: 'four_col_row_',
        col_count: 4,
        class_name: 'col-md-3'
      }, {
        key: 'FiveColumnRow',
        element: 'MultiColumnRow',
        canHaveAnswer: false,
        name: intl.formatMessage({
          id: 'five-columns-row'
        }),
        label: '',
        icon: 'fas fa-columns',
        field_name: 'five_col_row_',
        col_count: 5,
        class_name: 'col'
      }, {
        key: 'SixColumnRow',
        element: 'MultiColumnRow',
        canHaveAnswer: false,
        name: intl.formatMessage({
          id: 'six-columns-row'
        }),
        label: '',
        icon: 'fas fa-columns',
        field_name: 'six_col_row_',
        col_count: 6,
        class_name: 'col-md-2'
      }, {
        key: 'Image',
        name: intl.formatMessage({
          id: 'image'
        }),
        label: '',
        icon: 'far fa-image',
        field_name: 'image_',
        src: ''
      }, {
        key: 'Rating',
        canHaveAnswer: true,
        name: intl.formatMessage({
          id: 'rating'
        }),
        label: intl.formatMessage({
          id: 'place-holder-label'
        }),
        icon: 'fas fa-star',
        field_name: 'rating_'
      }, {
        key: 'DatePicker',
        canDefaultToday: true,
        canReadOnly: true,
        dateFormat: 'MM/dd/yyyy',
        timeFormat: 'hh:mm aa',
        showTimeSelect: false,
        showTimeSelectOnly: false,
        showTimeInput: false,
        name: intl.formatMessage({
          id: 'date'
        }),
        icon: 'far fa-calendar-alt',
        label: intl.formatMessage({
          id: 'place-holder-label'
        }),
        field_name: 'date_picker_'
      }, {
        key: 'Signature',
        canReadOnly: true,
        name: intl.formatMessage({
          id: 'signature'
        }),
        icon: 'fas fa-pen-square',
        label: intl.formatMessage({
          id: 'signature'
        }),
        field_name: 'signature_'
      }, {
        key: 'HyperLink',
        name: intl.formatMessage({
          id: 'website'
        }),
        icon: 'fas fa-link',
        "static": true,
        content: intl.formatMessage({
          id: 'place-holder-website-link'
        }),
        href: 'http://www.example.com'
      }, {
        key: 'Download',
        name: intl.formatMessage({
          id: 'file-attachment'
        }),
        icon: 'fas fa-file',
        "static": true,
        content: intl.formatMessage({
          id: 'place-holder-file-name'
        }),
        field_name: 'download_',
        file_path: '',
        _href: ''
      }, {
        key: 'Range',
        name: intl.formatMessage({
          id: 'range'
        }),
        icon: 'fas fa-sliders-h',
        label: intl.formatMessage({
          id: 'place-holder-label'
        }),
        field_name: 'range_',
        step: 1,
        default_value: 3,
        min_value: 1,
        max_value: 5,
        min_label: intl.formatMessage({
          id: 'easy'
        }),
        max_label: intl.formatMessage({
          id: 'difficult'
        })
      }, {
        key: 'Camera',
        name: intl.formatMessage({
          id: 'camera'
        }),
        icon: 'fas fa-camera',
        label: intl.formatMessage({
          id: 'place-holder-label'
        }),
        field_name: 'camera_'
      }, {
        key: 'FileUpload',
        name: intl.formatMessage({
          id: 'file-upload'
        }),
        icon: 'fas fa-file',
        label: intl.formatMessage({
          id: 'place-holder-label'
        }),
        field_name: 'file_upload_'
      }];
    }
  }, {
    key: "addCustomOptions",
    value: function addCustomOptions(item, elementOptions) {
      if (item.type === 'custom') {
        var customOptions = _objectSpread(_objectSpread({}, item), elementOptions);
        customOptions.custom = true;
        customOptions.component = item.component || null;
        customOptions.custom_options = item.custom_options || [];
        return customOptions;
      }
      return elementOptions;
    }
  }, {
    key: "create",
    value: function create(item) {
      var intl = this.props.intl;
      var elementKey = item.element || item.key;
      var elementOptions = this.addCustomOptions(item, {
        id: _UUID["default"].uuid(),
        element: elementKey,
        text: item.name,
        group_name: item.group_name,
        "static": item["static"],
        required: false,
        showDescription: item.showDescription
      });
      if (this.props.showDescription === true && !item["static"]) {
        elementOptions.showDescription = true;
      }
      if (item["static"]) {
        elementOptions.bold = false;
        elementOptions.italic = false;
      }
      if (item.canHaveAnswer) {
        elementOptions.canHaveAnswer = item.canHaveAnswer;
      }
      if (item.canReadOnly) {
        elementOptions.readOnly = false;
      }
      if (item.canDefaultToday) {
        elementOptions.defaultToday = false;
      }
      if (item.content) {
        elementOptions.content = item.content;
      }
      if (item.href) {
        elementOptions.href = item.href;
      }
      if (item.inherited !== undefined) {
        elementOptions.inherited = item.inherited;
      }
      elementOptions.canHavePageBreakBefore = item.canHavePageBreakBefore !== false;
      elementOptions.canHaveAlternateForm = item.canHaveAlternateForm !== false;
      elementOptions.canHaveDisplayHorizontal = item.canHaveDisplayHorizontal !== false;
      if (elementOptions.canHaveDisplayHorizontal) {
        elementOptions.inline = item.inline;
      }
      elementOptions.canHaveOptionCorrect = item.canHaveOptionCorrect !== false;
      elementOptions.canHaveOptionValue = item.canHaveOptionValue !== false;
      elementOptions.canPopulateFromApi = item.canPopulateFromApi !== false;
      if (item.class_name) {
        elementOptions.class_name = item.class_name;
      }
      if (elementKey === 'Image') {
        elementOptions.src = item.src;
      }
      if (elementKey === 'DatePicker') {
        elementOptions.dateFormat = item.dateFormat;
        elementOptions.timeFormat = item.timeFormat;
        elementOptions.showTimeSelect = item.showTimeSelect;
        elementOptions.showTimeSelectOnly = item.showTimeSelectOnly;
        elementOptions.showTimeInput = item.showTimeInput;
      }
      if (elementKey === 'Download') {
        elementOptions._href = item._href;
        elementOptions.file_path = item.file_path;
      }
      if (elementKey === 'Range') {
        elementOptions.step = item.step;
        elementOptions.default_value = item.default_value;
        elementOptions.min_value = item.min_value;
        elementOptions.max_value = item.max_value;
        elementOptions.min_label = item.min_label;
        elementOptions.max_label = item.max_label;
      }
      if (item.element === 'MultiColumnRow') {
        elementOptions.col_count = item.col_count;
      }
      if (item.defaultValue) {
        elementOptions.defaultValue = item.defaultValue;
      }
      if (item.field_name) {
        elementOptions.field_name = item.field_name + _UUID["default"].uuid();
      }
      if (item.label) {
        elementOptions.label = item.label;
      }
      if (item.options) {
        if (item.options.length > 0) {
          elementOptions.options = item.options.map(function (x) {
            return _objectSpread(_objectSpread({}, x), {}, {
              key: "custom_option_".concat(_UUID["default"].uuid())
            });
          });
        } else {
          elementOptions.options = Toolbar._defaultItemOptions(elementOptions.element, intl);
        }
      }
      return elementOptions;
    }
  }, {
    key: "_onClick",
    value: function _onClick(item) {
      // ElementActions.createElement(this.create(item));
      _store["default"].dispatch('create', this.create(item));
    }
  }, {
    key: "render",
    value: function render() {
      var _this3 = this;
      var _buildGroupItems = buildGroupItems(this.state.items),
        items = _buildGroupItems.items,
        grouped = _buildGroupItems.grouped,
        groupKeys = _buildGroupItems.groupKeys;
      return /*#__PURE__*/_react["default"].createElement("div", {
        className: "col-md-3 react-form-builder-toolbar float-right"
      }, /*#__PURE__*/_react["default"].createElement("h4", null, this.props.intl.formatMessage({
        id: 'toolbox'
      })), /*#__PURE__*/_react["default"].createElement("ul", null, items.map(this.renderItem), groupKeys.map(function (k) {
        return /*#__PURE__*/_react["default"].createElement(_toolbarGroupItem["default"], {
          key: k,
          name: k,
          group: grouped.get(k),
          renderItem: _this3.renderItem
        });
      })));
    }
  }], [{
    key: "_defaultItemOptions",
    value: function _defaultItemOptions(element, intl) {
      switch (element) {
        case 'Dropdown':
          return [{
            value: 'place_holder_option_1',
            text: intl.formatMessage({
              id: 'place-holder-option-1'
            }),
            key: "dropdown_option_".concat(_UUID["default"].uuid())
          }, {
            value: 'place_holder_option_2',
            text: intl.formatMessage({
              id: 'place-holder-option-2'
            }),
            key: "dropdown_option_".concat(_UUID["default"].uuid())
          }, {
            value: 'place_holder_option_3',
            text: intl.formatMessage({
              id: 'place-holder-option-3'
            }),
            key: "dropdown_option_".concat(_UUID["default"].uuid())
          }];
        case 'Tags':
          return [{
            value: 'place_holder_tag_1',
            text: intl.formatMessage({
              id: 'place-holder-tag-1'
            }),
            key: "tags_option_".concat(_UUID["default"].uuid())
          }, {
            value: 'place_holder_tag_2',
            text: intl.formatMessage({
              id: 'place-holder-tag-2'
            }),
            key: "tags_option_".concat(_UUID["default"].uuid())
          }, {
            value: 'place_holder_tag_3',
            text: intl.formatMessage({
              id: 'place-holder-tag-3'
            }),
            key: "tags_option_".concat(_UUID["default"].uuid())
          }];
        case 'Checkboxes':
          return [{
            value: 'place_holder_option_1',
            text: intl.formatMessage({
              id: 'place-holder-option-1'
            }),
            key: "checkboxes_option_".concat(_UUID["default"].uuid())
          }, {
            value: 'place_holder_option_2',
            text: intl.formatMessage({
              id: 'place-holder-option-2'
            }),
            key: "checkboxes_option_".concat(_UUID["default"].uuid())
          }, {
            value: 'place_holder_option_3',
            text: intl.formatMessage({
              id: 'place-holder-option-3'
            }),
            key: "checkboxes_option_".concat(_UUID["default"].uuid())
          }];
        case 'RadioButtons':
          return [{
            value: 'place_holder_option_1',
            text: intl.formatMessage({
              id: 'place-holder-option-1'
            }),
            key: "radiobuttons_option_".concat(_UUID["default"].uuid())
          }, {
            value: 'place_holder_option_2',
            text: intl.formatMessage({
              id: 'place-holder-option-2'
            }),
            key: "radiobuttons_option_".concat(_UUID["default"].uuid())
          }, {
            value: 'place_holder_option_3',
            text: intl.formatMessage({
              id: 'place-holder-option-3'
            }),
            key: "radiobuttons_option_".concat(_UUID["default"].uuid())
          }];
        default:
          return [];
      }
    }
  }]);
}(_react["default"].Component);
var _default = exports["default"] = (0, _reactIntl.injectIntl)(Toolbar);