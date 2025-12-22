"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
var _typeof = require("@babel/runtime/helpers/typeof");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _extends2 = _interopRequireDefault(require("@babel/runtime/helpers/extends"));
var _defineProperty2 = _interopRequireDefault(require("@babel/runtime/helpers/defineProperty"));
var _react = _interopRequireWildcard(require("react"));
var _core = require("@dnd-kit/core");
var _utilities = require("@dnd-kit/utilities");
var _UUID = _interopRequireDefault(require("./UUID"));
function _interopRequireWildcard(e, t) { if ("function" == typeof WeakMap) var r = new WeakMap(), n = new WeakMap(); return (_interopRequireWildcard = function _interopRequireWildcard(e, t) { if (!t && e && e.__esModule) return e; var o, i, f = { __proto__: null, "default": e }; if (null === e || "object" != _typeof(e) && "function" != typeof e) return f; if (o = t ? n : r) { if (o.has(e)) return o.get(e); o.set(e, f); } for (var _t in e) "default" !== _t && {}.hasOwnProperty.call(e, _t) && ((i = (o = Object.defineProperty) && Object.getOwnPropertyDescriptor(e, _t)) && (i.get || i.set) ? o(f, _t, i) : f[_t] = e[_t]); return f; })(e, t); }
function ownKeys(e, r) { var t = Object.keys(e); if (Object.getOwnPropertySymbols) { var o = Object.getOwnPropertySymbols(e); r && (o = o.filter(function (r) { return Object.getOwnPropertyDescriptor(e, r).enumerable; })), t.push.apply(t, o); } return t; }
function _objectSpread(e) { for (var r = 1; r < arguments.length; r++) { var t = null != arguments[r] ? arguments[r] : {}; r % 2 ? ownKeys(Object(t), !0).forEach(function (r) { (0, _defineProperty2["default"])(e, r, t[r]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys(Object(t)).forEach(function (r) { Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(t, r)); }); } return e; } // toolbar-draggable-item.jsx
var ToolbarItem = function ToolbarItem(_ref) {
  var data = _ref.data,
    onCreate = _ref.onCreate,
    onClick = _ref.onClick,
    index = _ref.index;
  // Unique ID oluştur - useMemo ile sadece bir kere oluştur
  var itemId = (0, _react.useMemo)(function () {
    return "toolbar-".concat(data.key || data.element || data.name, "-").concat(_UUID["default"].uuid());
  }, [data.key, data.element, data.name]);
  var _useDraggable = (0, _core.useDraggable)({
      id: itemId,
      data: {
        type: "TOOLBAR_ITEM",
        toolbarData: data,
        onCreate: onCreate,
        isNewItem: true,
        source: "toolbar",
        index: index // Sıralama için index
      }
    }),
    attributes = _useDraggable.attributes,
    listeners = _useDraggable.listeners,
    setNodeRef = _useDraggable.setNodeRef,
    setActivatorNodeRef = _useDraggable.setActivatorNodeRef,
    transform = _useDraggable.transform,
    isDragging = _useDraggable.isDragging;
  var style = {
    transform: _utilities.CSS.Translate.toString(transform),
    opacity: isDragging ? 0.5 : 1,
    cursor: isDragging ? "grabbing" : "grab",
    transition: isDragging ? "none" : "transform 200ms ease, opacity 200ms ease",
    position: "relative",
    zIndex: isDragging ? 1000 : "auto"
  };
  var handleClick = function handleClick(e) {
    // Eğer sürükleme aktifse tıklamayı engelle
    if (isDragging) {
      e.preventDefault();
      return;
    }
    if (onClick) {
      onClick(e, data);
    }

    // Tıklama ile otomatik öğe oluşturma
    if (onCreate && !data["static"]) {
      var newItem = _objectSpread({
        id: _UUID["default"].uuid(),
        element: data.element,
        text: data.name || data.text || data.element,
        field_name: "".concat(data.element.toLowerCase(), "_").concat(Date.now()),
        "static": data["static"] || false,
        required: data.required || false,
        bold: data.bold || false,
        italic: data.italic || false,
        content: data.content || "",
        read_only: data.readOnly || false,
        hide_label: data.hideLabel || false,
        label: data.label || data.name,
        className: data.className || "",
        placeholder: data.placeholder || "",
        value: data.value || "",
        // Özel konteynerler için
        childItems: data.childItems || null,
        isContainer: data.isContainer || false
      }, data.defaultProps);

      // Öğe oluşturma callback'i çağır
      onCreate(newItem);
    }
  };

  // İkon render fonksiyonu
  var renderIcon = function renderIcon() {
    if (data.icon) {
      if (data.icon.startsWith("fa-")) {
        return /*#__PURE__*/_react["default"].createElement("i", {
          className: "fa ".concat(data.icon),
          style: {
            marginRight: "8px"
          }
        });
      } else if (data.icon.startsWith("material-icons")) {
        return /*#__PURE__*/_react["default"].createElement("span", {
          className: data.icon,
          style: {
            marginRight: "8px"
          }
        });
      } else {
        return /*#__PURE__*/_react["default"].createElement("span", {
          style: {
            marginRight: "8px"
          }
        }, data.icon);
      }
    }
    return null;
  };
  return /*#__PURE__*/_react["default"].createElement("li", {
    ref: setNodeRef,
    style: style,
    onClick: handleClick,
    className: "toolbar-item ".concat(isDragging ? "dragging" : "", " ").concat(data.className || ""),
    title: data.description || data.name,
    "data-element-type": data.element,
    "data-toolbar-item": true
  }, /*#__PURE__*/_react["default"].createElement("div", (0, _extends2["default"])({
    ref: setActivatorNodeRef
  }, attributes, listeners, {
    style: {
      cursor: "move",
      display: "inline-flex",
      alignItems: "center",
      justifyContent: "center",
      padding: "4px",
      marginRight: "8px",
      opacity: 0.6,
      transition: "opacity 0.2s ease"
    },
    className: "drag-handle",
    onMouseEnter: function onMouseEnter(e) {
      return e.currentTarget.style.opacity = "1";
    },
    onMouseLeave: function onMouseLeave(e) {
      return e.currentTarget.style.opacity = "0.6";
    }
  }), /*#__PURE__*/_react["default"].createElement("i", {
    className: "fa fa-arrows",
    style: {
      fontSize: "12px",
      color: "#666"
    }
  })), renderIcon(), /*#__PURE__*/_react["default"].createElement("span", {
    style: {
      fontSize: "14px",
      fontWeight: data.bold ? "bold" : "normal",
      fontStyle: data.italic ? "italic" : "normal",
      color: isDragging ? "#007bff" : "inherit"
    }
  }, data.name), data.required && /*#__PURE__*/_react["default"].createElement("span", {
    style: {
      marginLeft: "8px",
      fontSize: "10px",
      color: "#dc3545",
      backgroundColor: "#ffeaea",
      padding: "2px 4px",
      borderRadius: "3px"
    }
  }, "Gerekli"), isDragging && /*#__PURE__*/_react["default"].createElement("div", {
    style: {
      position: "absolute",
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      backgroundColor: "rgba(0, 123, 255, 0.1)",
      border: "2px dashed #007bff",
      borderRadius: "4px",
      pointerEvents: "none"
    }
  }));
};

// Prop types (geliştirme ortamı için)
ToolbarItem.defaultProps = {
  data: {},
  index: 0
};
var _default = exports["default"] = ToolbarItem;