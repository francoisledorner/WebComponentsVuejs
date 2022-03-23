<template>
  <div class="std-flex-container center heigth-bg">
    <span v-if="showLignes" class="std-flex-item discret">Lignes par page</span>
    <select v-if="showLignes" class="std-flex-item discret" v-model="pagination.limit">
      <option :value="5">5</option>
      <option :value="10">10</option>
      <option :value="30">30</option>
      <option :value="40">40</option>
      <option :value="50">50</option>
      <option :value="9999">Tout</option>
    </select>

    <span v-if="showLignes" class="std-flex-item push-right discret">Lignes {{ start }}-{{ end }} sur {{ rowCount }}</span>

    <i :class="computedClass" @click="navigateFirst" :disabled="disabledPrevious">{{ iconNavFirst }}</i>
    <i :class="computedClass" @click="navigatePrevious" :disabled="disabledPrevious">{{ iconNavPrevious }}</i>
    <i :class="computedClass" @click="navigateNext" :disabled="disabledNext">{{ iconNavNext }}</i>
    <i :class="computedClass" @click="navigateLast" :disabled="disabledNext">{{ iconNavLast }}</i>
  </div>
</template>

<script>
import StdIconStyle from '@/styles/std-icon.ts'
import PageableAdvanceQuery from '@/api/PageableAdvanceQuery'

export default {
  props: {
    showLignes: {
      type: Boolean,
      expected: false,
      default: true
    },
    pagination: {
      type: PageableAdvanceQuery,
      expected: false,
      default: () => {
        let p = new PageableAdvanceQuery()
        p.resetPagination()
        return p
      }
    },
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
  data: () => ({}),
  methods: {
    navigateFirst() {
      this.pagination.current = 1
      this.emitNavigate()
    },
    navigatePrevious() {
      this.pagination.previous()
      this.emitNavigate()
    },
    navigateNext() {
      this.pagination.next()
      this.emitNavigate()
    },
    navigateLast() {
      this.pagination.current = this.maxPage()
      this.emitNavigate()
    },
    maxPage() {
      if (this.pagination.limit === 9999) {
        return 1
      }
      return Math.ceil(this.pagination.count / this.pagination.limit)
    },

    emitNavigate() {
      this.$emit('navigate', this.pagination)
    }
  },
  computed: {
    start() {
      if (this.pagination.limit === 9999) {
        return 1
      }
      return this.pagination.current * this.pagination.limit - this.pagination.limit + 1
    },
    end() {
      if (this.pagination.limit === 9999) {
        return this.pagination.count
      }
      return this.pagination.current * this.pagination.limit
    },
    rowCount() {
      return this.maxPage()
    },
    disabledPrevious() {
      return this.pagination.current == 1
    },
    disabledNext() {
      return this.pagination.current == this.maxPage()
    },
    computedClass() {
      return 'std-flex-item navigation-button ' + this.classIcon
    }
  },

  watch: {
    offset() {
      this.$emit('navigate', this.pagination.current, this.pagination.offset)
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
