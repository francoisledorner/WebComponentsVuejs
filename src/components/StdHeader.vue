<template>
  <div class="std-flex-container center heigth-bg">
    <slot name="header-titles"></slot>
    <div class="std-flex-item push-right">
      <StdSearchComponent v-if="includeSearch" placeholder="Rechercher" @inputSearchChanged="inputSearchChanged" />
    </div>
    <div class="std-flex-item push-right">
      <StdFullscreenButton v-if="includeFullScreen" @toggleFullScreen="toggleFullScreen" />
    </div>
    <div class="std-flex-item push-left">
      <StdToggle v-if="includeEditable" :check.sync="checkToggle" @click="toggleEditable" checkedString="" uncheckedString="éditer" />
    </div>
  </div>
</template>

<script>
import StdSearchComponent from '@/components/StdSearchComponent'
import StdFullscreenButton from '@/components/StdFullscreenButton'
import StdToggle from '@/components/StdToggle'

export default {
  components: { StdSearchComponent, StdFullscreenButton, StdToggle },
  props: {
    includeSearch: { type: Boolean, expected: false, default: true },
    includeFullScreen: { type: Boolean, expected: false, default: true },
    includeEditable: { type: Boolean, expected: false, default: false }
  },
  methods: {
    toggleFullScreen(fullscreen) {
      this.$emit('toggleFullScreen', fullscreen)
    },
    inputSearchChanged(text) {
      this.$emit('inputSearchChanged', text)
    },
    toggleEditable(editable) {
      this.$emit('toggleEditable', this.checkToggle)
    }
  },
  data: () => ({ checkToggle: false })
}
</script>

<style lang="scss">
@import '@/styles/std-table';
@import '@/styles/std-flex-container';
</style>
