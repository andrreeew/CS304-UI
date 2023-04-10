<template>
  <detail-skeleton>
    <template v-slot:left>
      <a-space direction="vertical" size="medium" style="width: 100%">
        <a-card title="课题组信息">
<!--            <a-descriptions :data="groupInfo"  size="large" :column="{xs:1, lg:2}"/>-->
<!--            <a-divider></a-divider>-->
            <fund-num :member-num="groupData.users?length(groupData.users):0" :total-fund="groupData.total" :left-fund="groupData.left"
                      :used-fund="groupData.cost"></fund-num>
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

          <account-list v-model:groupData="groupData" :accounts="accounts" :update-data="updateData"></account-list>
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
  computed:{
    memberNum(){
      if(this.groupData.users){
        return length(this.groupData.users)
      }
      return 0;
    }
  },
  methods:{
    ...mapMutations(['setRoutes']),
    updateData(){
      api.getGroups({id:this.$route.params.groupId,pageSize:1,page:1}).then(res => {
        this.groupData = res.data.data.groups[0]
        // this.groupInfo[0].value = this.groupData.name
      }).then(() => {
        api.getUsersNotInGroup(this.groupData.name).then(res => {
          if (res.data.code === 200) {
            this.accounts = res.data.data
          }
        })
      })
    }
  },
  data(){
    return{
      groupData: {},
      accounts:[],
      statistics: {
        memberNum:1,
        totalFund:2,
        usedFund:3,
        leftFund:4
      }
    }
  },
  created(){
    this.setRoutes([{label:'课题组', name:'admin-group'}])
    this.updateData()
  }
}
</script>

<style scoped>

</style>