import Dygraphs from 'dygraphs/index.es5';

const parseFloat = val => val === null ? NaN : val;

// https://github.com/danvk/dygraphs/pull/896
export default class OptimizedDataHandler extends Dygraphs.DataHandlers.DefaultHandler {
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