'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _dygraphUtils = require('dygraphs/src/dygraph-utils');

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
    this.activate = dygraph => {
      this.handleVisibilityChange = e => {
        if (!document[crossHidden()]) {
          dygraph.updateOptions({}, false);
        }
      };

      (0, _dygraphUtils.addEvent)(document, crossVisibilityChange(), this.handleVisibilityChange);
    };

    this.destroy = e => {
      (0, _dygraphUtils.removeEvent)(document, crossVisibilityChange(), this.handleVisibilityChange);
    };
  }

}
exports.default = VisibilityRedraw;

VisibilityRedraw.toString = () => {
  return 'VisibilityRedraw Plugin';
};