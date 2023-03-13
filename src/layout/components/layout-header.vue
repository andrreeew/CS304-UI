<template>
  <div class="container">
    <div class="left-side">
      <a-space>
        <img
            alt="logo"
            src="//p3-armor.byteimg.com/tos-cn-i-49unhts6dw/dfdba5317c0c20ce20e64fac803d52bc.svg~tplv-49unhts6dw-image.image"
        />
        <a-typography-title
            :style="{ margin: 0, fontSize: '18px' }"
            :heading="5"
        >
          CS Funding
        </a-typography-title>
      </a-space>
    </div>
    <div class="right-side">
      <a-space :size="20">
        <a-tooltip content="language">
          <a-button class="nav-btn" type="outline" :shape="'circle'">
            <template #icon>
              <icon-language />
            </template>
          </a-button>
        </a-tooltip>

        <a-tooltip content="setting">
          <a-button class="nav-btn" type="outline" :shape="'circle'">
            <template #icon>
              <icon-settings />
            </template>
          </a-button>
        </a-tooltip>

        <a-tooltip content="message">
          <a-button class="nav-btn" type="outline" :shape="'circle'">
            <template #icon>
              <icon-notification />
            </template>
          </a-button>
        </a-tooltip>

        <a-dropdown trigger="hover" >
        <a-avatar :size="32" style="background-color:#3370ff;cursor: pointer">
          <IconUser />
        </a-avatar>
          <template #content>
            <a-doption style="text-align: center">个人信息</a-doption>
            <a-doption style="text-align: center;" @click="logout">Logout</a-doption>
          </template>
        </a-dropdown>
      </a-space>
    </div>

  </div>
</template>

<script>
import {mapActions} from 'vuex'

export default {
  name: "header",
  methods:{
    ...mapActions('auth', ['logout'])
  }

}
</script>

<style scoped>
.container{
  display: flex;
  justify-content: space-between;
  border-bottom: 1px solid var(--color-border);
  align-items: center;
  height: 100%;
  background-color: white;
}

.left-side{
  padding-left: 20px;
}

.right-side{
  padding-right: 20px;
}

.right-side .nav-btn {
  border-color: rgb(var(--gray-2));
  color: rgb(var(--gray-8));
  font-size: 16px;
}

</style>