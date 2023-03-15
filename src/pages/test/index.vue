<template>
  <div>
  <application-table v-model:rows="rows" :select="true"></application-table>
  <a-button @click="show">test</a-button>
  {{rows}}
  </div>
</template>

<script>
import applicationTable from '@/components/application/application-table'

export default {
  name: "index",
  components:{
    applicationTable
  },
  data(){
    return{
      rows:[],
    }
  },
  methods:{
    show(){
      console.log(this.rows)
    }
  }
}
</script>

<style scoped>

</style>