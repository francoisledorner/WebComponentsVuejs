<template>
  <i v-if="!fullscreen" :class="computedClass" @click="toggleFullScreen">{{ iconFullScreen }}</i>
  <i v-else :class="computedClass" @click="toggleFullScreen">{{ iconFullScreenExit }}</i>
</template>

<script>
import StdIconStyle from '@/styles/std-icon.ts'

export default {
  props: {
    classIcon: {
      type: String,
      expected: false,
      default: () => StdIconStyle.classIcon
    },
    iconFullScreen: {
      type: String,
      expected: false,
      default: () => StdIconStyle.fullScreen
    },
    iconFullScreenExit: {
      type: String,
      expected: false,
      default: () => StdIconStyle.fullScreenExit
    }
  },
  methods: {
    toggleFullScreen() {
      this.fullscreen = !this.fullscreen
      this.$emit('toggleFullScreen', this.fullscreen)
    }
  },
  data: () => ({
    fullscreen: false
  }),
  computed: {
    computedClass() {
      return this.classIcon + ' navigation-button'
    }
  }
}
</script>

<style lang="scss">
@import '@/styles/std-navigation-button';
</style>
