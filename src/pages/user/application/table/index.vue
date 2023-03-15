<template>
  <a-card style="width: 100%">
    <a-space direction="vertical" :size=20 style="width: 100%">
      <a-divider style="margin-bottom: 0px"></a-divider>
      <div style="display: flex;justify-content: space-between;width: 100%">
        <a-space>
          <a-button type="primary" @click="$router.push({name:'user-application-new'})">
            <template #icon>
              <icon-plus />
            </template>
            Create
          </a-button>
          <a-button>Import</a-button>
          select {{selectedKeys.length}} records
        </a-space>
        <a-space>
          <a-tooltip content="撤回" >
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
      <application-table :select="true" v-model:rows="selectedKeys"></application-table>
      <div style="display: flex; justify-content: right">
        <a-pagination :total="50" size="medium" show-total show-jumper show-page-size />
      </div>

    </a-space>
  </a-card>
</template>

<script>
import applicationTable from '@/components/application/application-table'

export default {
  name: "index",
  components:{
    applicationTable
  },
  data(){
    return{
      selectedKeys:[],
    }
  },

}
</script>

<style scoped>
</style>