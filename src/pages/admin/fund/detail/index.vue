<template>
  <detail-skeleton>
    <template v-slot:left>
      <a-space direction="vertical" size="medium" style="width: 100%">
        <a-card title="经费信息">
          <fund-info :fundData="data"></fund-info>
          <a-divider></a-divider>
          <fund-num :statistics="statistics"></fund-num>
        </a-card>

        <!-- <a-card title="分配课题组" style="padding-bottom: 20px"> -->
        <a-card title="分配课题组">
          <group-table :fundId="data.id"></group-table>
        </a-card>
<!--        <a-card title="使用记录">-->
<!--          <template #extra>-->
<!--            <a-link>更多</a-link>-->
<!--          </template>-->
<!--          <application-table style="margin-bottom: 20px"></application-table>-->
<!--        </a-card>-->

        <!-- <a-card title="使用记录" style="padding-bottom: 20px"> -->
        <a-card title="使用记录">
          <line-chart :id="id" style="height: 400px;"></line-chart>
        </a-card>

      </a-space>

      <a-modal v-model:visible="visible" >
        <template #title>
          添加课题组
        </template>
<!--        <group-form></group-form>-->
      </a-modal>
<!--  <a-modal v-model:visible="visible" >-->
<!--    <template #title>-->
<!--      添加课题组-->
    </template>

    <template v-slot:right>
      <a-space direction="vertical" style="width: 100%" size="medium">
        <a-card style="background-color:rgb(var(--arcoblue-6))">
          <a-space size="medium">
            <a-avatar :size="70" style="color: rgb(var(--arcoblue-6)); background-color: rgb(var(--arcoblue-1))">{{fundFirst}}</a-avatar>
            <a-typography style="color:white;font-size: 22px">
              经费：{{data.name}}
            </a-typography>
          </a-space>
        </a-card>

        <a-card title="分配情况">
          <pie-chart :id="id" style="height: 400px;"></pie-chart>
        </a-card>
      </a-space>
    </template>
  </detail-skeleton>

</template>

<script>
import applicationTable from '@/components/application/application-table'
import groupTable from '@/pages/admin/fund/detail/components/group-table'
import fundInfo from '@/pages/admin/fund/detail/components/fund-info'
import fundNum from '@/pages/admin/fund/detail/components/fund-num'
import api from "@/api"
import deleteButton from '@/components/operation/delete-button'
import {mapMutations} from 'vuex'
import detailSkeleton from "@/components/operation/detail-skeleton";
import lineChart from '@/components/chart/fund/line-chart'
import pieChart from '@/components/chart/fund/pie-chart'

export default {
  name: "index",
  components: {
    applicationTable,
    groupTable,
    fundInfo,
    fundNum,
    deleteButton,
    detailSkeleton,
    lineChart,
    pieChart
  },
  methods:{
    ...mapMutations(['setRoutes']),
    getData(){
      api.getFunds({id:this.id}).then(res => {
        console.log('getfund')
        if (res.data.code === 200) {
          this.data = res.data.data
          api.getFundStatistics(this.id).then(res => {
            this.statistics = res.data.data
          })
        }else{
          this.$router.push({name: 'notFound', params: {pathMatch: this.$route.path.substring(1).split('/')}})
        }
      })


    }
  },
  computed:{
    fundFirst(){
      if(this.data.name){
        return this.data.name.charAt(0).toUpperCase()
      }
      return 'F'
    },
  },
  data() {
    return {
      id: this.$route.params.fundId,
      data: {},
      visible: false,
      statistics: {
        totalFund:'0',
        left:'0',
        used:'0',
        completeRate:'0'
      },
    }
  },
  created(){
    this.setRoutes([{label:'经费', name:'admin-fund'}])
    this.getData()
  }
}
</script>

<style scoped>
</style>