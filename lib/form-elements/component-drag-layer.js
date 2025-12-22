"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = exports.AdvancedCustomDragLayer = void 0;
var _slicedToArray2 = _interopRequireDefault(require("@babel/runtime/helpers/slicedToArray"));
var _react = _interopRequireDefault(require("react"));
var _core = require("@dnd-kit/core");
var _utilities = require("@dnd-kit/utilities");
var _componentDragPreview = require("./component-drag-preview");
var dropAnimationConfig = {
  sideEffects: (0, _core.defaultDropAnimationSideEffects)({
    styles: {
      active: {
        opacity: "0.4"
      }
    }
  })
};
var CustomDragLayer = function CustomDragLayer() {
  var _useDndContext = (0, _core.useDndContext)(),
    active = _useDndContext.active,
    over = _useDndContext.over;
  var _React$useState = _react["default"].useState(null),
    _React$useState2 = (0, _slicedToArray2["default"])(_React$useState, 2),
    draggedItem = _React$useState2[0],
    setDraggedItem = _React$useState2[1];
  var _React$useState3 = _react["default"].useState(null),
    _React$useState4 = (0, _slicedToArray2["default"])(_React$useState3, 2),
    clientOffset = _React$useState4[0],
    setClientOffset = _React$useState4[1];
  (0, _core.useDndMonitor)({
    onDragStart: function onDragStart(event) {
      setDraggedItem(event.active.data.current);
      setClientOffset({
        x: event.initialCoordinates.client.x,
        y: event.initialCoordinates.client.y
      });
    },
    onDragMove: function onDragMove(event) {
      if (event.delta) {
        setClientOffset({
          x: event.initialCoordinates.client.x + event.delta.x,
          y: event.initialCoordinates.client.y + event.delta.y
        });
      }
    },
    onDragEnd: function onDragEnd() {
      // Sürükleme bittiğinde state'i temizle
      setTimeout(function () {
        setDraggedItem(null);
        setClientOffset(null);
      }, 0);
    },
    onDragCancel: function onDragCancel() {
      setDraggedItem(null);
      setClientOffset(null);
    }
  });

  // Aktif sürükleme yoksa render etme
  if (!active || !draggedItem) {
    return null;
  }
  var renderItem = function renderItem() {
    var itemType = draggedItem === null || draggedItem === void 0 ? void 0 : draggedItem.type;
    switch (itemType) {
      case "BOX":
      case "CARD":
        return /*#__PURE__*/_react["default"].createElement(_componentDragPreview.BoxDragPreview, {
          item: draggedItem
        });
      default:
        return null;
    }
  };

  // DragOverlay ile daha basit ve efektif çözüm
  return /*#__PURE__*/_react["default"].createElement(_core.DragOverlay, {
    dropAnimation: dropAnimationConfig,
    modifiers: [
      // İsteğe bağlı: sürükleme sırasında dönüşüm efekti ekleyebilirsiniz
    ]
  }, renderItem());
};

// Alternatif: Özel stillerle daha gelişmiş katman (eğer DragOverlay yeterli değilse)
var AdvancedCustomDragLayer = exports.AdvancedCustomDragLayer = function AdvancedCustomDragLayer() {
  var _useDndContext2 = (0, _core.useDndContext)(),
    active = _useDndContext2.active,
    over = _useDndContext2.over;
  var _React$useState5 = _react["default"].useState(null),
    _React$useState6 = (0, _slicedToArray2["default"])(_React$useState5, 2),
    draggedItem = _React$useState6[0],
    setDraggedItem = _React$useState6[1];
  var _React$useState7 = _react["default"].useState({
      x: 0,
      y: 0
    }),
    _React$useState8 = (0, _slicedToArray2["default"])(_React$useState7, 2),
    position = _React$useState8[0],
    setPosition = _React$useState8[1];
  (0, _core.useDndMonitor)({
    onDragStart: function onDragStart(event) {
      setDraggedItem(event.active.data.current);
    },
    onDragMove: function onDragMove(event) {
      if (event.delta) {
        setPosition({
          x: event.delta.x,
          y: event.delta.y
        });
      }
    },
    onDragEnd: function onDragEnd() {
      setDraggedItem(null);
      setPosition({
        x: 0,
        y: 0
      });
    },
    onDragCancel: function onDragCancel() {
      setDraggedItem(null);
      setPosition({
        x: 0,
        y: 0
      });
    }
  });
  if (!active || !draggedItem) {
    return null;
  }
  var transform = _utilities.CSS.Translate.toString({
    x: position.x,
    y: position.y
  });
  var layerStyles = {
    position: "fixed",
    pointerEvents: "none",
    zIndex: 9999,
    left: 0,
    top: 0,
    width: "100%",
    height: "100%"
  };
  var itemStyles = {
    transform: transform,
    position: "absolute",
    top: 0,
    left: 0
  };
  var renderItem = function renderItem() {
    var itemType = draggedItem === null || draggedItem === void 0 ? void 0 : draggedItem.type;
    switch (itemType) {
      case "BOX":
      case "CARD":
        return /*#__PURE__*/_react["default"].createElement(_componentDragPreview.BoxDragPreview, {
          item: draggedItem
        });
      default:
        return null;
    }
  };
  return /*#__PURE__*/_react["default"].createElement("div", {
    style: layerStyles
  }, /*#__PURE__*/_react["default"].createElement("div", {
    style: itemStyles
  }, renderItem()));
};
var _default = exports["default"] = CustomDragLayer;