<template>
    <e-charts ref="myChart" :option="option" style="width: 100%"></e-charts>
  </template>
  
  <script>
  import {graphic} from 'echarts';
  
  export default {
    name: "pie-chart",
    mounted() {
      this.data = [
        {name:'3-2', value: 1},
        {name:'3-1', value: 10},
        {name:'3-3', value: 2},
        {name:'3-4', value: 3},
        {name:'3-5', value: 3}
      ]
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