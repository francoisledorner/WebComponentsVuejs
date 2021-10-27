<template>
  <div class="flex-row-fJaround">
    <div class="flex-col">
      <StdTooltip
        :tooltiptextAbsolute="false"
        :iconPlusInfo="novalue"
        :iconClose="novalue"
        :tooltiptextStyle="'min-width:10rem;'"
        :tooltipcontentStyle="'min-height:5rem;'"
        :iconTooltip="StdIconStyle.search"
      >
        <template v-slot:tooltipcontent>
          <div class="flex-fAstart-fJbetween" v-for="e of currentElements" :key="e.codei">
            <StdToggle :check.sync="e.checked" @click="elementChanged" checkedString="oui" uncheckedString="non" :disable="!e.checkAble" />
            <div>{{ e.presentation() }}</div>
          </div>
        </template>
      </StdTooltip>
    </div>
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
  @PropSync('elements', { type: [] }) paramElements!: Array<KeyValueCheckableModel>
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
    console.log('--prop elements changed --')
  }

  elementChanged() {
    console.log('--inside elements changed --')
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
