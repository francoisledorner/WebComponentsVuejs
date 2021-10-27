<template>
  <div class="expander">
    <i v-if="!expand" :class="classIcon" @click="toggleExpand">{{ iconExpand }}</i>
    <i v-else :class="classIcon" @click="toggleExpand">{{ iconExpanded }}</i>
  </div>
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
    iconExpand: {
      type: String,
      expected: false,
      default: () => StdIconStyle.expand
    },
    iconExpanded: {
      type: String,
      expected: false,
      default: () => StdIconStyle.expanded
    }
  },
  methods: {
    toggleExpand() {
      this.expand = !this.expand
      this.$emit('toggleExpand', this.expand)
    }
  },
  data: () => ({
    expand: false
  }),
  computed: {}
}
</script>
<style lang="scss" scoped>
@import '@/styles/std-expander';
</style>
