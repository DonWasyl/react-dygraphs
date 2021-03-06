'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _index = require('dygraphs/index.es5');

var _index2 = _interopRequireDefault(_index);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

class NoWarningRangeSelector extends _index2.default.Plugins.RangeSelector {
  constructor(...args) {
    var _temp;

    return _temp = super(...args), this.computeCombinedSeriesAndLimits_ = () => {
      if (this.dygraph_.numColumns() === 0) {
        return { data: [], yMin: Number.MAX_VALUE, yMax: -Number.MAX_VALUE };
      }

      return super.computeCombinedSeriesAndLimits_();
    }, _temp;
  }

}
exports.default = NoWarningRangeSelector;