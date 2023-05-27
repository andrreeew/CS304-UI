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
                <a-statistic title="正在审批" :value="statistics.underwayApplication" :value-from="0" animation>
                  <template #suffix>件</template>
                </a-statistic>
              </a-space>
              <a-space class="panel">
                <a-avatar :size="55" style="background-color: var(--color-fill-2);">
                  <img
                      src="http://p3-armor.byteimg.com/tos-cn-i-49unhts6dw/fdc66b07224cdf18843c6076c2587eb5.svg~tplv-49unhts6dw-image.image"
                  />
                </a-avatar>
                <a-statistic title="最近申请" :value="statistics.recentApplication" :value-from="0" animation>
                  <template #suffix>件</template>
                </a-statistic>
              </a-space>
              <a-space class="panel">
                <a-avatar :size="55" style="background-color: var(--color-fill-2);">
                  <img
                      src="http://p3-armor.byteimg.com/tos-cn-i-49unhts6dw/77d74c9a245adeae1ec7fb5d4539738d.svg~tplv-49unhts6dw-image.image"
                  />
                </a-avatar>
                <a-statistic title="最近通过" :value="statistics.permittedApplication" :value-from="0" animation>
                  <template #suffix>件</template>
                </a-statistic>
              </a-space>
              <a-space class="panel">
                <a-avatar :size="55" style="background-color: var(--color-fill-2);">
                  <img
                      src="http://p3-armor.byteimg.com/tos-cn-i-49unhts6dw/288b89194e657603ff40db39e8072640.svg~tplv-49unhts6dw-image.image"
                  />
                </a-avatar>
                <a-statistic title="最近驳回" :value="statistics.rejectedApplication" :value-from="0" animation>
                  <template #suffix>件</template>
                </a-statistic>
              </a-space>
            </a-grid>
          </a-space>
        </a-card>
        <a-card>
          <a-tabs type="rounded" size="small" v style="width: 100%">
            <template #extra>
              <a-space>
                <a-button type="primary" @click="$router.push({name:'user-application-new'})">创建申请</a-button>
                <a-button @click="$router.push({name:'user-application'})">更多</a-button>
              </a-space>
            </template>
            <a-tab-pane key="0" style="padding: 0px 5px" title="我的申请" >
              <application-table :data="applicationData" :loading="loading"></application-table>
            </a-tab-pane>
            <!-- <a-tab-pane key="1"  style="padding: 0px 5px" title="申请中">
              <application-table ></application-table>
            </a-tab-pane>
            <a-tab-pane key="2" style="padding: 0px 5px" title="已通过">
              <application-table ></application-table>
            </a-tab-pane>
            <a-tab-pane key="3" style="padding: 0px 5px" title="已驳回">
              <application-table ></application-table>
            </a-tab-pane> -->
          </a-tabs>

        </a-card>

        <a-card title="申请记录">
          <heat-map-chart style="height: 250px;"></heat-map-chart>
        </a-card>

      </a-space>
    </template>

    <template v-slot:right>
      <a-space direction="vertical" style="width: 100%" size="medium">
        <a-card style="background-color:rgb(var(--arcoblue-6))">
          <a-space size="medium">
            <a-avatar :size="70" style="color: rgb(var(--arcoblue-6)); background-color: rgb(var(--arcoblue-1))">U</a-avatar>
            <a-typography style="color:white;font-size: 22px">
              用户：LI
            </a-typography>
          </a-space>
        </a-card>



        <!--        <a-list hoverable style="background-color: white; padding: 10px" scrollbar :bordered="false" >-->
        <!--          <template #header>-->
        <!--            <div style="display: flex;justify-content: space-between">-->
        <!--              <div>通知</div>-->
        <!--              <a-link>更多</a-link>-->
        <!--            </div>-->
        <!--          </template>-->
        <!--          <a-list-item class="msg" v-for="i in 3" >-->
        <!--            <a-typography-paragraph-->
        <!--                :ellipsis="{-->
        <!--        rows: 2,-->
        <!--        showTooltip: true,-->
        <!--      }"-->
        <!--                class="msg">-->
        <!--              A design is a plan or specification for the construction of an object or system or for the implementation of an activity or process, or the result of that plan or specification in the form of a prototype, product or process. The verb to design expresses the process of developing a design. The verb to design expresses the process of developing a design.A design is a plan or specification for the construction of an object or system or for the implementation of an activity or process, or the result of that plan or specification in the form of a prototype, product or process. The verb to design expresses the process of developing a design. The verb to design expresses the process of developing a design.-->
        <!--            </a-typography-paragraph>-->
        <!--            <div style="display: flex;justify-content: space-between; color: var(&#45;&#45;color-neutral-6)">-->
        <!--              <div>系统通知</div>-->
        <!--              <div>2020-10-01</div>-->
        <!--            </div>-->
        <!--          </a-list-item>-->
        <!--        </a-list>-->

        <a-card>
          <a-space direction="vertical" style="width: 100%">
            <div style="display: flex;justify-content: space-between; padding: 0px 10px">
              <a-typography style="font-size: 18px; line-height: 1.1;">我的课题组</a-typography>
              <a-link @click="$router.push({name:'user-group'})">更多</a-link>
            </div>
            <a-divider style="margin-top: 0px; margin-bottom: 10px"></a-divider>
            <a-grid :cols="{ xs: 1, sm: 1, md: 1, lg: 1, xl:1, xxl:1}" :colGap="20" :rowGap="16" >
              <a-grid-item span="1" v-for="i in groups">
                <group-card :info="i"></group-card>
              </a-grid-item>
            </a-grid>
          </a-space>
        </a-card>

      </a-space>
    </template>
  </detail-skeleton>
</template>

<script>
import lineChart from '@/components/chart/fund/line-chart'
import applicationTable from '@/components/application/application-table'
import fundTable from '@/components/fund/fund-table'
import groupCard from '@/components/group/group-card'
import {mapMutations} from "vuex";
import dayjs from "dayjs";
import detailSkeleton from "@/components/operation/detail-skeleton";
import api from "@/api"
import heatMapChart from '@/components/chart/home/heat-map-chart.vue'

export default {
  name: "index",
  components: {
    lineChart,
    applicationTable,
    fundTable,
    groupCard,
    detailSkeleton,
    heatMapChart
  },
  data() {
    return {
      statistics:{
        underwayApplication:0,
        recentApplication:0,
        permittedApplication:0,
        rejectedApplication:0
      },
      groups:[],
      applicationData:[],
      loading:false,
      period:'',
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
    getStatistics(){
      api.getUserHomeStatistics().then(res => {
        this.statistics = res.data.data
      })
    },
    getGroups(){
      api.getUserGroups().then(res => {
        this.groups = res.data.data
      })
    },
    getApplications(){
      this.loading = true
      api.getUserApplications({page:1, type:"all"}).then(res => {
        this.applicationData = res.data.data.data
      }).finally(()=>{this.loading=false})
    },
  },
  created() {
    this.getStatistics()
    this.getGroups()
    this.getApplications()
    this.setRoutes([{label:'主页', name:'user'}])
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