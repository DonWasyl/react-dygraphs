const getRangeMap = (dygraph, ranges) => dygraph.getOption('labels').slice(1).reduce((a, l, i) => {
  const min = +ranges[i][0];
  const max = +ranges[i][1];
  const normalizeRatio = 100 / (max - min);
  const formatRatio = (max - min) / 100;

  return Object.assign({
    [l]: {
      normalize: y => (y - min) * normalizeRatio,
      formatValue: y => y * formatRatio + min
    }
  }, a);
}, {});

export default class Normalize {

  constructor(options) {
    _initialiseProps.call(this);

    this.updateOptions(options);
  }

}

Normalize.toString = () => {
  return 'Normalize Plugin';
};

var _initialiseProps = function _initialiseProps() {
  this.updateOptions = options => {
    if (typeof options !== 'object' || options.ranges === undefined) {
      throw new Error('Normalize ranges must be provided');
    }

    this.notches = options.notches ? options.notches : 4;
    this.ranges = options.ranges;

    if (this.dygraph) {
      this.updateRangeMap();
    }
  };

  this.updateRangeMap = () => {
    this.rangeMap = getRangeMap(this.dygraph, this.ranges);
  };

  this.activate = dygraph => {
    this.dygraph = dygraph;
    this.updateRangeMap();
    const $this = this;

    const seriesToPoints = function seriesToPoints(series, setName, boundaryIdStart) {
      const points = [];

      for (let i = 0; i < series.length; ++i) {
        points.push({
          x: NaN,
          y: NaN,
          xval: series[i][0] === null ? null : series[i][0],
          yval: series[i][1] === null ? null : $this.rangeMap[setName].normalize(series[i][1]),
          name: setName, // TODO(danvk): is this really necessary?
          idx: i + boundaryIdStart,
          canvasx: NaN,
          canvasy: NaN
        });
      }

      this.onPointsCreated_(series, points);
      return points;
    };

    const axes = dygraph.getOption('axes');
    const originalHighlightCabllack = dygraph.getFunctionOption('highlightCallback');
    let highlightCallback;

    if (originalHighlightCabllack) {
      highlightCallback = (event, x, points, row, seriesName) => {
        originalHighlightCabllack.call(dygraph, event, x, points.map(point => Object.assign({}, point, {
          yval: $this.rangeMap[point.name].formatValue(point.yval)
        })), row, seriesName);
      };
    }

    axes.y.valueFormatter = (y, opts, seriesName) => {
      return $this.rangeMap[seriesName].formatValue(y);
    };

    axes.y.ticker = () => [...Array(this.notches + 1).keys()].map(n => {
      const value = n / this.notches * 100;

      return {
        v: value,
        label: value
      };
    });

    dygraph.updateOptions({ axes, valueRange: [0, 100] }, true);

    const predraw = e => {
      if (highlightCallback) {
        e.dygraph.attributes_.user_.highlightCallback = highlightCallback;
      }
      e.dygraph.dataHandler_.seriesToPoints = seriesToPoints.bind(e.dygraph.dataHandler_);
    };

    return { predraw };
  };
};