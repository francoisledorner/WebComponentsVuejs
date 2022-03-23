<template>
  <div class="autocomplete">
    <!--TODO upgrade tooltip pour slot declencheur ...<StdTooltip>-->

    <div class="tooltip">
      <input type="text" @input="onChange" v-model="search" @keyup.down="onArrowDown" @keyup.up="onArrowUp" @keyup.enter="onEnter" @focus="isOpen = true" :placeholder="placeholder"/>
      <div class="tooltiptext" :class="{ showToolTipClass: isOpen, hideToolTipClass: !isOpen, tooltiptextAbsolute: true }">
        <div class="tooltipcontent">
          <ul class="autocomplete-results">
            <li class="loading" v-if="isLoading">
              Chargement...
            </li>
            <li
              v-else
              v-for="(result, i) in results"
              :key="i"
              @click="setResult(result, i)"
              class="autocomplete-result"
              :class="{ 'is-active': i === arrowCounter }"
            >
              <span class="content">{{ result.presentation() }}</span>
            </li>
          </ul>
        </div>
        <div class="tooltipbotton">
          <StdPagination @navigate="navigate" :pagination="pagination" :showLignes="false" />
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

export default {
  name: 'StdAutocomplete',
  components: { StdPagination },
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
      arrowCounter: -1
    }
  },

  methods: {
    navigate() {
      this.$emit('navigate', this.pagination)
    },
    onChange() {
      // Let's warn the parent that a change was made
      this.isLoading = true
      this.$emit('input', this.search)
    },

    onEnter() {
      //this.search = this.results[this.arrowCounter]
      this.search = this.results[this.arrowCounter]
      this.isOpen = false
      this.arrowCounter = -1
    },
    handleClickOutside(evt) {
      if (!this.$el.contains(evt.target)) {
        this.isOpen = false
        this.arrowCounter = -1
      }
    },
    setResult(selected, i) {
      this.arrowCounter = i
      this.$emit('selected', selected)
      console.log(selected)
    }
  },
  watch: {
    results: function(val, oldValue) {
      // actually compare them
      //if (val.length !== oldValue.length) {
      //this.results = val
      this.isLoading = false
      this.isOpen = true
      //}
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
  text-align: left;
  padding: 4px 0px;
  cursor: pointer;  
  border: 1px solid #eeeeee;
}

li{
    text-overflow: ellipsis;
  white-space: nowrap;
}

.autocomplete-result.is-active,
.autocomplete-result:hover {
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
</style>
