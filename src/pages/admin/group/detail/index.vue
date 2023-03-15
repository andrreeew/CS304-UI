<template>
  <a-grid :cols="3" :colGap="17">
    <a-grid-item :span="2">
  <a-space direction="vertical" size="medium" style="width: 100%">
    <a-card >
      <a-card :bordered="false" title="课题组信息">
        <a-descriptions :data="groupInfo"  size="large" :column="{xs:1, lg:2}"/>
      </a-card>

    </a-card>
    <a-card>
      <fund-num></fund-num>
    </a-card>
    <a-card>
      <a-card :bordered="false" title="分得经费">
      <fund-table></fund-table>
      </a-card>
    </a-card>
  </a-space>
    </a-grid-item>
    <a-grid-item :span="1">
      <a-card>
        <a-card title="人员" :bordered="false">
          <account-list></account-list>
        </a-card>
      </a-card>
    </a-grid-item>
  </a-grid>
</template>

<script>
import fundTable from '@/pages/admin/group/detail/components/fund-table'
import fundNum from '@/pages/admin/group/detail/components/fund-num'
import accountList from '@/pages/admin/group/detail/components/account-list'

export default {
  name: "index",
  components:{
    fundTable,
    fundNum,
    accountList
  },
  data(){
    return{
      groupInfo:[
        {label: '课题组', value: '李明'},
        {label: '创建日期', value: '李明'},
      ]
    }
  }
}
</script>

<style scoped>

</style>