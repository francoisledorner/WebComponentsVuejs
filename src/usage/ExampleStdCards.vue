<template>
  <div>
    <StdCard />
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import StdCard from '@/components/StdCard.vue'
export default Vue.extend({
  components: { StdCard }
})
</script>
<style lang="scss" scoped>

/* Extra small devices (phones, 600px and down) */
@media only screen and (max-width: 600px) {
  .card{
    width:100%
  }
}

/* Small devices (portrait tablets and large phones, 600px and up) */
@media only screen and (min-width: 600px) {
  .card{
    width:48%
  }
  
}

/* Medium devices (landscape tablets, 768px and up) */
@media only screen and (min-width: 768px) {
  .card{
    width:48%
  }

}

/* Large devices (laptops/desktops, 992px and up) */
@media only screen and (min-width: 992px) {
  .card{
    width:22%
  }

}

/* Extra large devices (large laptops and desktops, 1200px and up) */
@media only screen and (min-width: 1200px) {
  .card{
    width:15%
  }

}
</style>
