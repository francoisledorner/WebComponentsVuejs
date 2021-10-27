<template>
  <div class="std-table-container">
    <StdHeader
      :includeEditable="editable"
      @inputSearchChanged="inputSearchChanged"
      @toggleFullScreen="toggleFullScreen"
      @toggleEditable="toggleEditable"
      v-if="head"
    >
      <template v-slot:header-titles>
        <slot name="header-titles"></slot>
      </template>
    </StdHeader>
    <table class="std-table">
      <thead>
        <tr>
          <slot name="table_columns">Ici les colonnes</slot>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(item, index) in filteredRows" :key="index" @click="selectRow(item)">
          <slot name="table_cells" v-bind:row="item">{{ row }}</slot>
        </tr>
      </tbody>
    </table>
    <StdPagination v-if="paginable" @navigate="navigate" />
  </div>
</template>

<script>
import { SearchService } from '@/api/SearchHelper'
import StdHeader from '@/components/StdHeader.vue'
import StdPagination from '@/components/StdPagination.vue'

export default {
  components: { StdHeader, StdPagination },
  props: {
    rows: { type: Array, required: false, default: null },
    paginable: { type: Boolean, expected: false, default: false },
    head: { type: Boolean, expected: false, default: false },
    editable: { type: Boolean, expected: false, default: false }
  },
  methods: {
    selectRow(item) {
      this.$emit('selectRow', item)
    },
    toggleFullScreen(fullscreen) {
      this.$emit('toggleFullScreen', fullscreen)
    },
    toggleEditable(editable) {
      this.$emit('toggleEditable', editable)
    },
    inputSearchChanged(text) {
      this.searchText = text
    },
    navigate(currentPage, offset) {
      this.$emit('navigate', currentPage, offset)
    }
  },
  computed: {
    filteredRows() {
      return SearchService.filtered(this.rows, this.searchText)
    }
  },
  data: () => ({
    searchText: null
  })
}
</script>

<style lang="scss">
@import '@/styles/std-table';
@import '@/styles/std-grey';

// .table-container {
//   display:block;
//    height: 100%;
//     border:5px solid blue;
// }
// table ,tr td{
//     border:1px solid green;
// }
// tbody {
//     display:block;

//     max-height: calc(100% - 5px);
//     overflow:auto;
// }
// thead, tbody tr {
//     display:table;
//     width:100%;
//     table-layout:fixed;
// }
// thead {
//     width: calc( 100% - 1em )
// }
// table {
//     width:400px;
// }
</style>
