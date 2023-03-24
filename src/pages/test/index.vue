<template>
  <a-card>
    <e-charts ref="myChart" style="height: 300px"></e-charts>
  </a-card>
</template>

<script>
export default {
  name: "index",

  data(){
    return{
      option:{
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


  watch: {
    // 监听容器大小的变化
    "$el.clientWidth": function() {
      // 延迟执行 resize 方法，防止频繁调用
      setTimeout(() => {
        this.$refs.myChart.resize();
      }, 300);
    }
  }
}
</script>

<style scoped>
.panel{
  padding-left: 15px;
  border-right: 1px solid rgb(var(--gray-2));
}
</style>






