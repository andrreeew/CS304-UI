<template>
  <detail-skeleton>
    <template v-slot:left>
      <a-space direction="vertical" style="width: 100%" size="medium">
        <a-card>
          <a-space direction="vertical" style="width: 100%">
            <a-typography style="font-size: 20px; line-height: 1.4; padding-left: 10px">{{period}}</a-typography>
            <a-divider style="margin-top: 10px; margin-bottom: 10px"></a-divider>
            <a-grid :cols="{ xs: 2, sm: 2, md: 2, lg: 4, xl: 2, xxl:4}">
              <a-space class="panel">
                <a-avatar :size="55" style="background-color: var(--color-fill-2);">
                  <img
                      src="http://p3-armor.byteimg.com/tos-cn-i-49unhts6dw/288b89194e657603ff40db39e8072640.svg~tplv-49unhts6dw-image.image"
                  />
                </a-avatar>
                <a-statistic title="新增申请" :value="statistics.newApplication" :value-from="0" animation>
                  <template #suffix>件</template>
                </a-statistic>
              </a-space>
              <a-space class="panel">
                <a-avatar :size="55" style="background-color: var(--color-fill-2);">
                  <img
                      src="http://p3-armor.byteimg.com/tos-cn-i-49unhts6dw/fdc66b07224cdf18843c6076c2587eb5.svg~tplv-49unhts6dw-image.image"
                  />
                </a-avatar>
                <a-statistic title="待审批" :value="statistics.unserwayApplication" :value-from="0" animation>
                  <template #suffix>件</template>
                </a-statistic>
              </a-space>
              <a-space class="panel">
                <a-avatar :size="55" style="background-color: var(--color-fill-2);">
                  <img
                      src="http://p3-armor.byteimg.com/tos-cn-i-49unhts6dw/77d74c9a245adeae1ec7fb5d4539738d.svg~tplv-49unhts6dw-image.image"
                  />
                </a-avatar>
                <a-statistic title="新增经费" :value="statistics.newFund" :value-from="0" animation>
                  <template #suffix>件</template>
                </a-statistic>
              </a-space>
              <a-space class="panel">
                <a-avatar :size="55" style="background-color: var(--color-fill-2);">
                  <img
                      src="http://p3-armor.byteimg.com/tos-cn-i-49unhts6dw/288b89194e657603ff40db39e8072640.svg~tplv-49unhts6dw-image.image"
                  />
                </a-avatar>
                <a-statistic title="待分配经费" :value="statistics.underwayFund" :value-from="0" animation>
                  <template #suffix>件</template>
                </a-statistic>
              </a-space>
            </a-grid>
          </a-space>
        </a-card>
        <a-card style="padding-bottom: 20px">
          <a-tabs size="small" v :active-key="selectedKey" style="width: 100%" @change="change">
            <template #extra>
              <a-link @click="jump()">更多</a-link>
            </template>
<!--            <a-tab-pane key="0" title="大致预览" >-->
<!--              <line-chart style="height: 300px"></line-chart>-->
<!--            </a-tab-pane>-->
            <a-tab-pane key="1"  style="padding: 0px 5px" title="待审批">
              <application-table 
                :data="applicationData"
                :loading="loading"
                :update-data="getData"
              >
              </application-table>
            </a-tab-pane>
            <a-tab-pane key="2" style="padding: 0px 5px" title="待分配">
              <fund-table></fund-table>
            </a-tab-pane>
          </a-tabs>

        </a-card>
      </a-space>
    </template>
    <template v-slot:right>
      <a-space direction="vertical" style="width: 100%" size="medium">
        <a-card style="background-color:rgb(var(--arcoblue-6))">
          <a-space size="medium">
            <a-avatar :size="70" style="color: rgb(var(--arcoblue-6)); background-color: rgb(var(--arcoblue-1))">A</a-avatar>
            <a-typography style="color:white;font-size: 22px">
              管理员：Admin
            </a-typography>
          </a-space>
        </a-card>


        <notify-list :data="msgs" style="padding: 10px; background-color: white;border: 1px solid var(--color-neutral-3);border-radius: var(--border-radius-small);"></notify-list>


      </a-space>
    </template>
  </detail-skeleton>
</template>

<script>
import lineChart from '@/components/chart/fund/line-chart'
import applicationTable from '@/components/application/application-table'
import fundTable from '@/components/fund/fund-table'
import notifyList from '@/components/operation/notify-list'
import detailSkeleton from '@/components/operation/detail-skeleton'
import {mapMutations} from 'vuex'
import dayjs from "dayjs";
import api from "@/api"


export default {
  name: "index",
  components: {

    lineChart,
    applicationTable,
    fundTable,
    notifyList,
    detailSkeleton
  },
  data() {
    return {
      period:'',
      selectedKey:'1',
      applicationData:[],
      msgs:[],
      loading:false,
      statistics:{
        newApplication:0,
        unserwayApplication:0,
        newFund:0,
        underwayFund:0
      },
      option: {
        xAxis: {
          type: 'category',
          data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
        },
        yAxis: {
          type: 'value'
        },
        series: [
          {
            data: [150, 230, 224, 218, 135, 147, 260],
            type: 'line'
          }
        ]
      }
    }
  },
  methods:{
    ...mapMutations(['setRoutes']),
    jump(){
      if(this.selectedKey==='1'){
        this.$router.push({name:'admin-application-table', query:{type:'underway'}})
      }else if(this.selectedKey==='2'){
        this.$router.push({name:'admin-fund-table', query:{type:'1'}})
      }
    },
    change(value){
      this.selectedKey = value
    },
    getData(){
      this.loading = true
      api.getApplications({page:1, type:"underway"}).then(res => {
        this.applicationData = res.data.data.data
      }).finally(()=>{this.loading=false})
    },
    getStatistics(){
      api.getAdminHomeStatistics().then(res => {
        this.statistics = res.data.data
      })
    },
    getMsgs(){
      api.getAdminMessages({page:1,type:'all'}).then(res => {
        this.msgs = res.data.data.data
      })
    }
  },
  created() {
    this.getData()
    this.getStatistics()
    this.getMsgs()
    this.setRoutes([{label:'主页', name:'admin'}])
    const now = dayjs()
    const hour = now.hour()

    if (hour >= 4 && hour < 11) {
      this.period = '早上好'
    } else if(hour>=11 && hour<15){
      this.period = '中午好'
    } else if(hour>=15 && hour<18){
      this.period = '下午好'
    }else if(hour>=18 && hour<24){
      this.period = '晚上好'
    }else {
      this.period ='夜深了，注意休息'
    }
  }
}
</script>

<style scoped>
.panel {
  padding-bottom: 20px;
  padding-left: 15px;
  border-right: 1px solid rgb(var(--gray-2));
}

.msg:hover{
  cursor: pointer;
  color: #3370ff;
}

</style>