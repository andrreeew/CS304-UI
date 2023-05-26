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
        <a-trigger trigger="click">
          <a-tooltip :content="$t('language')">
            <a-dropdown @select="changeLanguage">
              <a-button class="nav-btn" type="outline" :shape="'circle'">
                <template #icon>
                  <icon-language/>
                </template>
              </a-button>
              <template #content>
                <a-doption value="zh-CN">简体中文</a-doption>
                <a-doption value="en-US">English</a-doption>
              </template>
            </a-dropdown>
          </a-tooltip>
        </a-trigger>

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
              <notify-list :data="notify"></notify-list>
            </div>

          </template>
        </a-trigger>

        <a-dropdown trigger="hover" >
        <a-avatar :size="32" style="background-color:#3370ff;cursor: pointer">
          <IconUser />
        </a-avatar>
          <template #content>
            <a-doption style="text-align: center" @click="info">个人信息</a-doption>
            <a-doption style="text-align: center;" @click="logout">登出</a-doption>
          </template>
        </a-dropdown>

        <a-modal v-model:visible="visible" @ok="submit" @cancel="cancel" title="修改个人信息">
          <a-form>
            <a-form-item label="用户名" required>
              <a-input v-model="form.name"></a-input>
            </a-form-item>
            <a-form-item label="邮箱" required :validate-status="emailStatus" :help="emailHelp" feedback>
              <a-input v-model="form.email"></a-input>
            </a-form-item>
            <a-form-item label="手机号" required :validate-status="phoneStatus" :help="phoneHelp" feedback>
              <a-input v-model="form.phone"></a-input>
            </a-form-item>
            <a-form-item label="密码" required feedback>
              <a-input v-model="form.pwd"></a-input>
            </a-form-item>
          </a-form>
        </a-modal>
      </a-space>
    </div>

  </div>
</template>

<script>
import notifyList from '@/components/operation/notify-list'
import {mapActions} from 'vuex'
import api from "@/api"

export default {
  name: "header",
  components:{
    notifyList,
  },
  methods:{
    ...mapActions('auth', ['logout']),
    changeLanguage(val) {
      this.$i18n.locale = val   // 设置当前语言
      localStorage.setItem('locale', val)
    },
    info() {
      this.visible = true
    },
    submit() {
      // api.createAccount(this.form.name,this.form.email,this.form.phone,this.form.group).then(res => {
      //   if (res.data.code === 200) {
      //     Message.success(res.data.msg)
      //     router.push({name:'admin-account'})
      //   } else {
      //     Message.error(res.data.msg)
      //   }
      // })
      this.visible = false
      this.clearForm()
    },
    cancel() {
      this.visible = false
      this.clearForm()
    },
    clearForm(){
      for (let key in this.form){
        this.form[key] = ''
      }
      this.emailStatus = ''
      this.phoneStatus = ''
      this.emailHelp = ''
      this.phoneHelp = ''
    },
  },
  data(){
    return{
      identity:this.$route.path.substring(1).split('/')[0],
      notify:[],
      visible: false,
      form: {
        name : '',
        pwd: '',
        email: '',
        phone: '',
      },
      emailStatus: '',
      emailHelp: '',
      phoneStatus: '',
      phoneHelp: '',
    }
  },
  mounted() {
    this.$options.sockets.onmessage = (message) => {

      var data = JSON.parse(message.data)
      if(this.identity===data.identity){
        if(data.type==='permit'){
          this.$notification.success(data.msg)
        }else if(data.type==='deny') {
          this.$notification.error(data.msg)
        }
      }
    }
  },
  watch: {
    'form.email'(){
      if (this.form.email !== '') {
        var reg = /^[a-zA-Z0-9_.-]+@[a-zA-Z0-9-]+(\.[a-zA-Z0-9-]+)*\.(com|cn|net)$/
        if (!reg.test(this.form.email)) {
          this.emailStatus = 'error'
          this.emailHelp = 'Please input a valid email!'
        } else {
          this.emailStatus = 'success'
          this.emailHelp = ''
        }
      }
    },
    'form.phone'(){
      if (this.form.phone !== '') {
        var reg = /[0-9]{11}/
        if (!reg.test(this.form.phone) || this.form.phone.length !== 11) {
          this.phoneStatus = 'error'
          this.phoneHelp = 'Please input a valid phone number!'
        } else {
          this.phoneStatus = 'success'
          this.phoneHelp = ''
        }
      }
    },
  },
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