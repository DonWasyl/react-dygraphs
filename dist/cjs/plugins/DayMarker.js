'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();

var _dygraphUtils = require('dygraphs/src/dygraph-utils');

var _dygraphTickers = require('dygraphs/src/dygraph-tickers');

var _DateWorkaround = require('../Ticker/DateWorkaround');

class DayMarker {

  constructor(options = {}) {
    this.findDateX = timestamp => {
      if (timestamp > this.max) {
        return null;
      }

      if (timestamp < this.min) {
        timestamp = this.min;
      }

      return Math.floor((timestamp - this.min) / this.factor) + this.dygraph.layout_.getPlotArea().x;
    };

    this.activate = dygraph => {
      this.dygraph = dygraph;

      const originalCallback = dygraph.getFunctionOption('underlayCallback');

      let underlayCallback = (ctx, area, dygraph) => {
        if (dygraph.dateWindow_) {
          this.min = dygraph.dateWindow_[0];
          this.max = dygraph.dateWindow_[1];
        } else {
          var _dygraph$xAxisExtreme = dygraph.xAxisExtremes();

          var _dygraph$xAxisExtreme2 = _slicedToArray(_dygraph$xAxisExtreme, 2);

          this.min = _dygraph$xAxisExtreme2[0];
          this.max = _dygraph$xAxisExtreme2[1];
        }

        const plotAreaWidth = dygraph.layout_.getPlotArea().w;
        this.factor = Math.floor((this.max - this.min) / plotAreaWidth);
        const granularity = (0, _DateWorkaround.pickDateTickGranularity)(this.min, this.max, plotAreaWidth, dygraph.optionsViewForAxis_('x'));

        const step = this.getStepByGranularityAndFactor(granularity, this.factor);

        const temp = new Date(this.min);
        temp.setHours(0);
        temp.setMinutes(0);
        temp.setSeconds(0);
        temp.setMilliseconds(0);
        temp.setDate(1);
        temp.setDate(temp.getDate() - temp.getDay());

        if (granularity < _dygraphTickers.Granularity.WEEKLY && granularity > _dygraphTickers.Granularity.SIX_HOURLY) {
          temp.setDate(temp.getDate() + temp.getDate() % 2);
        }

        const toDraw = [{
          x: this.findDateX(this.min),
          date: new Date(this.min)
        }];

        while (temp.getTime() < this.max) {
          const pos = this.findDateX(temp.getTime());

          if (temp.getTime() > this.min) {
            toDraw.push({
              x: pos,
              date: new Date(temp.getTime())
            });
          }

          temp.setDate(temp.getDate() + step);
        }

        ctx.fillStyle = this.options.color;
        ctx.font = this.options.fontSize + 'px ' + this.options.font;

        for (let i = 0; i < toDraw.length; i++) {
          const text = this.options.dateFormatter(toDraw[i].date);
          const metrics = ctx.measureText(text);

          let pos = toDraw[i].x + this.options.markerMargin;

          if (i + 1 < toDraw.length) {
            pos = Math.min(pos, toDraw[i + 1].x - metrics.width - this.options.markerMargin);
          }

          ctx.fillText(text, pos, this.options.fontSize);
        }

        if (originalCallback) {
          originalCallback.call(dygraph, ctx, area, dygraph);
        }
      };

      dygraph.updateOptions({ underlayCallback }, true);

      return {};
    };

    this.options = Object.assign({}, options, DayMarker.defaultOptions);
  }

  static formatDate(date) {
    return (0, _dygraphUtils.zeropad)(date.getDate()) + '/' + (0, _dygraphUtils.zeropad)(date.getMonth() + 1);
  }

  getStepByGranularityAndFactor(granularity, factor) {
    if (granularity <= _dygraphTickers.Granularity.SIX_HOURLY) {
      return 1;
    } else if (granularity <= _dygraphTickers.Granularity.TWO_DAILY) {
      if (factor < 750000) {
        return 2;
      }

      return 4;
    }

    return 7;
  }

}
exports.default = DayMarker;
DayMarker.defaultOptions = {
  color: 'rgba(0, 0, 0, 0.4)',
  dateFormatter: DayMarker.formatDate,
  font: 'sans-serif',
  fontSize: 32,
  markerMargin: 10
};

DayMarker.toString = () => {
  return 'DayMarker Plugin';
};