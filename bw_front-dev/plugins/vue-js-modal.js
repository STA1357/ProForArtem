// plugins/vue-js-modal.js
import Vue from 'vue'
import VModal from 'vue-js-modal/dist/ssr.nocss'

import 'vue-js-modal/dist/styles.css'

Vue.use(VModal, {
  dynamicDefaults: {
    "styles": {
      'background-color': 'transparent',
      'box-shadow': '-11px 13px 24px rgba(146, 209, 255, 0.12)'
    },
    "adaptive": true,
    "focusTrap": true,
    "reset": true,
    "maxWidth": 428,
    "height": 'auto'
  }
})

/*
export default function(_, inject) {
  inject('modal', VModal)
}
*/
