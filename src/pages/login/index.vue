<template>
  <div style="width: 100%; height:100%;display: flex; justify-content: center; align-items: center">
    <a-card class="login-form" hoverable>
      <a-space direction="vertical" style="width: 320px; margin-top: -10px; margin-bottom: 30px">
        <a-typography-title :heading="4" style="margin-bottom: -10px">
          登入到 CS Funding
        </a-typography-title>
        <a-typography-text style="font-size: 16px; color: var(--color-neutral-8)">
          登入到 CS Funding
        </a-typography-text>


        <a-input v-model=auth.username style="margin-top: 15px">
          <template #prefix>
            <icon-user />
          </template>
        </a-input>

        <a-input-password v-model=auth.password style="margin-top: 5px">
          <template #prefix>
            <icon-lock />
          </template>
        </a-input-password>

        <div style="margin-top:10px;display: flex; justify-content: space-between">
          <a-checkbox value="1">记住密码</a-checkbox>
          <a-link>忘记密码</a-link>
        </div>

        <a-button  style="margin-top: 5px" type="primary" long @click="login(auth)">登入</a-button>
      </a-space>
    </a-card>
  </div>

</template>

<script>
import {mapActions} from 'vuex'

export default {
  name: "index",
  data(){
    return{
      auth:{
        username: '',
        password: '',
      }
    }
  },
  methods: {
    ...mapActions('auth', ['login'])
  }
}
</script>

<style scoped>
.login-form{
  width: 400px;
  display: flex;
  justify-content: center;

}

</style>