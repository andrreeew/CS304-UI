<template>
  <e-charts ref="myChart" :option="option" style="width: 100%;"></e-charts>
</template>

<script>
import * as echarts from 'echarts';
import api from '@/api'

export default {
  name: "heatmapChart",
  mounted() {
    api.getFundHistory().then(res => {
      this.chartData = res.data.data
      this.chartData = this.chartData.map(item => [item.day, item.num])
      this.max = Math.max(...this.chartData.map(item => item[1]))
    })
    this.$nextTick(() => {
      window.addEventListener("resize", this.handleResize);
      this.chart = this.$refs.myChart;
      this.chart.resize();
    });
  },
  computed:{
    option(){
      return{
        tooltip: {
          // position: 'top'
        },
        grid: {
          left: '5%',
          right: 0,
          top: '20',
          bottom: '60',
        },
        visualMap: {
          min: 0,
          max: this.max,
          calculable: true,
          type: 'continuous',
          orient: 'horizontal',
          left: 'center',
          bottom: '10%',
          inRange: {
            color: ['White','rgb(22,93,254)']
          }
        },
        calendar: {
          top: 70,
          left: 30,
          right: 30,
          cellSize: ['auto', 13],
          range: '2023',
          itemStyle: {
            borderWidth: 0.0
          },
          splitLine:{ 
            lineStyle: {
              // color:'white',
              opacity: 0.1
            }
          },
          yearLabel: { show: false }
        },
        series: [
          {
            name: '申请次数',
            type: 'heatmap',
            coordinateSystem: 'calendar',
            data: this.chartData,
            emphasis: {
              itemStyle: {
                shadowBlur: 10,
                shadowColor: 'rgba(0, 0, 0, 0.5)'
              }
            }
          }
        ]
      }
    }
  },
  data(){
    return{
      chartData : [],
      max: 0
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
    getVirtualData(year) {
      const date = +echarts.time.parse(year + '-01-01');
      const end = +echarts.time.parse(+year + 1 + '-01-01');
      const dayTime = 3600 * 24 * 1000;
      const data = [];
      for (let time = date; time < end; time += dayTime) {
        data.push([
          echarts.time.format(time, '{yyyy}-{MM}-{dd}', false),
          Math.floor(Math.random() * 10000)
        ]);
      }
      return data;
    }
  },
  created() {
    // console.log(this.getVirtualData(2023));
  }
}
</script>

<style scoped>

</style>