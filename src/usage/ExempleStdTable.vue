<template>
  <StdTable
    :rows="charactersFiltered"
    :editable="true"
    :head="true"
    @selectRow="rowSelected"
    @toggleFullScreen="toggleFullScreen"
    @toggleEditable="toggleEditable"
    @navigate="navigate"
  >
    <template v-slot:header-titles>
      <span class="std-flex-item">Personnages de StarWars</span>
      <span class="std-flex-item">(Pas tous hein on est d'accord?)</span>
    </template>
    <template v-slot:table_columns>
      <th style="width:30%">Prénom</th>
      <th style="width:30%">Nom</th>
      <th style="width:20%">
        <div>Job</div>
        <StdFilter :elements.sync="distinctJobs" />
      </th>
      <th style="width:20%">
        <div>Date</div>
        <StdFilter :elements.sync="dateRange" :type="'date'" />
      </th>
    </template>
    <template v-slot:table_cells="item">
      <td><StfEditableField :element.sync="item.row" :field="'firstName'" :type="'string'" :editable="editable" /></td>
      <td><StfEditableField :element.sync="item.row" :field="'name'" :type="'string'" :editable="editable" @onBlur="addNewLineIfNeeded" /></td>
      <td><StfEditableField :element.sync="item.row" :field="'job'" :type="'KeyValueCheckableModel'" :validValues="distinctJobs" :editable="editable" /></td>
      <td><StfEditableField :element.sync="item.row" :field="'birthday'" :type="'date'" :editable="editable" /></td>
    </template>
  </StdTable>
</template>
<script>
import StdTable from '@/components/StdTable.vue'
import StdFilter from '@/components/StdFilter.vue'
import StfEditableField from '@/components/StdEditableField.vue'

import KeyValueCheckableModel from '@/api/KeyValueCheckableModel'

import { SearchService } from '@/api/SearchHelper'

const characters_1 = [
  { firstName: 'Luc', name: 'Skywalker', job: 'Good Jedi', birthday: new Date(1948, 5, 2) },
  { firstName: 'Obi-Wan', name: 'Kenobi', job: 'Good Jedi', birthday: new Date(1948, 6, 2) },
  { firstName: 'Maître', name: 'Yoda', job: 'Good Jedi', birthday: new Date(1901, 3, 1) },
  { firstName: 'Dark', name: 'Vador', job: 'Bad Jedi', birthday: new Date(1948, 2, 2) },
  { firstName: '', name: 'Chewbacca', job: 'Mercenary', birthday: new Date(1901, 1, 1) }
]

export default {
  components: { StdTable, StdFilter, StfEditableField },
  data() {
    return {
      characters: [],
      distinctJobs: [],
      editable: false,
      dateRange: [new Date(0, 1, 1), new Date()]
    }
  },
  created() {
    setTimeout(() => {
      this.refresh()
    }, 500)
  },
  computed: {
    charactersFiltered() {
      console.log('computed charactersFiltered' + this.distinctJobs.length)
      let rowFiltered = SearchService.rowFiltered(this.distinctJobs, this.characters, 'job')
      SearchService.spliceWithValidator(rowFiltered, this.validatorDateRangeRow)
      this.dateRange[0]
      this.dateRange[1]
      return rowFiltered
    }
  },
  watch: {
    dateRange() {
      //console.log('dateRange changed')
    }
  },
  methods: {
    refresh() {
      this.characters = characters_1
      this.computeAllDistinct()
      console.log('refresh' + this.distinctJobs.length)
    },

    async computeAllDistinct() {
      this.distinctJobs = SearchService.getDistintKeyValueCheckableModel(this.characters, 'job', 'job', { checked: true })
    },
    rowSelected(item) {
      console.log('rowSelected : ' + item)
    },
    toggleFullScreen(fullscreen) {
      console.log('toggleFullScreen : ' + fullscreen)
    },
    toggleEditable(editable) {
      this.editable = editable
      this.addNewLineIfNeeded()
    },
    addNewLineIfNeeded() {
      SearchService.spliceWithValidator(this.characters, this.validatorEditorRow)
      if (this.editable == true) {
        this.characters.push({ firstName: '', name: '', job: '' })
        this.computeAllDistinct()
      }
    },
    validatorEditorRow(row) {
      console.log('validatorRow' + row['name'])
      return row['name'] !== undefined && row['name'] !== ''
    },
    validatorDateRangeRow(row) {
      //console.log('FILTERERR' + row.birthday.getTime() >= this.dateRange[0].getTime())
      return row.birthday.getTime() >= this.dateRange[0].getTime() && row.birthday.getTime() <= this.dateRange[1].getTime()
    },

    navigate(currentPage, offset) {
      console.log('navigate currentPage : ' + currentPage + ' ; offset : ' + offset)
    }
  }
}
</script>
<style lang="scss">
@import '@/styles/std-flex.scss';
</style>
