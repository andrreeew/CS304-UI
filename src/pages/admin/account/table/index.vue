<template>

  <a-card style="width: 100%">
    <a-space direction="vertical" :size=20 style="width: 100%">
      <a-divider style="margin-bottom: 0px"></a-divider>
      <div style="display: flex;justify-content: space-between;width: 100%">
        <a-space>
          <a-button type="primary" @click="$router.push({name:'admin-account-new'})">
            <template #icon>
              <icon-plus />
            </template>
            创建账号
          </a-button>
          select {{selectedKeys.length}} accounts
        </a-space>
        <a-space>
          <a-tooltip content="删除选中账号" >
            <a-button class="delete-button" >
              <icon-delete/>
            </a-button>
          </a-tooltip>
        </a-space>
      </div>
      <a-table
          :columns="columns"
          :data="data"
          :bordered="false"
          :row-selection="rowSelection"
          :pagination="false"
          :scroll="{x: 1000, y: '100%',}"
          v-model:selectedKeys="selectedKeys"
      >
        <template #optional="{ record }">
          <a-space>
            <a-button @click="showDetail(record)">view</a-button>
            <a-tooltip  content="删除" >
              <a-button class="delete-button" >
                <icon-delete/>
              </a-button>
            </a-tooltip>
          </a-space>
        </template>
      </a-table>

      <div style="display: flex; justify-content: right">
        <a-pagination :total="50" size="medium" show-total show-jumper show-page-size />
      </div>


    </a-space>
  </a-card>
</template>

<script>
import dayjs from 'dayjs'

export default {
  name: "index",
  data(){
    return{
      dayjs,
      columns:[
        {title: 'ID', dataIndex: 'id',  width: 180 },
        {title: '用户名', dataIndex: 'name', width: 180 },
        {title: '邮箱', dataIndex: 'email', width: 150 },
        {title: '手机号', dataIndex: 'phone', width: 150 },
        {title: '操作', slotName: 'optional', fixed: 'right', width:160},
      ],
      data:[{
        key: '1',
        id: 14224,
        name: 'Jane Doe',
        email: 490,
        phone: 123456,
      }, {
        key: '2',
        id: 24141,
        name: 'Alisa Ross',
        email: 490,
        phone: 53252,
      }],
      selectedKeys:[],
      rowSelection:{
        type: 'checkbox',
        showCheckedAll: true,
      },
      selectedRecord:'',
      visible:false,

    }
  },
  methods: {
    showDetail(record){
      this.$router.push({name:'admin-account-detail', params:{user:record.id}})
    }
  }
}
</script>

<style scoped>
.delete-button:hover {
  color: white;
  background-color: rgb(var(--red-6));
}
.dl-button:hover {
  color: white;
}
</style>