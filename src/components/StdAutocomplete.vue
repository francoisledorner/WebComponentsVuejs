<template>
  <div class="autocomplete">
    <input type="text" @input="onChange" v-model="search" @keyup.down="onArrowDown" @keyup.up="onArrowUp" @keyup.enter="onEnter" @focus="isOpen = true" />
    <ul id="autocomplete-results" v-show="isOpen" class="autocomplete-results">
      <li class="loading" v-if="isLoading">
        Chargement...
      </li>
      <li v-else v-for="(result, i) in results" :key="i" @click="setResult(result, i)" class="autocomplete-result" :class="{ 'is-active': i === arrowCounter }">
        <span class="content">{{ result.presentation() }}</span>
      </li>
       <StdPagination @navigate="navigate" :pagination="pagination" :showLignes="false" />
    </ul>
   
  </div>
</template>

<script>
import KeyValueCheckableModel from '@/api/KeyValueCheckableModel'
import FullTextQuery from '@/api/FullTextQuery'
import StdPagination from '@/components/StdPagination.vue'

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
    }
  },

  data() {
    return {
      isOpen: false,
      search: '',
      isLoading: false,
      arrowCounter: 0,
      lastScroll : 0

    }
  },

  methods: {
    navigate(currentPage, offset) {
      this.$emit('navigate', currentPage, offset)
    },
    onChange() {
      // Let's warn the parent that a change was made
      this.$emit('input', this.search)
      this.isLoading = true
    },

    onArrowDown(evt) {
      if (this.arrowCounter < this.results.length) {
        this.arrowCounter = this.arrowCounter + 1
      }else{
        this.loadMore()
      }
    },
    onArrowUp() {
      if (this.arrowCounter > 0) {
        this.arrowCounter = this.arrowCounter - 1
     }else{
        this.loadLess()
      }
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
    loadMore() {
      this.pagination.next()
      this.$emit('page', this.search)
    },
    loadLess() {
      this.pagination.previous()
      this.$emit('page', this.search)
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

<style>
#app {
}

.autocomplete {
  position: relative;
  width: 200px;
}

.autocomplete-results {
  padding: 0;
  margin: 0;
  border: 1px solid #eeeeee;
  height: 170px;
  overflow: auto;
  width: 100%;
}

.autocomplete-result {
  list-style: none;
  text-align: left;
  padding: 4px 2px;
  cursor: pointer;
}

.autocomplete-result.is-active,
.autocomplete-result:hover {
  background-color: #61616170;
  color: white;
}

.content {
  max-width: 60px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}
</style>
