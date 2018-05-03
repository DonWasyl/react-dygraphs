export default class DayMarker {
  constructor (color = 'rgba(0, 0, 0, 0.4)') {
    this.color = color
  }

  static toString = () => {
    return 'DayMarker Plugin'
  }

  findDateX = (timestamp) => {
    if (timestamp > this.max) {
      return null
    }

    if (timestamp < this.min) {
      timestamp = this.min
    }

    return Math.floor((timestamp - this.min) / this.factor) + this.dygraph.layout_.getPlotArea().x
  }

  drawDate = (ctx, x, text) => {
    const fontSize = 32

    ctx.fillStyle = this.color
    ctx.font = fontSize + 'px sans serif'
    ctx.fillText(text, x + 10, fontSize)
  }

  activate = (dygraph) => {
    this.dygraph = dygraph

    const originalCallback = dygraph.getFunctionOption('underlayCallback')

    let underlayCallback = (ctx, area, dygraph) => {
      if (dygraph.dateWindow_) {
        this.min = dygraph.dateWindow_[0]
        this.max = dygraph.dateWindow_[1]
      } else {
        [this.min, this.max] = dygraph.xAxisExtremes()
      }

      this.factor = Math.floor((this.max - this.min) / dygraph.layout_.getPlotArea().w)

      const temp = new Date(this.min)
      temp.setHours(0)
      temp.setMinutes(0)
      temp.setSeconds(0)
      temp.setMilliseconds(0)

      while (temp.getTime() < this.max) {
        const pos = this.findDateX(temp.getTime())

        this.drawDate(ctx, pos, temp.getDate())
        temp.setDate(temp.getDate() + 1)
      }

      if (originalCallback) {
        originalCallback.call(dygraph, ctx, area, dygraph)
      }
    }

    dygraph.updateOptions({ underlayCallback }, true)

    return {}
  }
}
