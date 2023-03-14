<template>
  <a-space direction="vertical" size="medium" style="width: 100%">
    <a-card title="经费信息">
      <fund-info></fund-info>
      <a-divider></a-divider>
      <fund-num></fund-num>
    </a-card>

    <a-card title="分配课题组" style="padding-bottom: 20px">
      <group-table ></group-table>
    </a-card>

    <a-card title="使用记录">
      <template #extra>
        <a-link>More</a-link>
      </template>
      <application-table style="margin-bottom: 20px"></application-table>
    </a-card>

  </a-space>



  <a-modal v-model:visible="visible" >
    <template #title>
      添加课题组
    </template>
    <group-form></group-form>
  </a-modal>

</template>

<script>
import applicationTable from '@/components/application/application-table'
import groupTable from '@/pages/admin/fund/detail/components/group-table'
import fundInfo from '@/pages/admin/fund/detail/components/fund-info'
import fundNum from '@/pages/admin/fund/detail/components/fund-num'

export default {
  name: "index",
  components: {
    applicationTable,
    groupTable,
    fundInfo,
    fundNum
  },
  data() {
    return {
      visible: false,
    }
  }
}
</script>

<style scoped>

</style>