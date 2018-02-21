'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _dygraphs = require('dygraphs');

var _dygraphs2 = _interopRequireDefault(_dygraphs);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

class DateTickerWorkaround {

  activate(dygraph) {
    const originalParseArray = dygraph.parseArray_;
    dygraph.parseArray_ = data => {
      if (data.length === 0) {
        return null;
      }

      return originalParseArray.call(dygraph, data);
    };

    return {};
  }
}
exports.default = DateTickerWorkaround;

DateTickerWorkaround.toString = () => {
  return 'SupressEmptyDataError Plugin';
};