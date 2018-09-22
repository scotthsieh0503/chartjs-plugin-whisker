'use strict'

const plugin = {
  id: 'whiskers',
  options: {},

  beforeInit: function (chart) {
    this.options = chart.chart.config.options.plugins.whiskers
  },
  afterDraw: function (chart) {
    this.drawWhiskers(chart)
    this.drawingLegend(chart)
  },
  drawWhiskers: function (chart) {
    let ctx = chart.ctx
    let datasets = chart.config.data.datasets
    let options = this.options
    let xAxis = chart.scales['x-axis-0']
    let _this = this

    datasets.forEach(function (element, index, array) {
      if (element.whiskers) {
        let datasetIndex = index
        let whiskers = element.whiskers
        element.data.forEach(function (element, index, array) {
          let metaData = chart.getDatasetMeta(datasetIndex)
          let barThickness = metaData.data[index]._view.height
          let centerY = metaData.data[index]._view.y
          let minX = xAxis.getPixelForValue(whiskers[index].min)
          let maxX = xAxis.getPixelForValue(whiskers[index].max)
          let centerX = xAxis.getPixelForValue(whiskers[index].mean)

          // Drawing drawWhiskers
          _this.drawWhisker(ctx, minX, maxX, centerX, centerY, barThickness / 5)

          // drawing average labels
          let labelX = maxX + 10
          ctx.beginPath()
          ctx.textBaseline = 'middle'
          ctx.font = barThickness / 2 + 'px ' + options.fontFamily
          ctx.fillText(whiskers[index].mean, labelX, centerY)
          ctx.stroke()
          ctx.fill()
        })
      }
    })
  },
  drawingLegend: function (chart) {
    let ctx = chart.ctx
    let legend = chart.legend
    let legendLeft = legend.left + 10 // add 10px padding to the left
    let legendWidth = legend.width * 0.8
    let legendElementHeight = legend.legendHitBoxes[0].height
    let legendTop = 0

    // calculate position of the whisker on legend
    legendTop = legend.legendHitBoxes[legend.legendHitBoxes.length - 1].top + 3 * legendElementHeight
    this.drawWhisker(ctx, legendLeft, legendLeft + legendWidth, legendLeft + legendWidth / 2, legendTop, legendElementHeight / 2)

    // draw legend labels
    let labelY = legendTop + 2 * legendElementHeight
    ctx.beginPath()
    ctx.textBaseline = 'middle'
    ctx.textAlign = 'center'
    ctx.font = legendElementHeight * 0.75 + 'px ' + this.options.fontFamily
    ctx.fillText('Average', legendLeft + legendWidth / 2, labelY)
    ctx.fillText('-1 STD', legendLeft, labelY)
    ctx.fillText('+1 STD', legendLeft + legendWidth, labelY)
    ctx.stroke()
    ctx.fill()
  },
  drawWhisker: function (ctx, minX, maxX, centerX, y, thickness) {
    // drawing main error lines
    ctx.beginPath()
    ctx.lineWidth = this.options.lineWidth
    ctx.strokeStyle = this.options.color
    ctx.moveTo(minX, y)
    ctx.lineTo(maxX, y)
    ctx.stroke()

    // drawing min-whiskers
    ctx.beginPath()
    ctx.lineWidth = this.options.lineWidth
    ctx.strokeStyle = this.options.color
    ctx.moveTo(minX, y - thickness)
    ctx.lineTo(minX, y + thickness)
    ctx.stroke()

    // drawing max-whsikers
    ctx.beginPath()
    ctx.lineWidth = this.options.lineWidth
    ctx.strokeStyle = this.options.color
    ctx.moveTo(maxX, y + thickness)
    ctx.lineTo(maxX, y - thickness)
    ctx.stroke()

    // drawing circles
    ctx.beginPath()
    ctx.arc(centerX, y, this.options.lineWidth, 0, 2 * Math.PI)
    ctx.fillStyle = this.options.color
    ctx.strokeStyle = this.options.color
    ctx.stroke()
    ctx.fill()
  }
}

export default plugin
