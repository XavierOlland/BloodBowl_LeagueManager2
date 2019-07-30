import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store/index.js'
import axios from 'axios'
/*import dayjs from 'vue-dayjs'
import 'dayjs/locale/fr'
import Datetime from 'vue-datetime'

import 'vue-datetime/dist/vue-datetime.css'
import { Settings } from 'luxon'

Settings.defaultLocale = 'fr'
Vue.use(Datetime)*/

Vue.config.productionTip = false

/**
 * Vue filter to get the literal name of game elements (Champions' names, injuries, etc)
 * @param {String} value        The value string.
 * @param {Object} dictionnary  The object containing the names
 */
Vue.filter('talkingToTheGods', function(value) {
  return store.getters.getTranslation(value);
})

/**
 * Vue filter to round the decimal to the given place.
 * @param {String} value    The value string.
 * @param {Number} decimals The number of decimal places.
 */
Vue.filter('round', function(value, decimals) {
  value = !value?0:value;
  decimals = !decimals?0:decimals;
  var roundedValue = Math.round(value * Math.pow(10, decimals)) / Math.pow(10, decimals);
  return roundedValue;
});

Vue.filter('dateTime', function(date) {
  return 1
});



new Vue({
    router,
    store,
    render: h => h(App)
})
.$mount('#app')
