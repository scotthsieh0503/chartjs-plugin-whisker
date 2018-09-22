'use strict'

import defaults from './defaults'
import plugin from './plugin'

Chart.defaults.global.plugins.whiskers = defaults
Chart.plugins.register(plugin)

let origAfterFit = Chart.Legend.prototype.afterFit
Chart.Legend.prototype.afterFit = function () {
  origAfterFit.call(this)
  if (this.options && this.options.maxSize) {
    var maxSize = this.options.maxSize
    if (maxSize.height !== undefined) {
      this.height = Math.min(this.height, maxSize.height)
      this.minSize.height = Math.min(this.minSize.height, this.height)
    }
    if (maxSize.width !== undefined) {
      this.width = Math.min(this.width, maxSize.width)
      this.minSize.width = Math.min(this.minSize.width, this.width)
    }
  }
}
