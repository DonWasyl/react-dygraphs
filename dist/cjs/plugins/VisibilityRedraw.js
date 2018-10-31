'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _dygraphUtils = require('dygraphs/src/dygraph-utils');

/**
 * Attempts to fix Chrome canvas rendering issues when the window / tab
 * is inactive
 *
 * https://stackoverflow.com/questions/44156528/canvas-doesnt-repaint-when-tab-inactive-backgrounded-for-recording-webgl
 * https://bugs.chromium.org/p/chromium/issues/detail?id=639105
 */

const crossVisibilityChange = () => {
  if (typeof document.hidden !== 'undefined') {
    return 'visibilitychange';
  } else if (typeof document.msHidden !== 'undefined') {
    return 'msvisibilitychange';
  } else if (typeof document.webkitHidden !== 'undefined') {
    return 'webkitvisibilitychange';
  }
};

const crossHidden = () => {
  if (typeof document.hidden !== 'undefined') {
    return 'hidden';
  } else if (typeof document.msHidden !== 'undefined') {
    return 'msHidden';
  } else if (typeof document.webkitHidden !== 'undefined') {
    return 'webkitHidden';
  }
};

class VisibilityRedraw {
  constructor() {
    this.triggerRedraw = () => {
      this.dygraph.updateOptions({}, false);
    };

    this.handleVisibilityChange = e => {
      if (!document[crossHidden()]) {
        this.triggerRedraw();
      }
    };

    this.activate = dygraph => {
      this.dygraph = dygraph;

      (0, _dygraphUtils.addEvent)(window, 'focus', this.triggerRedraw);
      (0, _dygraphUtils.addEvent)(document, crossVisibilityChange(), this.handleVisibilityChange);

      return {};
    };

    this.destroy = e => {
      (0, _dygraphUtils.removeEvent)(window, 'focus', this.triggerRedraw);
      (0, _dygraphUtils.removeEvent)(document, crossVisibilityChange(), this.handleVisibilityChange);
    };
  }

}
exports.default = VisibilityRedraw;

VisibilityRedraw.toString = () => {
  return 'VisibilityRedraw Plugin';
};