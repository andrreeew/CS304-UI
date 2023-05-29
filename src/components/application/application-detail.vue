<template>
  <div style="padding-right: 40px; padding-left: 40px; min-width: 600px">
  <a-descriptions size="large" :column="{xs:1, lg:2}">
    <a-descriptions-item v-for="item of applicationInfo" :label="item.label">
      <a-tag v-if="item.label==='是否达标'" color="green">{{ item.value }}</a-tag>
      <a-link v-else-if="item.label==='课题组'||item.label==='经办人'||item.label==='经费编号'||item.label==='经费名称'">{{item.value}}</a-link>
      <div v-else>{{ item.value }}</div>
    </a-descriptions-item>
  </a-descriptions>
  <a-divider></a-divider>
  <a-steps :current="2" :status="state">
    <a-step :description="applicationTimeline.date1">提交申请</a-step>
    <a-step v-if="applicationTimeline.state==='underway'" :description="applicationTimeline.date2">审批中</a-step>
    <a-step v-else-if="applicationTimeline.state==='reject'" :description="applicationTimeline.date2">驳回</a-step>
    <a-step v-else :description="applicationTimeline.date2">通过</a-step>
  </a-steps>
  </div>
</template>

<script>
export default {
  name: "application-detail",
  computed:{
    state(){
      if(this.applicationTimeline.state==='reject'){
        return 'error'
      }else if(this.applicationTimeline.state==='complete'){
        return 'finish'
      }else {
        return 'process'
      }
    }
  },
  props:{
    applicationInfo:{
      default:[
        {label: '申请序号', value: 213},
        {label: '经费编号', value: 321321},
        {label: '经费名称', value: 124214},
        {label: '课题组', value: 1244},
        {label: '课题组总额度', value: 19},
        {label: '已用额度', value: true},
        {label: '经办人', value: 'fasfsa'},
        {label: '支出类别', value: true},
        {label: '支出金额', value: 192},
        {label: '内容摘要', value: 21414451251},
        {label: '备注', value:241241242}]
    },
    applicationTimeline:{
      default: {
        date1:'2010-10-1',
        date2: null,
        state: 'process',
      }
    }
  },

}
</script>

<style scoped>

</style>