'use strict'

const plugin = {
  id: 'whiskers',
  options: [],
  beforeInit: function (chart) {

  },
  afterDraw: function (chart) {
    console.log(chart)
    this.drawWhiskers(chart)
  },

  drawWhiskers: function (chart) {
    let ctx = chart.ctx
    let datasets = chart.config.data.datasets

    let xAxis = chart.scales['x-axis-0']
    let yAxis = chart.scales['y-axis-0']

    datasets.forEach(function (element, index, array) {
      if (element.whiskers) {
        let whiskers = element.whiskers

        console.log(element)

        element.data.forEach(function (element, index, array) {
          //  let barThickness = chart.getDatasetMeta(0).data[index]._view.height
          let centerY = yAxis.getPixelForValue(whiskers[index].mean)
          let centerX = xAxis.getPixelForTick(index)
          ctx.beginPath()
          ctx.strokeStyle = '#FF0000'
          ctx.fill()
          ctx.arc(centerX, centerY, 10, 0, 2 * Math.PI)
          ctx.stroke()
          console.log(centerX)
          console.log(centerY)
        })
      }
    })
  }
}

export default plugin
