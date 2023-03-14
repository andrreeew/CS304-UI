<template>
  <a-table :columns="columns" :data="data" :bordered="false" :scroll="{x: 900, y: '100%',}" :pagination="false">
    <template #complete="{ record }">
      <a-tag v-if="record.complete" color="green">是</a-tag>
      <a-tag v-else color="arcoblue">否</a-tag>
    </template>

    <template #optional="{ rowIndex }">
      <a-space>
        <a-button @click="this.$router.push({name:'fund-group', params:{fundId:13, groupId: 42}})">view</a-button>
        <a-button @click="data.splice(rowIndex, 1)"
                  status="danger">
          <icon-delete />
        </a-button>
      </a-space>

    </template>
  </a-table>

  <div style="display: flex;justify-content: center; margin-top: 10px">

    <a-button @click="visible=true" shape="circle">
      <icon-plus></icon-plus>
    </a-button>
  </div>
  <a-divider  style="margin-top: 10px"></a-divider>

  <a-modal v-model:visible="visible" title="添加课题组">
    <a-select v-model="selectGroups"  placeholder="Please select ..." multiple allow-create>
      <a-option v-for="item in groups">{{item.label}}</a-option>
    </a-select>
  </a-modal>

</template>

<script>


export default {
  name: "group-table",
  data(){
    return{
      visible: false,
      selectGroups:[],
      groups:[
        {value: 'li', label: 'Li'},
        {value: 'fang', label: 'Fang'}
      ],
      columns:[
        {title: '课题组', dataIndex: 'group'},
        {title: '经费总额', dataIndex: 'total'},
        {title:'已使用', dataIndex: 'cost'},
        {title: '经费余额', dataIndex: 'left'},
        {title: '执行率', dataIndex: 'percent'},
        {title: '是否达标', slotName: 'complete',},
        {title: '操作', slotName: 'optional', fixed: 'right'},
      ],
      data:[{
        complete: true,
        group: 'dsafsa',
        total: 2141,
        cost: 242,
        left: 155,
        percent: 241,
      }, {
        complete: true,
        group: 'dsafsa',
        total: 2141,
        cost: 242,
        left: 155,
        percent: 241,
      }, {
        complete: false,
        group: 'dsafsa',
        total: 2141,
        cost: 242,
        left: 155,
        percent: 241,
      }
      ]
    }
  }
}
</script>

<style scoped>

</style>