var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();

import Downsampler from 'downsample-lttb';
import { addEvent, removeEvent } from 'dygraphs/src/dygraph-utils';
import Dygraphs from 'dygraphs/index.es5';

const getRangeSelectorCanvas = dygraph => {
  return dygraph.plugins_.find(p => p.plugin instanceof Dygraphs.Plugins.RangeSelector).plugin.fgcanvas_;
};

export default class Downsample {

  constructor(options) {
    this.mousedownHandler = e => {
      this.mousedown = true;
    };

    this.mouseupHandler = e => {
      if (this.mousedown) {
        this.dygraph.updateOptions({ file: this.dygraph.file_ }, false);
        this.mousedown = false;
      }
    };

    this.rangeSelectorHandler = e => {
      this.mousedown = true;
    };

    this.activate = dygraph => {
      let from;
      let to;

      const extractSeries = (rawData, seriesIndex, options) => {
        let newData = [];
        const series = [];

        for (let i = 0; i < rawData.length; i++) {
          series.push([rawData[i][0], rawData[i][seriesIndex]]);
        }

        let leftBoundary = series.findIndex(data => data[0] >= from);
        let rightBoundary = series.findIndex(data => data[0] >= to);

        if (leftBoundary > 0) {
          newData = newData.concat(Downsampler.processData(series.slice(0, leftBoundary), this.invisibleThreshold));
        }

        newData = newData.concat(Downsampler.processData(series.slice(leftBoundary, rightBoundary), this.visibleThreshold));

        if (rightBoundary < series.length) {
          newData = newData.concat(Downsampler.processData(series.slice(rightBoundary), this.invisibleThreshold));
        }

        return newData;
      };

      this.dygraph = dygraph;

      this.events = [[dygraph.maindiv_, 'mousedown', this.mousedownHandler], [window, 'mouseup', this.mouseupHandler]];

      if (dygraph.getBooleanOption('showRangeSelector')) {
        this.events.push([getRangeSelectorCanvas(this.dygraph), 'mousedown', this.rangeSelectorHandler]);
      }

      this.events.map(e => addEvent(...e));

      const predraw = e => {
        var _e$dygraph$xAxisRange = e.dygraph.xAxisRange();

        var _e$dygraph$xAxisRange2 = _slicedToArray(_e$dygraph$xAxisRange, 2);

        from = _e$dygraph$xAxisRange2[0];
        to = _e$dygraph$xAxisRange2[1];


        e.dygraph.dataHandler_.extractSeries = extractSeries;
      };

      return { predraw };
    };

    this.destroy = e => {
      this.events.map(e => removeEvent(...e));
    };

    this.visibleThreshold = Infinity;
    this.invisibleThreshold = 100;
    this.mousedown = false;
    this.dygraph = null;

    if (options) {
      if (options.visibleThreshold) {
        this.visibleThreshold = options.visibleThreshold;
      }

      if (options.invisibleThreshold) {
        this.invisibleThreshold = options.invisibleThreshold;
      }
    }
  }

}

Downsample.toString = () => {
  return 'Downsample Plugin';
};