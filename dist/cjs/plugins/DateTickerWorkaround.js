'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _dygraphs = require('dygraphs');

var _dygraphs2 = _interopRequireDefault(_dygraphs);

var _DateWorkaround = require('../Ticker/DateWorkaround');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// https://github.com/danvk/dygraphs/pull/912
class DateTickerWorkaround {

  activate(dygraph) {
    const originalOptionsViewForAxis = dygraph.optionsViewForAxis_;
    dygraph.optionsViewForAxis_ = axis => {
      const original = originalOptionsViewForAxis.call(dygraph, axis);

      if (axis !== 'x') {
        return original;
      }

      return opt => {
        if (opt === 'ticker') {
          if (original.call(dygraph, opt) === _dygraphs2.default.dateTicker) {
            return _DateWorkaround.dateTicker;
          }
        }

        return original.call(dygraph, opt);
      };
    };

    return {};
  }
}
exports.default = DateTickerWorkaround;

DateTickerWorkaround.toString = () => {
  return 'DateTickerWorkaround Plugin';
};