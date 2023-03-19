<template>
  <a-card style="width: 100%; display: flex; justify-content: center;" >
    <a-space direction="vertical" style="margin-top: -5px">
      <a-typography-title :heading="4">创建课题组</a-typography-title>
      <a-divider style="margin-top: -10px"></a-divider>

      <a-form :model="form" style="min-width: 420px;margin-bottom: 20px; margin-left: -20px" >
        <a-form-item label="课题组名" required>
          <a-input v-model="form.name"></a-input>
        </a-form-item>
        <a-form-item label="用户">
          <a-select v-model="form.users"  placeholder="Please select ..." multiple allow-create>
            <a-option v-for="item in all_users">{{item}}</a-option>
          </a-select>
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
        users: '',
      },
      all_users:[],
    }
  },
  methods: {
    clearForm(){
      for (let key in this.form){
        this.form[key] = ''
      }
    },
    submitForm() {
      api.createGroup(this.form).then(res => {
        if (res.data.code == 200) {
          Message.success(res.data.msg)
          router.push({name:'admin-group'})
        } else {
          Message.error(res.data.msg)
        }
      })
    }
  },
  watch: {
  },
  computed: {
    canSubmit() {
      return this.form.name == ''
    }
  },
  created() {
    api.getAllAccountName().then(res => {
      this.all_users = res.data.data
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