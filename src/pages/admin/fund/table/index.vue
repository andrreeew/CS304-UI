<template>
  <search-skeleton>
    <template v-slot:table>
      <a-table
          :columns="columns"
          :data="data"
          :bordered="false"
          :pagination="false"
          :scroll="{x: 1400, y: '100%',}"
      >
        <template #state="{ record }">
          <a-tag v-if="record.state==='complete'" color="green">
            <template #icon>
              <icon-check-circle-fill />
            </template>
            Complete
          </a-tag>
          <a-tag v-else-if="record.state==='underway'" color="arcoblue">
            <template #icon>
              <icon-up-circle />
            </template>
            Underway
          </a-tag>
          <a-tag v-else-if="record.state==='reject'" color="red">
            <template #icon>
              <icon-close-circle-fill />
            </template>
            Reject
          </a-tag>
        </template>
        <template #dateRange="{ record }">
          {{dayjs(record.dateRange[0]).format('YYYY/MM/DD')}}-{{dayjs(record.dateRange[1]).format('YYYY/MM/DD')}}
        </template>
        <template #optional="{ record }">
          <a-space>
            <a-button @click="showDetail(record)">view</a-button>
          </a-space>
        </template>
      </a-table>
    </template>
    <template v-slot:header-left>
      <a-button>Import</a-button>
    </template>
    <template v-slot:header-right>
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
        {title: '经费编号', dataIndex: 'id' },
        {title: '经费名称', dataIndex: 'name'},
        {title:'授权有效期', slotName: 'dateRange', width: 200},
        {title: '经费总额', dataIndex: 'totalNum'},
        {title: '剩余经费', dataIndex: 'leftNum',},
        {title: '执行率', dataIndex: 'percent', },
        {title: '是否达标', slotName: 'state',},
        {title: '剩余天数', dataIndex: 'leftDay'},
        {title: '操作', slotName: 'optional', fixed: 'right', width:150},
      ],
      data:[{
        key: '1',
        id: 4214,
        name: 'Jane Doe',
        dateRange: [5325, 5325],
        totalNum: 123451,
        leftNum: 21515,
        percent: 321,
        state: 'complete',
        leftDay: 19,
        disabled: true,
      }
      ],
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
      this.$router.push({name:'admin-fund-detail', params:{fundId:record.id}})
    }
  }
}
</script>

<style scoped>
</style>