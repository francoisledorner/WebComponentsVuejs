import vue from 'vue'
import cpt from 'cpt'
declare module 'vue/types/vue' {
  interface Vue {
    $voca: cpt.xxx
  }
}
declare const VueVoca: {
  install(Vue: import('vue').VueConstructor<vue>): void
}
export { VueVoca }
export default VueVoca
