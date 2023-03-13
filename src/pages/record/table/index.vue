<template>
  <a-card style="width: 100%">
    <a-space direction="vertical" :size=20 style="width: 100%">
      <a-divider style="margin-bottom: 0px"></a-divider>
      <div style="display: flex;justify-content: space-between;width: 100%">
        <a-space>
          <a-button type="primary" @click="$router.push({name:'record-new'})">
            <template #icon>
              <icon-plus />
            </template>
            Create
          </a-button>
          <a-button>Import</a-button>
          select {{selectedKeys.length}} records
        </a-space>
        <a-space>
          <a-tooltip content="Withdraw" >
            <a-button class="delete-button" >
              <icon-delete/>
            </a-button>
          </a-tooltip>
          <a-button>
            <template #icon>
              <icon-download />
            </template>
            Download
          </a-button>
        </a-space>
      </div>
      <a-table
          :columns="columns"
          :data="data"
          :bordered="false"
          :row-selection="rowSelection"
          :pagination="false"
          :scroll="{x: 1400, y: '100%',}"
          v-model:selectedKeys="selectedKeys"
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
        <template #date="{ record }">
          {{dayjs(record.date).format('YYYY-MM-DD HH:mm')}}
        </template>
        <template #optional="{ record }">
          <a-space>
            <a-button @click="showDetail(record)">view</a-button>
            <a-tooltip  v-if="record.state==='underway'" content="Withdraw" >
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

      <a-modal :visible="visible" @cancel="visible=false">
        <template #title>

        </template>
        <template #footer>

        </template>
        <record-detail :record="selectedRecord"></record-detail>
      </a-modal>

    </a-space>
  </a-card>
</template>

<script>
import dayjs from 'dayjs'
// import recordDetail from '@/components/record/record-detail'

export default {
  name: "index",
  // components:{
  //   recordDetail
  // },
  data(){
    return{
      dayjs,
      columns:[
        {title: '经费名称', dataIndex: 'name',  width: 180 },
        {title:'经费状态', slotName: 'state', width: 180 },
        {title: '经费编号', dataIndex: 'salary', width: 150 },
        {title: '课题组', dataIndex: 'address', width: 150 },
        {title: '金额', dataIndex: 'email', width: 120 },
        {title: '申请日期', slotName: 'date',},
        {title: '支出类别', dataIndex: 'category', },
        {title: '操作', slotName: 'optional', fixed: 'right', width:150},
      ],
      data:[{
        key: '1',
        name: 'Jane Doe',
        state: 'complete',
        salary: 23000,
        address: 'Li fasf',
        email: 490,
        category: '办公费',
        disabled: true,
      }, {
        key: '2',
        name: 'Alisa Ross',
        state: 'complete',
        salary: 25000,
        address: 'Ligag',
        email: 490,
        category: '办公费',
        disabled: true,
        date: 162774199
      }, {
        key: '3',
        name: 'Kevin Sandra',
        state: 'underway',
        salary: 22000,
        address: 'Liga',
        category: '办公费',
        email: 490,
      }, {
        key: '4',
        name: 'Ed Hellen',
        state: 'reject',
        salary: 17000,
        address: 'Ligag',
        category: '办公费',
        email: 490,
        disabled: true,
      }, {
        key: '5',
        name: 'William Smith',
        state: 'underway',
        salary: 27000,
        address: 'Letei',
        email: 490,
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
      this.selectedRecord = record
      this.visible = true
      console.log(dayjs(5352))
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