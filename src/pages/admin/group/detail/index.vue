<template>
  <detail-skeleton>
    <template v-slot:left>
      <a-space direction="vertical" size="medium" style="width: 100%">
        <a-card title="课题组信息">
<!--            <a-descriptions :data="groupInfo"  size="large" :column="{xs:1, lg:2}"/>-->
<!--            <a-divider></a-divider>-->
            <fund-num></fund-num>
          </a-card>
        <a-card title="分得经费">

            <fund-table :groupId="groupData.id"></fund-table>
        </a-card>
      </a-space>
    </template>
    <template v-slot:right>
      <a-space direction="vertical" style="width: 100%" size="medium">
        <a-card style="background-color:rgb(var(--arcoblue-6))">
          <a-space size="medium">
            <a-avatar :size="70" style="color: rgb(var(--arcoblue-6)); background-color: rgb(var(--arcoblue-1))">A</a-avatar>
            <a-typography style="color:white;font-size: 22px">
              课题组：1224
            </a-typography>
          </a-space>
        </a-card>
      <a-card title="人员">

          <account-list v-model:groupData="groupData"></account-list>
      </a-card>
      </a-space>
    </template>
  </detail-skeleton>

</template>

<script>
import fundTable from '@/pages/admin/group/detail/components/fund-table'
import fundNum from '@/pages/admin/group/detail/components/fund-num'
import accountList from '@/pages/admin/group/detail/components/account-list'
import api from "@/api"
import {mapMutations} from "vuex";
import detailSkeleton from "@/components/operation/detail-skeleton";

export default {
  name: "index",
  components:{
    fundTable,
    fundNum,
    accountList,
    detailSkeleton
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