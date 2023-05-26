<template>
  <div>
    <a-result status="404" subtitle="Whoops, that page is gone.">
      <template #extra>
        <a-space>
          <a-button type="primary" @click="$router.go(-2)">Back</a-button>
        </a-space>
      </template>
    </a-result>
  </div>
</template>

<script>
export default {
  name: "index",
}
</script>

<style scoped>

</style>
