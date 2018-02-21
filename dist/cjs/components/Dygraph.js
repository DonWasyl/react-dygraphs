'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _dygraphs = require('dygraphs');

var _dygraphs2 = _interopRequireDefault(_dygraphs);

var _options = require('./Dygraph/options');

var _ChartBackground = require('../plugins/ChartBackground');

var _ChartBackground2 = _interopRequireDefault(_ChartBackground);

var _ChartBorder = require('../plugins/ChartBorder');

var _ChartBorder2 = _interopRequireDefault(_ChartBorder);

var _FixedYAxis = require('../plugins/FixedYAxis');

var _FixedYAxis2 = _interopRequireDefault(_FixedYAxis);

var _Normalize = require('../plugins/Normalize');

var _Normalize2 = _interopRequireDefault(_Normalize);

var _Downsample = require('../plugins/Downsample');

var _Downsample2 = _interopRequireDefault(_Downsample);

var _StickyEdges = require('../plugins/StickyEdges');

var _StickyEdges2 = _interopRequireDefault(_StickyEdges);

var _DateTickerWorkaround = require('../plugins/DateTickerWorkaround');

var _DateTickerWorkaround2 = _interopRequireDefault(_DateTickerWorkaround);

var _Optimized = require('../datahandler/Optimized');

var _Optimized2 = _interopRequireDefault(_Optimized);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

class InteractionModelProxy {
  constructor() {
    this._target = _dygraphs2.default.defaultInteractionModel;

    for (const method of ['mousedown', 'touchstart', 'touchmove', 'touchend', 'dblclick']) {
      const thisProxy = this;
      this[method] = function (...args) {
        const calledContext = this;
        return thisProxy._target[method].call(calledContext, ...args);
      };
    }
    ['willDestroyContextMyself'].forEach(prop => {
      Object.defineProperty(this, prop, {
        configurable: false,
        enumerable: true,
        get: () => this._target[prop],
        set: value => this._target[prop] = value
      });
    });
  }

}

class Dygraph extends _react2.default.Component {
  constructor(...args) {
    var _temp;

    return _temp = super(...args), this.displayName = 'Dygraph', this._interactionProxy = new InteractionModelProxy(), _temp;
  }

  componentDidMount() {
    var _spreadKnownProps = (0, _options.spreadProps)(this.props, true);

    const initAttrs = _spreadKnownProps.known;

    this._interactionProxy._target = initAttrs.interactionModel || _dygraphs2.default.defaultInteractionModel;
    initAttrs.interactionModel = this._interactionProxy;

    if (!initAttrs.dataHandler) {
      initAttrs.dataHandler = _Optimized2.default;
    }

    if (!initAttrs.plugins) {
      initAttrs.plugins = [];
    }

    initAttrs.plugins.push(new _DateTickerWorkaround2.default());

    if (this.props.chartBorder) {
      initAttrs.plugins.push(new _ChartBorder2.default());
    }

    if (this.props.chartBackground) {
      if (typeof this.props.chartBackground === 'boolean') {
        initAttrs.plugins.push(new _ChartBackground2.default());
      } else {
        initAttrs.plugins.push(new _ChartBackground2.default(this.props.chartBackground));
      }
    }

    if (this.props.normalize) {
      initAttrs.plugins.push(new _Normalize2.default(this.props.normalize));
    }

    if (this.props.downsample) {
      let normalizeOPtions = this.props.downsample;

      if (typeof this.props.downsample === 'boolean') {
        normalizeOPtions = null;
      }

      initAttrs.plugins.push(new _Downsample2.default(normalizeOPtions));
    }

    if (this.props.fixedYAxis) {
      initAttrs.plugins.push(new _FixedYAxis2.default());
    }

    if (this.props.stickyEdges) {
      initAttrs.plugins.push(new _StickyEdges2.default(this.props.stickyEdges));
    }

    this._dygraph = new _dygraphs2.default(this.root, this.props.data, initAttrs);
  }

  componentWillUpdate(nextProps) {
    if (this._dygraph) {
      var _spreadKnownProps2 = (0, _options.spreadProps)(nextProps, false);

      const updateAttrs = _spreadKnownProps2.known;

      this._interactionProxy._target = updateAttrs.interactionModel || _dygraphs2.default.defaultInteractionModel;
      updateAttrs.interactionModel = this._interactionProxy;

      if (nextProps.normalize && nextProps.normalize !== this.props.normalize) {
        this._dygraph.plugins_.find(p => p.plugin instanceof _Normalize2.default).plugin.updateOptions(nextProps.normalize);
      }

      if (nextProps.stickyEdges && nextProps.stickyEdges !== this.props.stickyEdges) {
        this._dygraph.plugins_.find(p => p.plugin instanceof _StickyEdges2.default).plugin.updateOptions(nextProps.stickyEdges);
      }

      this._dygraph.updateOptions(updateAttrs);
    }
  }

  componentWillUnmount() {
    if (this._dygraph) {
      this._dygraph.destroy();
      this._dygraph = null;
    }
  }

  render() {
    return _react2.default.createElement('div', {
      ref: root => this.root = root,
      style: this.props.style
    });
  }
}
exports.default = Dygraph;
Dygraph.propTypes = Object.assign({
  fixedYAxis: _propTypes2.default.bool,
  chartBorder: _propTypes2.default.bool,
  chartBackground: _propTypes2.default.oneOfType([_propTypes2.default.bool, _propTypes2.default.string]),
  downsample: _propTypes2.default.oneOfType([_propTypes2.default.bool, _propTypes2.default.shape({
    visibleThreshold: _propTypes2.default.number,
    invisibleThreshold: _propTypes2.default.number
  })]),
  normalize: _propTypes2.default.shape({
    notches: _propTypes2.default.number,
    ranges: _propTypes2.default.arrayOf(_propTypes2.default.arrayOf(_propTypes2.default.number)).isRequired
  }),
  stickyEdges: _propTypes2.default.oneOfType([_propTypes2.default.bool, _propTypes2.default.shape({
    left: _propTypes2.default.bool,
    right: _propTypes2.default.bool
  })]),
  style: _propTypes2.default.object
}, _options.propTypes);