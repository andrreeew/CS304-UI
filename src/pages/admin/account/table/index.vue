<template>
  <search-skeleton @search="searchUsers()" @clear="clear()">
    <template v-slot:table>
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
              <a-button class="delete-button" @click="deleteUsers([record.key])">
                <icon-delete/>
              </a-button>
            </a-tooltip>
          </a-space>
        </template>
      </a-table>

      <div style="display: flex; justify-content: right">
        <a-pagination 
          v-model:current="current" 
          :total="total" 
          :page-size="searchArgs.pageSize" 
          :page-size-options="[searchArgs.pageSize]" 
          size="medium" 
          show-total 
          show-jumper 
          show-page-size 
          @change="changePage()"
        />
      </div>
    </template>
    <template v-slot:header-left>

        <a-button type="primary" @click="$router.push({name:'admin-account-new'})">
          <template #icon>
            <icon-plus />
          </template>
          创建账号
        </a-button>
        select {{selectedKeys.length}} accounts
    </template>

    <template v-slot:header-right>
      <a-tooltip content="删除选中账号" >
        <a-button class="delete-button" @click="deleteUsers(selectedKeys)">
          <icon-delete/>
        </a-button>
      </a-tooltip>
      <a-input-search/>
    </template>

    <template v-slot:search-option>
      <a-grid style="width: 100%" :cols="{ xs: 1, sm: 1, md: 2, lg: 3, xl: 3, xxl:4}" :colGap=22 :rowGap="16" >
        <a-grid-item>
          <a-row class="search-item" >
            <a-col :span="8" >
              ID:
            </a-col>
            <a-col :span="16">
              <a-input v-model="searchArgs.key"></a-input>
            </a-col>
          </a-row>
        </a-grid-item>
        <a-grid-item >
          <a-row class="search-item" >
            <a-col :span="8" >
              用户名:
            </a-col>
            <a-col :span="16">
              <a-input v-model="searchArgs.name"></a-input>
            </a-col>
          </a-row>
        </a-grid-item>
        <a-grid-item >
          <a-row class="search-item" >
            <a-col :span="8" >
              邮箱:
            </a-col>
            <a-col :span="16">
              <a-input v-model="searchArgs.email"></a-input>
            </a-col>
          </a-row>
        </a-grid-item>
        <a-grid-item >
          <a-row class="search-item" >
            <a-col :span="8" >
              手机号:
            </a-col>
            <a-col :span="16">
              <a-input v-model="searchArgs.phone"></a-input>
            </a-col>
          </a-row>
        </a-grid-item>
      </a-grid>
    </template>
  </search-skeleton>

</template>

<script>
import searchSkeleton from '@/components/operation/search-skeleton'
import api from "@/api"
import {Message} from '@arco-design/web-vue'

export default {
  name: "index",
  components:{
    searchSkeleton
  },
  data(){
    return{
      columns:[
        {title: 'ID', dataIndex: 'key',  width: 180 },
        {title: '用户名', dataIndex: 'name', width: 180 },
        {title: '邮箱', dataIndex: 'email', width: 150 },
        {title: '手机号', dataIndex: 'phone', width: 150 },
        {title: '操作', slotName: 'optional', fixed: 'right', width:160},
      ],
      data:[],
      selectedKeys:[],
      rowSelection:{
        type: 'checkbox',
        showCheckedAll: true,
      },
      total: 0,
      current: 1,
      searchArgs: {
        key: null,
        name: null,
        email: null,
        phone: null,
        pageSize: 3,
        page: 1
      }
    }
  },
  methods: {
    showDetail(record){
      this.$router.push({name:'admin-account-detail', params:{user:record.key}})
    },
    changePage(){
      this.searchArgs.page = this.current
      this.searchUsers()
    },
    deleteUsers(ids){
      if (ids.length == 0) {
        Message.error('未选中账号！')
        return
      }
      api.deleteUsers(ids).then(res => {
        Message.success(res.data.msg)
        this.changePage()
      })
      this.selectedKeys = []
    },
    searchUsers(){
      api.getUsers(this.searchArgs).then(res => {
        this.data = res.data.data.users
        this.total = res.data.data.total
      })
    },
    clear(){
      this.searchArgs.key = null
      this.searchArgs.name = null
      this.searchArgs.email = null
      this.searchArgs.phone = null
    }
  },
  created() {
    this.changePage()
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