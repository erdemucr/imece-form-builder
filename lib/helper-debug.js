"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
var _typeof = require("@babel/runtime/helpers/typeof");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.useDebug = exports.DebugInfo = void 0;
var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));
var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));
var _slicedToArray2 = _interopRequireDefault(require("@babel/runtime/helpers/slicedToArray"));
var _react = _interopRequireDefault(require("react"));
function _interopRequireWildcard(e, t) { if ("function" == typeof WeakMap) var r = new WeakMap(), n = new WeakMap(); return (_interopRequireWildcard = function _interopRequireWildcard(e, t) { if (!t && e && e.__esModule) return e; var o, i, f = { __proto__: null, "default": e }; if (null === e || "object" != _typeof(e) && "function" != typeof e) return f; if (o = t ? n : r) { if (o.has(e)) return o.get(e); o.set(e, f); } for (var _t3 in e) "default" !== _t3 && {}.hasOwnProperty.call(e, _t3) && ((i = (o = Object.defineProperty) && Object.getOwnPropertyDescriptor(e, _t3)) && (i.get || i.set) ? o(f, _t3, i) : f[_t3] = e[_t3]); return f; })(e, t); } // debug-helper.jsx
var DebugInfo = exports.DebugInfo = function DebugInfo() {
  var _React$useState = _react["default"].useState({}),
    _React$useState2 = (0, _slicedToArray2["default"])(_React$useState, 2),
    imports = _React$useState2[0],
    setImports = _React$useState2[1];
  _react["default"].useEffect(function () {
    // Tüm gerekli import'ları test et
    var testImports = /*#__PURE__*/function () {
      var _ref = (0, _asyncToGenerator2["default"])(/*#__PURE__*/_regenerator["default"].mark(function _callee() {
        var results, sortableModule, formElementsModule, _t, _t2;
        return _regenerator["default"].wrap(function (_context) {
          while (1) switch (_context.prev = _context.next) {
            case 0:
              results = {};
              _context.prev = 1;
              _context.next = 2;
              return Promise.resolve().then(function () {
                return _interopRequireWildcard(require("./sortable-form-elements"));
              });
            case 2:
              sortableModule = _context.sent;
              results.sortableFormElements = {
                success: true,
                keys: Object.keys(sortableModule["default"] || sortableModule),
                module: sortableModule
              };
              _context.next = 4;
              break;
            case 3:
              _context.prev = 3;
              _t = _context["catch"](1);
              results.sortableFormElements = {
                success: false,
                error: _t.message
              };
            case 4:
              _context.prev = 4;
              _context.next = 5;
              return Promise.resolve().then(function () {
                return _interopRequireWildcard(require("./form-elements"));
              });
            case 5:
              formElementsModule = _context.sent;
              results.formElements = {
                success: true,
                keys: Object.keys(formElementsModule["default"] || formElementsModule)
              };
              _context.next = 7;
              break;
            case 6:
              _context.prev = 6;
              _t2 = _context["catch"](4);
              results.formElements = {
                success: false,
                error: _t2.message
              };
            case 7:
              setImports(results);
            case 8:
            case "end":
              return _context.stop();
          }
        }, _callee, null, [[1, 3], [4, 6]]);
      }));
      return function testImports() {
        return _ref.apply(this, arguments);
      };
    }();
    testImports();
  }, []);
  return /*#__PURE__*/_react["default"].createElement("div", {
    style: {
      position: "fixed",
      top: "10px",
      left: "10px",
      background: "white",
      border: "1px solid #ccc",
      padding: "15px",
      zIndex: 9999,
      maxWidth: "500px",
      maxHeight: "400px",
      overflow: "auto",
      boxShadow: "0 2px 10px rgba(0,0,0,0.1)"
    }
  }, /*#__PURE__*/_react["default"].createElement("h3", {
    style: {
      marginTop: 0
    }
  }, "\uD83D\uDEE0\uFE0F Debug Information"), /*#__PURE__*/_react["default"].createElement("div", {
    style: {
      marginBottom: "10px"
    }
  }, /*#__PURE__*/_react["default"].createElement("h4", null, "Import Status:"), /*#__PURE__*/_react["default"].createElement("pre", {
    style: {
      background: "#f5f5f5",
      padding: "10px",
      fontSize: "12px",
      overflow: "auto"
    }
  }, JSON.stringify(imports, null, 2))), /*#__PURE__*/_react["default"].createElement("button", {
    onClick: function onClick() {
      console.log("Current imports:", imports);
      console.log("Window object:", window);
    },
    style: {
      marginRight: "10px"
    }
  }, "Log to Console"), /*#__PURE__*/_react["default"].createElement("button", {
    onClick: function onClick() {
      return location.reload();
    }
  }, "Reload Page"));
};

// App bileşeninde kullanım
var useDebug = exports.useDebug = function useDebug() {
  var _React$useState3 = _react["default"].useState(true),
    _React$useState4 = (0, _slicedToArray2["default"])(_React$useState3, 2),
    showDebug = _React$useState4[0],
    setShowDebug = _React$useState4[1];
  return {
    showDebug: showDebug,
    setShowDebug: setShowDebug,
    DebugComponent: showDebug ? DebugInfo : function () {
      return null;
    }
  };
};