"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
var _typeof = require("@babel/runtime/helpers/typeof");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _slicedToArray2 = _interopRequireDefault(require("@babel/runtime/helpers/slicedToArray"));
var _objectWithoutProperties2 = _interopRequireDefault(require("@babel/runtime/helpers/objectWithoutProperties"));
var _extends2 = _interopRequireDefault(require("@babel/runtime/helpers/extends"));
var _react = _interopRequireWildcard(require("react"));
var _reactDnd = require("react-dnd");
var _formElements = _interopRequireDefault(require("../form-elements"));
var _ItemTypes = _interopRequireDefault(require("../ItemTypes"));
var _customElement = _interopRequireDefault(require("../form-elements/custom-element"));
var _registry = _interopRequireDefault(require("../stores/registry"));
var _store = _interopRequireDefault(require("../stores/store"));
var _excluded = ["onDropSuccess", "seq", "parentIndex", "items", "col", "getDataById", "accepts", "data", "setAsChild"];
function _interopRequireWildcard(e, t) { if ("function" == typeof WeakMap) var r = new WeakMap(), n = new WeakMap(); return (_interopRequireWildcard = function _interopRequireWildcard(e, t) { if (!t && e && e.__esModule) return e; var o, i, f = { __proto__: null, "default": e }; if (null === e || "object" != _typeof(e) && "function" != typeof e) return f; if (o = t ? n : r) { if (o.has(e)) return o.get(e); o.set(e, f); } for (var _t in e) "default" !== _t && {}.hasOwnProperty.call(e, _t) && ((i = (o = Object.defineProperty) && Object.getOwnPropertyDescriptor(e, _t)) && (i.get || i.set) ? o(f, _t, i) : f[_t] = e[_t]); return f; })(e, t); }
function getCustomElement(item, props) {
  if (!item.component || typeof item.component !== 'function') {
    item.component = _registry["default"].get(item.key);
    if (!item.component) {
      console.error("".concat(item.element, " was not registered"));
    }
  }
  return /*#__PURE__*/_react["default"].createElement(_customElement["default"], (0, _extends2["default"])({}, props, {
    mutable: false,
    key: "form_".concat(item.id),
    data: item
  }));
}
function getElement(item, props) {
  if (!item) return null;
  if (item.custom) {
    return getCustomElement(item, props);
  }
  var Element = _formElements["default"][item.element || item.key];
  return /*#__PURE__*/_react["default"].createElement(Element, (0, _extends2["default"])({}, props, {
    key: "form_".concat(item.id),
    data: item
  }));
}
function getStyle(backgroundColor) {
  return {
    border: '1px solid rgba(0,0,0,0.2)',
    minHeight: '2rem',
    minWidth: '7rem',
    width: '100%',
    backgroundColor: backgroundColor,
    padding: 0,
    "float": 'left'
  };
}
function isContainer(item) {
  if (item.itemType !== _ItemTypes["default"].CARD) {
    var data = item.data;
    if (data) {
      if (data.isContainer) {
        return true;
      }
      if (data.field_name) {
        return data.field_name.indexOf('_col_row') > -1;
      }
    }
  }
  return false;
}
var Dustbin = function Dustbin(_ref) {
  var _draggedItem$data;
  var onDropSuccess = _ref.onDropSuccess,
    seq = _ref.seq,
    parentIndex = _ref.parentIndex,
    items = _ref.items,
    col = _ref.col,
    getDataById = _ref.getDataById,
    accepts = _ref.accepts,
    data = _ref.data,
    setAsChild = _ref.setAsChild,
    rest = (0, _objectWithoutProperties2["default"])(_ref, _excluded);
  var dropRef = (0, _react.useRef)(null);
  var item = getDataById(items[col]);
  var _useDrop = (0, _reactDnd.useDrop)({
      accept: accepts,
      collect: function collect(monitor) {
        return {
          isOver: monitor.isOver(),
          canDrop: monitor.canDrop(),
          draggedItem: monitor.getItem()
        };
      },
      drop: function drop(droppedItem) {
        // Do nothing when moving the box inside the same column
        if (col === droppedItem.col && items[col] === droppedItem.id) return;

        // Do not allow replace component other than both items in same multi column row
        if (droppedItem.col === undefined && items[col]) {
          _store["default"].dispatch('resetLastItem');
          return;
        }
        if (!isContainer(droppedItem)) {
          console.log("Item dropped", droppedItem);
          var isBusy = !!items[col];
          if (droppedItem.data) {
            var isNew = !droppedItem.data.id;
            var itemData = isNew ? droppedItem.onCreate(droppedItem.data) : droppedItem.data;
            if (typeof setAsChild === 'function') {
              setAsChild(data, itemData, col, isBusy);
            }
            onDropSuccess && onDropSuccess();
            _store["default"].dispatch('deleteLastItem');
          }
        }
      },
      canDrop: function canDrop(item) {
        // Add any custom logic for when an item can be dropped
        return true;
      }
    }),
    _useDrop2 = (0, _slicedToArray2["default"])(_useDrop, 2),
    _useDrop2$ = _useDrop2[0],
    isOver = _useDrop2$.isOver,
    canDrop = _useDrop2$.canDrop,
    draggedItem = _useDrop2$.draggedItem,
    drop = _useDrop2[1];
  var element = getElement(item, rest);
  var sameCard = draggedItem ? draggedItem.index === parentIndex : false;
  var backgroundColor = 'rgba(0, 0, 0, .03)';
  if (!sameCard && isOver && canDrop && draggedItem && !((_draggedItem$data = draggedItem.data) !== null && _draggedItem$data !== void 0 && _draggedItem$data.isContainer)) {
    backgroundColor = '#F7F589';
  }

  // Connect the drop ref to the DOM element
  drop(dropRef);
  return /*#__PURE__*/_react["default"].createElement("div", {
    ref: dropRef,
    style: !sameCard ? getStyle(backgroundColor) : getStyle('rgba(0, 0, 0, .03)')
  }, !element && /*#__PURE__*/_react["default"].createElement("span", null, "Drop your element here"), element);
};
var _default = exports["default"] = Dustbin;