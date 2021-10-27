<template>
  <div class="pastillewrapper">
    <div class="pastille" :style="borderedStyle">
      {{ text }}
    </div>
  </div>
</template>
<script>
export default {
  props: {
    backgroundColor: {
      type: String,
      expected: false,
      default: () => 'grey'
    },
    text: {
      type: String,
      expected: false,
      default: () => '?'
    }
  },

  computed: {
    borderedStyle() {
      return {
        'background-color': this.backgroundColor
      }
    }
  }
}
</script>

<style lang="scss">
@import '@/styles/std-pastille.scss';
</style>
