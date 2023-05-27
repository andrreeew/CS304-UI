<template>
  <detail-skeleton>
    <template v-slot:left>
      <a-space direction="vertical" size="medium" style="width: 100%">
        <a-card title="课题组信息">
          <!--            <a-descriptions :data="groupInfo"  size="large" :column="{xs:1, lg:2}"/>-->
          <!--            <a-divider></a-divider>-->
          <fund-num :member-num="memberNum" :total-fund="groupData.total" :left-fund="groupData.left"
                    :used-fund="groupData.cost"></fund-num>
        </a-card>
        <a-card title="分得经费">
          <fund-table :groupId="groupData.id" :group-name="groupData.name"></fund-table>
        </a-card>
      </a-space>
    </template>
    <template v-slot:right>
      <a-space direction="vertical" style="width: 100%" size="medium">
        <a-card style="background-color:rgb(var(--arcoblue-6))">
          <a-space size="medium">
            <a-avatar :size="70" style="color: rgb(var(--arcoblue-6)); background-color: rgb(var(--arcoblue-1))">{{groupFirst}}</a-avatar>
            <a-typography style="color:white;font-size: 22px">
              课题组：{{groupData.name}}
            </a-typography>
          </a-space>
        </a-card>
        <a-card title="人员">

          <account-list :groupData="groupData" :accounts="accounts" :update-data="updateData"></account-list>
        </a-card>

        <a-card title="分配情况">
          <pie-chart :id="groupData.id" style="height: 400px;"></pie-chart>
        </a-card>
      </a-space>
    </template>
  </detail-skeleton>

</template>

<script>
import fundTable from '@/components/group/components/fund-table'
import fundNum from '@/components/group/components/fund-num'
import accountList from '@/components/group/components/account-list'
import api from "@/api"
import {mapMutations} from "vuex";
import detailSkeleton from "@/components/operation/detail-skeleton";
import pieChart from '@/components/chart/group/pie-chart'

export default {
  name: "index",
  components:{
    fundTable,
    fundNum,
    accountList,
    detailSkeleton,
    pieChart
  },
  computed:{
    identity(){
      return this.$route.path.substring(1).split('/')[0];
    },
    memberNum(){
      if(this.groupData.users){
        return this.groupData.users.length
      }
      return 0;
    },
    groupFirst(){
      if(this.groupData.name){
        // return this.groupData.name.charAt(0).toUpperCase()
      }
      return  'G';
    }
  },
  methods:{
    ...mapMutations(['setRoutes']),
    updateData(){
      api.getGroups({id:this.$route.params.groupId,pageSize:1,page:1}).then(res => {
        if (res.data.code === 200) {
          this.groupData = res.data.data.groups[0]
          // console.log(this.groupData)
        } else{
          this.$router.push({name: 'notFound', params: {pathMatch: this.$route.path.substring(1).split('/')}})
        }

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
    // console.log(this.groupData.users)
  }
}
</script>

<style scoped>

</style>