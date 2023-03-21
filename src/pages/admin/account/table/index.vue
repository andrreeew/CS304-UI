<template>
  <search-skeleton>
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
        <a-button class="delete-button" >
          <icon-delete/>
        </a-button>
      </a-tooltip>
      <a-input-search></a-input-search>
    </template>

    <template v-slot:search-option>
      <a-grid  style="width: 100%" :cols="{ xs: 1, sm: 1, md: 2, lg: 3, xl: 3, xxl:4}" :colGap=22 :rowGap="16" >
        <a-grid-item >
          <a-row class="search-item" >
            <a-col :span="8" >
              经费编号:
            </a-col>
            <a-col :span="16">
              <a-select></a-select>
            </a-col>
          </a-row>
        </a-grid-item>
        <a-grid-item >
          <a-row class="search-item" >
            <a-col :span="8" >
              经费名称:
            </a-col>
            <a-col :span="16">
              <a-select></a-select>
            </a-col>
          </a-row>
        </a-grid-item>
        <a-grid-item >
          <a-row class="search-item" >
            <a-col :span="8" >
              课题组:
            </a-col>
            <a-col :span="16">
              <a-select></a-select>
            </a-col>
          </a-row>
        </a-grid-item>
        <a-grid-item >
          <a-row class="search-item" >
            <a-col :span="8" >
              申请日期:
            </a-col>
            <a-col :span="16">
              <a-range-picker/>
            </a-col>
          </a-row>
        </a-grid-item>
        <a-grid-item >
          <a-row class="search-item" >
            <a-col :span="8" >
              金额:
            </a-col>
            <a-col :span="16">
              <a-space>
                <a-input  placeholder="first" />
                -
                <a-input  placeholder="second" />
              </a-space>
            </a-col>
          </a-row>
        </a-grid-item>
        <a-grid-item >
          <a-row class="search-item" >
            <a-col :span="8" >
              经办人:
            </a-col>
            <a-col :span="16">
              <a-select></a-select>
            </a-col>
          </a-row>
        </a-grid-item>



      </a-grid>
    </template>
  </search-skeleton>

</template>

<script>
import dayjs from 'dayjs'
import searchSkeleton from '@/components/operation/search-skeleton'

export default {
  name: "index",
  components:{
    searchSkeleton
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