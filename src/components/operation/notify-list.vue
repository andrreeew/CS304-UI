<template>

  <a-list hoverable
          scrollbar :bordered="false" >
    <template #header>
      <div style="display: flex;justify-content: space-between">
        <div>通知</div>
        <a-link @click="this.$router.push({name:this.identity+'-message'})">更多</a-link>
      </div>
    </template>
  <a-list-item class="msg" v-for="i in 3" >
    <a-typography-paragraph
        :ellipsis="{
        rows: 2,
        showTooltip: true,
      }"
        class="msg">
      A design is a plan or specification for the construction of an object or system or for the implementation of an activity or process, or the result of that plan or specification in the form of a prototype, product or process. The verb to design expresses the process of developing a design. The verb to design expresses the process of developing a design.A design is a plan or specification for the construction of an object or system or for the implementation of an activity or process, or the result of that plan or specification in the form of a prototype, product or process. The verb to design expresses the process of developing a design. The verb to design expresses the process of developing a design.
    </a-typography-paragraph>
    <div style="display: flex;justify-content: space-between; color: var(--color-neutral-6)">
      <div>系统通知</div>
      <div>2020-10-01</div>
    </div>
  </a-list-item>
  </a-list>
</template>

<script>
export default {
  name: "notify-list",
  data(){
    return{
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