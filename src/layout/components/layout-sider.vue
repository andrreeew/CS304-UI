<template>
  <div style="height: 100%;">
    <a-menu
        v-if="identity==='admin'"
        :style="{ width: '200px', height: '100%' }"
        show-collapse-button
        :collapsed="getMenuCollapse"
        :selected-keys="selectKeys"
        @menu-item-click="jumpTo"
        @collapse="setMenuCollapse(!getMenuCollapse)"
    >
      <a-menu-item key="home">
        <template #icon><icon-home /></template>
        主页
      </a-menu-item>
      <a-menu-item key="account">
        <template #icon><icon-user /></template>
        账号
      </a-menu-item>
      <a-menu-item key="group">
        <template #icon><icon-user-group /></template>
        课题组
      </a-menu-item>
      <a-menu-item key="fund">
        <template #icon><icon-layers /></template>
        经费
      </a-menu-item>
      <a-menu-item key="application">
        <template #icon><icon-unordered-list /></template>
        申请
      </a-menu-item>

      <a-menu-item key="message">
        <template #icon><icon-message /></template>
        通知
      </a-menu-item>
    </a-menu>

    <a-menu
        v-else
        :style="{ width: '200px', height: '100%' }"
        show-collapse-button
        :collapsed="getMenuCollapse"
        :selected-keys="selectKeys"
        @menu-item-click="jumpTo"
        @collapse="setMenuCollapse(!getMenuCollapse)"
    >

<!--      <a-sub-menu>-->
<!--        <template #icon><icon-apps></icon-apps></template>-->
<!--        <template #title>课题组</template>-->
<!--        <a-menu-item v-for="group in groups" :key="'group/'+group.id">-->
<!--          <template #icon><icon-apps></icon-apps></template>-->
<!--          {{group.name}}-->
<!--        </a-menu-item>-->
<!--      </a-sub-menu>-->
        <a-menu-item key="home">
          <template #icon><icon-home /></template>
          {{$t('home')}}
        </a-menu-item>
        <a-menu-item key="group">
          <template #icon><icon-user-group /></template>
          {{$t('group')}}
        </a-menu-item>
        <a-menu-item key="application">
          <template #icon><icon-unordered-list /></template>
          {{$t('application')}}
        </a-menu-item>
        <a-menu-item key="message">
          <template #icon><icon-message /></template>
          {{$t('message')}}
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
      if(this.$route.name==='admin-fund-group') return 'fund'
      return this.$route.name
    }
  },
  data(){
    return{
      identity:this.$route.path.substring(1).split('/')[0],
      groups:[
        {id:1241, name:'Li'}
      ]
    }
  },

  methods: {
    ...mapMutations(['setMenuCollapse']),
    jumpTo(v){
      this.selectKeys=v
      this.$router.push({name:this.identity+'-'+v})
      console.log({name:this.identity+'-'+v})
      console.log('jump to')
    }
  },
}
</script>

<style scoped>

</style>