<template>
  <StdFlatTreeTable
    :rows="characters"
    :head="true"
    :paginable="true"
    :iconLeaf="''"
    field="firstName"
    @selectRow="rowSelected"
    @navigate="navigate"
    @toggleFullScreen="toggleFullScreen"
  >
    <template v-slot:header-titles>
      <span class="std-flex-item">FOURNISSEUR : </span>
      <span class="std-flex-item">DEPOT PIERROTON (dp01)</span>
    </template>
    <template v-slot:table_columns>
      <th>Article</th>
      <th>Cdt</th>
      <th>Cdt Unite</th>
      <th>Qté Dispo</th>
      <th>Dispo Unite</th>
      <th>Qté cmd</th>
      <th>Qté cmd Unite</th>
    </template>

    <template v-slot:table_cells="r">
      <td>{{ r.row.element.cdt }}</td>
      <td>{{ r.row.element.cdtUnite }}</td>
      <td>{{ r.row.element.dispo }}</td>
      <td>{{ r.row.element.dispoUnite }}</td>
      <td v-if="r.row.level != 0"><input maxlength="10" size="10" v-model="r.row.element.aCmd" /></td>
      <td v-else></td>
      <td>{{ r.row.element.aCmdUnite }}</td>
    </template>
  </StdFlatTreeTable>
</template>

<script>
import StdFlatTreeTable from '@/components/StdFlatTreeTable.vue'

const characters_0 = []

const characters_1 = [
  {
    id: 1,
    name: 'variante generique x',
    level: 0,
    expend: true,
    element: { designationArticle: 'variante generique x', aCmd: 77, aCmdUnite: 'UN' },

    children: [
      {
        id: 11,
        name: 'designationVariante x1',
        level: 2,
        indexForParent: 0,
        element: {
          designationArticle: 'designationVariante x1',
          cdt: 99,
          cdtUnite: 'UN',
          dispo: 88,
          dispoUnite: 'UN',
          aCmd: 77,
          aCmdUnite: 'UN'
        }
      },
      {
        id: 12,
        name: 'designationVariante x1',
        level: 2,
        indexForParent: 0,
        element: {
          designationArticle: 'designationVariante x1',
          cdt: 99,
          cdtUnite: 'UN',
          dispo: 88,
          dispoUnite: 'UN',
          aCmd: 77,
          aCmdUnite: 'UN'
        }
      }
    ]
  },
  {
    id: 91,
    name: 'variante generique y',
    level: 0,
    expend: true,
    element: { designationArticle: 'variante generique y', aCmd: 77, aCmdUnite: 'UN' },

    children: [
      {
        id: 911,
        name: 'designationVariante y1',
        level: 2,
        indexForParent: 91,
        element: {
          designationArticle: 'designationVariante y1',
          cdt: 99,
          cdtUnite: 'UN',
          dispo: 88,
          dispoUnite: 'UN',
          aCmd: 77,
          aCmdUnite: 'UN'
        }
      },
      {
        id: 912,
        name: 'designationVariante y1',
        level: 2,
        indexForParent: 91,
        element: {
          designationArticle: 'designationVariante y1',
          cdt: 99,
          cdtUnite: 'UN',
          dispo: 88,
          dispoUnite: 'UN',
          aCmd: 77,
          aCmdUnite: 'UN'
        }
      }
    ]
  }
]

export default {
  components: { StdFlatTreeTable },
  data() {
    return { characters: [] }
  },

  created() {
    setTimeout(() => {
      this.refresh()
    }, 1007)
  },

  methods: {
    refresh() {
      this.characters = characters_1
    },
    rowSelected(item) {
      //console.log('rowSelected : ' + item)
    },
    toggleFullScreen(fullscreen) {
      //console.log('toggleFullScreen : ' + fullscreen)
    },
    navigate(currentPage, offset) {
      //console.log('navigate currentPage : ' + currentPage + ' ; offset : ' + offset)
    }
  }
}
</script>
<style lang="scss">
.std-table {
  td,
  th {
    &:first-child {
      max-width: 250px;
      width: 250px;
    }
  }
}
</style>
