import Vue from 'vue'

import initAccountAndContracts from '@/mixins/initAccountAndContracts'
import windowWidth from '@/mixins/windowWidth'

Vue.mixin(initAccountAndContracts)
Vue.mixin(windowWidth)
