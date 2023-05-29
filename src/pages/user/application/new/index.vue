<template>
  <a-card style="width: 100%; display: flex; justify-content: center" >
    <a-space direction="vertical" style="margin-top: -5px">
      <a-typography-title :heading="4">创建申请</a-typography-title>
      <a-divider style="margin-top: -10px"></a-divider>

    <a-form :model="form" style="margin-bottom: 20px" layout="vertical">
      <a-form-item label="课题组">
        <a-select v-model="form.group"  placeholder="Please select ...">
          <a-option v-for="item in groups">{{item.name}}</a-option>
        </a-select>

      </a-form-item>
      <a-form-item label="经费名称">
        <a-select v-model="form.fund" style="max-width: 200px" placeholder="Please select ...">
          <a-option v-for="item in funds">{{item}}</a-option>
        </a-select>

      </a-form-item>

      <a-form-item label="支出类别">
        <a-space size="medium">
          <a-select :style="{width:'200px'}" v-model="form.category">

          <a-option v-for="item in this.categories">{{item.category}}</a-option>
          </a-select>
          <div style="margin-left: 30px">剩余经费:{{amount}}</div>
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
        group: '',
        fund:'',
        category: '',
        number: '',
        remark: '',
        comment: '',
      },
      groups:[
        {name: 'li'},
      ],
    }
  },
  computed:{
    funds(){
      var result = []
      if (this.form.group!==''){
        for (var i=0;i<this.groups.length;i++) {
          if(this.groups[i].name===this.form.group){
            for (var j=0; j<this.groups[i].fund.length;j++) {
              if (result.indexOf(this.groups[i].fund[j].name) === -1) {
                result.push(this.groups[i].fund[j].name)
              }
            }
          }
        }
      }
      return result
    },
    categories(){
      var result = []
      if (this.form.fund!==''&&this.form.group!=='') {
        for (var i=0;i<this.groups.length;i++) {
          if(this.groups[i].name===this.form.group){
            for (var j=0; j<this.groups[i].fund.length;j++) {
              if (this.groups[i].fund[j].name===this.form.fund) {
                result.push(this.groups[i].fund[j])
              }
            }
          }
        }
      }
      return result
    },
    amount(){
      console.log('fasf')
      if (this.form.fund!==''&&this.form.group!==''&&this.form.category!=='') {
        if (this.form.fund!==''&&this.form.group!=='') {
          for (var i=0;i<this.groups.length;i++) {
            if(this.groups[i].name===this.form.group){
              for (var j=0; j<this.groups[i].fund.length;j++) {
                if (this.groups[i].fund[j].name===this.form.fund && this.groups[i].fund[j].category===this.form.category) {

                  return this.groups[i].fund[j].remain_amount
                }
                // console.log(this.groups[i].fund[j])
                // console.log(this.form.category)
              }
            }
          }
        }
      }
      return ''
    }
  },
  methods: {
    ...mapMutations(['setRoutes']),
    init(){
      api.getUserGroups().then(res=>{
        var data = res.data.data
        this.groups = []
        for (let i = 0; i < data.length; i++) {
          if(data[i].isAdmin){
            this.groups.push(data[i])
          }
        }
      })
    },
    clearForm(){
      for (let key in this.form){
         this.form[key] = ''
      }
    },
    submit(){
      api.createApplication(this.form).then(res => {
        if (res.data.code === 200) {
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