'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
class ChartBackground {
  constructor(color = '#fff') {
    _initialiseProps.call(this);

    this.color = color;
  }

}
exports.default = ChartBackground;

ChartBackground.toString = () => {
  return 'ChartBackground Plugin';
};

var _initialiseProps = function _initialiseProps() {
  this.activate = dygraph => {
    const color = this.color;
    const originalCallback = dygraph.getFunctionOption('underlayCallback');

    let underlayCallback = function underlayCallback(ctx, area, dygraph) {
      ctx.fillStyle = color;
      ctx.fillRect(area.x, area.y, area.w, area.h);

      if (originalCallback) {
        originalCallback.call(this, ctx, area, dygraph);
      }
    };

    dygraph.updateOptions({ underlayCallback }, true);

    return {};
  };
};