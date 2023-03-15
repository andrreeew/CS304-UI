<template>
  <a-card style="width: 100%">
    <a-space direction="vertical" :size=20 style="width: 100%">
      <a-divider style="margin-bottom: 0px"></a-divider>
      <div style="display: flex;justify-content: space-between;width: 100%">
        <a-space>
          <a-button>Import</a-button>
          select {{selectedKeys.length}} records
        </a-space>
        <a-space>
          <a-tooltip content="驳回" >
            <delete-button></delete-button>
          </a-tooltip>
          <a-button>
            <template #icon>
              <icon-download />
            </template>
            Download
          </a-button>
        </a-space>
      </div>
      <application-table  v-model:rows="selectedKeys" :select="true"></application-table>

      <div style="display: flex; justify-content: right">
        <a-pagination :total="50" size="medium" show-total show-jumper show-page-size />
      </div>

    </a-space>
  </a-card>
</template>

<script>
import deleteButton from "@/components/operation/delete-button"
import checkButton from '@/components/operation/check-button'
import applicationTable from '@/components/application/application-table'

export default {
  name: "index",
  components:{
    deleteButton,
    checkButton,
    applicationTable
  },
  data(){
    return{
      selectedKeys:['1'],
    }
  },
  methods: {
  }
}
</script>

<style scoped>
</style>