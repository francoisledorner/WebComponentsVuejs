<template>
  <div style="height: auto; overflow: hidden;">
    Pastille:
    <br />
    <div style="display: flex;justify-content: space-around;">
      <StdPastille :backgroundColor="StdPastilleStyle.pastilleColorCdc" text="10.5"></StdPastille>
      <StdPastille :backgroundColor="StdPastilleStyle.pastilleColorCdf" text="4"></StdPastille>
      <StdPastille :backgroundColor="StdPastilleStyle.pastilleColorDispo" text="3"></StdPastille>
      <StdPastille :backgroundColor="StdPastilleStyle.pastilleColorEabc" text="A"></StdPastille>
    </div>
    <hr />
    expander :
    <div><StdExpander @toggleExpand="toggleExpand" /></div>
    <hr />
    tooltips :<br />
    <div style="position:relative">
      tooltip absolute
      <StdTooltip :moreToolTipData="{ id: 1 }" @moreToolTip="moreToolTip" :tooltiptextStyle="'width:300px;'" :tooltipcontentStyle="'height:100px;'">
        <template v-slot:tooltipcontent>
          Eminuit autem inter humilia supergressa iam impotentia fines mediocrium delictorum nefanda Clematii cuiusdam Alexandrini nobilis mors repentina; cuius
          socrus cum misceri sibi generum, flagrans eius amore, non impetraret, ut ferebatur, per palatii pseudothyrum introducta, oblato pretioso reginae
          monili id adsecuta est, ut ad Honoratum tum comitem orientis formula missa letali omnino scelere nullo contactus idem Clematius nec hiscere nec loqui
          permissus occideretur.
        </template>
      </StdTooltip>
      <br />
    </div>
    <div style="display:flex">
      Tooltip relatif :
      <StdTooltip
        :tooltiptextAbsolute="false"
        :iconPlusInfo="novalue"
        :iconClose="novalue"
        :tooltiptextStyle="'width:300px;'"
        :tooltipcontentStyle="'height:100px;'"
        :iconTooltip="StdIconStyle.search"
      >
        <template v-slot:tooltipcontent>
          Eminuit autem inter humilia supergressa iam impotentia fines mediocrium delictorum nefanda Clematii cuiusdam Alexandrini nobilis mors repentina; cuius
          socrus cum misceri sibi generum, flagrans eius amore, non impetraret, ut ferebatur, per palatii pseudothyrum introducta, oblato pretioso reginae
          monili id adsecuta est, ut ad Honoratum tum comitem orientis formula missa letali omnino scelere nullo contactus idem Clematius nec hiscere nec loqui
          permissus occideretur.
        </template>
      </StdTooltip>
    </div>
    <hr />
    toggle :
    <br />
    <div style="display: flex;justify-content: space-around;">
      <StdToggle :check.sync="checkToggle" @click="echoClick" checkedString="oui" uncheckedString="non" /> <StdToggle :check="false" :disable="true" />
    </div>
    <hr />
    buttons :
    <br />
    <div style="display: flex;justify-content: space-around;">
      <div><StdButton :icon="StdIconStyle.load" :backgroundColor="StdPastilleStyle.pastilleColorEabc" text="refresh" @click="echoClick" /></div>
      <div><StdButton :disable="true" text="disabled" /></div>
      <div>
        <StdButton>
          <template v-slot:content>
            <img style="transform: scale(0.3);" src="https://material.io/resources/icons/static/ic_material_192px_light.svg" />
          </template>
        </StdButton>
      </div>
    </div>
    <hr />
    spinner : <br />
    <div><StdSpinner size="48" /><StdSpinner /></div>
    <hr />
    <div class="wrappedFixeHeader">
      table fixed header :
      <br />
      <br />
      <table style="border:1px">
        <thead>
          <tr>
            <td>Colonne A</td>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>row 1</td>
          </tr>
          <tr>
            <td>row 2</td>
          </tr>
          <tr>
            <td>row 3</td>
          </tr>
          <tr>
            <td>row 4</td>
          </tr>
          <tr>
            <td>row 5</td>
          </tr>
          <tr>
            <td>row 6</td>
          </tr>
          <tr>
            <td>row 7</td>
          </tr>
        </tbody>
      </table>
    </div>
    <div><hr /></div>
    filter: <br />
    <StdFilter :elements="elementsToFilter"></StdFilter>
    <div><hr /></div>
    toasted : <br />
    <div><StdToasted :text="toasted"></StdToasted></div>
    <hr />
    <div>
      AutoComplete :
      <StdAutocomplete :results="itemsAutoComplete" @input="echoInputAutoComplete" :pagination="paginationAutoComplete" @page="paginationPage"/>
    </div>
    <hr />
  </div>
</template>
<script>
import KeyValueCheckableModel from '@/api/KeyValueCheckableModel'
import FullTextQuery from '@/api/FullTextQuery'

import StdIconStyle from '@/styles/std-icon.ts'
import StdPastille from '@/components/StdPastille.vue'
import StdPastilleStyle from '@/styles/std-pastille.ts'
import StdExpander from '@/components/StdExpander.vue'
import StdTooltip from '@/components/StdTooltip.vue'
import StdButton from '@/components/StdButton.vue'
import StdSpinner from '@/components/StdSpinner.vue'
import StdToggle from '@/components/StdToggle.vue'
import StdToasted from '@/components/StdToasted.vue'
import StdFilter from '@/components/StdFilter.vue'
import StdAutocomplete from '@/components/StdAutocomplete.vue' 
 
export default {
  components: { StdPastille, StdExpander, StdTooltip, StdButton, StdSpinner, StdToggle, StdToasted, StdFilter, StdAutocomplete },
  data() {
    return {
      StdPastilleStyle: StdPastilleStyle,
      ArticleSelected: {},
      StdIconStyle,
      checkToggle: true,
      toasted: '',
      elementsToFilter: [],
      novalue: '',
      itemsAutoComplete:[],
      paginationAutoComplete: new FullTextQuery()
    }
  },
  methods: {
    toggleExpand(expand) {
      //console.log(expand)
    },
    moreToolTip(moreToolTipData) {
      //console.log(JSON.stringify(moreToolTipData))
    },
    echoClick() {
      //console.log('echoClick', this.checkToggle)
    },
    initElementsToFilter() {
      let e = new KeyValueCheckableModel({ codei: 'code1', libelle: 'libelle1' })
      this.elementsToFilter.push(e)
      e = new KeyValueCheckableModel({ codei: 'code2', libelle: 'libelle2' })
      this.elementsToFilter.push(e)
    },

    echoInputAutoComplete(search){
      this.itemsAutoComplete = []
      let limit = this.paginationAutoComplete.limit
      let page = this.paginationAutoComplete.current
      ;[...Array(limit)].forEach(() => { 
        this.itemsAutoComplete.push( new KeyValueCheckableModel({id:'id'+search+"-"+page,codei:'codei'+search+"-"+page,libelle:'libelle'+search+"-"+page}) )
      })

       
      //['Apple'+std, 'Banana'+std, 'Orange'+std, 'Mango'+std, 'Pear'+std, 'Peach'+std, 'Grape'+std, 'Tangerine'+std, 'Pineapple'+std]
    },
    paginationPage(search){
      this.echoInputAutoComplete(search)
    }
  },
  mounted() {

    this.paginationAutoComplete.count = 100 

    this.toasted = 'init'
    setInterval(() => {
      this.toasted = '' + new Date()
    }, 10000)
    this.initElementsToFilter()
  }
}
</script>
<style lang="scss">
@import '../styles/std-header-fixed.scss';

$keepSpaceForOthers: 15vh;
$headerHeight: 50px;

.wrappedFixeHeader {
  @include header-fixed($keepSpaceForOthers, $headerHeight);

  & table {
    width: 100px !important;
  }
}
</style>
