'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _dygraphs = require('dygraphs');

var _dygraphs2 = _interopRequireDefault(_dygraphs);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const parseFloat = val => val === null ? NaN : val;

// https://github.com/danvk/dygraphs/pull/896
class OptimizedDataHandler extends _dygraphs2.default.DataHandlers.DefaultHandler {
  constructor(...args) {
    var _temp;

    return _temp = super(...args), this.seriesToPoints = (series, setName, boundaryIdStart) => {
      const points = [];

      for (let i = 0; i < series.length; ++i) {
        points.push({
          x: NaN,
          y: NaN,
          xval: parseFloat(series[i][0]),
          yval: series[i][1] === null ? null : parseFloat(series[i][1]),
          name: setName,
          idx: i + boundaryIdStart,
          canvasx: NaN,
          canvasy: NaN
        });
      }

      this.onPointsCreated_(series, points);

      return points;
    }, _temp;
  }

}
exports.default = OptimizedDataHandler;