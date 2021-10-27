<template>
  <div>
    <StdHeader @inputSearchChanged="inputSearchChanged" @toggleFullScreen="toggleFullScreen" v-if="head">
      <template v-slot:header-titles>
        <slot name="header-titles"></slot>
      </template>
    </StdHeader>
    <!-- <div class="std-table-container"> -->
    <table class="std-table t-table" :class="firstNodeInDeep == null ? ' whenEmptyData ' : ''">
      <thead>
        <tr>
          <slot name="table_columns"></slot>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(item, index) in arrayTreeObj" :key="item.id" :class="getClassOddEven(item, index)" @click="selectRow(item)">
          <td @click.stop="toggle(item, index)">
            <div :style="setPadding(item)">
              <slot name="table_first_cell_prefix" v-bind:row="item"></slot>

              <i>{{ item.name }} </i>

              <slot name="table_first_cell_suffix" v-bind:row="item"></slot>
            </div>
          </td>
          <slot name="table_cells" v-bind:row="item"></slot>
        </tr>
      </tbody>
    </table>
    <!-- </div> -->
    <StdPagination v-if="paginable" @navigate="navigate" />
  </div>
</template>
<script>
import { ItemWithChildrenDTOService } from '@/api/ItemWithChildrenDTOHelper'
import { SearchService } from '@/api/SearchHelper'
import StdHeader from '@/components/StdHeader.vue'
import StdPagination from '@/components/StdPagination.vue'
import StdIconStyle from '@/styles/std-icon.ts'
import StdTreeTable from '@/components/StdTreeTable.vue'

export default {
  mixins: [StdTreeTable],
  components: { StdHeader, StdPagination },

  props: {},
  data: () => ({}),

  computed: {},

  watch: {},
  created() {},
  methods: {}
}
</script>
