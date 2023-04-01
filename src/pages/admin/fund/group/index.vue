<template>
  <a-space direction="vertical" style="width: 100%">
    <a-card>
      <a-card :bordered="false" title="课题组信息">
        <a-descriptions size="large" :column="{xs:1, lg:2}">
          <a-descriptions-item v-for="item of groupInfo" :label="item.label">
            <a-tag v-if="item.label==='是否达标'" color="green">{{ item.value }}</a-tag>
            <a-link v-else-if="item.label==='课题组'">{{item.value}}</a-link>
            <div v-else>{{ item.value }}</div>
          </a-descriptions-item>
        </a-descriptions>
      </a-card>
      <a-card :bordered="false" title="经费信息" style="margin-top: -10px">
        <a-descriptions size="large" :column="{xs:1, lg:2}">
          <a-descriptions-item v-for="item of fundInfo" :label="item.label">
            <a-tag v-if="item.label==='是否达标'" color="green">{{ item.value }}</a-tag>
            <a-link v-else-if="item.label==='经费编号'||item.label==='经费名称'">{{item.value}}</a-link>
            <div v-else>{{ item.value }}</div>
          </a-descriptions-item>
        </a-descriptions>
      </a-card>
    </a-card>

    <a-card>
      <a-card :bordered="false" title="分配情况">
        <template #title>
          <div style="display: flex;justify-content: space-between">
            <a-typography-text style="font-size: 16px">分配情况</a-typography-text>
            <a-space>
              <a-typography-text style="font-size: 14px;color: var(--color-neutral-6)">
                {{edit?'保存':'修改'}}
              </a-typography-text>
              <a-switch @click="switchEdit" type="line"></a-switch>
            </a-space>

          </div>
        </template>
      <a-table :columns="columns" :data="data" :bordered="false" :pagination="false">
<!--        <a-select :style="{width:'200px'}" v-model="form.category1">-->
<!--          <a-option v-for="value of Object.keys(categorise)">{{value}}</a-option>-->
<!--        </a-select>-->
<!--        <a-select :style="{width:'200px'}" :options="categorise[form.category1] || []" v-model="form.category2" ></a-select>-->

        <template #category1="{ rowIndex }">
          <a-select v-if="edit && data[rowIndex].new" :style="{width:'150px'}" v-model="data[rowIndex].category1">
            <a-option v-for="value of Object.keys(categorise)">{{value}}</a-option>
          </a-select>
          <div v-else>{{data[rowIndex].category1}}</div>
        </template>

        <template #category2="{ rowIndex }">
          <a-select v-if="edit && data[rowIndex].new" :style="{width:'150px'}" :options="categorise[data[rowIndex].category1] || []" v-model="data[rowIndex].category2" ></a-select>
          <div v-else>{{data[rowIndex].category2}}</div>
        </template>

        <template #total="{ rowIndex }">
          <a-tooltip v-if="edit && data[rowIndex].new" :content="tip">
          <a-input-number  v-model="data[rowIndex].total" />
          </a-tooltip>
            <div v-else>{{data[rowIndex].total}}</div>
        </template>


        <template #left="{ rowIndex }">
          <a-tooltip v-if="edit && !data[rowIndex].new" :content="tip">
          <a-input  v-model="data[rowIndex].left" />
          </a-tooltip>
          <div v-else>{{data[rowIndex].left}}</div>
        </template>

        <template  #operate="{ rowIndex }">
          <a-space>
          <a-button v-if="!data[rowIndex].new">View</a-button>
          <a-button @click="data.splice(rowIndex, 1)"
              :disabled="!edit || data[rowIndex].total!==data[rowIndex].left" status="danger">
            <icon-delete />
          </a-button>
          </a-space>
        </template>
      </a-table>

      <div v-if="edit" style="display: flex;justify-content: center; margin-top: 10px">

        <a-button @click="addRecord()" shape="circle">
          <icon-plus></icon-plus>
        </a-button>
      </div>
        <a-divider v-if="edit" style="margin-top: 10px"></a-divider>
      </a-card>
    </a-card>
  </a-space>
  <div class="operation" v-if="edit">
    <a-space style="margin-right: 10px">
      <a-button @click="clearForm">刷新</a-button>
      <a-button @click="submit" type="primary">保存修改</a-button>
    </a-space>
  </div>
</template>

<script>
import api from "@/api"
import {Message} from '@arco-design/web-vue'

export default {
  name: "index",
  computed:{
    tip(){
      return '剩余'+this.left+'可分配'
    }
  },
  data(){
    return{
      fundId: this.$route.params.fundId,
      groupId: this.$route.params.groupId,
      edit: false,
      groupInfo:[
        {label: '课题组', value: 'fsafa'},
        {label: '经费总额', value: 321321},
        {label: '已使用', value: 124214},
        {label: '经费余额', value: 1244},
        {label: '执行率', value: 19},
        {label: '是否达标', value: true},
      ],
      fundInfo: [
        {label: '经费编号', value:10},
        {label: '经费名称', value:'国自然'},
        {label: '经费总额', value:10000},
        {label: '可分配', value:2000},
        {label: '执行率', value: 19},
        {label: '是否达标', value: true},
      ],
      columns:[
        {title: '支出类别一级', dataIndex: 'category1', slotName: 'category1', },
        {title: '支出类别二级', dataIndex: 'category2', slotName: 'category2'},
        {title: '经费总额', dataIndex: 'total', slotName: 'total'},
        {title: '已使用', dataIndex: 'cost', width:100},
        {title: '经费余额', dataIndex: 'left', slotName:'left', width: 100},
        {title: '操作', slotName: 'operate'}
      ],
      left: 1000,
      data:[
        {category1:'Beijing', category2:'', total:10, cost:20, left:10, new:false},
        {category1:'Sichuan', category2:4, total:10, cost:20, left:10, new:true}
      ],
      categorise : {
        Beijing: ['Haidian', 'Chaoyang', 'Changping'],
        Sichuan: ['Chengdu', 'Mianyang', 'Aba'],
        Guangdong: ['Guangzhou', 'Shenzhen', 'Shantou']
      }
    }
  },
  methods:{
    addRecord(){
      this.data.push({category1:'', category2:'', total:0, cost:0, left:0, new:true})
    },
    getData(){
      api.getFundDetailByGroup(this.fundId, this.groupId).then(res => {
        this.data = res.data.data
      })
    },
    switchEdit(){
      this.edit = !this.edit
      if (!this.edit) {
        this.getData()
      }
    },
    clearForm(){
      this.getData()
    },
    submit(){
      api.modifyGroupFundDetail(this.data).then(res => {
        if (res.data.code == 200) {
          Message.success(res.data.msg)
          this.data = res.data.data
        } else {
          Message.error(res.data.msg)
        }
      })
    }
  },
  created(){
    this.getData()
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