'use strict'

import defaults from './defaults'
import plugin from './plugin'

Chart.defaults.global.plugins.whiskers = defaults
Chart.plugins.register(plugin)

let origAfterFit = Chart.Legend.prototype.afterFit
Chart.Legend.prototype.afterFit = function () {
  origAfterFit.call(this)

  if (this.options && this.options.minSize) {
    let minSize = this.options.minSize
    if (minSize.height !== undefined) {
      this.height = Math.max(this.height, minSize.height)
      this.minSize.height = Math.max(this.minSize.height, this.height)
    }
    if (minSize.width !== undefined) {
      this.width = Math.max(this.width, minSize.width)
      this.minSize.width = Math.max(this.minSize.width, this.width)
    }
  }
}
