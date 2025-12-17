"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _slicedToArray2 = _interopRequireDefault(require("@babel/runtime/helpers/slicedToArray"));
var _react = _interopRequireDefault(require("react"));
var _reactDnd = require("react-dnd");
var _ItemTypes = _interopRequireDefault(require("./ItemTypes"));
var _UUID = _interopRequireDefault(require("./UUID"));
/**
  * <ToolbarItem />
  */

var ToolbarItem = function ToolbarItem(_ref) {
  var data = _ref.data,
    onCreate = _ref.onCreate,
    onClick = _ref.onClick;
  // Setup drag functionality using the useDrag hook
  var _useDrag = (0, _reactDnd.useDrag)({
      type: _ItemTypes["default"].CARD,
      item: function item() {
        return {
          id: _UUID["default"].uuid(),
          index: -1,
          data: data,
          onCreate: onCreate
        };
      },
      collect: function collect(monitor) {
        return {
          isDragging: monitor.isDragging()
        };
      }
    }),
    _useDrag2 = (0, _slicedToArray2["default"])(_useDrag, 2),
    isDragging = _useDrag2[0].isDragging,
    drag = _useDrag2[1];

  // Apply slight opacity while dragging for better UX
  var opacity = isDragging ? 0.5 : 1;
  return /*#__PURE__*/_react["default"].createElement("li", {
    ref: drag,
    onClick: onClick,
    style: {
      opacity: opacity,
      cursor: 'move'
    }
  }, /*#__PURE__*/_react["default"].createElement("i", {
    className: data.icon
  }), data.name);
};
var _default = exports["default"] = ToolbarItem;