<template>
  <div class="autocomplete">
    <!--TODO upgrade tooltip pour slot declencheur ...<StdTooltip>-->

    <div class="tooltip">
      <div class="input-container">
        <input
          type="text"
          @input="onChange"
          v-model="search"
          @keyup.down="onArrowDown"
          @keyup.up="onArrowUp"
          @keyup.enter="onEnter"
          @focus="isOpen = true"
          :placeholder="currentPlaceholder"
        />
        <StdButton v-if="text != ''" :icon="StdIconStyle.close" text="" @click="removeSelected" />
      </div>

      <div class="tooltiptext" :class="{ showToolTipClass: isOpen, hideToolTipClass: !isOpen, tooltiptextAbsolute: true }">
        <div class="tooltipcontent">
          <div class="autocomplete-results">
            <li class="loading" v-if="isLoading">
              Chargement...
            </li>
            <div
              v-else
              v-for="(result, i) in results"
              :key="i"
              @click="setResult(result, i)"
              class="autocomplete-result, item-container"
              :class="{ 'is-active': i === arrowCounter }"
            >
                <div class="content"> <slot name="content" v-bind:row="result">{{ row.presentation() }}</slot>
                </div>
            </div>
          </div>
        </div>
        <div class="tooltipbotton">
          <StdPagination @navigate="navigate" :pagination="pagination" :showLignes="false" />
           <StdButton v-if="text != ''" :icon="StdIconStyle.iconLeaf" text="" @click="isOpen = false" />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import KeyValueCheckableModel from '@/api/KeyValueCheckableModel'
import FullTextQuery from '@/api/FullTextQuery'
import StdPagination from '@/components/StdPagination.vue'
import StdTooltip from '@/components/StdTooltip.vue'

import StdPastilleStyle from '@/styles/std-pastille.ts'
import StdIconStyle from '@/styles/std-icon.ts'
import StdButton from '@/components/StdButton.vue'

export default {
  name: 'StdAutocomplete',
  components: { StdPagination, StdButton },
  props: {
    results: {
      type: Array,
      required: true,
      default: () => []
    },
    pagination: {
      type: FullTextQuery,
      required: true,
      default: () => new FullTextQuery()
    },
    placeholder: {
      type: String,
      required: false,
      default: () => '..'
    }
  },

  data() {
    return {
      isOpen: false,
      search: '',
      isLoading: false,
      selected: null,
      removeSelect: false,
      arrowCounter: -1,
      StdPastilleStyle,
      StdIconStyle,
      
    }
  },

  methods: {
    removeSelected() {
      this.removeSelect = true

      //this.selected = null
      //this.arrowCounter = -1
    },
    navigate() {
      
      this.$emit('navigate', this.pagination)
       this.removeSelected()
    },
    onChange() {
      // Let's warn the parent that a change was made
      this.isLoading = true
      this.$emit('input', this.search)
    },

    onEnter() {
      //this.search = this.results[this.arrowCounter]
    },
    handleClickOutside(evt) {
      if (!this.$el.contains(evt.target)) {
        //this.isOpen = false
      }
    },
    setResult(x, i) {
      if(this.removeSelect == true){
        x = null
        i = -1
        this.removeSelect = false
      }
      this.arrowCounter = i
      this.$emit('selected', x)
      console.log('setResult' + x)
      this.selected = x      
      if (this.selected != null) {
        this.search = x.presentation()
        this.isOpen = false
      }
    }
  },
  watch: {
    results: function(val, oldValue) {
      // actually compare them
      //if (val.length !== oldValue.length) {
      //this.results = val
      this.isLoading = false
      this.isOpen = true
      this.selected = null
      this.arrowCounter = -1
      //}
    },
    removeSelect(val, oldValue){
      if(val == true)
        this.search = ''
        this.setResult(null,-1)
    }
  },
  computed: {
    currentPlaceholder() {
      if (this.selected == null) {
        return this.placeholder
      } else {
        return ''
      }
    }
  },
  mounted() {
    document.addEventListener('click', this.handleClickOutside)

    // Detect when scrolled to bottom.
    /*
    const listElm = document.querySelector('#autocomplete-results')
    listElm.addEventListener('scroll', e => {
      console.log('load', e)
 
       let currentScroll = listElm.scrollTop || document.body.scrollTop; // Get Current Scroll Value

      if (currentScroll > 0 && this.lastScroll <= currentScroll){
        this.lastScroll = currentScroll;
          console.log("Scrolling DOWN");
      }else{
       this.lastScroll = currentScroll;
        console.log( "Scrolling UP");
      }

      if (listElm.scrollTop + listElm.clientHeight >= listElm.scrollHeight) {
        this.loadMore()
        console.log('loadMore')
      } else if (listElm.scrollTop + listElm.clientHeight <= listElm.scrollHeight) {
        this.loadLess()
        console.log('loadLess')
      }
      
    })
    */
  },
  destroyed() {
    document.removeEventListener('click', this.handleClickOutside)
  }
}
</script>

<style lang="scss" scoped>
@import '@/styles/std-tooltip.scss';

.autocomplete {
  position: relative;
}

.autocomplete-results {
  padding: 0;
  margin: 0;
  width: 100%;
}

ul {
  padding-inline-start: 3px;
}
.autocomplete-result {
  list-style: none;
  padding: 4px 0px;
  cursor: pointer;
  border: 1px solid #eeeeee;
}

.item-container.is-active,
.item-container:hover {
  background-color: #61616170;
  color: white;
}

.tooltipcontent {
  height: auto;

  width: 300px;
  max-width: 300px;

  overflow: hidden;
}

.tooltiptext {
  border-radius: 6px;
  padding: 5px 10px;

  //z-index: 1;
  top: 21px;
  left: 0px;
}

.item-container {
  display: flex;
  justify-content: space-between;
  width: 100%;
}

.content {
  text-overflow: ellipsis;
  overflow: hidden;
  white-space: nowrap;
  width: 99%;
  text-align: left;
}

.input-container{
   display: flex;
  justify-content: space-between;
  width: 100%;
}

.tooltipbotton{
  display: flex;
  align-items: center

  
}


</style>
