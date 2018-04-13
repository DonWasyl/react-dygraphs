'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();

class ConstrainDateWindow {

  constructor(options = {}) {
    _initialiseProps.call(this);

    options = Object.assign({}, options, { constrainToData: true, minRangeWidth: 12 });
    this.updateOptions(options);
  }

}
exports.default = ConstrainDateWindow;

ConstrainDateWindow.toString = () => {
  return 'ConstrainDateWindow Plugin';
};

var _initialiseProps = function _initialiseProps() {
  this.updateOptions = options => {
    if (typeof options === 'object') {
      this.constrainToData = options.constrainToData;
      this.minRangeWidth = options.minRangeWidth;
    } else {
      throw new Error('Invalid options for ConstrainDateWindow plugin');
    }
  };

  this.activate = dygraph => {
    const predraw = e => {
      const plotArea = dygraph.layout_.getPlotArea();

      var _e$dygraph$xAxisExtre = e.dygraph.xAxisExtremes(),
          _e$dygraph$xAxisExtre2 = _slicedToArray(_e$dygraph$xAxisExtre, 2);

      const min = _e$dygraph$xAxisExtre2[0],
            max = _e$dygraph$xAxisExtre2[1];

      const factor = Math.floor((max - min) / plotArea.w);
      const minWindowInterval = factor * this.minRangeWidth;

      if (e.dygraph.rawData_ && e.dygraph.dateWindow_ !== undefined) {
        const dateWindow = e.dygraph.dateWindow_.slice(0);

        if (this.constrainToData) {
          if (e.dygraph.dateWindow_[1] > max) {
            dateWindow[1] = e.dygraph.rawData_[e.dygraph.rawData_.length - 1][0];
          }
          if (e.dygraph.dateWindow_[0] < min) {
            dateWindow[0] = e.dygraph.rawData_[0][0];
          }
        }

        const windowInterval = dateWindow[1] - dateWindow[0];

        if (windowInterval < minWindowInterval) {
          if (max - dateWindow[1] > dateWindow[0] - min) {
            dateWindow[1] += minWindowInterval - windowInterval;
          } else {
            dateWindow[0] -= minWindowInterval - windowInterval;
          }
        }

        e.dygraph.dateWindow_ = dateWindow;
      }
    };

    return { predraw };
  };
};