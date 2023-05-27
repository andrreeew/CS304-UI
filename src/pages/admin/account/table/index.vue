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
          :loading="loading"
          v-model:selectedKeys="selectedKeys"
      >
        <template #optional="{ record }">
          <a-space>
            <a-button @click="showDetail(record)">查看</a-button>
            <a-popconfirm :content="'确认删除用户'+record.name+'?'" position="tr" @ok="deleteUsers([record.key])">
                <a-button class="delete-button" >
                  <icon-delete/>
                </a-button>
            </a-popconfirm>
          </a-space>
        </template>
      </a-table>

      <div style="display: flex; justify-content: right">
        <a-pagination 
          v-model:current="current" 
          :total="total" 
          v-model:page-size="searchArgs.pageSize"
          :page-size-options="[10, 30, 50]"
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
        选中 {{selectedKeys.length}} 条账号
    </template>

    <template v-slot:header-right>

      <a-tooltip content="删除选中账号" >
        <delete-button @click="deleteConfirm()"></delete-button>
<!--        <a-button class="delete-button" @click="deleteUsers(selectedKeys)">-->
<!--          <a-button class="delete-button" @click="deleteUsers(selectedKeys)">-->
<!--          <icon-delete/>-->
<!--        </a-button>-->
      </a-tooltip>
      <a-modal v-model:visible="visible" title="确认删除" @ok="deleteUsers(selectedKeys)" draggable>
        <div style="width: 100%; display: flex;justify-content: center">
          <div>
            确认删除{{selectedKeys.length}}个用户?
          </div>
        </div>

      </a-modal>
      <a-input-search></a-input-search>
    </template>

    <template v-slot:search-option>
      <a-grid style="width: 100%" :cols="{ xs: 1, sm: 1, md: 2, lg: 3, xl: 4, xxl:4}" :colGap=40 :rowGap="16" >
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
import deleteButton from '@/components/operation/delete-button'
import {mapMutations} from "vuex";


export default {
  name: "index",
  components:{
    searchSkeleton,
    deleteButton
  },
  data(){
    return{
      visible:false,
      loading: true,
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
        key: this.$route.query.key,
        name: this.$route.query.name,
        email: this.$route.query.email,
        phone: this.$route.query.phone,
        pageSize: this.$route.query.pageSize|10,
        page: this.$route.query.p|1
      }
    }
  },
  methods: {
    ...mapMutations(['setRoutes']),
    showDetail(record){
      this.$router.push({name:'admin-account-detail', params:{user:record.key}})
    },
    changePage(){
      this.searchArgs.page = this.current
      this.searchUsers()
    },
    deleteUsers(ids){
      if (ids.length === 0) {
        Message.error('未选中账号！')
        return
      }
      this.loading=true
      api.deleteUsers(ids).then(res => {
        Message.success(res.data.msg)
        this.changePage()
      })
      this.selectedKeys = []
    },
    searchUsers(){
      this.loading = true
      api.getUsers(this.searchArgs).then(res => {
        this.data = res.data.data.users
        this.total = res.data.data.total
      }).finally(()=>{this.loading=false})
    },
    deleteConfirm(){
      if (this.selectedKeys.length ===0) {
        Message.error('未选中账号！')
        return
      }
      this.visible=true
    },
    clear(){
      this.searchArgs.key = null
      this.searchArgs.name = null
      this.searchArgs.email = null
      this.searchArgs.phone = null
    },
  },
  created() {
    this.setRoutes([{label:'账号', name:'admin-account'}])
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

.search-item{
  align-items: baseline
}
</style>