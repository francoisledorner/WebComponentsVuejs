<template>
  <div id="app">
    <StdBanner position="bottom"></StdBanner>
    <h2>Une TreeTable :</h2>
    <div class="container">
      <ExempleStdTreeTable></ExempleStdTreeTable>
    </div>
    <h2>Une table :</h2>
    <div class="container">
      <ExempleStdTable></ExempleStdTable>
    </div>
    <h2>Une flat table/tree :</h2>
    <div class="container">
      <ExampleStdTreeFlatTable></ExampleStdTreeFlatTable>
    </div>
    <h2>Les effets :</h2>
    <div class="container">
      <ExampleStdEffect></ExampleStdEffect>
    </div>
    <h2>Les cards :</h2>
    <div class="container">
      <ExampleStdCards></ExampleStdCards>
    </div>
    
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import StdBanner from '@/components/StdBanner.vue'
import ExempleStdTreeTable from '@/usage/ExempleStdTreeTable.vue'
import ExempleStdTable from '@/usage/ExempleStdTable.vue'
import ExampleStdEffect from '@/usage/ExampleStdEffect.vue'
import ExampleStdTreeFlatTable from '@/usage/ExampleStdTreeFlatTable.vue'
import ExampleStdCards from '@/usage/ExampleStdCards.vue'

export default Vue.extend({
  name: 'app',
  components: {
    StdBanner,
    ExempleStdTreeTable,
    ExempleStdTable,
    ExampleStdEffect,
    ExampleStdTreeFlatTable,
    ExampleStdCards
  }
})
</script>

<style lang="scss">
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  height: 400px;
}
</style>

<style>
.container {
  height: auto;
}
</style>
