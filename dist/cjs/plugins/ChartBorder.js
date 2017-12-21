'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
class ChartBorder {
  constructor() {
    this.activate = dygraph => {
      const originalCallback = dygraph.getFunctionOption('underlayCallback');

      let underlayCallback = function underlayCallback(ctx, area, dygraph) {
        ctx.strokeStyle = 'black';
        ctx.strokeRect(area.x, area.y, area.w, area.h);

        if (originalCallback) {
          originalCallback.call(this, ctx, area, dygraph);
        }
      };

      dygraph.updateOptions({ underlayCallback }, true);

      return {};
    };
  }

}
exports.default = ChartBorder;

ChartBorder.toString = () => {
  return 'ChartBorder Plugin';
};