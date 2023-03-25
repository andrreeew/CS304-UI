<template>
  <group-card v-for="group in groups" :name="group.name" :total="group.total" :cost="group.cost"
              :left="group.id" >
  </group-card>
</template>

<script>
import groupCard from '@/components/group/group-card'

export default {
  name: "index",
  components:{
    groupCard
  },
  data(){
    return{
      groups:[
        {id: 42, name: 'Zha', total: 120, cost: 21, left: 14, member: ['ABC', 'BSET', 'BSET', 'BSET'], identity:true},
        {id: 42, name: 'Zhang', total: 120, cost: 21, left: 14, member: ['ABC', 'BSET', 'BSET', 'BSET'], identity:false},
        {id: 42, name: 'Zha', total: 120, cost: 21, left: 14, member: ['ABC', 'BSET', 'BSET', 'BSET'], identity: false},
      ],
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






