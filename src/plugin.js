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

    datasets.forEach(function (element, index, array) {
      if (element.whiskers) {
        let datasetIndex = index
        let whiskers = element.whiskers
        element.data.forEach(function (element, index, array) {
          let metaData = chart.getDatasetMeta(datasetIndex)
          let barThickness = metaData.data[index]._view.height

          // drawing main error lines
          let centerY = metaData.data[index]._view.y
          let minX = xAxis.getPixelForValue(whiskers[index].min)
          let maxX = xAxis.getPixelForValue(whiskers[index].max)
          ctx.beginPath()
          ctx.lineWidth = options.lineWidth
          ctx.strokeStyle = options.color
          ctx.moveTo(minX, centerY)
          ctx.lineTo(maxX, centerY)
          ctx.stroke()

          // drawing min-whiskers
          ctx.beginPath()
          ctx.lineWidth = options.lineWidth
          ctx.strokeStyle = options.color
          ctx.moveTo(minX, centerY + barThickness / 5)
          ctx.lineTo(minX, centerY - barThickness / 5)
          ctx.stroke()

          // drawing max-whsikers
          ctx.beginPath()
          ctx.lineWidth = options.lineWidth
          ctx.strokeStyle = options.color
          ctx.moveTo(maxX, centerY + barThickness / 5)
          ctx.lineTo(maxX, centerY - barThickness / 5)
          ctx.stroke()

          // drawing circles
          ctx.beginPath()
          let centerX = xAxis.getPixelForValue(whiskers[index].mean)
          ctx.arc(centerX, centerY, options.lineWidth, 0, 2 * Math.PI)
          ctx.fillStyle = options.color
          ctx.strokeStyle = options.color
          ctx.stroke()
          ctx.fill()

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
    let options = this.options
    let legend = chart.legend
    let legendLeft = legend.left
    let legendWidth = legend.width
    let legendElementHeight = legend.legendHitBoxes[0].height
    let legendTop = 0
    legend.legendHitBoxes.forEach(function (element, index, array) {
      legendTop = legendTop + element.top
    })
  },
  drawWhisker: function (minX, maxX, y, thickness) {

  }
}

export default plugin
