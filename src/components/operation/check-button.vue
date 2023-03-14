<template>
  <a-button class="check-button" >
    <icon-check-circle />
  </a-button>
</template>

<script>
export default {
  name: "pass-button"
}
</script>

<style scoped>
.check-button:hover {
  color: white;
  background-color: rgb(var(--green-4))
}
</style>