<template>
  <StdTreeTable
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
      <span class="std-flex-item">Personnages de StarWars</span>
      <span class="std-flex-item">(Par Job et espèce)</span>
    </template>
    <template v-slot:table_columns>
      <th>Job/Espèce</th>
      <th>Prénom</th>
      <th>Nom</th>
    </template>
    <template v-slot:table_first_cell_prefix="item">
      <span v-if="item.row.level == 2">..(prefix)</span>
    </template>
    <template v-slot:table_first_cell_suffix="item">
      <span v-if="item.row.level == 2">..(suffix)</span>
    </template>

    <template v-slot:table_cells="toto">
      <td>{{ toto.row.element.firstName }}</td>
      <td>{{ toto.row.element.name }}</td>
    </template>
  </StdTreeTable>
</template>

<script>
import StdTreeTable from '@/components/StdTreeTable.vue'

const characters_0 = []

const characters_1 = [
  {
    id: 1,
    name: 'Good Jedi',
    level: 0,
    element: {},
    children: [
      {
        id: 10,
        name: 'Human',
        level: 1,
        expend: true,
        element: {},
        children: [
          {
            id: 11,
            name: 'Good',
            level: 2,
            indexForParent: 0,
            element: { firstName: 'Luc', name: 'Skywalker', job: 'Good Jedi', species: 'Human' }
          },
          {
            id: 12,
            name: '',
            level: 2,
            indexForParent: 1,
            element: { firstName: 'Obi-Wan', name: 'Kenobi', job: 'Good Jedi', species: 'Human' }
          }
        ]
      },
      {
        id: 20,
        name: 'Unknown',
        level: 1,
        expend: true,
        element: {},
        children: [
          {
            id: 21,
            name: '',
            level: 2,
            indexForParent: 0,
            element: { firstName: 'Maître', name: 'Yoda', job: 'Good Jedi', species: 'Inconnue' }
          }
        ]
      }
    ]
  },
  {
    id: 100,
    name: 'Bad Jedi',
    level: 0,
    element: {},
    children: [
      {
        id: 110,
        name: 'Human',
        level: 1,
        element: {},
        children: [
          {
            id: 111,
            name: '',
            level: 2,
            indexForParent: 0,
            element: { firstName: 'Dark', name: 'Vador', job: 'Bad Jedi', species: 'Humain' }
          },
          {
            id: 112,
            name: '',
            level: 2,
            indexForParent: 1,
            element: { firstName: 'Darth', name: 'Maul', job: 'Bad Jedi', species: 'Humain' }
          }
        ]
      }
    ]
  },
  {
    id: 200,
    name: 'Emperor',
    level: 0,
    element: {},
    indexForParent: 0,
    children: [
      {
        id: 210,
        name: 'Human',
        level: 1,

        element: {},
        children: [
          {
            id: 211,
            name: '',
            level: 2,
            indexForParent: 0,
            element: { firstName: 'Sheev', name: 'Palpatine', job: 'Emperor', species: 'Humain' }
          }
        ]
      }
    ]
  },
  {
    id: 300,
    name: 'Mercenary',
    level: 0,
    element: {},
    indexForParent: 0,
    children: [
      {
        id: 310,
        name: 'Human',
        level: 1,
        indexForParent: 0,
        element: {},
        children: [
          {
            id: 311,
            name: '',
            level: 2,
            indexForParent: 0,
            element: { firstName: 'Han', name: 'Solo', job: 'Mercenary', species: 'Humain' }
          }
        ]
      },
      {
        id: 320,
        name: 'Wookie',
        level: 1,
        indexForParent: 0,
        element: {},
        children: [
          {
            id: 321,
            name: '',
            level: 2,
            indexForParent: 0,
            element: { firstName: '', name: 'Chewbacca', job: 'Mercenary', species: 'Wookiee' }
          }
        ]
      }
    ]
  }
]

export default {
  components: { StdTreeTable },
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
