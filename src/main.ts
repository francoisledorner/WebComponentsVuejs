import Vue from 'vue'
import App from './App.vue'
import './registerServiceWorker'

/***** debug date*/
import { format, formatDistance, formatRelative, subDays } from 'date-fns'
import fr from 'date-fns/locale/fr'
//@ts-ignore
window.locale = 'fr'
import DatePicker from 'vue2-datepicker'
import 'vue2-datepicker/index.css'
//@ts-ignore
Vue.component('DatePicker', DatePicker)

Vue.filter('datefilter', (value: Date) => {
  if (!value) return ''
  return format(value, 'dd/MM/yyyy')
})
/***** fin date*/
/*
 if ((typeof this.paramElement[this.paramField] as any) === Number) {
   return Number(this.paramElement[this.paramField])
     .toString()
     .replaceAll('/.', ',')
 } else {
   return this.paramElement[this.paramField]
 }
 */
import numeral from 'numeral'

//0.0[,]00
numeral.defaultFormat('0.0,')
numeral.register('locale', 'fr', {
  delimiters: {
    thousands: '.',
    decimal: ','
  },
  abbreviations: {
    thousand: 'k',
    million: 'm',
    billion: 'b',
    trillion: 't'
  },
  ordinal: function(number: number) {
    return number === 1 ? 'er' : 'ème'
  },
  currency: {
    symbol: '€'
  }
})

// switch between locales
numeral.locale('fr')

Vue.filter('numberFilter', (value: string) => {
  return numeral(value).format()
})

//https://github.com/talk-to/vue-components
//https://medium.com/justfrontendthings/how-to-create-and-publish-your-own-vuejs-component-library-on-npm-using-vue-cli-28e60943eed3

Vue.config.productionTip = false

new Vue({
  render: h => h(App)
}).$mount('#app')
