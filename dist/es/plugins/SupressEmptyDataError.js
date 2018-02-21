import Dygraphs from 'dygraphs';

export default class DateTickerWorkaround {

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

DateTickerWorkaround.toString = () => {
  return 'SupressEmptyDataError Plugin';
};