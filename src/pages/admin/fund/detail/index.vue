<template>
  <a-space direction="vertical" size="medium" style="width: 100%">
    <a-card title="经费信息">
      <fund-info :fundData="data"></fund-info>
      <a-divider></a-divider>
      <fund-num></fund-num>
    </a-card>

    <a-card title="分配课题组" style="padding-bottom: 20px">
      <group-table :fundId="data.id"></group-table>
    </a-card>

    <a-card title="使用记录">
      <template #extra>
        <a-link>更多</a-link>
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
import api from "@/api"
import deleteButton from '@/components/operation/delete-button'
import {mapMutations} from 'vuex'

export default {
  name: "index",
  components: {
    applicationTable,
    groupTable,
    fundInfo,
    fundNum,
    deleteButton
  },
  methods:{
    ...mapMutations(['setRoutes'])
  },
  data() {
    return {
      id: this.$route.params.fundId,
      data: {},
      visible: false,
    }
  },
  methods: {
    getData(){
      api.getFunds({id:this.id}).then(res => {
        this.data = res.data.data[0]
      })
    }
  },
  created(){
    this.setRoutes([{label:'经费', name:'admin-fund'}])
    this.getData()
  }
}
</script>

<style scoped>

</style>