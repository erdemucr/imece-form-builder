"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _defineProperty2 = _interopRequireDefault(require("@babel/runtime/helpers/defineProperty"));
var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime/helpers/classCallCheck"));
var _createClass2 = _interopRequireDefault(require("@babel/runtime/helpers/createClass"));
var _possibleConstructorReturn2 = _interopRequireDefault(require("@babel/runtime/helpers/possibleConstructorReturn"));
var _getPrototypeOf2 = _interopRequireDefault(require("@babel/runtime/helpers/getPrototypeOf"));
var _inherits2 = _interopRequireDefault(require("@babel/runtime/helpers/inherits"));
var _react = _interopRequireDefault(require("react"));
var _propTypes = _interopRequireDefault(require("prop-types"));
var _classnames = _interopRequireDefault(require("classnames"));
function _callSuper(t, o, e) { return o = (0, _getPrototypeOf2["default"])(o), (0, _possibleConstructorReturn2["default"])(t, _isNativeReflectConstruct() ? Reflect.construct(o, e || [], (0, _getPrototypeOf2["default"])(t).constructor) : o.apply(t, e)); }
function _isNativeReflectConstruct() { try { var t = !Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); } catch (t) {} return (_isNativeReflectConstruct = function _isNativeReflectConstruct() { return !!t; })(); }
/**
 * @fileoverview react-star-rating
 * @author @cameronjroe
 * <StarRating
 *   name={string} - name for form input (required)
 *   caption={string} - caption for rating (optional)
 *   ratingAmount={number} - the rating amount (required, default: 5)
 *   rating={number} - a set rating between the rating amount (optional)
 *   disabled={boolean} - whether to disable the rating from being selected (optional)
 *   editing={boolean} - whether the rating is explicitly in editing mode (optional)
 *   size={string} - size of stars (optional)
 *   onRatingClick={function} - a handler function that gets called onClick of the rating (optional)
 *   />
 */
var StarRating = exports["default"] = /*#__PURE__*/function (_React$Component) {
  function StarRating(props) {
    var _this;
    (0, _classCallCheck2["default"])(this, StarRating);
    _this = _callSuper(this, StarRating, [props]);
    _this.min = 0;
    _this.max = props.ratingAmount || 5;

    // Pre-bind methods to avoid creating new functions on each render
    _this.handleMouseLeave = _this.handleMouseLeave.bind(_this);
    _this.handleMouseMove = _this.handleMouseMove.bind(_this);
    _this.handleClick = _this.handleClick.bind(_this);

    // Create refs properly
    _this.rootNode = /*#__PURE__*/_react["default"].createRef();
    _this.ratingContainerNode = /*#__PURE__*/_react["default"].createRef();
    var ratingVal = props.rating;
    var ratingCache = {
      pos: ratingVal ? _this.getStarRatingPosition(ratingVal) : 0,
      rating: props.rating
    };
    _this.state = {
      ratingCache: ratingCache,
      editing: props.editing || !props.rating,
      stars: 5,
      rating: ratingCache.rating,
      pos: ratingCache.pos,
      glyph: _this.getStars()
    };
    return _this;
  }

  /**
   * Gets the stars based on ratingAmount
   * @return {string} stars
   */
  (0, _inherits2["default"])(StarRating, _React$Component);
  return (0, _createClass2["default"])(StarRating, [{
    key: "getStars",
    value: function getStars() {
      var stars = '';
      var numRating = this.props.ratingAmount;
      for (var i = 0; i < numRating; i++) {
        stars += "\u2605";
      }
      return stars;
    }
  }, {
    key: "componentDidMount",
    value: function componentDidMount() {
      // Initialize with proper values from props
      if (this.props.rating) {
        this.setState({
          pos: this.getStarRatingPosition(this.props.rating),
          rating: this.props.rating
        });
      }
    }

    // REMOVED componentWillUnmount as it wasn't doing anything useful
  }, {
    key: "getPosition",
    value: function getPosition(e) {
      if (!this.rootNode.current) return 0;
      return e.pageX - this.rootNode.current.getBoundingClientRect().left;
    }
  }, {
    key: "applyPrecision",
    value: function applyPrecision(val, precision) {
      return parseFloat(val.toFixed(precision));
    }
  }, {
    key: "getDecimalPlaces",
    value: function getDecimalPlaces(num) {
      var match = "".concat(num).match(/(?:\.(\d+))?(?:[eE]([+-]?\d+))?$/);
      return !match ? 0 : Math.max(0, (match[1] ? match[1].length : 0) - (match[2] ? +match[2] : 0));
    }
  }, {
    key: "getWidthFromValue",
    value: function getWidthFromValue(val) {
      if (val === null || val === undefined || typeof val !== 'number') return 0;
      var min = this.min;
      var max = this.max;
      if (val <= min || min === max) {
        return 0;
      }
      if (val >= max) {
        return 100;
      }
      return (val - min) / (max - min) * 100;
    }
  }, {
    key: "getValueFromPosition",
    value: function getValueFromPosition(pos) {
      if (!this.ratingContainerNode.current) return 0;
      var precision = this.getDecimalPlaces(this.props.step);
      var maxWidth = this.ratingContainerNode.current.offsetWidth;
      if (!maxWidth) return 0;
      var diff = this.max - this.min;
      var factor = diff * pos / (maxWidth * this.props.step);
      factor = Math.ceil(factor);
      var val = this.applyPrecision(parseFloat(this.min + factor * this.props.step), precision);
      val = Math.max(Math.min(val, this.max), this.min);
      return val;
    }
  }, {
    key: "calculate",
    value: function calculate(pos) {
      var val = this.getValueFromPosition(pos);
      var width = "".concat(this.getWidthFromValue(val), "%");
      return {
        width: width,
        val: val
      };
    }
  }, {
    key: "getStarRatingPosition",
    value: function getStarRatingPosition(val) {
      var width = "".concat(this.getWidthFromValue(val), "%");
      return width;
    }
  }, {
    key: "getRatingEvent",
    value: function getRatingEvent(e) {
      var pos = this.getPosition(e);
      return this.calculate(pos);
    }
  }, {
    key: "getSvg",
    value: function getSvg() {
      return /*#__PURE__*/_react["default"].createElement("svg", {
        className: "react-star-rating__star",
        viewBox: "0 0 286 272",
        version: "1.1",
        xmlns: "http://www.w3.org/2000/svg"
      }, /*#__PURE__*/_react["default"].createElement("g", {
        stroke: "none",
        strokeWidth: "1",
        fill: "none",
        fillRule: "evenodd"
      }, /*#__PURE__*/_react["default"].createElement("polygon", {
        id: "star-flat",
        points: "143 225 54.8322122 271.352549 71.6707613 173.176275 0.341522556 103.647451 98.9161061 89.3237254 143 0 187.083894 89.3237254 285.658477 103.647451 214.329239 173.176275 231.167788 271.352549 "
      })));
    }
  }, {
    key: "handleMouseLeave",
    value: function handleMouseLeave() {
      this.setState({
        pos: this.state.ratingCache.pos,
        rating: this.state.ratingCache.rating
      });
    }
  }, {
    key: "handleMouseMove",
    value: function handleMouseMove(e) {
      // Only process if editing is enabled
      if (!this.props.disabled && (this.state.editing || this.props.editing)) {
        // get hover position
        var ratingEvent = this.getRatingEvent(e);
        this.setState({
          pos: ratingEvent.width,
          rating: ratingEvent.val
        });
      }
    }

    // REMOVED updateRating method which was causing issues

    // Fixed shouldComponentUpdate to prevent infinite loops
  }, {
    key: "shouldComponentUpdate",
    value: function shouldComponentUpdate(nextProps, nextState) {
      // Don't trigger a state update from this method!
      if (nextProps.rating !== this.props.rating) {
        return true;
      }
      return nextState.ratingCache.rating !== this.state.ratingCache.rating || nextState.rating !== this.state.rating || nextState.pos !== this.state.pos;
    }

    // Handle rating changes in componentDidUpdate instead
  }, {
    key: "componentDidUpdate",
    value: function componentDidUpdate(prevProps) {
      // Only update if the rating prop changed
      if (prevProps.rating !== this.props.rating && this.props.rating !== this.state.rating) {
        // Update state without causing an infinite loop
        this.setState({
          pos: this.getStarRatingPosition(this.props.rating),
          rating: this.props.rating,
          ratingCache: {
            pos: this.getStarRatingPosition(this.props.rating),
            rating: this.props.rating
          }
        });
      }
    }
  }, {
    key: "handleClick",
    value: function handleClick(e) {
      // is it disabled?
      if (this.props.disabled) {
        e.stopPropagation();
        e.preventDefault();
        return false;
      }

      // Get the current rating based on click position
      var ratingEvent = this.getRatingEvent(e);
      var ratingCache = {
        pos: ratingEvent.width,
        rating: ratingEvent.val,
        caption: this.props.caption,
        name: this.props.name
      };

      // Update the state with new values
      this.setState({
        ratingCache: ratingCache,
        pos: ratingEvent.width,
        rating: ratingEvent.val
      });

      // Call the callback with the new rating
      this.props.onRatingClick(e, ratingCache);
      return true;
    }
  }, {
    key: "treatName",
    value: function treatName(title) {
      if (typeof title === 'string') {
        return title.toLowerCase().split(' ').join('_');
      }
      return null;
    }
  }, {
    key: "render",
    value: function render() {
      var classes = (0, _classnames["default"])((0, _defineProperty2["default"])((0, _defineProperty2["default"])({
        'react-star-rating__root': true,
        'rating-disabled': this.props.disabled
      }, "react-star-rating__size--".concat(this.props.size), this.props.size), 'rating-editing', this.state.editing));

      // are we editing this rating?
      var starRating;
      var isEditable = !this.props.disabled && (this.state.editing || this.props.editing);
      if (isEditable) {
        starRating = /*#__PURE__*/_react["default"].createElement("div", {
          ref: this.ratingContainerNode,
          className: "rating-container rating-gly-star",
          "data-content": this.state.glyph,
          onMouseMove: this.handleMouseMove,
          onMouseLeave: this.handleMouseLeave,
          onClick: this.handleClick
        }, /*#__PURE__*/_react["default"].createElement("div", {
          className: "rating-stars",
          "data-content": this.state.glyph,
          style: {
            width: this.state.pos
          }
        }));
      } else {
        starRating = /*#__PURE__*/_react["default"].createElement("div", {
          ref: this.ratingContainerNode,
          className: "rating-container rating-gly-star",
          "data-content": this.state.glyph
        }, /*#__PURE__*/_react["default"].createElement("div", {
          className: "rating-stars",
          "data-content": this.state.glyph,
          style: {
            width: this.state.pos
          }
        }));
      }
      return /*#__PURE__*/_react["default"].createElement("span", {
        className: "react-star-rating"
      }, /*#__PURE__*/_react["default"].createElement("span", {
        ref: this.rootNode,
        style: {
          cursor: isEditable ? 'pointer' : 'default'
        },
        className: classes
      }, starRating, /*#__PURE__*/_react["default"].createElement("input", {
        type: "hidden",
        name: this.props.name,
        value: this.state.rating || 0,
        style: {
          display: 'none !important',
          width: 65
        },
        min: this.min,
        max: this.max,
        readOnly: true
      })));
    }
  }]);
}(_react["default"].Component);
StarRating.propTypes = {
  name: _propTypes["default"].string.isRequired,
  caption: _propTypes["default"].string,
  ratingAmount: _propTypes["default"].number.isRequired,
  rating: _propTypes["default"].number,
  onRatingClick: _propTypes["default"].func,
  disabled: _propTypes["default"].bool,
  editing: _propTypes["default"].bool,
  size: _propTypes["default"].string
};
StarRating.defaultProps = {
  step: 0.5,
  ratingAmount: 5,
  onRatingClick: function onRatingClick() {},
  disabled: false
};