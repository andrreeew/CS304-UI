<template>
  <a-card style="width: 100%; display: flex; justify-content: center" >
    <a-space direction="vertical" style="margin-top: -5px">
      <a-typography-title :heading="4">创建申请</a-typography-title>
      <a-divider style="margin-top: -10px"></a-divider>

    <a-form :model="form" style="margin-bottom: 20px" layout="vertical">
      <a-form-item label="课题组">
        <a-select v-model="form.group"  placeholder="Please select ...">
          <a-option v-for="item in groups">{{item.label}}</a-option>
        </a-select>

      </a-form-item>
      <a-form-item label="经费名称">
        <a-select v-model="form.group" style="max-width: 200px" placeholder="Please select ...">
          <a-option v-for="item in groups">{{item.label}}</a-option>
        </a-select>
        <div style="margin-left: 30px">剩余经费:10000</div>
      </a-form-item>

      <a-form-item label="支出类别">
        <a-space size="medium">
          <a-select :style="{width:'200px'}" v-model="form.category1">
          <a-option v-for="value of Object.keys(categorise)">{{value}}</a-option>
          </a-select>
          <a-select :style="{width:'200px'}" :options="categorise[form.category1] || []" v-model="form.category2" ></a-select>
<!--        <a-select v-model="form.category1" placeholder="Please select ...">-->
<!--        </a-select>-->
<!--          <a-select v-model="form.category2">-->
<!--          </a-select>-->
        </a-space>

      </a-form-item>
      <a-form-item label="金额">
        <a-input-number v-model="form.number" style="max-width: 200px">
          <template #append>
            RMB
          </template>
        </a-input-number>
      </a-form-item>
      <a-form-item label="内容摘要">
        <a-textarea v-model="form.abstract"  placeholder="Please enter something" allow-clear/>
      </a-form-item>

      <a-form-item  label="备注">
        <a-textarea v-model="form.comment" placeholder="Please enter something" allow-clear/>
      </a-form-item>

    </a-form>
    </a-space>
  </a-card>
  <div class="operation">
    <a-space style="margin-right: 10px">
      <a-button @click="clearForm()">重置</a-button>
      <a-button type="primary" @click="submit">确认</a-button>
    </a-space>
  </div>
</template>

<script>
import api from "@/api"
import {mapMutations} from "vuex"
import {Message} from '@arco-design/web-vue'

export default {
  name: "index",

  data(){
    return{
      form: {
        title: '',
        group: '',
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
    ...mapMutations(['setRoutes']),
    init(){
      api.getUserGroups().then(res=>{
        console.log(res.data.data())
      })
    },
    clearForm(){
      for (let key in this.form){
         this.form[key] = ''
      }
    },
    submit(){
      api.createApplication(this.form).then(res => {
        if (res.data.code == 200) {
          Message.success(res.data.msg)
        } else {
          Message.error(res.data.msg)
        }
      })
      this.$router.push({name:'user-application-table', query:{}})
    }
  },
  watch : {
    'form.category1'(){
      this.form.category2 = ''
    }
  },
  created() {
    this.setRoutes([{label:'申请', name:'user-application'}, {label: '创建申请', name: 'user-application-new'}])
    // api.getAllGroupName().then(res => {
    //   this.groups = res.data.data
    // })
    this.init();
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