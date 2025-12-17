"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
var _typeof = require("@babel/runtime/helpers/typeof");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _slicedToArray2 = _interopRequireDefault(require("@babel/runtime/helpers/slicedToArray"));
var _react = _interopRequireWildcard(require("react"));
function _interopRequireWildcard(e, t) { if ("function" == typeof WeakMap) var r = new WeakMap(), n = new WeakMap(); return (_interopRequireWildcard = function _interopRequireWildcard(e, t) { if (!t && e && e.__esModule) return e; var o, i, f = { __proto__: null, "default": e }; if (null === e || "object" != _typeof(e) && "function" != typeof e) return f; if (o = t ? n : r) { if (o.has(e)) return o.get(e); o.set(e, f); } for (var _t in e) "default" !== _t && {}.hasOwnProperty.call(e, _t) && ((i = (o = Object.defineProperty) && Object.getOwnPropertyDescriptor(e, _t)) && (i.get || i.set) ? o(f, _t, i) : f[_t] = e[_t]); return f; })(e, t); }
/**
  * <ToolbarGroupItem />
  */

function ToolbarGroupItem(props) {
  var name = props.name,
    group = props.group,
    renderItem = props.renderItem;
  var _useState = (0, _react.useState)(false),
    _useState2 = (0, _slicedToArray2["default"])(_useState, 2),
    show = _useState2[0],
    setShow = _useState2[1];
  function onClick() {
    setShow(!show);
  }
  var classShow = 'collapse' + (show ? ' show' : '');
  return /*#__PURE__*/_react["default"].createElement("li", null, /*#__PURE__*/_react["default"].createElement("div", {
    className: "toolbar-group-item"
  }, /*#__PURE__*/_react["default"].createElement("button", {
    className: "btn btn-link btn-block text-left",
    type: "button",
    onClick: onClick
  }, name), /*#__PURE__*/_react["default"].createElement("div", {
    className: classShow
  }, /*#__PURE__*/_react["default"].createElement("ul", null, group.map(renderItem)))));
}
var _default = exports["default"] = ToolbarGroupItem;