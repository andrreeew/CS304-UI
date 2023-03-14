<template>
  <a-button class="delete-button" >
    <icon-delete/>
  </a-button>
</template>

<script>
export default {
  name: "delete-button"
}
</script>

<style scoped>
.delete-button:hover {
  color: white;
  background-color: rgb(var(--red-6));
}
</style>