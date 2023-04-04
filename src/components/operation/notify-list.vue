<template>

  <a-list hoverable
          scrollbar :bordered="false" >
    <template #header>
      <div style="display: flex;justify-content: space-between">
        <div>通知</div>
        <a-link @click="this.$router.push({name:this.identity+'-message'})">更多</a-link>
      </div>
    </template>
  <a-list-item class="msg" v-for="item in data" >
    <a-typography-paragraph
        :ellipsis="{
        rows: 2,
        showTooltip: true,
      }"
        class="msg">
      {{item.msg}}
    </a-typography-paragraph>
    <div style="display: flex;justify-content: space-between; color: var(--color-neutral-6)">
      <div>{{item.type}}</div>
      <div>{{dayjs(item.date).format('YYYY-MM-DD')}}</div>
    </div>
  </a-list-item>
  </a-list>
</template>

<script>
import dayjs from "dayjs";

export default {
  name: "notify-list",
  props:{
    data:{
      default:[
        {date:1100101, type:'系统通知', msg:'A design is a plan or specification for the construction of an object or system or for the implementation of an activity or process, or the result of that plan or specification in the form of a prototype, product or process. The verb to design expresses the process of developing a design. The verb to design expresses the process of developing a design.A design is a plan or specification for the construction of an object or system or for the implementation of an activity or process, or the result of that plan or specification in the form of a prototype, product or process. The verb to design expresses the process of developing a design. The verb to design expresses the process of developing a design.'},
        {date:1100101, type:'系统通知', msg:'A design is a plan or specification for the construction of an object or system or for the implementation of an activity or process, or the result of that plan or specification in the form of a prototype, product or process. The verb to design expresses the process of developing a design. The verb to design expresses the process of developing a design.A design is a plan or specification for the construction of an object or system or for the implementation of an activity or process, or the result of that plan or specification in the form of a prototype, product or process. The verb to design expresses the process of developing a design. The verb to design expresses the process of developing a design.'},
        {date:1100101, type:'系统通知', msg:'A design is a plan or specification for the construction of an object or system or for the implementation of an activity or process, or the result of that plan or specification in the form of a prototype, product or process. The verb to design expresses the process of developing a design. The verb to design expresses the process of developing a design.A design is a plan or specification for the construction of an object or system or for the implementation of an activity or process, or the result of that plan or specification in the form of a prototype, product or process. The verb to design expresses the process of developing a design. The verb to design expresses the process of developing a design.'}
      ]
    }
  },

  data(){
    return{
      dayjs,
      identity:this.$route.path.substring(1).split('/')[0],
    }
  }
}
</script>

<style scoped>

.msg:hover{
  cursor: pointer;
  color: #3370ff;
}



</style>