<template>
  <div class="container">
    <v-tips></v-tips>
    <v-search></v-search>
  </div>
</template>

<script>
import Vtips from '@/components/tips'
import Vsearch from '@/components/we-search'

export default {
  data () {
    return {
      motto: 'Hello World',
      userInfo: {}
    }
  },

  components: {
    'v-tips': Vtips,
    'v-search': Vsearch
  }
}
</script>

<style scoped>
page {
  background-image: linear-gradient(-225deg, #E3FDF5 0%, #FFE6FA 100%);
}
</style>
