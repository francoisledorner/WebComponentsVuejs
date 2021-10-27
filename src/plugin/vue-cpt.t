import vue from 'vue'
import { APPS } from 'cpt'
declare module 'vue/types/vue' {
  export interface Vue {
    $voca: vc.xxx
  }
}

const VueVoca = {
  install(Vue: typeof vue) {
    Vue.prototype.$x = vc
  }
}

if (typeof window !== 'undefined' && (window as any)['Vue']) {
  ;(window as any)['Vue'].use(VueVoca)
}

export { VueVoca }
export default VueVoca
