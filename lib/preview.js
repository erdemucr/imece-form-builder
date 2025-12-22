"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
var _typeof = require("@babel/runtime/helpers/typeof");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _toConsumableArray2 = _interopRequireDefault(require("@babel/runtime/helpers/toConsumableArray"));
var _slicedToArray2 = _interopRequireDefault(require("@babel/runtime/helpers/slicedToArray"));
var _react = _interopRequireWildcard(require("react"));
var _core = require("@dnd-kit/core");
var _sortable = require("@dnd-kit/sortable");
var _immutabilityHelper = _interopRequireDefault(require("immutability-helper"));
var _store = _interopRequireDefault(require("./stores/store"));
var _formDynamicEdit = _interopRequireDefault(require("./form-dynamic-edit"));
var _sortableFormElements = _interopRequireWildcard(require("./sortable-form-elements"));
var _componentDragLayer = _interopRequireDefault(require("./form-elements/component-drag-layer"));
var _this = void 0;
function _interopRequireWildcard(e, t) { if ("function" == typeof WeakMap) var r = new WeakMap(), n = new WeakMap(); return (_interopRequireWildcard = function _interopRequireWildcard(e, t) { if (!t && e && e.__esModule) return e; var o, i, f = { __proto__: null, "default": e }; if (null === e || "object" != _typeof(e) && "function" != typeof e) return f; if (o = t ? n : r) { if (o.has(e)) return o.get(e); o.set(e, f); } for (var _t in e) "default" !== _t && {}.hasOwnProperty.call(e, _t) && ((i = (o = Object.defineProperty) && Object.getOwnPropertyDescriptor(e, _t)) && (i.get || i.set) ? o(f, _t, i) : f[_t] = e[_t]); return f; })(e, t); }
var PlaceHolder = _sortableFormElements["default"].PlaceHolder;
var dropAnimation = {
  sideEffects: (0, _core.defaultDropAnimationSideEffects)({
    styles: {
      active: {
        opacity: "0.5"
      }
    }
  })
};
var Preview = function Preview(props) {
  var onLoad = props.onLoad,
    onPost = props.onPost,
    propsData = props.data,
    url = props.url,
    saveUrl = props.saveUrl,
    saveAlways = props.saveAlways,
    variables = props.variables,
    editElement = props.editElement,
    editMode = props.editMode,
    _props$className = props.className,
    className = _props$className === void 0 ? "col-md-9 react-form-builder-preview float-left" : _props$className,
    _props$renderEditForm = props.renderEditForm,
    renderEditForm = _props$renderEditForm === void 0 ? function (props) {
      return /*#__PURE__*/_react["default"].createElement(_formDynamicEdit["default"], props);
    } : _props$renderEditForm,
    _props$showCorrectCol = props.showCorrectColumn,
    showCorrectColumn = _props$showCorrectCol === void 0 ? false : _props$showCorrectCol,
    _props$files = props.files,
    files = _props$files === void 0 ? [] : _props$files,
    manualEditModeOff = props.manualEditModeOff,
    editModeOn = props.editModeOn,
    parent = props.parent;
  var _useState = (0, _react.useState)(propsData || []),
    _useState2 = (0, _slicedToArray2["default"])(_useState, 2),
    data = _useState2[0],
    setData = _useState2[1];
  var _useState3 = (0, _react.useState)({}),
    _useState4 = (0, _slicedToArray2["default"])(_useState3, 2),
    answerData = _useState4[0],
    setAnswerData = _useState4[1];
  var _useState5 = (0, _react.useState)(null),
    _useState6 = (0, _slicedToArray2["default"])(_useState5, 2),
    activeId = _useState6[0],
    setActiveId = _useState6[1];
  var _useState7 = (0, _react.useState)(null),
    _useState8 = (0, _slicedToArray2["default"])(_useState7, 2),
    activeItem = _useState8[0],
    setActiveItem = _useState8[1];
  var editForm = (0, _react.useRef)(null);
  var seq = (0, _react.useRef)(0);

  // Store initialization
  (0, _react.useEffect)(function () {
    _store["default"].setExternalHandler(onLoad, onPost);
    _store["default"].subscribe(function (state) {
      return handleStoreUpdate(state.data);
    });
    _store["default"].dispatch("load", {
      loadUrl: url,
      saveUrl: saveUrl,
      data: propsData || [],
      saveAlways: saveAlways
    });
  }, []);

  // Mouse down listener for edit mode
  (0, _react.useEffect)(function () {
    var handleMouseDown = function handleMouseDown(e) {
      if (editForm.current && !editForm.current.contains(e.target)) {
        manualEditModeOffHandler();
      }
    };
    document.addEventListener("mousedown", handleMouseDown);
    return function () {
      document.removeEventListener("mousedown", handleMouseDown);
    };
  }, []);

  // Configure sensors for drag and drop
  var sensors = (0, _core.useSensors)((0, _core.useSensor)(_core.PointerSensor, {
    activationConstraint: {
      distance: 8
    }
  }), (0, _core.useSensor)(_core.KeyboardSensor, {
    coordinateGetter: _sortable.sortableKeyboardCoordinates
  }));
  var handleStoreUpdate = function handleStoreUpdate(newData) {
    var newAnswerData = {};
    newData.forEach(function (item) {
      if (item && item.readOnly && variables && variables[item.variableKey]) {
        newAnswerData[item.field_name] = variables[item.variableKey];
      }
    });
    setData(newData);
    setAnswerData(newAnswerData);
  };
  var manualEditModeOffHandler = function manualEditModeOffHandler() {
    if (editElement && editElement.dirty) {
      editElement.dirty = false;
      updateElement(editElement);
    }
    manualEditModeOff();
  };
  var _setValue = function _setValue(text) {
    return text.replace(/[^A-Z0-9]+/gi, "_").toLowerCase();
  };
  var updateElement = function updateElement(element) {
    var newData = (0, _toConsumableArray2["default"])(data);
    var found = false;
    for (var i = 0, len = newData.length; i < len; i++) {
      if (element.id === newData[i].id) {
        newData[i] = element;
        found = true;
        break;
      }
    }
    if (found) {
      seq.current = seq.current > 100000 ? 0 : seq.current + 1;
      _store["default"].dispatch("updateOrder", newData);
      setData(newData);
    }
  };
  var getDataById = (0, _react.useCallback)(function (id) {
    return data.find(function (x) {
      return x && x.id === id;
    });
  }, [data]);
  var handleDragStart = function handleDragStart(event) {
    var active = event.active;
    var item = getDataById(active.id);
    setActiveId(active.id);
    setActiveItem(item);
  };
  var handleDragEnd = function handleDragEnd(event) {
    var active = event.active,
      over = event.over;
    setActiveId(null);
    setActiveItem(null);
    if (active.id !== (over === null || over === void 0 ? void 0 : over.id)) {
      // Move within main container
      var oldIndex = data.findIndex(function (item) {
        return (item === null || item === void 0 ? void 0 : item.id) === active.id;
      });
      var newIndex = data.findIndex(function (item) {
        return (item === null || item === void 0 ? void 0 : item.id) === (over === null || over === void 0 ? void 0 : over.id);
      });
      if (oldIndex !== -1 && newIndex !== -1) {
        var newData = (0, _sortable.arrayMove)(data, oldIndex, newIndex);
        setData(newData);
        _store["default"].dispatch("updateOrder", newData);
      }
    }
  };
  var handleDragCancel = function handleDragCancel() {
    setActiveId(null);
    setActiveItem(null);
  };
  var insertCard = function insertCard(item, hoverIndex, id) {
    if (id) {
      restoreCard(item, id);
    } else {
      var newData = (0, _toConsumableArray2["default"])(data);
      newData.splice(hoverIndex, 0, item);
      setData(newData);
      _store["default"].dispatch("insertItem", item);
    }
  };
  var restoreCard = function restoreCard(item, id) {
    var parent = getDataById(item.data.parentId);
    var oldItem = getDataById(id);
    if (parent && oldItem) {
      var newIndex = data.indexOf(oldItem);
      var newData = (0, _toConsumableArray2["default"])(data);
      if (oldItem.col !== undefined && parent.childItems) {
        parent.childItems[oldItem.col] = null;
      }
      delete oldItem.parentId;
      delete oldItem.setAsChild;
      delete oldItem.parentIndex;
      item.index = newIndex;
      seq.current = seq.current > 100000 ? 0 : seq.current + 1;
      _store["default"].dispatch("updateOrder", newData);
      setData(newData);
    }
  };
  var setAsChild = function setAsChild(item, child, col, isBusy) {
    var newData = (0, _toConsumableArray2["default"])(data);
    if (swapChildren(newData, item, child, col)) {
      return;
    }
    if (isBusy) {
      return;
    }
    var oldParent = getDataById(child.parentId);
    var oldCol = child.col;
    item.childItems[col] = child.id;
    child.col = col;
    child.parentId = item.id;
    child.parentIndex = newData.indexOf(item);
    if (oldParent && oldParent.childItems) {
      oldParent.childItems[oldCol] = null;
    }
    var list = newData.filter(function (x) {
      return x && x.parentId === item.id;
    });
    var toRemove = list.filter(function (x) {
      return item.childItems.indexOf(x.id) === -1;
    });
    if (toRemove.length > 0) {
      var _filteredData = newData.filter(function (x) {
        return !toRemove.includes(x);
      });
      setData(_filteredData);
      _store["default"].dispatch("updateOrder", _filteredData);
    } else {
      if (!getDataById(child.id)) {
        newData.push(child);
      }
      setData(newData);
      _store["default"].dispatch("updateOrder", newData);
    }
  };
  var swapChildren = function swapChildren(dataArray, item, child, col) {
    if (child.col !== undefined && item.id !== child.parentId) {
      return false;
    }
    if (!(child.col !== undefined && child.col !== col && item.childItems[col])) {
      return false;
    }
    var oldId = item.childItems[col];
    var oldItem = getDataById(oldId);
    var oldCol = child.col;
    item.childItems[oldCol] = oldId;
    oldItem.col = oldCol;
    item.childItems[col] = child.id;
    child.col = col;
    _store["default"].dispatch("updateOrder", dataArray);
    return true;
  };
  var removeChild = function removeChild(item, col) {
    var newData = (0, _toConsumableArray2["default"])(data);
    var oldId = item.childItems[col];
    var oldItem = getDataById(oldId);
    if (oldItem) {
      item.childItems[col] = null;
      var _filteredData2 = newData.filter(function (x) {
        return x !== oldItem;
      });
      seq.current = seq.current > 100000 ? 0 : seq.current + 1;
      _store["default"].dispatch("updateOrder", _filteredData2);
      setData(_filteredData2);
    }
  };
  var _onDestroy = function _onDestroy(item) {
    if (item.childItems) {
      item.childItems.forEach(function (x) {
        var child = getDataById(x);
        if (child) {
          _store["default"].dispatch("delete", child);
        }
      });
    }
    _store["default"].dispatch("delete", item);
  };
  var getElement = function getElement(item, index) {
    console.log("getElement called:", {
      item: item,
      index: index,
      element: item === null || item === void 0 ? void 0 : item.element
    });
    if (!item || !item.element) {
      console.warn("⚠️ Invalid item in getElement:", item);
      return /*#__PURE__*/_react["default"].createElement("div", {
        className: "form-element-error",
        style: {
          border: "1px solid #ff6b6b",
          padding: "10px",
          margin: "5px 0",
          backgroundColor: "#ffeaea"
        }
      }, "Error: Invalid item (no element property)");
    }

    // Custom element kontrolü
    if (item.custom) {
      console.log("🛠️ Custom element detected:", item.key);
      if (!item.component || typeof item.component !== "function") {
        item.component = _this.props.registry.get(item.key);
        if (!item.component) {
          console.error("\u274C Custom element \"".concat(item.key, "\" was not registered"));
          return /*#__PURE__*/_react["default"].createElement("div", {
            className: "custom-element-error",
            style: {
              border: "1px solid #ffc107",
              padding: "10px",
              margin: "5px 0",
              backgroundColor: "#fff3cd"
            }
          }, "Error: Custom element \"", item.key, "\" not found in registry");
        }
      }
    }

    // Form elementini bul
    console.log("🔎 Looking for element:", item.element);
    console.log("📚 Available SortableFormElements:", Object.keys(_sortableFormElements["default"] || {}));
    var SortableFormElement = _sortableFormElements["default"] ? _sortableFormElements["default"][item.element] : undefined;
    if (!SortableFormElement) {
      console.error("\u274C Form element \"".concat(item.element, "\" not found!"), {
        item: item,
        availableElements: Object.keys(_sortableFormElements["default"] || {}),
        SortableFormElements: _sortableFormElements["default"]
      });

      // Fallback için basit bir bileşen
      var FallbackComponent = function FallbackComponent(props) {
        return /*#__PURE__*/_react["default"].createElement("div", {
          style: {
            border: "2px dashed #6c757d",
            padding: "15px",
            marginBottom: "10px",
            backgroundColor: "#f8f9fa",
            color: "#6c757d"
          }
        }, /*#__PURE__*/_react["default"].createElement("div", {
          style: {
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center"
          }
        }, /*#__PURE__*/_react["default"].createElement("div", null, /*#__PURE__*/_react["default"].createElement("strong", null, "Missing: ", item.element), /*#__PURE__*/_react["default"].createElement("div", {
          style: {
            fontSize: "12px",
            marginTop: "5px"
          }
        }, "ID: ", item.id, " | Type: ", item.element)), /*#__PURE__*/_react["default"].createElement("button", {
          onClick: function onClick() {
            return console.log("Debug:", {
              item: item,
              SortableFormElements: _sortableFormElements["default"]
            });
          },
          style: {
            padding: "5px 10px",
            fontSize: "12px"
          }
        }, "Debug")));
      };
      return /*#__PURE__*/_react["default"].createElement(FallbackComponent, {
        key: item.id
      });
    }
    console.log("✅ Found element:", item.element, SortableFormElement);
    return /*#__PURE__*/_react["default"].createElement(SortableFormElement, {
      id: item.id,
      seq: _this.seq,
      index: index,
      moveCard: _this.moveCard,
      insertCard: _this.insertCard,
      mutable: false,
      parent: _this.props.parent,
      editModeOn: _this.props.editModeOn,
      isDraggable: true,
      key: item.id,
      sortData: item.id,
      data: item,
      getDataById: _this.getDataById,
      setAsChild: _this.setAsChild,
      removeChild: _this.removeChild,
      _onDestroy: _this._onDestroy
    });
  };
  var showEditForm = function showEditForm() {
    var handleUpdateElement = function handleUpdateElement(element) {
      return updateElement(element);
    };
    var formElementEditProps = {
      showCorrectColumn: showCorrectColumn,
      files: files,
      manualEditModeOff: manualEditModeOffHandler,
      preview: _this,
      element: editElement,
      updateElement: handleUpdateElement
    };
    return renderEditForm(formElementEditProps);
  };
  var filteredData = data.filter(function (x) {
    return !!x && !x.parentId;
  });
  var items = filteredData.map(function (item, index) {
    return getElement(item, index);
  });
  var itemIds = filteredData.map(function (item) {
    return item === null || item === void 0 ? void 0 : item.id;
  }).filter(Boolean);
  var classes = editMode ? "".concat(className, " is-editing") : className;
  return /*#__PURE__*/_react["default"].createElement("div", {
    className: classes
  }, /*#__PURE__*/_react["default"].createElement("div", {
    className: "edit-form",
    ref: editForm
  }, editElement !== null && showEditForm()), /*#__PURE__*/_react["default"].createElement(_core.DndContext, {
    sensors: sensors,
    collisionDetection: _core.closestCenter,
    onDragStart: handleDragStart,
    onDragEnd: handleDragEnd,
    onDragCancel: handleDragCancel,
    measuring: {
      droppable: {
        strategy: _core.MeasuringStrategy.Always
      }
    }
  }, /*#__PURE__*/_react["default"].createElement(_sortable.SortableContext, {
    items: itemIds,
    strategy: _sortable.verticalListSortingStrategy
  }, /*#__PURE__*/_react["default"].createElement("div", {
    className: "Sortable"
  }, items)), /*#__PURE__*/_react["default"].createElement(_core.DragOverlay, {
    dropAnimation: dropAnimation
  }, activeItem ? /*#__PURE__*/_react["default"].createElement("div", {
    style: {
      opacity: 0.8,
      cursor: "grabbing"
    }
  }, getElement(activeItem, data.findIndex(function (item) {
    return (item === null || item === void 0 ? void 0 : item.id) === activeId;
  }))) : null)), /*#__PURE__*/_react["default"].createElement(PlaceHolder, {
    id: "form-place-holder",
    show: items.length === 0,
    index: items.length,
    moveCard: function moveCard() {},
    insertCard: insertCard
  }));
};
var _default = exports["default"] = Preview;