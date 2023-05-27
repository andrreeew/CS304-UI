<template>
  <e-charts ref="myChart" :option="option" style="width: 100%"></e-charts>
</template>

<script>
import {graphic} from 'echarts';
import api from "@/api"

export default {
  name: "pie-chart",
  props: {
    id:{default:1}
  },
  mounted() {
    api.getGroupPie(this.id).then(res => {
      this.data = res.data.data
    //   this.data[this.data.length-1].itemStyle = {color:'#D3D3D3'}
    })
    this.$nextTick(() => {
      window.addEventListener("resize", this.handleResize);
      this.chart = this.$refs.myChart;
      this.chart.resize();
    });

  },
  data() {
    return {
      data : []
    }
  },
  computed:{
    option(){
      return  {
        tooltip: {
          trigger: 'item'
        },
        legend: {
          orient: 'horizontal',
          left: 'center'
        },
        series:[
          {
            data: this.data,
            type: 'pie',
          }],
      }
    }
  },

  beforeDestroy() {
    window.removeEventListener("resize", this.handleResize);
  },
  methods: {
    handleResize() {
      if (this.chart) {
        this.chart.resize();
      }
    },
  },

}
</script>

<style scoped>

</style>