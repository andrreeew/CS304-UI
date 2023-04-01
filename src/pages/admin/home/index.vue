<template>
  <a-grid :cols="{ xs: 1, sm: 1, md: 1, lg: 1, xl: 3, }" :colGap="20" :rowGap="16">
    <a-grid-item :span="{ lg: 1, xl: 2, }">

      <a-space direction="vertical" style="width: 100%" size="medium">
        <a-card>
          <a-space direction="vertical" style="width: 100%">
            <a-typography style="font-size: 20px; line-height: 1.4; padding-left: 10px">下午好</a-typography>
            <a-divider style="margin-top: 10px; margin-bottom: 10px"></a-divider>
            <a-grid :cols="{ xs: 2, sm: 2, md: 2, lg: 4, xl: 2, xxl:4}">
              <a-space class="panel">
                <a-avatar :size="55" style="background-color: var(--color-fill-2);">
                  <img
                      src="http://p3-armor.byteimg.com/tos-cn-i-49unhts6dw/288b89194e657603ff40db39e8072640.svg~tplv-49unhts6dw-image.image"
                  />
                </a-avatar>
                <a-statistic title="新增申请" :value="50" :value-from="0" animation>
                  <template #suffix>件</template>
                </a-statistic>
              </a-space>
              <a-space class="panel">
                <a-avatar :size="55" style="background-color: var(--color-fill-2);">
                  <img
                      src="http://p3-armor.byteimg.com/tos-cn-i-49unhts6dw/fdc66b07224cdf18843c6076c2587eb5.svg~tplv-49unhts6dw-image.image"
                  />
                </a-avatar>
                <a-statistic title="待审批" :value="50" :value-from="0" animation>
                  <template #suffix>件</template>
                </a-statistic>
              </a-space>
              <a-space class="panel">
                <a-avatar :size="55" style="background-color: var(--color-fill-2);">
                  <img
                      src="http://p3-armor.byteimg.com/tos-cn-i-49unhts6dw/77d74c9a245adeae1ec7fb5d4539738d.svg~tplv-49unhts6dw-image.image"
                  />
                </a-avatar>
                <a-statistic title="新增经费" :value="50" :value-from="0" animation>
                  <template #suffix>件</template>
                </a-statistic>
              </a-space>
              <a-space class="panel">
                <a-avatar :size="55" style="background-color: var(--color-fill-2);">
                  <img
                      src="http://p3-armor.byteimg.com/tos-cn-i-49unhts6dw/288b89194e657603ff40db39e8072640.svg~tplv-49unhts6dw-image.image"
                  />
                </a-avatar>
                <a-statistic title="待分配经费" :value="50" :value-from="0" animation>
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
            <a-tab-pane key="0" title="大致预览" >
              <line-chart style="height: 300px"></line-chart>
            </a-tab-pane>
            <a-tab-pane key="1"  style="padding: 0px 5px" title="待审批">
              <application-table ></application-table>
            </a-tab-pane>
            <a-tab-pane key="2" style="padding: 0px 5px" title="待分配">
              <fund-table></fund-table>
            </a-tab-pane>
          </a-tabs>

        </a-card>
      </a-space>
    </a-grid-item>
    <a-grid-item :span="{ lg: 1, xl: 1, }">
      <a-space direction="vertical" style="width: 100%" size="medium">
        <a-card style="background-color:rgb(var(--arcoblue-6))">
          <a-space size="medium">
          <a-avatar :size="70" style="color: rgb(var(--arcoblue-6)); background-color: rgb(var(--arcoblue-1))">A</a-avatar>
            <a-typography style="color:white;font-size: 22px">
              管理员：LI
            </a-typography>
          </a-space>
        </a-card>


        <notify-list style="padding: 10px; background-color: white;border: 1px solid var(--color-neutral-3);border-radius: var(--border-radius-small);"></notify-list>


      </a-space>
    </a-grid-item>
  </a-grid>
</template>

<script>
import lineChart from '@/components/chart/line-chart'
import applicationTable from '@/components/application/application-table'
import fundTable from '@/components/fund/fund-table'
import notifyList from '@/components/operation/notify-list'
import {mapMutations} from 'vuex'


export default {
  name: "index",
  components: {
    lineChart,
    applicationTable,
    fundTable,
    notifyList
  },
  data() {
    return {
      selectedKey:'0',
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
      }
    },
    change(value){
      this.selectedKey = value
    }
  },
  created() {
    this.setRoutes([{label:'主页', name:'admin'}])
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