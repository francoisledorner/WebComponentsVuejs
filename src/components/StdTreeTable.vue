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
          <slot name="table_columns">Ici les colonnes</slot>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(item, index) in arrayTreeObj" :key="item.id" :class="getClassOddEven(item, index)" @click="selectRow(item)">
          <td @click.stop="toggle(item, index)">
            <div :style="setPadding(item)">
              <slot name="table_first_cell_prefix" v-bind:row="item"></slot>

              <i :class="classIcon">{{ iconName(item) }}</i>
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

const stylesDefault = {
  markerOdd: ' marker-odd ',
  markerEven: ' marker-even ',
  markerLevel: ' marker-level-'
}

const eventsDefault = {
  eventSelected: 'selected'
}

export default {
  components: { StdHeader, StdPagination },

  props: {
    rows: { type: Array, required: false, default: null },
    paginable: { type: Boolean, expected: false, default: false },
    head: { type: Boolean, expected: false, default: false },
    classIcon: {
      type: String,
      expected: false,
      default: () => StdIconStyle.classIcon
    },
    iconExpanded: {
      type: String,
      expected: false,
      default: () => StdIconStyle.iconExpanded
    },
    iconHasChild: {
      type: String,
      expected: false,
      default: () => StdIconStyle.iconHasChild
    },
    iconLeaf: {
      type: String,
      expected: false,
      default: () => StdIconStyle.iconLeaf
    },
    styles: {
      type: Object,
      default: () => stylesDefault
    },
    events: {
      type: Object,
      default: () => eventsDefault
    },
    field: { type: String, required: false, default: null }
  },
  data: () =>
    //could be ...this.icons
    ({
      ...stylesDefault,
      ...eventsDefault,

      loading: true,
      isExpanded: true,
      itemId: null,

      searchText: null
    }),

  computed: {
    firstNodeInDeep() {
      return ItemWithChildrenDTOService.getFirstNodeInDeep(this.rows, this.field)
    },
    LEVEL_LEAF() {
      let firstNodeInDeep = ItemWithChildrenDTOService.getFirstNodeInDeep(this.rows, this.field)
      return firstNodeInDeep ? firstNodeInDeep.level : 0
    },

    arrayTreeObj() {
      let vm = this
      let newObj = []
      vm.recursive(vm.filteredRows, newObj, 0, vm.itemId, vm.isExpanded)
      return newObj
    },

    filteredRows() {
      return SearchService.filteredArrayTree(this.rows, this.searchText)
    }
  },

  watch: {
    searchText() {}
  },
  created() {},
  methods: {
    sendEventToGescom(event) {},
    getClassOddEven(item, index) {
      if (item.level == this.LEVEL_LEAF && item.indexForParent % 2) return ''
      //this.markerOdd
      else if (item.level == this.LEVEL_LEAF && !(item.indexForParent % 2)) return ''
      //this.markerEven
      else if (item.level >= 0) return this.markerLevel + item.level
      else return ''
    },
    selectRow(item) {
      this.$set(item, this.eventSelected, !item.selected)
      this.$emit('selectRow', item)
    },
    toggleFullScreen(fullscreen) {
      this.$emit('toggleFullScreen', fullscreen)
    },
    recursive(obj, newObj, level, itemId, isExpend) {
      let vm = this
      obj.forEach(function(o) {
        if (o.children && o.children.length != 0) {
          o.level = level
          newObj.push(o)
          if (o.id == itemId) {
            o.expend = isExpend
          }
          if (o.expend == true) {
            vm.recursive(o.children, newObj, o.level + 1, itemId, isExpend)
          }
        } else {
          o.level = level
          newObj.push(o)
          return false
        }
      })
    },
    iconName(item) {
      if (item.expend == true) {
        return this.iconExpanded
      }

      if (item.children && item.children.length > 0) {
        return this.iconHasChild
      }

      return this.iconLeaf
    },
    toggle(item, index) {
      let vm = this
      vm.itemId = item.id

      // item.expend n'est pas true -> expend tous les childrens recursivement avec expend = true
      if (item.expend == undefined && item.children != undefined) {
        if (item.children.length != 0) {
          vm.recursive(item.children, [], item.level + 1, item.id, true)
        }
      }

      // item.expend est déjà à true -> collapser tous les children
      if (item.expend == true && item.children != undefined) {
        item.expend = undefined
        vm.itemId = null
      }
    },
    setPadding(item) {
      return `padding-left: ${item.level * 1}rem;`
    },
    inputSearchChanged(text) {
      this.searchText = text
    },
    navigate(currentPage, offset) {
      this.$emit('navigate', currentPage, offset)
    }
  }
}
</script>
<style lang="scss">
@import '@/styles/std-tree-table';
</style>
