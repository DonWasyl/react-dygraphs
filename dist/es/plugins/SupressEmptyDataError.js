export default class SupressEmptyDataError {

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

SupressEmptyDataError.toString = () => {
  return 'SupressEmptyDataError Plugin';
};