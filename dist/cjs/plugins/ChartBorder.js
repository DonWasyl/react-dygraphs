'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
class ChartBorder {
  constructor() {
    this.activate = dygraph => {
      const originalCallback = dygraph.getFunctionOption('underlayCallback');

      let underlayCallback = function underlayCallback(ctx, area, dygraph) {
        ctx.beginPath();
        ctx.strokeStyle = 'black';
        ctx.moveTo(area.x, area.y);
        ctx.lineTo(area.w, area.y);
        ctx.moveTo(area.w, area.y);
        ctx.lineTo(area.w, area.h);
        ctx.stroke();

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