<template>
  <a-grid :cols="{ xs: 1, sm: 1, md: 1, lg: 1, xl: 3, }" :colGap="20" :rowGap="16">
    <a-grid-item :span="{ lg: 1, xl: 2, }">
      <slot name="left"></slot>
    </a-grid-item>
    <a-grid-item :span="{ lg: 1, xl: 1, }">
      <slot name="right"></slot>
    </a-grid-item>
  </a-grid>

</template>

<script>
export default {
  name: "detail-skeleton",
}
</script>

<style scoped>

</style>