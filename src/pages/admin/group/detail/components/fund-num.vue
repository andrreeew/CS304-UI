<template>
  <a-grid :cols="{ xs: 2, sm: 2, md: 2, lg: 4, xl: 4, }" :colGap="20" :rowGap="16" style="width: 100%">
    <a-space class="panel">
      <a-avatar :size="55" style="background-color: var(--color-fill-2);">
        <img
            src="http://p3-armor.byteimg.com/tos-cn-i-49unhts6dw/288b89194e657603ff40db39e8072640.svg~tplv-49unhts6dw-image.image"
        />
      </a-avatar>
      <a-statistic title="总人数" :value="statistics.memberNum" >

      </a-statistic>
    </a-space>
    <a-space class="panel">
      <a-avatar :size="55" style="background-color: var(--color-fill-2);">
        <img
            src="http://p3-armor.byteimg.com/tos-cn-i-49unhts6dw/fdc66b07224cdf18843c6076c2587eb5.svg~tplv-49unhts6dw-image.image"
        />
      </a-avatar>
      <a-statistic title="总金额" :value="statistics.totalFund" :value-from="0" animation>
      </a-statistic>
    </a-space>
    <a-space class="panel">
      <a-avatar :size="55" style="background-color: var(--color-fill-2);">
        <img
            src="http://p3-armor.byteimg.com/tos-cn-i-49unhts6dw/77d74c9a245adeae1ec7fb5d4539738d.svg~tplv-49unhts6dw-image.image"
        />
      </a-avatar>
      <a-statistic title="已使用" :value="statistics.usedFund" :value-from="0" animation>
      </a-statistic>
    </a-space>
    <a-space class="panel">
      <a-avatar :size="55" style="background-color: var(--color-fill-2);">
        <img
            src="http://p3-armor.byteimg.com/tos-cn-i-49unhts6dw/c8b36e26d2b9bb5dbf9b74dd6d7345af.svg~tplv-49unhts6dw-image.image"
        />
      </a-avatar>
      <a-statistic title="剩余金额" :value="statistics.leftFund" :value-from="0" animation>
      </a-statistic>
    </a-space>

  </a-grid>
  <!--  <a-space direction="vertical" style="width: 100%">-->
  <!--    <div style="display: flex; justify-content: space-around">-->
  <!--      -->
  <!--      <a-statistic title="已分配金额" :value="50.52" :precision="2" :value-style="{ color: '#0fbf60' }">-->
  <!--        <template #prefix>-->
  <!--          <icon-arrow-rise/>-->
  <!--        </template>-->
  <!--        <template #suffix>%</template>-->
  <!--      </a-statistic>-->
  <!--      <a-statistic title="待分配金额" :value="50.52" :precision="2" :value-style="{ color: '#0fbf60' }">-->
  <!--        <template #prefix>-->
  <!--          <icon-arrow-rise/>-->
  <!--        </template>-->
  <!--        <template #suffix>%</template>-->
  <!--      </a-statistic>-->
  <!--    </div>-->
  <!--    <div style="display: flex; justify-content: space-around">-->
  <!--      <a-statistic title="已使用总金额" :value="125670" show-group-separator>-->
  <!--        <template #suffix>-->
  <!--          <icon-arrow-rise/>-->
  <!--        </template>-->
  <!--      </a-statistic>-->
  <!--      <a-statistic title="剩余金额" :value="50.52" :precision="2" :value-style="{ color: '#0fbf60' }">-->
  <!--        <template #prefix>-->
  <!--          <icon-arrow-rise/>-->
  <!--        </template>-->
  <!--        <template #suffix>%</template>-->
  <!--      </a-statistic>-->
  <!--      <a-statistic title="完成度" :value="50.52" :precision="2" :value-style="{ color: '#0fbf60' }">-->
  <!--        <template #prefix>-->
  <!--          <icon-arrow-rise/>-->
  <!--        </template>-->
  <!--        <template #suffix>%</template>-->
  <!--      </a-statistic>-->
  <!--    </div>-->
  <!--  </a-space>-->
</template>

<script>
export default {
  name: "fund-num",
  props:{
    statistics: {
      memberNum:0,
      totalFund:0,
      usedFund:0,
      leftFund:0
    }
  },

}
</script>

<style scoped>

.panel {
  padding-bottom: 20px;
  padding-left: 15px;
  border-right: 1px solid rgb(var(--gray-2));
}

</style>