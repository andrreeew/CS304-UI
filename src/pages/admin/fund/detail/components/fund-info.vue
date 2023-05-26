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
        {label: '经费编号', value: ''},
        {label: '经费名称', value: ''},
        {label: '是否达标', value: ''},
        {label: '授权日期', value: '-'},
        {label: '剩余天数', value: ''},
      ],
    }
  },
  watch: {
    fundData(newVal, oldVal){
      this.data = newVal
      this.fundInfo[0].value = this.data.id
      this.fundInfo[1].value = this.data.name
      this.fundInfo[2].value = this.data.state
      this.fundInfo[3].value = dayjs(this.data.dataRange[0]).format('YYYY/MM/DD') + '-' + dayjs(this.data.dataRange[1]).format('YYYY/MM/DD')
      this.fundInfo[4].value = this.data.leftDay
      // TODO
    }
  }
}
</script>

<style scoped>

</style>