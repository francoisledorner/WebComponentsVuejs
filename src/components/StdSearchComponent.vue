<template>
  <form>
    <div class="wrapper">
      <input type="text" v-model="searchText" :placeholder="placeholder" />
      <i :class="classIcon">{{ searchIcon }}</i>
    </div>
  </form>
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
    searchIcon: {
      type: String,
      expected: false,
      default: () => StdIconStyle.search
    },
    placeholder: { type: String, required: false, default: 'Recherche' }
  },
  data: () =>
    //could be ...this.icons
    ({
      searchText: ''
    }),

  watch: {
    searchText() {
      this.$emit('inputSearchChanged', this.searchText)
    }
  }
}
</script>

<style lang="scss">
.wrapper {
  display: flex;
  border-bottom: 1px solid $grey-darken-1;
}
.wrapper input[type='text'] {
  flex: 1 1 auto;
  border-style: none;
  background: transparent;
  outline: none;
  width: 350px;
}
</style>
