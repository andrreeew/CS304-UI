<template>
  <a-card style="width: 100%; display: flex; justify-content: center;" >
    <a-space direction="vertical" style="margin-top: -5px">
      <a-typography-title :heading="4">创建用户</a-typography-title>
      <a-divider style="margin-top: -10px"></a-divider>

      <a-form :model="form" style="min-width: 400px;margin-bottom: 20px; margin-left: -20px" >
        <a-form-item label="用户ID">
          <a-input v-model="form.id"></a-input>
        </a-form-item>
        <a-form-item label="用户名">
          <a-input v-model="form.name"></a-input>
        </a-form-item>
        <a-form-item label="密码">
          <a-input v-model="form.name"></a-input>
        </a-form-item>
        <a-form-item label="确认密码">
          <a-input v-model="form.name"></a-input>
        </a-form-item>

        <a-form-item label="课题组">
          <a-select v-model="form.group"  placeholder="Please select ..." multiple allow-create>
            <a-option v-for="item in groups">{{item.label}}</a-option>
          </a-select>
        </a-form-item>
        <a-form-item v-if="form.group.length!=0" label="操作权限">
          <a-checkbox-group v-model="form.permission" :options="form.group">
          </a-checkbox-group>
        </a-form-item>
        <a-form-item label="邮箱">
          <a-input v-model="form.email">

          </a-input>
        </a-form-item>
        <a-form-item label="手机号">
          <a-input v-model="form.phone">
          </a-input>
        </a-form-item>
      </a-form>
    </a-space>
  </a-card>
  <div class="operation">
    <a-space style="margin-right: 10px">
      <a-button @click="clearForm()">重置</a-button>
      <a-button type="primary">确认</a-button>
    </a-space>
  </div>
</template>

<script>
export default {
  name: "index",
  data(){
    return{
      form: {
        title: '',
        group: '',
        permission: '',
        category1: '',
        category2: '',
        number: '',
        abstract: '',
        comment: '',
      },
      groups:[
        {value: 'li', label: 'Li'},
        {value: 'fang', label: 'Fang'}
      ],
      categorise : {
        Beijing: ['Haidian', 'Chaoyang', 'Changping'],
        Sichuan: ['Chengdu', 'Mianyang', 'Aba'],
        Guangdong: ['Guangzhou', 'Shenzhen', 'Shantou']
      }

    }
  },
  methods: {
    clearForm(){
      for (let key in this.form){
        this.form[key] = ''
      }
    }
  },
  watch : {
    'form.category1'(){
      this.form.category2 = ''
    }
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