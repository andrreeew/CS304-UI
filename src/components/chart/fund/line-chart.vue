<template>
  <e-charts ref="myChart" :option="option" style="width: 100%"></e-charts>
</template>

<script>
import {graphic} from 'echarts';
import dayjs from "dayjs";
import api from "@/api"

export default {
  name: "line-chart",
  props:{
    id:{default:0}
  },
  mounted() {
    api.getFundHistory(this.id).then(res => {
      this.data = res.data.data
    })
    // this.data = [
    //   {x:'2023/05/18', y: 0},
    //   {x:'2023-05-20', y: 0},
    //   {x:'2023-05-21', y: 10},
    //   {x:'2023-05-22', y: 2},
    //   {x:'2023-05-23', y: 3},
    //   {x:'2023-05-24', y: 3}
    // ]
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
        grid: {
          left: '20',
          right: '50',
          top: '20',
          bottom: '80',
          containLabel: true
        },
        legend: {
          bottom: 0,
          icon: 'circle',
          textStyle: {
            color: '#4E5969',
          },
        },
        xAxis: {
          type: 'category',
          data: this.data.map(item=>item.changeTime),
          // interval: 24 * 60 * 60 * 1000,
          boundaryGap: false,
          axisLine: {
            lineStyle: {
              color: '#A9AEB8',
            },
          },
          axisTick: {
            show: true,
            alignWithLabel: true,
            lineStyle: {
              color: '#86909C',
            },
          },
          axisLabel: {
            color: '#86909C',
          },
        },
        yAxis: {
          type: 'value',
          axisLabel: {
            color: '#86909C',
            formatter: '{value}',
          },
          splitLine: {
            lineStyle: {
              color: '#E5E6EB',
            },
          },
        },
        tooltip: {
          show: true,
          trigger: 'axis',
          className: 'echarts-tooltip-diy',
        },
        series:[
          {
            data: this.data.map(item=>item.number),
            type: 'line',
            smooth: true,
            // symbol: 'circle',
            symbolSize: 12,
            emphasis: {
              focus: 'series',
              itemStyle: {
                borderWidth: 2,
              },
            },
            lineStyle: {
              width: 3,
              color: new graphic.LinearGradient(0, 0, 1, 0, [
                {
                  offset: 0,
                  color: 'rgba(30, 231, 255, 1)',
                },
                {
                  offset: 0.5,
                  color: 'rgba(36, 154, 255, 1)',
                },
                {
                  offset: 1,
                  color: 'rgba(111, 66, 251, 1)',
                },
              ]),
            },
            showSymbol: false,
            areaStyle: {
              opacity: 0.8,
              color: new graphic.LinearGradient(0, 0, 0, 1, [
                {
                  offset: 0,
                  color: 'rgba(17, 126, 255, 0.16)',
                },
                {
                  offset: 1,
                  color: 'rgba(17, 128, 255, 0)',
                },
              ]),
            },
          }],
        dataZoom: [
          {
            bottom: 40,
            type: 'slider',
            left: 40,
            right: 10,
            height: 14,
            borderColor: 'transparent',
            handleIcon:
                'image://http://p3-armor.byteimg.com/tos-cn-i-49unhts6dw/1ee5a8c6142b2bcf47d2a9f084096447.svg~tplv-49unhts6dw-image.image',
            handleSize: '20',
            handleStyle: {
              shadowColor: 'rgba(0, 0, 0, 0.2)',
              shadowBlur: 4,
            },
            brushSelect: false,
            backgroundColor: '#F2F3F5',
          },
          {
            type: 'inside',
            start: 0,
            end: 100,
            zoomOnMouseWheel: false,
          },
        ],
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
  watch: {
    id(newVal, oldVal){
      api.getFundHistory(newVal).then(res => {
        this.data = res.data.data
        console.log('history');
        console.log(this.data);
      })
    }
  }
}
</script>

<style scoped>

</style>