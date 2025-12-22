"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = exports.PlaceHolder = void 0;
var _defineProperty2 = _interopRequireDefault(require("@babel/runtime/helpers/defineProperty"));
var _react = _interopRequireDefault(require("react"));
var _core = require("@dnd-kit/core");
function ownKeys(e, r) { var t = Object.keys(e); if (Object.getOwnPropertySymbols) { var o = Object.getOwnPropertySymbols(e); r && (o = o.filter(function (r) { return Object.getOwnPropertyDescriptor(e, r).enumerable; })), t.push.apply(t, o); } return t; }
function _objectSpread(e) { for (var r = 1; r < arguments.length; r++) { var t = null != arguments[r] ? arguments[r] : {}; r % 2 ? ownKeys(Object(t), !0).forEach(function (r) { (0, _defineProperty2["default"])(e, r, t[r]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys(Object(t)).forEach(function (r) { Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(t, r)); }); } return e; } // form-place-holder.js
var PlaceHolder = exports.PlaceHolder = function PlaceHolder(props) {
  var id = props.id,
    show = props.show,
    index = props.index,
    moveCard = props.moveCard,
    insertCard = props.insertCard,
    customStyle = props.style,
    children = props.children,
    _props$className = props.className,
    className = _props$className === void 0 ? "" : _props$className;
  var _useDroppable = (0, _core.useDroppable)({
      id: id || "placeholder-".concat(index),
      data: {
        type: "PLACEHOLDER",
        index: index,
        moveCard: moveCard,
        insertCard: insertCard
      }
    }),
    setNodeRef = _useDroppable.setNodeRef,
    isOver = _useDroppable.isOver;
  if (!show) return null;
  var style = _objectSpread({
    minHeight: "60px",
    border: "2px ".concat(isOver ? "dashed #007bff" : "dashed #ccc"),
    borderRadius: "4px",
    margin: "8px 0",
    padding: "16px",
    backgroundColor: isOver ? "rgba(0, 123, 255, 0.05)" : "transparent",
    transition: "all 0.2s ease",
    textAlign: "center",
    color: "#6c757d"
  }, customStyle);
  return /*#__PURE__*/_react["default"].createElement("div", {
    ref: setNodeRef,
    style: style,
    className: "form-place-holder ".concat(className),
    "data-placeholder-index": index
  }, children || "Drop form elements here");
};

// Named export olarak export edin
// Ayrıca default export da sağlayın (eski kodlarla uyumluluk için)
var _default = exports["default"] = PlaceHolder;