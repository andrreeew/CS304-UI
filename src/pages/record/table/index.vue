<template>
  <a-card style="width: 100%">
    <a-space direction="vertical" :size=20 style="width: 100%">
      <a-divider style="margin-bottom: 0px"></a-divider>
      <div style="display: flex;justify-content: space-between;width: 100%">
        <a-space>
          <a-button type="primary" @click="this.$router.push({name:'record-new'})">
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
          :scroll="{x: 1000, y: 200,}"
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
import recordDetail from '@/components/record/record-detail'

export default {
  name: "index",
  components:{
    recordDetail
  },
  data(){
    return{
      columns:[
        {title: 'Name', dataIndex: 'name'},
        {title:'State', slotName: 'state'},
        {title: 'Salary', dataIndex: 'salary',},
        {title: 'Address', dataIndex: 'address',},
        {title: 'Email', dataIndex: 'email',},
        {title: 'Operation', slotName: 'optional', fixed: 'right', width:200},
      ],
      data:[{
        key: '1',
        name: 'Jane Doe',
        state: 'complete',
        salary: 23000,
        address: '32 Park Road, London',
        email: 'jane.doe@example.com',
        disabled: true,
      }, {
        key: '2',
        name: 'Alisa Ross',
        state: 'complete',
        salary: 25000,
        address: '35 Park Road, London',
        email: 'alisa.ross@example.com',
        disabled: true,
      }, {
        key: '3',
        name: 'Kevin Sandra',
        state: 'underway',
        salary: 22000,
        address: '31 Park Road, London',
        email: 'kevin.sandra@example.com'
      }, {
        key: '4',
        name: 'Ed Hellen',
        state: 'reject',
        salary: 17000,
        address: '42 Park Road, London',
        email: 'ed.hellen@example.com',
        disabled: true,
      }, {
        key: '5',
        name: 'William Smith',
        state: 'underway',
        salary: 27000,
        address: '62 Park Road, London',
        email: 'william.smith@example.com'
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