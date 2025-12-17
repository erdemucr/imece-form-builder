"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
var _typeof = require("@babel/runtime/helpers/typeof");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));
var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));
var _slicedToArray2 = _interopRequireDefault(require("@babel/runtime/helpers/slicedToArray"));
var _react = _interopRequireDefault(require("react"));
function _interopRequireWildcard(e, t) { if ("function" == typeof WeakMap) var r = new WeakMap(), n = new WeakMap(); return (_interopRequireWildcard = function _interopRequireWildcard(e, t) { if (!t && e && e.__esModule) return e; var o, i, f = { __proto__: null, "default": e }; if (null === e || "object" != _typeof(e) && "function" != typeof e) return f; if (o = t ? n : r) { if (o.has(e)) return o.get(e); o.set(e, f); } for (var _t in e) "default" !== _t && {}.hasOwnProperty.call(e, _t) && ((i = (o = Object.defineProperty) && Object.getOwnPropertyDescriptor(e, _t)) && (i.get || i.set) ? o(f, _t, i) : f[_t] = e[_t]); return f; })(e, t); }
var FormElementsEditor = function FormElementsEditor(props) {
  var _React$useState = _react["default"].useState(null),
    _React$useState2 = (0, _slicedToArray2["default"])(_React$useState, 2),
    dynamic = _React$useState2[0],
    setDynamic = _React$useState2[1];
  _react["default"].useEffect(function () {
    var loadDynamic = /*#__PURE__*/function () {
      var _ref = (0, _asyncToGenerator2["default"])(/*#__PURE__*/_regenerator["default"].mark(function _callee() {
        var x;
        return _regenerator["default"].wrap(function (_context) {
          while (1) switch (_context.prev = _context.next) {
            case 0:
              _context.next = 1;
              return Promise.resolve().then(function () {
                return _interopRequireWildcard(require('./form-elements-edit'));
              });
            case 1:
              x = _context.sent;
              setDynamic(function () {
                return x["default"];
              });
            case 2:
            case "end":
              return _context.stop();
          }
        }, _callee);
      }));
      return function loadDynamic() {
        return _ref.apply(this, arguments);
      };
    }();
    loadDynamic();
  }, []);
  if (!dynamic) {
    return /*#__PURE__*/_react["default"].createElement("div", null, "Loading...");
  }
  var Component = dynamic;
  return /*#__PURE__*/_react["default"].createElement(Component, props);
};
var _default = exports["default"] = FormElementsEditor;