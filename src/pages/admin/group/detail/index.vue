<template>
  <a-space direction="vertical" size="medium" style="width: 100%">
    <a-card >
      <a-card :bordered="false" title="课题组信息">
        <a-descriptions :data="groupInfo"  size="large" :column="{xs:1, lg:2}"/>
        <a-divider></a-divider>
        <fund-num></fund-num>
      </a-card>

    </a-card>
    <a-card>
      <a-card :bordered="false" title="分得经费">
      <fund-table></fund-table>
      </a-card>
    </a-card>
  </a-space>
</template>

<script>
import fundTable from '@/pages/admin/group/detail/components/fund-table'
import fundNum from '@/pages/admin/group/detail/components/fund-num'

export default {
  name: "index",
  components:{
    fundTable,
    fundNum
  },
  data(){
    return{
      groupInfo:[
        {label: '课题组', value: '李明'},
        {label: '创建日期', value: '李明'},
        {label: '人员', value: '李明'},
      ]
    }
  }
}
</script>

<style scoped>

</style>