<template>
  <a-descriptions size="large" :column="{xs:1, lg:2}">
    <a-descriptions-item v-for="item of fundInfo" :label="item.label">
      <a-tag v-if="item.label==='是否达标'" color="green">{{ item.value }}</a-tag>
      <div v-else>{{ item.value }}</div>
    </a-descriptions-item>
  </a-descriptions>
</template>

<script>
import dayjs from "dayjs";

export default {
  name: "fund-info",
  props: {
    fundData: Object
  },
  data(){
    return{
      data: {},
      fundInfo: [
        {label: '经费编号', value: 4214},
        {label: '经费名称', value: 'Jane Doe'},
        {label: '是否达标', value: 'complete'},
        {label: '授权日期', value: '2013/4/2-2018/4/3'},
        {label: '剩余天数', value: 19},
      ],
    }
  },
  watch: {
    fundData(newVal, oldVal){
      this.data = newVal
      this.fundInfo[0].value = this.data.id
      this.fundInfo[1].value = this.data.name
      this.fundInfo[2].value = this.data.state
      this.fundInfo[3].value = dayjs(this.data.dateRange[0]) + '-' + dayjs(this.data.dateRange[1])
      this.fundInfo[4].value = this.data.leftDay
      // TODO
    }
  }
}
</script>

<style scoped>

</style>