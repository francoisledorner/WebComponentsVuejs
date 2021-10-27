import Vue from 'vue'
import App from './App.vue'
import './registerServiceWorker'

//https://github.com/talk-to/vue-components
//https://medium.com/justfrontendthings/how-to-create-and-publish-your-own-vuejs-component-library-on-npm-using-vue-cli-28e60943eed3

Vue.config.productionTip = false

new Vue({
  render: h => h(App)
}).$mount('#app')
