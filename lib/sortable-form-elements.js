"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.AllFormElements = void 0;
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
Object.defineProperty(exports, "DraggableCard", {
  enumerable: true,
  get: function get() {
    return _sortableElement.DraggableCard;
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
    return _sortableElement.PlaceHolder;
  }
});
Object.defineProperty(exports, "SortableElement", {
  enumerable: true,
  get: function get() {
    return _sortableElement.SortableElement;
  }
});
Object.defineProperty(exports, "SortableItem", {
  enumerable: true,
  get: function get() {
    return _sortableElement.SortableItem;
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
Object.defineProperty(exports, "createDraggableCard", {
  enumerable: true,
  get: function get() {
    return _sortableElement.createDraggableCard;
  }
});
exports["default"] = exports.createSortable = void 0;
var _typeof2 = _interopRequireDefault(require("@babel/runtime/helpers/typeof"));
var _react = _interopRequireDefault(require("react"));
var _formElements = _interopRequireDefault(require("./form-elements"));
var _multiColumn = require("./multi-column");
var _fieldset = require("./fieldset");
var _customElement = _interopRequireDefault(require("./form-elements/custom-element"));
var _sortableElement = require("./sortable-element");
// sortable-form-elements/index.js

// Tüm sortable bileşenleri tek bir yerden import et

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

// Yardımcı fonksiyon: bileşenleri güvenli şekilde sarmala
var createSortable = exports.createSortable = function createSortable(Component, name) {
  if (!Component) {
    console.warn("\u26A0\uFE0F ".concat(name, " bile\u015Feni tan\u0131ms\u0131z, sortable yap\u0131lam\u0131yor"));
    var ErrorComponent = function ErrorComponent() {
      return /*#__PURE__*/_react["default"].createElement("div", {
        style: {
          border: "2px dashed #f00",
          padding: "10px",
          backgroundColor: "#ffe6e6",
          color: "#c00",
          marginBottom: "10px"
        }
      }, "\u26A0\uFE0F Hata: ", name, " bile\u015Feni y\xFCklenemedi");
    };
    return ErrorComponent;
  }
  try {
    var _Component$displayNam, _Component$name;
    // Bileşen zaten sarmalanmış mı kontrol et
    if ((_Component$displayNam = Component.displayName) !== null && _Component$displayNam !== void 0 && _Component$displayNam.includes("Draggable") || (_Component$name = Component.name) !== null && _Component$name !== void 0 && _Component$name.includes("Draggable")) {
      console.log("\u2139\uFE0F ".concat(name, " zaten draggable, tekrar sarmalanmad\u0131"));
      return Component;
    }
    var SortableComponent = (0, _sortableElement.createDraggableCard)(Component);

    // Display name ayarla (debug için)
    SortableComponent.displayName = "Draggable".concat(name);

    // Orijinal bileşeni referans olarak sakla
    SortableComponent.OriginalComponent = Component;
    return SortableComponent;
  } catch (error) {
    console.error("\u274C ".concat(name, " i\xE7in sortable bile\u015Fen olu\u015Fturulamad\u0131:"), error);
    var ErrorFallback = function ErrorFallback(props) {
      return /*#__PURE__*/_react["default"].createElement("div", {
        style: {
          border: "2px dashed #ff6b6b",
          padding: "15px",
          marginBottom: "10px",
          backgroundColor: "#ffeaea",
          color: "#d63031"
        }
      }, /*#__PURE__*/_react["default"].createElement("h4", {
        style: {
          margin: "0 0 10px 0"
        }
      }, "\u26A0\uFE0F ", name, " Y\xFCklenemedi"), /*#__PURE__*/_react["default"].createElement("p", null, "Bile\u015Fen olu\u015Fturulurken hata olu\u015Ftu."), /*#__PURE__*/_react["default"].createElement("p", {
        style: {
          fontSize: "12px",
          marginTop: "10px"
        }
      }, "Hata: ", error.message));
    };
    ErrorFallback.displayName = "Error".concat(name);
    return ErrorFallback;
  }
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
FormElements.PlaceHolder = _sortableElement.PlaceHolder;

// SortableItem (zaten draggable olabilir)
FormElements.SortableItem = _sortableElement.SortableItem;

// SortableElement'i de ekle
FormElements.SortableElement = _sortableElement.SortableElement;

// Yardımcı fonksiyonları export et
FormElements.createSortable = createSortable;
FormElements.createDraggableCard = _sortableElement.createDraggableCard;

// Debug için konsola yazdır
if (typeof window !== "undefined" && process.env.NODE_ENV === "development") {
  console.log("📋 FormElements başarıyla yüklendi:");
  var elementStats = Object.keys(FormElements).map(function (key) {
    var _element$prototype;
    var element = FormElements[key];
    return {
      key: key,
      type: (0, _typeof2["default"])(element),
      isFunction: typeof element === "function",
      displayName: (element === null || element === void 0 ? void 0 : element.displayName) || (element === null || element === void 0 ? void 0 : element.name) || "N/A",
      isReactComponent: (element === null || element === void 0 ? void 0 : element.$$typeof) === Symbol["for"]("react.element") || (element === null || element === void 0 || (_element$prototype = element.prototype) === null || _element$prototype === void 0 ? void 0 : _element$prototype.isReactComponent)
    };
  });
  console.table(elementStats);

  // Hata ayıklama için global erişim (sadece development'ta)
  if (process.env.NODE_ENV === "development") {
    window.FormElementsDebug = FormElements;
  }
}

// Varsayılan export
var _default = exports["default"] = FormElements; // Named exports - TEK BİR YERDE export edin
// Tüm bileşenleri tek bir obje olarak da export et
var AllFormElements = exports.AllFormElements = FormElements;