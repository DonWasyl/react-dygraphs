import Dygraph from 'dygraphs';

export default class NoWarningRangeSelector extends Dygraph.Plugins.RangeSelector {
  constructor(...args) {
    var _temp;

    return _temp = super(...args), this.computeCombinedSeriesAndLimits_ = () => {
      if (this.dygraph_.numColumns() === 0) {
        return { data: [], yMin: Number.MAX_VALUE, yMax: -Number.MAX_VALUE };
      }

      return super.computeCombinedSeriesAndLimits_();
    }, _temp;
  }

}