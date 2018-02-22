export default class VisibilityRedraw {

  activate(dygraph) {
    let hidden, visibilityChange;

    if (typeof document.hidden !== 'undefined') {
      hidden = 'hidden';
      visibilityChange = 'visibilitychange';
    } else if (typeof document.msHidden !== 'undefined') {
      hidden = 'msHidden';
      visibilityChange = 'msvisibilitychange';
    } else if (typeof document.webkitHidden !== 'undefined') {
      hidden = 'webkitHidden';
      visibilityChange = 'webkitvisibilitychange';
    }

    const handleVisibilityChange = e => {
      if (!document[hidden]) {
        dygraph.updateOptions({}, false);
      }
    };

    document.addEventListener(visibilityChange, handleVisibilityChange, false);
  }
}

VisibilityRedraw.toString = () => {
  return 'VisibilityRedraw Plugin';
};