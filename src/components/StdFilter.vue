<template>
  <div class="flex-row-fJaround">
    <StdTooltip
      :tooltiptextAbsolute="false"
      :iconPlusInfo="novalue"
      :iconClose="novalue"
      :tooltiptextStyle="'min-width:10rem;'"
      :tooltipcontentStyle="'min-height:5rem;'"
      :iconTooltip="StdIconStyle.search"
    >
      <template v-slot:tooltipcontent>
        <span v-if="paramType === 'KeyValueCheckableModel'">
          <div class="flex-fAstart-fJbetween" v-for="e of currentElements" :key="e.codei">
            <StdToggle :check.sync="e.checked" @click="elementChanged" checkedString="oui" uncheckedString="non" :disable="!e.checkAble" />
            <div>{{ e.presentation() }}</div>
          </div>
        </span>
        <span v-if="paramType === 'date'">
          <div class="flex-fAstart-fJbetween" v-for="(e, index) of currentElements" :key="`${index}${e}`">
            <date-picker v-model="currentElements[index]" format="DD-MM-YYYY"></date-picker>
          </div>
        </span>
      </template>
    </StdTooltip>
  </div>
</template>
<script lang="ts">
import { Vue, Prop, Emit, Watch, Component, PropSync } from 'vue-property-decorator'
import KeyValueCheckableModel from '@/api/KeyValueCheckableModel'
import StdToggle from '@/components/StdToggle.vue'
import StdTooltip from '@/components/StdTooltip.vue'
import StdIconStyle from '@/styles/std-icon'
import { SearchService } from '@/api/SearchHelper'

@Component({
  components: {
    StdToggle,
    StdTooltip
  }
})
export default class StfFilterComponent extends Vue {
  @PropSync('elements', { type: [] }) paramElements!: Array<any>
  @PropSync('type', {
    type: String,
    default: () => {
      return 'KeyValueCheckableModel'
    }
  })
  paramType!: string

  /*@PropSync('rows', { type: [] }) paramRows!: Array<any>
  @PropSync('rowKey', { type: String }) paramRowKey!: string*/

  get currentElements() {
    return this.paramElements
  }

  get novalue() {
    return ''
  }

  get StdIconStyle() {
    return StdIconStyle
  }

  @Watch('elements')
  updateClass() {
    //console.log('--prop elements changed --')
  }

  elementChanged() {
    //console.log('--inside elements changed --')
    this.$emit('elementChanged')
    this.$emit('update:elements', this.paramElements)
  }
}
</script>

<style lang="scss">
@import '@/styles/std-flex.scss';
@import '@/styles/std-filter.scss';
@import '@/styles/std-tooltip.scss';

.tooltipcontent {
  color: $color-lighten-7;
}
</style>
