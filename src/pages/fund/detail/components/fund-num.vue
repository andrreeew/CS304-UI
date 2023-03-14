<template>
  <a-space direction="vertical" style="width: 100%">
    <div style="display: flex; justify-content: space-around">
      <a-statistic title="总金额" :value="125670" show-group-separator>
        <template #suffix>
          <icon-arrow-rise/>
        </template>
      </a-statistic>
      <a-statistic title="已分配金额" :value="50.52" :precision="2" :value-style="{ color: '#0fbf60' }">
        <template #prefix>
          <icon-arrow-rise/>
        </template>
        <template #suffix>%</template>
      </a-statistic>
      <a-statistic title="待分配金额" :value="50.52" :precision="2" :value-style="{ color: '#0fbf60' }">
        <template #prefix>
          <icon-arrow-rise/>
        </template>
        <template #suffix>%</template>
      </a-statistic>
    </div>
    <div style="display: flex; justify-content: space-around">
      <a-statistic title="已使用总金额" :value="125670" show-group-separator>
        <template #suffix>
          <icon-arrow-rise/>
        </template>
      </a-statistic>
      <a-statistic title="剩余金额" :value="50.52" :precision="2" :value-style="{ color: '#0fbf60' }">
        <template #prefix>
          <icon-arrow-rise/>
        </template>
        <template #suffix>%</template>
      </a-statistic>
      <a-statistic title="完成度" :value="50.52" :precision="2" :value-style="{ color: '#0fbf60' }">
        <template #prefix>
          <icon-arrow-rise/>
        </template>
        <template #suffix>%</template>
      </a-statistic>
    </div>
  </a-space>
</template>

<script>
export default {
  name: "fund-num"
}
</script>

<style scoped>

</style>