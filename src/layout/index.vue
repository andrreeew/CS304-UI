<template>
  <a-layout class="layout">
    <a-layout-header class="layout-header">
      <layout-header></layout-header>
    </a-layout-header>
    <a-layout>
      <a-layout-sider class="layout-sider" style="width: auto">
        <layout-sider></layout-sider>
      </a-layout-sider>
      <a-layout class="layout-main" :style="{paddingLeft: getMenuCollapse?'50px':'200px'}">
        <a-layout-content>
          <layout-content></layout-content>
        </a-layout-content>
        <a-layout-footer>
          <layout-footer></layout-footer>
        </a-layout-footer>
      </a-layout>
    </a-layout>

  </a-layout>
</template>

<script>
import LayoutHeader from './components/layout-header'
import LayoutSider from './components/layout-sider'
import LayoutFooter from './components/layout-footer'
import LayoutContent from './components/layout-content'
import {mapGetters} from 'vuex'

export default {
  name: "index",
  components: {
    LayoutHeader,
    LayoutSider,
    LayoutFooter,
    LayoutContent
  },
  computed:{
    ...mapGetters(['getMenuCollapse'])
  },
  data(){
    return{
      testNum: true
    }
  }
}
</script>

<style scoped>
.layout{
  height: 100%;
  width: 100%;
}

.layout-header{
  position: fixed;
  top: 0;
  left: 0;
  z-index: 100;
  height: 55px;
  width: 100%;
}

.layout-sider{
  padding-top: 55px;
  position: fixed;
  top: 0;
  left: 0;
  z-index: 99;
  height: 100%;
}

.layout-main{
  padding-top: 55px;
  background-color: var(--color-fill-2);
  transition: padding 0.2s cubic-bezier(0.34, 0.69, 0.1, 1);
}


</style>