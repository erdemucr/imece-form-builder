"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
var _typeof = require("@babel/runtime/helpers/typeof");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = createDraggableCard;
var _extends2 = _interopRequireDefault(require("@babel/runtime/helpers/extends"));
var _defineProperty2 = _interopRequireDefault(require("@babel/runtime/helpers/defineProperty"));
var _objectWithoutProperties2 = _interopRequireDefault(require("@babel/runtime/helpers/objectWithoutProperties"));
var _slicedToArray2 = _interopRequireDefault(require("@babel/runtime/helpers/slicedToArray"));
var _react = _interopRequireWildcard(require("react"));
var _propTypes = _interopRequireDefault(require("prop-types"));
var _reactDnd = require("react-dnd");
var _ItemTypes = _interopRequireDefault(require("./ItemTypes"));
var _excluded = ["index", "id", "moveCard", "seq"];
function _interopRequireWildcard(e, t) { if ("function" == typeof WeakMap) var r = new WeakMap(), n = new WeakMap(); return (_interopRequireWildcard = function _interopRequireWildcard(e, t) { if (!t && e && e.__esModule) return e; var o, i, f = { __proto__: null, "default": e }; if (null === e || "object" != _typeof(e) && "function" != typeof e) return f; if (o = t ? n : r) { if (o.has(e)) return o.get(e); o.set(e, f); } for (var _t in e) "default" !== _t && {}.hasOwnProperty.call(e, _t) && ((i = (o = Object.defineProperty) && Object.getOwnPropertyDescriptor(e, _t)) && (i.get || i.set) ? o(f, _t, i) : f[_t] = e[_t]); return f; })(e, t); }
function ownKeys(e, r) { var t = Object.keys(e); if (Object.getOwnPropertySymbols) { var o = Object.getOwnPropertySymbols(e); r && (o = o.filter(function (r) { return Object.getOwnPropertyDescriptor(e, r).enumerable; })), t.push.apply(t, o); } return t; }
function _objectSpread(e) { for (var r = 1; r < arguments.length; r++) { var t = null != arguments[r] ? arguments[r] : {}; r % 2 ? ownKeys(Object(t), !0).forEach(function (r) { (0, _defineProperty2["default"])(e, r, t[r]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys(Object(t)).forEach(function (r) { Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(t, r)); }); } return e; }
var style = {
  border: '1px dashed gray',
  padding: '0.5rem 1rem',
  marginBottom: '.5rem',
  backgroundColor: 'white',
  cursor: 'pointer'
};

// Modern approach using a custom hook for DnD logic
var useDragAndDrop = function useDragAndDrop(props) {
  var _ref = (0, _react.useRef)(null);

  // Setup drag
  var _useDrag = (0, _reactDnd.useDrag)({
      type: _ItemTypes["default"].CARD,
      item: function item() {
        return {
          itemType: _ItemTypes["default"].CARD,
          id: props.id,
          index: props.index
        };
      },
      collect: function collect(monitor) {
        return {
          isDragging: monitor.isDragging()
        };
      }
    }),
    _useDrag2 = (0, _slicedToArray2["default"])(_useDrag, 3),
    isDragging = _useDrag2[0].isDragging,
    drag = _useDrag2[1],
    preview = _useDrag2[2];

  // Setup drop
  var _useDrop = (0, _reactDnd.useDrop)({
      accept: [_ItemTypes["default"].CARD, _ItemTypes["default"].BOX],
      drop: function drop(item) {
        // Don't handle drops if we're a container and this is a card drop
        if (props.data && props.data.isContainer || item.itemType === _ItemTypes["default"].CARD) {
          return;
        }
        var hoverIndex = props.index;
        var dragIndex = item.index;

        // Handle box drops
        if (item.data && typeof item.setAsChild === 'function') {
          if (dragIndex === -1) {
            props.insertCard(item, hoverIndex, item.id);
          }
        }
      },
      hover: function hover(item, monitor) {
        var _props$data, _item$data;
        // Don't replace items being dragged from box with index -1
        if (item.itemType === _ItemTypes["default"].BOX && item.index === -1) return;

        // Don't replace multi-column component unless both drag & hover are multi-column
        if ((_props$data = props.data) !== null && _props$data !== void 0 && _props$data.isContainer && !((_item$data = item.data) !== null && _item$data !== void 0 && _item$data.isContainer)) return;
        var dragIndex = item.index;
        var hoverIndex = props.index;

        // Don't replace items with themselves
        if (dragIndex === hoverIndex) {
          return;
        }

        // Handle new items being created
        if (dragIndex === -1) {
          if (props.data && props.data.isContainer) {
            return;
          }
          item.index = hoverIndex;
          props.insertCard(item.onCreate(item.data), hoverIndex);
          return;
        }

        // Skip if no ref available
        if (!_ref.current) {
          return;
        }

        // Determine rectangle on screen
        var hoverBoundingRect = _ref.current.getBoundingClientRect();

        // Get vertical middle
        var hoverMiddleY = (hoverBoundingRect.bottom - hoverBoundingRect.top) / 2;

        // Determine mouse position
        var clientOffset = monitor.getClientOffset();
        if (!clientOffset) return;

        // Get pixels to the top
        var hoverClientY = clientOffset.y - hoverBoundingRect.top;

        // Only perform the move when the mouse has crossed half of the items height
        // When dragging downwards, only move when the cursor is below 50%
        // When dragging upwards, only move when the cursor is above 50%

        // Dragging downwards
        if (dragIndex < hoverIndex && hoverClientY < hoverMiddleY) {
          return;
        }

        // Dragging upwards
        if (dragIndex > hoverIndex && hoverClientY > hoverMiddleY) {
          return;
        }

        // Time to actually perform the action
        props.moveCard(dragIndex, hoverIndex);

        // Note: we're mutating the monitor item here!
        // Generally it's better to avoid mutations,
        // but it's good here for the sake of performance
        // to avoid expensive index searches.
        item.index = hoverIndex;
      }
    }),
    _useDrop2 = (0, _slicedToArray2["default"])(_useDrop, 2),
    drop = _useDrop2[1];

  // Connect the drag and drop refs to the same element
  return {
    ref: function ref(node) {
      _ref.current = node;
      drop(node);
      drag(node);
    },
    previewRef: preview,
    isDragging: isDragging
  };
};

// Modern approach using a functional component wrapper instead of HOC
var DraggableCard = function DraggableCard(props) {
  var index = props.index,
    id = props.id,
    moveCard = props.moveCard,
    _props$seq = props.seq,
    seq = _props$seq === void 0 ? -1 : _props$seq,
    restProps = (0, _objectWithoutProperties2["default"])(props, _excluded);
  var _useDragAndDrop = useDragAndDrop(props),
    ref = _useDragAndDrop.ref,
    previewRef = _useDragAndDrop.previewRef,
    isDragging = _useDragAndDrop.isDragging;
  var opacity = isDragging ? 0 : 1;

  // Use the ComposedComponent passed in props
  var ComposedComponent = props.component;
  return /*#__PURE__*/_react["default"].createElement("div", {
    ref: previewRef
  }, /*#__PURE__*/_react["default"].createElement("div", {
    ref: ref
  }, /*#__PURE__*/_react["default"].createElement(ComposedComponent, (0, _extends2["default"])({}, restProps, {
    index: index,
    id: id,
    moveCard: moveCard,
    seq: seq,
    style: _objectSpread(_objectSpread({}, style), {}, {
      opacity: opacity
    })
  }))));
};
DraggableCard.propTypes = {
  component: _propTypes["default"].elementType.isRequired,
  index: _propTypes["default"].number.isRequired,
  isDragging: _propTypes["default"].bool,
  id: _propTypes["default"].any.isRequired,
  moveCard: _propTypes["default"].func.isRequired,
  seq: _propTypes["default"].number
};
DraggableCard.defaultProps = {
  seq: -1
};

// This replaces the HOC pattern with a component that takes the component as a prop
function createDraggableCard(ComposedComponent) {
  return function (props) {
    return /*#__PURE__*/_react["default"].createElement(DraggableCard, (0, _extends2["default"])({}, props, {
      component: ComposedComponent
    }));
  };
}