<template>
  <a-card style="width: 100%">
    <record-detail></record-detail>
  </a-card>
</template>

<script>
import recordDetail from '@/components/record/record-detail'

export default {
  name: "index",
  components:{
    recordDetail
  },
}
</script>

<style scoped>
</style>