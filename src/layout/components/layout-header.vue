<template>
  <div class="container">
    <div class="left-side" @click="this.$router.push({name:identity+'-home'})">
      <a-breadcrumb :style="{fontSize: `24px`}">
        <a-breadcrumb-item style="color:rgb(var(--arcoblue-6)); font-variant: small-caps;">
          <icon-copy style="font-size:28; color:rgb(var(--arcoblue-6)); "/>
          CS Funding</a-breadcrumb-item>
      </a-breadcrumb>
<!--      <a-space>-->
<!--        <img-->
<!--            alt="logo"-->
<!--            src="//p3-armor.byteimg.com/tos-cn-i-49unhts6dw/dfdba5317c0c20ce20e64fac803d52bc.svg~tplv-49unhts6dw-image.image"-->
<!--        />-->
<!--        <a-typography-title-->
<!--            :style="{ margin: 0, fontSize: '18px' }"-->
<!--            :heading="5"-->
<!--        >-->
<!--          CS Funding-->
<!--        </a-typography-title>-->
<!--      </a-space>-->
    </div>
    <div class="right-side">
      <a-space :size="20">
        <a-tooltip content="语言">
          <a-button class="nav-btn" type="outline" :shape="'circle'">
            <template #icon>
              <icon-language />
            </template>
          </a-button>
        </a-tooltip>

        <a-tooltip content="设置">
          <a-button class="nav-btn" type="outline" :shape="'circle'">
            <template #icon>
              <icon-settings />
            </template>
          </a-button>
        </a-tooltip>

        <a-trigger  trigger="click"  :popup-translate="[-120, 10]">
          <a-tooltip content="通知">
            <a-button class="nav-btn" type="outline" :shape="'circle'">
              <template #icon>
                <icon-notification />
              </template>
            </a-button>
          </a-tooltip>
          <template #content>
            <div class="card">
              <notify-list></notify-list>
            </div>

          </template>
        </a-trigger>

        <a-dropdown trigger="hover" >
        <a-avatar :size="32" style="background-color:#3370ff;cursor: pointer">
          <IconUser />
        </a-avatar>
          <template #content>
            <a-doption style="text-align: center">个人信息</a-doption>
            <a-doption style="text-align: center;" @click="logout">登出</a-doption>
          </template>
        </a-dropdown>
      </a-space>
    </div>

  </div>
</template>

<script>
import notifyList from '@/components/operation/notify-list'
import {mapActions} from 'vuex'

export default {
  name: "header",
  components:{
    notifyList,
  },
  methods:{
    ...mapActions('auth', ['logout'])
  },
  data(){
    return{
      identity:this.$route.path.substring(1).split('/')[0],
    }
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

.left-side:hover{
  cursor: pointer;
}

.right-side{
  padding-right: 30px;
}

.right-side .nav-btn {
  border-color: rgb(var(--gray-2));
  color: rgb(var(--gray-8));
  font-size: 16px;
}

.card {
  padding: 10px;
  width: 400px;
  background-color: var(--color-bg-popup);
  border-radius: 4px;
  box-shadow: 0 2px 8px 0 rgba(0, 0, 0, 0.15);
}

</style>