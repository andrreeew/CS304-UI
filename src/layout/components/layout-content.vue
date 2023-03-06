<template>

  <div style="width: 100%; padding: 30px">
      <div style="width: 100%; margin-bottom: 10px">
        <a-breadcrumb :routes="routes" />
      </div>

      <router-view></router-view>
  </div>
</template>

<script>
export default {
  name: "layout-content",
  data(){
    return{
      routes: [
        {path: '/', label: 'Home'},
        {path: '/channel', label: 'Channel'},
        {path: '/news', label: 'News'},
      ],
    }
  }
}
</script>

<style scoped>

</style>