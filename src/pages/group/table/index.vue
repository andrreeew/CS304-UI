<template>

  <a-card style="width: 100%">
    <a-space direction="vertical" :size=20 style="width: 100%">
      <a-divider style="margin-bottom: 0px"></a-divider>
      <div style="display: flex;justify-content: space-between;width: 100%">
        <a-space>
          <a-button type="primary" @click="$router.push({name:'group-new'})">
            <template #icon>
              <icon-plus />
            </template>
            创建课题组
          </a-button>
          select {{selectedKeys.length}} accounts
        </a-space>
        <a-space>
          <a-tooltip content="删除选中课题组" >
            <a-button class="delete-button" >
              <icon-delete/>
            </a-button>
          </a-tooltip>
        </a-space>
      </div>
      <a-grid :cols="{ lg: 2, mg:4}" :colGap="20" :rowGap="16" >
        <a-grid-item span="1" v-for="i in 5">
          <group-card></group-card>
        </a-grid-item>
      </a-grid>




      <div style="display: flex; justify-content: right">
        <a-pagination :total="50" size="medium" show-total show-jumper show-page-size />
      </div>

    </a-space>
  </a-card>
</template>

<script>
import dayjs from 'dayjs'
import groupCard from '@/components/group/group-card'


export default {
  name: "index",
  components:{
    groupCard,
  },
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
      this.$router.push({name:'account-detail', params:{user:record.id}})
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