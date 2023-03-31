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
      <fund-table :groupId="groupData.id"></fund-table>
      </a-card>
    </a-card>
  </a-space>
    </a-grid-item>
    <a-grid-item :span="1">
      <a-card>
        <a-card title="人员" :bordered="false">
          <account-list v-model:groupData="groupData"></account-list>
        </a-card>
      </a-card>
    </a-grid-item>
  </a-grid>
</template>

<script>
import fundTable from '@/pages/admin/group/detail/components/fund-table'
import fundNum from '@/pages/admin/group/detail/components/fund-num'
import accountList from '@/pages/admin/group/detail/components/account-list'
import api from "@/api"
import {mapMutations} from "vuex";

export default {
  name: "index",
  components:{
    fundTable,
    fundNum,
    accountList
  },
  methods:{
    ...mapMutations(['setRoutes'])
  },
  data(){
    return{
      groupInfo:[
        {label: '课题组名', value: ''},
        // {label: '创建日期', value: ''},
      ],
      groupData: {}
    }
  },
  created(){
    this.setRoutes([{label:'课题组', name:'admin-group'}])
    api.getGroups({id:this.$route.params.groupId,pageSize:1,page:1}).then(res => {
      this.groupData = res.data.data.groups[0]
      this.groupInfo[0].value = this.groupData.name
    })
  }
}
</script>

<style scoped>

</style>