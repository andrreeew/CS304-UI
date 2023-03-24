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
        <a-card>
          <a-tabs size="small" v style="width: 100%">
            <template #extra>
              <a-link>更多</a-link>
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


        <a-list hoverable style="background-color: white; padding: 10px" scrollbar :bordered="false" >
          <template #header>
            <div style="display: flex;justify-content: space-between">
              <div>通知</div>
              <a-link>更多</a-link>
            </div>
          </template>
          <a-list-item class="msg" v-for="i in 3" >
            <a-typography-paragraph
                :ellipsis="{
        rows: 2,
        showTooltip: true,
      }"
            class="msg">
              A design is a plan or specification for the construction of an object or system or for the implementation of an activity or process, or the result of that plan or specification in the form of a prototype, product or process. The verb to design expresses the process of developing a design. The verb to design expresses the process of developing a design.A design is a plan or specification for the construction of an object or system or for the implementation of an activity or process, or the result of that plan or specification in the form of a prototype, product or process. The verb to design expresses the process of developing a design. The verb to design expresses the process of developing a design.
            </a-typography-paragraph>
            <div style="display: flex;justify-content: space-between; color: var(--color-neutral-6)">
              <div>系统通知</div>
              <div>2020-10-01</div>
            </div>
          </a-list-item>
        </a-list>

      </a-space>
    </a-grid-item>
  </a-grid>
</template>

<script>
import lineChart from '@/components/chart/line-chart'
import applicationTable from '@/components/application/application-table'
import fundTable from '@/components/fund/fund-table'

export default {
  name: "index",
  components: {
    lineChart,
    applicationTable,
    fundTable
  },
  data() {
    return {
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