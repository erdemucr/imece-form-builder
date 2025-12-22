"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
Object.defineProperty(exports, "__esModule", {
  value: true
});
Object.defineProperty(exports, "BaseFormElements", {
  enumerable: true,
  get: function get() {
    return _formElements["default"];
  }
});
Object.defineProperty(exports, "CustomElement", {
  enumerable: true,
  get: function get() {
    return _customElement["default"];
  }
});
Object.defineProperty(exports, "FieldSet", {
  enumerable: true,
  get: function get() {
    return _fieldset.FieldSet;
  }
});
Object.defineProperty(exports, "MultiColumnRow", {
  enumerable: true,
  get: function get() {
    return _multiColumn.MultiColumnRow;
  }
});
Object.defineProperty(exports, "PlaceHolder", {
  enumerable: true,
  get: function get() {
    return _sortableFormElements.PlaceHolder;
  }
});
Object.defineProperty(exports, "SortableElement", {
  enumerable: true,
  get: function get() {
    return _sortableFormElements.SortableElement;
  }
});
Object.defineProperty(exports, "SortableItem", {
  enumerable: true,
  get: function get() {
    return _sortableFormElements.SortableItem;
  }
});
Object.defineProperty(exports, "ThreeColumnRow", {
  enumerable: true,
  get: function get() {
    return _multiColumn.ThreeColumnRow;
  }
});
Object.defineProperty(exports, "TwoColumnRow", {
  enumerable: true,
  get: function get() {
    return _multiColumn.TwoColumnRow;
  }
});
exports["default"] = void 0;
var _typeof2 = _interopRequireDefault(require("@babel/runtime/helpers/typeof"));
var _sortableFormElements = require("./sortable-form-elements");
var _formElements = _interopRequireDefault(require("./form-elements"));
var _multiColumn = require("./multi-column");
var _fieldset = require("./fieldset");
var _customElement = _interopRequireDefault(require("./form-elements/custom-element"));
// sortable-form-elements/index.js

var Header = _formElements["default"].Header,
  Paragraph = _formElements["default"].Paragraph,
  Label = _formElements["default"].Label,
  LineBreak = _formElements["default"].LineBreak,
  TextInput = _formElements["default"].TextInput,
  EmailInput = _formElements["default"].EmailInput,
  PhoneNumber = _formElements["default"].PhoneNumber,
  NumberInput = _formElements["default"].NumberInput,
  TextArea = _formElements["default"].TextArea,
  Dropdown = _formElements["default"].Dropdown,
  Checkboxes = _formElements["default"].Checkboxes,
  DatePicker = _formElements["default"].DatePicker,
  RadioButtons = _formElements["default"].RadioButtons,
  Image = _formElements["default"].Image,
  Rating = _formElements["default"].Rating,
  Tags = _formElements["default"].Tags,
  Signature = _formElements["default"].Signature,
  HyperLink = _formElements["default"].HyperLink,
  Download = _formElements["default"].Download,
  Camera = _formElements["default"].Camera,
  Range = _formElements["default"].Range,
  FileUpload = _formElements["default"].FileUpload;

// Tüm form elementlerini oluştur
var FormElements = {};

// Helper function to safely create sortable elements
var createSortable = function createSortable(Component, name) {
  if (!Component) {
    console.warn("Component ".concat(name, " is undefined, cannot make sortable"));
    return function () {
      return /*#__PURE__*/React.createElement("div", null, "Error: ", name, " not found");
    };
  }
  return (0, _sortableFormElements.SortableElement)(Component);
};

// Temel form elementleri
FormElements.Header = createSortable(Header, "Header");
FormElements.Paragraph = createSortable(Paragraph, "Paragraph");
FormElements.Label = createSortable(Label, "Label");
FormElements.LineBreak = createSortable(LineBreak, "LineBreak");
FormElements.TextInput = createSortable(TextInput, "TextInput");
FormElements.EmailInput = createSortable(EmailInput, "EmailInput");
FormElements.PhoneNumber = createSortable(PhoneNumber, "PhoneNumber");
FormElements.NumberInput = createSortable(NumberInput, "NumberInput");
FormElements.TextArea = createSortable(TextArea, "TextArea");
FormElements.Dropdown = createSortable(Dropdown, "Dropdown");
FormElements.Signature = createSortable(Signature, "Signature");
FormElements.Checkboxes = createSortable(Checkboxes, "Checkboxes");
FormElements.DatePicker = createSortable(DatePicker, "DatePicker");
FormElements.RadioButtons = createSortable(RadioButtons, "RadioButtons");
FormElements.Image = createSortable(Image, "Image");
FormElements.Rating = createSortable(Rating, "Rating");
FormElements.Tags = createSortable(Tags, "Tags");
FormElements.HyperLink = createSortable(HyperLink, "HyperLink");
FormElements.Download = createSortable(Download, "Download");
FormElements.Camera = createSortable(Camera, "Camera");
FormElements.FileUpload = createSortable(FileUpload, "FileUpload");
FormElements.Range = createSortable(Range, "Range");

// Özel konteyner elementleri
FormElements.FieldSet = createSortable(_fieldset.FieldSet, "FieldSet");
FormElements.TwoColumnRow = createSortable(_multiColumn.TwoColumnRow, "TwoColumnRow");
FormElements.ThreeColumnRow = createSortable(_multiColumn.ThreeColumnRow, "ThreeColumnRow");
FormElements.MultiColumnRow = createSortable(_multiColumn.MultiColumnRow, "MultiColumnRow");
FormElements.CustomElement = createSortable(_customElement["default"], "CustomElement");

// PlaceHolder (SortableElement ile sarmalanmamış)
FormElements.PlaceHolder = _sortableFormElements.PlaceHolder;

// Yardımcı bileşenler
FormElements.SortableItem = _sortableFormElements.SortableItem;
FormElements.SortableElement = _sortableFormElements.SortableElement;

// Debug için konsola yazdır
if (typeof window !== "undefined" && process.env.NODE_ENV === "development") {
  console.log("📋 FormElements loaded:", Object.keys(FormElements).map(function (key) {
    return {
      key: key,
      type: (0, _typeof2["default"])(FormElements[key])
    };
  }));
}

// Varsayılan export
var _default = exports["default"] = FormElements; // Named exports