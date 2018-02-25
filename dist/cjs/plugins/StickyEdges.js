'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();

class StickyEdges {

  constructor({ right = true, left = false } = {}) {
    this.updateOptions = options => {
      if (typeof options === 'boolean') {
        this.stickyRight = options;
        this.stickyLeft = options;
      } else if (typeof options === 'object') {
        this.stickyRight = !!options.right;
        this.stickyLeft = !!options.left;
      } else {
        throw new Error('Invalid options for StickyEdges plugin');
      }
    };

    this.activate = dygraph => {
      let shouldStickRight = false;
      let shouldStickLeft = false;

      const dataWillUpdate = e => {
        if (e.dygraph.rawData_) {
          var _e$dygraph$xAxisExtre = e.dygraph.xAxisExtremes(),
              _e$dygraph$xAxisExtre2 = _slicedToArray(_e$dygraph$xAxisExtre, 2);

          const min = _e$dygraph$xAxisExtre2[0],
                max = _e$dygraph$xAxisExtre2[1];


          if (e.dygraph.dateWindow_ === undefined) {
            e.dygraph.dateWindow_ = [min, max];
          }

          if (this.stickyRight) {
            shouldStickRight = e.dygraph.dateWindow_[1] === max;
          }

          if (this.stickyLeft) {
            shouldStickLeft = e.dygraph.dateWindow_[0] === min;
          }
        }
      };

      const predraw = e => {
        if (e.dygraph.rawData_ && e.dygraph.dateWindow_ !== undefined) {
          const dateWindow = e.dygraph.dateWindow_.slice(0);

          if (shouldStickRight) {
            dateWindow[1] = e.dygraph.rawData_[e.dygraph.rawData_.length - 1][0];
          }
          if (shouldStickLeft) {
            dateWindow[0] = e.dygraph.rawData_[0][0];
          }

          e.dygraph.dateWindow_ = dateWindow;
        }
      };

      return { dataWillUpdate, predraw };
    };

    this.updateOptions(arguments[0]);
  }

}
exports.default = StickyEdges;

StickyEdges.toString = () => {
  return 'StickyEdges Plugin';
};