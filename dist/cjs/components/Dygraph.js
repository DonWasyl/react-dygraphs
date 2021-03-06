'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _index = require('dygraphs/index.es5');

var _index2 = _interopRequireDefault(_index);

var _options = require('./Dygraph/options');

var _DayMarker = require('../plugins/DayMarker');

var _DayMarker2 = _interopRequireDefault(_DayMarker);

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

var _SupressEmptyDataError = require('../plugins/SupressEmptyDataError');

var _SupressEmptyDataError2 = _interopRequireDefault(_SupressEmptyDataError);

var _NoWarningRangeSelector = require('../plugins/NoWarningRangeSelector');

var _NoWarningRangeSelector2 = _interopRequireDefault(_NoWarningRangeSelector);

var _VisibilityRedraw = require('../plugins/VisibilityRedraw');

var _VisibilityRedraw2 = _interopRequireDefault(_VisibilityRedraw);

var _ConstrainDateWindow = require('../plugins/ConstrainDateWindow');

var _ConstrainDateWindow2 = _interopRequireDefault(_ConstrainDateWindow);

var _Optimized = require('../datahandler/Optimized');

var _Optimized2 = _interopRequireDefault(_Optimized);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

_index2.default.PLUGINS[_index2.default.PLUGINS.indexOf(_index2.default.Plugins.RangeSelector)] = _NoWarningRangeSelector2.default;

class InteractionModelProxy {
  constructor() {
    this._target = _index2.default.defaultInteractionModel;

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

  constructor(props) {
    super(props);
    this.displayName = 'Dygraph';
    this._interactionProxy = new InteractionModelProxy();
    this.state = { labels: [] };

    this.onLabelStateChange = this.onLabelStateChange.bind(this);
  }

  componentDidMount() {
    var _spreadKnownProps = (0, _options.spreadProps)(this.props, true);

    const initAttrs = _spreadKnownProps.known;

    this._interactionProxy._target = initAttrs.interactionModel || _index2.default.defaultInteractionModel;
    initAttrs.interactionModel = this._interactionProxy;

    if (!initAttrs.dataHandler) {
      initAttrs.dataHandler = _Optimized2.default;
    }

    if (!initAttrs.plugins) {
      initAttrs.plugins = [];
    }

    initAttrs.plugins.push(new _SupressEmptyDataError2.default());
    initAttrs.plugins.push(new _DateTickerWorkaround2.default());
    initAttrs.plugins.push(new _VisibilityRedraw2.default());

    if (this.props.dayMarker) {
      initAttrs.plugins.push(new _DayMarker2.default());
    }
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

    if (this.props.constrainDateWindow) {
      initAttrs.plugins.push(new _ConstrainDateWindow2.default());
    }

    this._dygraph = new _index2.default(this.root, this.props.data, initAttrs);

    const labels = this._dygraph.getLabels().slice(1).map(label => {
      return { name: label, color: this._dygraph.getPropertiesForSeries(label).color, checked: true };
    });

    this.setState({ labels });

    let dateWindow;
    const self = this;
    Object.defineProperty(this._dygraph, 'dateWindow_', {
      enumerable: true,
      get() {
        return dateWindow;
      },
      set(value) {
        if (dateWindow === undefined || dateWindow === null || value === undefined || value === null || value[0] !== dateWindow[0] || value[1] !== dateWindow[1]) {
          dateWindow = value;
          if (self.props.onDateWindowChanged) {
            self.props.onDateWindowChanged(value);
          }
        }
      }
    });
  }

  componentDidUpdate(prevProps) {
    if (this._dygraph) {
      var _spreadKnownProps2 = (0, _options.spreadProps)(this.props, false);

      const updateAttrs = _spreadKnownProps2.known;

      this._interactionProxy._target = updateAttrs.interactionModel || _index2.default.defaultInteractionModel;
      updateAttrs.interactionModel = this._interactionProxy;

      if (this.props.normalize && this.props.normalize !== prevProps.normalize) {
        this._dygraph.plugins_.find(p => p.plugin instanceof _Normalize2.default).plugin.updateOptions(this.props.normalize);
      }

      if (this.props.stickyEdges && this.props.stickyEdges !== prevProps.stickyEdges) {
        this._dygraph.plugins_.find(p => p.plugin instanceof _StickyEdges2.default).plugin.updateOptions(this.props.stickyEdges);
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

  onLabelStateChange(name, checked) {
    this.setState(oldState => {
      return {
        labels: oldState.labels.map((label, index) => {
          if (label.name === name) {
            this._dygraph.setVisibility(index, checked);

            return Object.assign({}, label, { checked });
          }

          return label;
        })
      };
    });
  }

  render() {
    let innerDivStyle = Object.assign({}, this.props.style);

    return _react2.default.createElement(
      'div',
      null,
      _react2.default.createElement('div', {
        ref: root => this.root = root,
        style: this.props.style
      }),
      this.props.renderSeriesToggle && this.props.renderSeriesToggle(this.state.labels, this.onLabelStateChange)
    );
  }
}
exports.default = Dygraph;
Dygraph.propTypes = Object.assign({
  fixedYAxis: _propTypes2.default.bool,
  chartBorder: _propTypes2.default.bool,
  chartBackground: _propTypes2.default.oneOfType([_propTypes2.default.bool, _propTypes2.default.string]),
  constrainDateWindow: _propTypes2.default.bool,
  dayMarker: _propTypes2.default.oneOfType([_propTypes2.default.bool, _propTypes2.default.shape({
    color: _propTypes2.default.string,
    dateFormatter: _propTypes2.default.func,
    font: _propTypes2.default.string,
    fontSize: _propTypes2.default.number,
    markerMargin: _propTypes2.default.number
  })]),
  downsample: _propTypes2.default.oneOfType([_propTypes2.default.bool, _propTypes2.default.shape({
    visibleThreshold: _propTypes2.default.number,
    invisibleThreshold: _propTypes2.default.number
  })]),
  normalize: _propTypes2.default.shape({
    notches: _propTypes2.default.number,
    ranges: _propTypes2.default.arrayOf(_propTypes2.default.arrayOf(_propTypes2.default.number)).isRequired
  }),
  onDateWindowChanged: _propTypes2.default.func,
  stickyEdges: _propTypes2.default.oneOfType([_propTypes2.default.bool, _propTypes2.default.shape({
    left: _propTypes2.default.bool,
    right: _propTypes2.default.bool
  })]),
  style: _propTypes2.default.object
}, _options.propTypes);