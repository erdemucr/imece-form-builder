"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
var _typeof = require("@babel/runtime/helpers/typeof");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.BoxDragPreview = void 0;
var _slicedToArray2 = _interopRequireDefault(require("@babel/runtime/helpers/slicedToArray"));
var _defineProperty2 = _interopRequireDefault(require("@babel/runtime/helpers/defineProperty"));
var _react = _interopRequireWildcard(require("react"));
function _interopRequireWildcard(e, t) { if ("function" == typeof WeakMap) var r = new WeakMap(), n = new WeakMap(); return (_interopRequireWildcard = function _interopRequireWildcard(e, t) { if (!t && e && e.__esModule) return e; var o, i, f = { __proto__: null, "default": e }; if (null === e || "object" != _typeof(e) && "function" != typeof e) return f; if (o = t ? n : r) { if (o.has(e)) return o.get(e); o.set(e, f); } for (var _t in e) "default" !== _t && {}.hasOwnProperty.call(e, _t) && ((i = (o = Object.defineProperty) && Object.getOwnPropertyDescriptor(e, _t)) && (i.get || i.set) ? o(f, _t, i) : f[_t] = e[_t]); return f; })(e, t); }
function ownKeys(e, r) { var t = Object.keys(e); if (Object.getOwnPropertySymbols) { var o = Object.getOwnPropertySymbols(e); r && (o = o.filter(function (r) { return Object.getOwnPropertyDescriptor(e, r).enumerable; })), t.push.apply(t, o); } return t; }
function _objectSpread(e) { for (var r = 1; r < arguments.length; r++) { var t = null != arguments[r] ? arguments[r] : {}; r % 2 ? ownKeys(Object(t), !0).forEach(function (r) { (0, _defineProperty2["default"])(e, r, t[r]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys(Object(t)).forEach(function (r) { Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(t, r)); }); } return e; } /* eslint-disable no-nested-ternary */ /* eslint-disable import/prefer-default-export */ /* eslint-disable no-unused-vars */
var boxStyles = {
  border: '1px dashed gray',
  padding: '0.5rem 1rem',
  cursor: 'move'
};
var styles = {
  display: 'inline-block',
  transform: 'rotate(-7deg)',
  WebkitTransform: 'rotate(-7deg)'
};
var Box = function Box(_ref) {
  var title = _ref.title,
    color = _ref.color;
  var backgroundColor = color ? '#059862' : 'white';
  return /*#__PURE__*/_react["default"].createElement("div", {
    style: _objectSpread(_objectSpread({}, boxStyles), {}, {
      backgroundColor: backgroundColor
    })
  }, title);
};
var BoxDragPreview = exports.BoxDragPreview = function BoxDragPreview(_ref2) {
  var item = _ref2.item;
  var _useState = (0, _react.useState)(false),
    _useState2 = (0, _slicedToArray2["default"])(_useState, 2),
    tickTock = _useState2[0],
    setTickTock = _useState2[1];
  var text = item.data.content ? item.data.content : item.data.label ? item.data.label : item.data.text;
  var isLongText = text.length > 20;
  var previewText = isLongText ? "".concat(text.slice(0, 20), "...") : text;
  return /*#__PURE__*/_react["default"].createElement("div", {
    style: styles,
    role: "BoxPreview"
  }, /*#__PURE__*/_react["default"].createElement(Box, {
    title: previewText,
    color: tickTock
  }));
};