"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
var _typeof = require("@babel/runtime/helpers/typeof");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _slicedToArray2 = _interopRequireDefault(require("@babel/runtime/helpers/slicedToArray"));
var _react = _interopRequireWildcard(require("react"));
var _reactDnd = require("react-dnd");
var _reactDndHtml5Backend = require("react-dnd-html5-backend");
var _ItemTypes = _interopRequireDefault(require("../ItemTypes"));
function _interopRequireWildcard(e, t) { if ("function" == typeof WeakMap) var r = new WeakMap(), n = new WeakMap(); return (_interopRequireWildcard = function _interopRequireWildcard(e, t) { if (!t && e && e.__esModule) return e; var o, i, f = { __proto__: null, "default": e }; if (null === e || "object" != _typeof(e) && "function" != typeof e) return f; if (o = t ? n : r) { if (o.has(e)) return o.get(e); o.set(e, f); } for (var _t in e) "default" !== _t && {}.hasOwnProperty.call(e, _t) && ((i = (o = Object.defineProperty) && Object.getOwnPropertyDescriptor(e, _t)) && (i.get || i.set) ? o(f, _t, i) : f[_t] = e[_t]); return f; })(e, t); }
var style = {
  cursor: 'move'
};
var DragHandle = function DragHandle(props) {
  var data = props.data,
    index = props.index,
    onDestroy = props.onDestroy,
    setAsChild = props.setAsChild,
    getDataById = props.getDataById;
  var _useDrag = (0, _reactDnd.useDrag)({
      type: _ItemTypes["default"].BOX,
      item: function item() {
        return {
          itemType: _ItemTypes["default"].BOX,
          index: data.parentId ? -1 : index,
          parentIndex: data.parentIndex,
          id: data.id,
          col: data.col,
          onDestroy: onDestroy,
          setAsChild: setAsChild,
          getDataById: getDataById,
          data: data
        };
      },
      collect: function collect(monitor) {
        return {
          isDragging: monitor.isDragging()
        };
      }
    }),
    _useDrag2 = (0, _slicedToArray2["default"])(_useDrag, 3),
    dragRef = _useDrag2[1],
    dragPreviewRef = _useDrag2[2];

  // Use empty image as drag preview
  (0, _react.useEffect)(function () {
    dragPreviewRef((0, _reactDndHtml5Backend.getEmptyImage)(), {
      // IE fallback: specify that we'd rather screenshot the node
      // when it already knows it's being dragged so we can hide it with CSS.
      captureDraggingState: true
    });
  }, [dragPreviewRef]);
  return /*#__PURE__*/_react["default"].createElement("div", {
    ref: dragRef,
    className: "btn is-isolated",
    style: style
  }, /*#__PURE__*/_react["default"].createElement("i", {
    className: "is-isolated fas fa-grip-vertical"
  }));
};
var _default = exports["default"] = DragHandle;