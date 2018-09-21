'use strict'

import defaults from './defaults'
import plugin from './plugin'

Chart.defaults.global.plugins.whisker = defaults
Chart.plugins.register(plugin)
