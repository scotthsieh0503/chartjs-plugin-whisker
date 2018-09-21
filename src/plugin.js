'use strict'

const plugin = {
  id: 'whiskers',
  options: [],
  beforeInit: function (chart) {

  },
  afterDraw: function (chart) {
    this.drawWhiskers(chart)
  },

  drawWhiskers: function (chart) {
    let ctx = chart.ctx
    let datasets = chart.config.data.datasets

    let xAxis = chart.scales['x-axis-0']

    datasets.forEach(function (element, index, array) {
      if (element.whiskers) {
        let datasetIndex = index
        let whiskers = element.whiskers
        element.data.forEach(function (element, index, array) {
          let metaData = chart.getDatasetMeta(datasetIndex)
          let dataIndex = index
          //  let barThickness = chart.getDatasetMeta(0).data[index]._view.height
          console.log(chart.getDatasetMeta(datasetIndex))
          let centerY = metaData.data[dataIndex]._view.y
          let centerX = xAxis.getPixelForValue(whiskers[index].mean)
          ctx.beginPath()
          ctx.arc(centerX, centerY, 3, 0, 2 * Math.PI)
          ctx.fillStyle = '#003300'
          ctx.strokeStyle = '#FF0000'
          ctx.stroke()
          ctx.fill()
          //    console.log('X:' + centerX)
          //    console.log('Y:' + centerY)
        })
      }
    })
  }
}

export default plugin
