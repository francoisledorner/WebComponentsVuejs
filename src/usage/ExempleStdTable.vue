<template>
  <StdTable
    :rows="charactersFiltered"
    :editable="true"
    :head="true"
    @selectRow="rowSelected"
    @toggleFullScreen="toggleFullScreen"
    @toggleEditable="toggleEditable"
    @navigate="navigate"
    class="samewidth"
  >
    <template v-slot:header-titles>
      <span class="std-flex-item">Personnages de StarWars</span>
      <span class="std-flex-item">(Pas tous hein on est d'accord?)</span>
    </template>
    <template v-slot:table_columns>
      <th>Prénom</th>
      <th>Nom</th>
      <th>Score</th>
      <th>
        <div>Job</div>
        <StdFilter :elements.sync="distinctJobs" />
      </th>
      <th>
        <div>Date</div>
        <StdFilter :elements.sync="dateRange" :type="'date'" />
      </th>
    </template>
    <template v-slot:table_cells="item">
      <td><StdEditableField :element.sync="item.row" :field="'firstName'" :type="'string'" :editable="editable" /></td>
      <td>
        <StdEditableField
          :classContainer="'boldThings'"
          :element.sync="item.row"
          :field="'name'"
          :type="'string'"
          :editable="editable"
          @onBlur="addNewLineIfNeeded"
          @validator="customValidator"
        />
      </td>
      <td><StdEditableField :element.sync="item.row" :field="'score'" :type="'number'" :editable="editable" /></td>
      <td><StdEditableField :element.sync="item.row" :field="'job'" :type="'KeyValueCheckableModel'" :validValues="distinctJobs" :editable="editable" /></td>
      <td><StdEditableField :element.sync="item.row" :field="'birthday'" :type="'date'" :editable="editable" /></td>
    </template>
  </StdTable>
</template>
<script>
import StdTable from '@/components/StdTable.vue'
import StdFilter from '@/components/StdFilter.vue'
import StdEditableField from '@/components/StdEditableField.vue'

import { SearchService } from '@/api/SearchHelper'

const characters_1 = [
  { firstName: 'Luc', name: 'Skywalker', job: 'Good Jedi', birthday: new Date(2021, 10 - 1, 25), score: 1000.6 },
  { firstName: 'Obi-Wan', name: 'Kenobi', job: 'Good Jedi', birthday: new Date(2021, 10 - 1, 27), score: 1000.5 },
  { firstName: 'Maître', name: 'Yoda', job: 'Good Jedi', birthday: new Date(2021, 10 - 1, 27), score: 10000.3 },
  { firstName: 'Dark', name: 'Vador', job: 'Bad Jedi', birthday: new Date(2021, 10 - 1, 28), score: 2000.2 },
  { firstName: '', name: 'Chewbacca', job: 'Mercenary', birthday: new Date(2021, 10 - 1, 28), score: 500.1 }
]

export default {
  components: { StdTable, StdFilter, StdEditableField },
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
      let rowFiltered = SearchService.rowFiltered(this.distinctJobs, this.characters, 'job')
      SearchService.spliceWithValidator(rowFiltered, this.validatorDateRangeRow)
      this.dateRange[0]
      this.dateRange[1]
      return rowFiltered
    }
  },
  methods: {
    refresh() {
      this.characters = characters_1
      this.computeAllDistinct()
    },
    async computeAllDistinct() {
      this.distinctJobs = SearchService.getDistintKeyValueCheckableModel(this.characters, 'job', 'job', { checked: true })
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
      return row['name'] !== undefined && row['name'] !== ''
    },
    validatorDateRangeRow(row) {
      if (!row.birthday) {
        return true
      }

      let rangeLowOk = this.dateRange[0] != null ? row.birthday.getTime() >= this.dateRange[0].getTime() : true
      let rangeHighOk = this.dateRange[1] != null ? row.birthday.getTime() <= this.dateRange[1].getTime() : true

      return rangeLowOk && rangeHighOk
    },
    customValidator(row, field) {},

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
@import '@/styles/std-flex.scss';

.boldThings {
  font-weight: bold;
}
.samewidth th {
  width: 20%;
}
</style>
