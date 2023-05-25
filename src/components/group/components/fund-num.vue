<template>
  <a-grid :cols="{ xs: 2, sm: 2, md: 2, lg: 4, xl: 4, }" :colGap="20" :rowGap="16" style="width: 100%">
    <a-space class="panel">
      <a-avatar :size="55" style="background-color: var(--color-fill-2);">
        <img
            src="http://p3-armor.byteimg.com/tos-cn-i-49unhts6dw/288b89194e657603ff40db39e8072640.svg~tplv-49unhts6dw-image.image"
        />
      </a-avatar>
      <a-statistic title="总人数" :value="memberNum" >

      </a-statistic>
    </a-space>
    <a-space class="panel">
      <a-avatar :size="55" style="background-color: var(--color-fill-2);">
        <img
            src="http://p3-armor.byteimg.com/tos-cn-i-49unhts6dw/fdc66b07224cdf18843c6076c2587eb5.svg~tplv-49unhts6dw-image.image"
        />
      </a-avatar>
      <a-statistic title="总金额" :value="totalFund" :value-from="0" animation>
      </a-statistic>
    </a-space>
    <a-space class="panel">
      <a-avatar :size="55" style="background-color: var(--color-fill-2);">
        <img
            src="http://p3-armor.byteimg.com/tos-cn-i-49unhts6dw/77d74c9a245adeae1ec7fb5d4539738d.svg~tplv-49unhts6dw-image.image"
        />
      </a-avatar>
      <a-statistic title="已使用" :value="usedFund" :value-from="0" animation>
      </a-statistic>
    </a-space>
    <a-space class="panel">
      <a-avatar :size="55" style="background-color: var(--color-fill-2);">
        <img
            src="http://p3-armor.byteimg.com/tos-cn-i-49unhts6dw/c8b36e26d2b9bb5dbf9b74dd6d7345af.svg~tplv-49unhts6dw-image.image"
        />
      </a-avatar>
      <a-statistic title="剩余金额" :value="leftFund" :value-from="0" animation>
      </a-statistic>
    </a-space>

  </a-grid>
</template>

<script>
export default {
  name: "fund-num",
  props:{
    memberNum: {default:0},
    totalFund: {default:0},
    usedFund: {default:0},
    leftFund: {default:0},
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