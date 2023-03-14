<template>
  <div style="height: 100%;">
    <a-menu
        :style="{ width: '200px', height: '100%' }"
        show-collapse-button
        :collapsed="getMenuCollapse"
        :selected-keys="selectKeys"
        @menu-item-click="jumpTo"
        @collapse="setMenuCollapse(!getMenuCollapse)"
    >
      <a-menu-item key="account">
        <template #icon><icon-apps></icon-apps></template>
        账号
      </a-menu-item>
      <a-menu-item key="group">
        <template #icon><icon-apps></icon-apps></template>
        课题组
      </a-menu-item>
      <a-menu-item key="fund">
        <template #icon><icon-apps></icon-apps></template>
        经费
      </a-menu-item>
      <a-menu-item key="application">
        <template #icon><icon-apps></icon-apps></template>
        申请
      </a-menu-item>

    </a-menu>
  </div>
</template>

<script>
import {mapMutations, mapGetters} from 'vuex'

export default {
  name: "layout-sider",
  computed:{
    ...mapGetters(['getMenuCollapse']),
    selectKeys(){
      return this.$route.name
    }
  },
  data(){
    return{

    }
  },

  methods: {
    ...mapMutations(['setMenuCollapse']),
    jumpTo(v){
      this.selectKeys=v
      this.$router.push({name:'admin-'+v})
    }
  },
}
</script>

<style scoped>

</style>