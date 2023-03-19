<template>
  <a-card style="width: 100%; display: flex; justify-content: center;" >
    <a-space direction="vertical" style="margin-top: -5px">
      <a-typography-title :heading="4">创建用户</a-typography-title>
      <a-divider style="margin-top: -10px"></a-divider>

      <a-form :model="form" style="min-width: 400px;margin-bottom: 20px; margin-left: -20px" >
        <a-form-item label="用户名" required>
          <a-input v-model="form.name"></a-input>
        </a-form-item>
        <a-form-item label="课题组">
          <a-select v-model="form.group"  placeholder="Please select ..." multiple allow-create>
            <a-option v-for="item in groups">{{item}}</a-option>
          </a-select>
        </a-form-item>
        <!-- <a-form-item v-if="form.group.length!=0" label="操作权限">
          <a-checkbox-group v-model="form.permission" :options="form.group">
          </a-checkbox-group>
        </a-form-item> -->
        <a-form-item label="邮箱" required :validate-status="emailStatus" :help="emailHelp" feedback>
          <a-input v-model="form.email">

          </a-input>
        </a-form-item>
        <a-form-item label="手机号" required :validate-status="phoneStatus" :help="phoneHelp" feedback>
          <a-input v-model="form.phone">
          </a-input>
        </a-form-item>
      </a-form>
    </a-space>
  </a-card>
  <div class="operation">
    <a-space style="margin-right: 10px">
      <a-button @click="clearForm()">重置</a-button>
      <a-button :disabled="canSubmit" type="primary" @click="submitForm()">确认</a-button>
    </a-space>
  </div>
</template>

<script>
import api from "@/api"
import {Message} from '@arco-design/web-vue'
import router from "@/router"

export default {
  name: "index",
  data(){
    return{
      form: {
        name : '',
        group: '',
        email: '',
        phone: '',
      },
      emailStatus: '',
      emailHelp: '',
      phoneStatus: '',
      phoneHelp: '',
      groups:[],
    }
  },
  methods: {
    clearForm(){
      for (let key in this.form){
        this.form[key] = ''
      }
      this.emailStatus = ''
      this.phoneStatus = ''
      this.emailHelp = ''
      this.phoneHelp = ''
    },
    submitForm() {
      api.createAccount(this.form).then(res => {
        if (res.data.code == 200) {
          Message.success(res.data.msg)
          router.push({name:'admin-account'})
        } else {
          Message.error(res.data.msg)
        }
      })
    }
  },
  watch: {
    'form.email'(){
      if (this.form.email != '') {
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
      if (this.form.phone != '') {
        var reg = /[0-9]{11}/
        if (!reg.test(this.form.phone) || this.form.phone.length != 11) {
          this.phoneStatus = 'error'
          this.phoneHelp = 'Please input a valid phone number!'
        } else {
          this.phoneStatus = 'success'
          this.phoneHelp = ''
        }
      }
    },
  },
  computed: {
    canSubmit() {
      return !(this.emailStatus == 'success' && this.phoneStatus == 'success' && this.form.name != '')
    }
  },
  created() {
    api.getAllGroupName().then(res => {
      this.groups = res.data.data
    })
  }
}
</script>

<style scoped>
.operation{
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  background-color: white;
  display: flex;
  justify-content: right;
  padding: 10px;
  z-index: 98;
  border-top: 1px solid var(--color-border);
}
</style>