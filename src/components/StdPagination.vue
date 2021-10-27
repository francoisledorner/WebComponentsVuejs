<template>
  <div class="std-flex-container center heigth-bg">
    <span class="std-flex-item discret">Lignes par page</span>
    <select class="std-flex-item discret" v-model="offset">
      <option value="10">10</option>
      <option value="20">20</option>
      <option value="30">30</option>
      <option value="40">40</option>
      <option value="50">50</option>
      <option value="all">Tout</option>
    </select>

    <span class="std-flex-item push-right discret">Lignes {{ start }}-{{ end }} sur {{ rowCount }}</span>
    <i :class="computedClass" @click="navigateFirst" :disabled="disabledPrevious">{{ iconNavFirst }}</i>
    <i :class="computedClass" @click="navigatePrevious" :disabled="disabledPrevious">{{ iconNavPrevious }}</i>
    <i :class="computedClass" @click="navigateNext" :disabled="disabledNext">{{ iconNavNext }}</i>
    <i :class="computedClass" @click="navigateLast" :disabled="disabledNext">{{ iconNavLast }}</i>
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
    iconNavFirst: {
      type: String,
      expected: false,
      default: () => StdIconStyle.iconNavFirst
    },
    iconNavPrevious: {
      type: String,
      expected: false,
      default: () => StdIconStyle.iconNavPrevious
    },
    iconNavNext: {
      type: String,
      expected: false,
      default: () => StdIconStyle.iconNavNext
    },
    iconNavLast: {
      type: String,
      expected: false,
      default: () => StdIconStyle.iconNavLast
    }
  },
  data: () => ({
    offset: 10,
    currentPage: 1,
    rowCount: 46
  }),
  methods: {
    navigateFirst() {
      this.currentPage = 1
    },
    navigatePrevious() {
      this.currentPage -= 1
    },
    navigateNext() {
      this.currentPage += 1
    },
    navigateLast() {
      this.currentPage = this.maxPage()
    },
    maxPage() {
      if (this.offset === 'all') {
        return 1
      }
      return Math.ceil(this.rowCount / this.offset)
    }
  },
  computed: {
    start() {
      if (this.offset === 'all') {
        return 1
      }
      return this.currentPage * this.offset - this.offset + 1
    },
    end() {
      if (this.offset === 'all') {
        return this.rowCount
      }
      return Math.min(this.currentPage * this.offset, this.rowCount)
    },

    disabledPrevious() {
      return this.currentPage == 1
    },
    disabledNext() {
      return this.currentPage == this.maxPage()
    },
    computedClass() {
      return 'std-flex-item navigation-button ' + this.classIcon
    }
  },

  watch: {
    offset() {
      let old = this.currentPage
      this.currentPage = 1
      if (old == this.currentPage) {
        this.$emit('navigate', this.currentPage, this.offset)
      }
    },
    currentPage() {
      this.$emit('navigate', this.currentPage, this.offset)
    }
  }
}
</script>

<style lang="scss">
@import '@/styles/std-flex-container';
@import '@/styles/std-navigation-button';

select {
  border-style: none;
  border-bottom: 1px solid $grey-darken-1;
  background: transparent;
  outline: none;
}

.discret {
  font-size: 12px;
}
</style>
