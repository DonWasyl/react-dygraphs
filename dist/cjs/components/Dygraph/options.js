'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.spreadProps = exports.propMap = exports.propTypes = exports.options = undefined;

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const options = {
  animatedZooms: { type: _propTypes2.default.boolean },
  annotationClickHandler: { type: _propTypes2.default.func, rename: 'onAnnotationClick' },
  annotationDblClickHandler: { type: _propTypes2.default.func, rename: 'onAnnotationDblClick' },
  annotationMouseOutHandler: { type: _propTypes2.default.func, rename: 'onAnnotationMouseOut' },
  annotationMouseOverHandler: { type: _propTypes2.default.func, rename: 'onAnnotationMouseOver' },
  axes: true,
  axis: { type: _propTypes2.default.string },
  axisLabelColor: true,
  axisLabelFontSize: { type: _propTypes2.default.number },
  axisLabelFormatter: true,
  axisLabelWidth: { type: _propTypes2.default.number },
  axisLineColor: true,
  axisLineWidth: { type: _propTypes2.default.number },
  axisTickSize: { type: _propTypes2.default.number },
  clickCallback: { type: _propTypes2.default.func, rename: 'onClick' },
  color: true,
  colorSaturation: { type: _propTypes2.default.number },
  colorValue: { type: _propTypes2.default.number },
  colors: true,
  connectSeparatedPoints: { type: _propTypes2.default.boolean },
  customBars: { type: _propTypes2.default.boolean },
  dataHandler: true,
  dateWindow: true,
  delimiter: { type: _propTypes2.default.string },
  digitsAfterDecimal: { type: _propTypes2.default.number },
  displayAnnotations: { type: _propTypes2.default.boolean },
  drawAxesAtZero: { type: _propTypes2.default.boolean },
  drawAxis: { type: _propTypes2.default.boolean },
  drawCallback: { type: _propTypes2.default.func },
  drawGapEdgePoints: { type: _propTypes2.default.boolean },
  drawGrid: { type: _propTypes2.default.boolean },
  drawHighlightPointCallback: { type: _propTypes2.default.func },
  drawPointCallback: { type: _propTypes2.default.func },
  drawPoints: { type: _propTypes2.default.boolean },
  errorBars: { type: _propTypes2.default.boolean },
  file: {
    type: _propTypes2.default.oneOfType([_propTypes2.default.string /* CSV or URL */
    , _propTypes2.default.array, _propTypes2.default.func]).isRequired,
    rename: 'data',
    hideOnInit: true
  },
  fillAlpha: { type: _propTypes2.default.number },
  fillGraph: { type: _propTypes2.default.boolean },
  fractions: { type: _propTypes2.default.boolean },
  gapThreshold: { type: _propTypes2.default.number },
  gridLineColor: true,
  gridLinePattern: { type: _propTypes2.default.arrayOf(_propTypes2.default.number) },
  gridLineWidth: { type: _propTypes2.default.number },
  height: { type: _propTypes2.default.number },
  hideOverlayOnMouseOut: { type: _propTypes2.default.boolean },
  highlightCallback: { type: _propTypes2.default.func, rename: 'onHighlight' },
  highlightCircleSize: true,
  highlightSeriesBackgroundAlpha: true,
  highlightSeriesOpts: true,
  includeZero: { type: _propTypes2.default.boolean },
  independentTicks: { type: _propTypes2.default.boolean },
  interactionModel: true,
  isZoomedIgnoreProgrammaticZoom: true,
  labels: { type: _propTypes2.default.arrayOf(_propTypes2.default.string) },
  labelsDiv: true,
  labelsKMB: { type: _propTypes2.default.boolean },
  labelsKMG2: { type: _propTypes2.default.boolean },
  labelsSeparateLines: { type: _propTypes2.default.boolean },
  labelsShowZeroValues: { type: _propTypes2.default.boolean },
  labelsUTC: { type: _propTypes2.default.boolean },
  legend: _propTypes2.default.oneOf(['onmouseover', 'always', 'follow', 'never']),
  legendFormatter: { type: _propTypes2.default.func },
  logscale: { type: _propTypes2.default.boolean },
  maxNumberWidth: { type: _propTypes2.default.number },
  panEdgeFraction: { type: _propTypes2.default.number },
  pixelsPerLabel: { type: _propTypes2.default.number },
  plotter: { type: _propTypes2.default.oneOfType([_propTypes2.default.func, _propTypes2.default.arrayOf(_propTypes2.default.func)]) },
  plugins: true,
  pointClickCallback: { type: _propTypes2.default.func, rename: 'onPointClick' },
  pointSize: { type: _propTypes2.default.number },
  rangeSelectorHeight: { type: _propTypes2.default.number },
  rangeSelectorPlotFillColor: true,
  rangeSelectorPlotStrokeColor: true,
  rightGap: { type: _propTypes2.default.number },
  rollPeriod: { type: _propTypes2.default.number },
  series: true,
  showInRangeSelector: { type: _propTypes2.default.boolean },
  showLabelsOnHighlight: { type: _propTypes2.default.boolean },
  showRangeSelector: { type: _propTypes2.default.boolean },
  showRoller: { type: _propTypes2.default.boolean },
  sigFigs: { type: _propTypes2.default.number },
  sigma: { type: _propTypes2.default.number },
  stackedGraph: { type: _propTypes2.default.boolean },
  stackedGraphNaNFill: true,
  stepPlot: { type: _propTypes2.default.boolean },
  strokeBorderColor: true,
  strokeBorderWidth: { type: _propTypes2.default.number },
  strokePattern: true,
  strokeWidth: { type: _propTypes2.default.number },
  ticker: true,
  timingName: true,
  title: true,
  titleHeight: { type: _propTypes2.default.number },
  underlayCallback: { type: _propTypes2.default.func },
  unhighlightCallback: { type: _propTypes2.default.func, rename: 'onUnhighlight' },
  valueFormatter: true,
  valueRange: true,
  visibility: { type: _propTypes2.default.array },
  width: { type: _propTypes2.default.number },
  wilsonInterval: true,
  xAxisHeight: { type: _propTypes2.default.number },
  xLabelHeight: { type: _propTypes2.default.number },
  xRangePad: { type: _propTypes2.default.number },
  xValueParser: true,
  xlabel: true,
  y2label: true,
  yLabelWidth: { type: _propTypes2.default.number },
  yRangePad: { type: _propTypes2.default.number },
  ylabel: true,
  zoomCallback: { type: _propTypes2.default.func, rename: 'onZoom' }
};

function getPropType(optionPropConfig) {
  if (!optionPropConfig) {
    return undefined;
  } else if (optionPropConfig === true) {
    return _propTypes2.default.any;
  } else if (optionPropConfig.private) {
    return undefined;
  } else if (!optionPropConfig.type) {
    return _propTypes2.default.any;
  }

  return optionPropConfig.type;
}

function getPropName(optionPropConfig, optionName) {
  if (!optionPropConfig || optionPropConfig === true) {
    return optionName;
  } else if (typeof optionPropConfig.rename === 'string') {
    return optionPropConfig.rename;
  }

  return optionName;
}

function optionIsPrivate(optionPropConfig) {
  if (optionPropConfig === false) {
    return true;
  } else if (!optionPropConfig) {
    return undefined;
  } else if (optionPropConfig === true) {
    return false;
  }

  return optionPropConfig.private;
}

function optionHideOnInit(optionPropConfig) {
  if (optionPropConfig === false) {
    return false;
  } else if (!optionPropConfig) {
    return false;
  } else if (optionPropConfig === true) {
    return false;
  }

  return optionPropConfig.hideOnInit;
}

function getReactPropTypes(options) {
  const props = {};
  for (const optionName in options) {
    const option = options[optionName];
    if (option && !optionIsPrivate(option)) {
      const propName = getPropName(option, optionName);
      props[propName] = getPropType(option);
    }
  }
  return props;
}

function getPropMap(options) {
  const propMap = {};
  for (const optionName in options) {
    const option = options[optionName];
    if (option) {
      const propName = getPropName(option, optionName);
      propMap[propName] = optionName;
    }
  }
  return propMap;
}

const propMap = getPropMap(options);

function spreadProps(props, isInit) {
  const known = {};
  const rest = {};

  for (const propName in props) {
    const isDygraphsProp = !!propMap[propName];
    if (isDygraphsProp) {
      if (isInit && optionHideOnInit(options[propMap[propName]]) || optionIsPrivate(options[propMap[propName]])) {
        continue;
      }
    }
    let target = isDygraphsProp ? known : rest;
    const nameOut = isDygraphsProp ? propMap[propName] : propName;
    target[nameOut] = props[propName];
  }
  return { known, rest };
}

const propTypes = getReactPropTypes(options);

exports.default = options;
exports.options = options;
exports.propTypes = propTypes;
exports.propMap = propMap;
exports.spreadProps = spreadProps;