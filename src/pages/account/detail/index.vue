<template>
  <a-space style="width: 100%" size="medium" direction="vertical">
    <a-card title="个人信息">
      <a-descriptions :data="userInfo"  size="large" :column="{xs:1, lg:2}"/>
    </a-card>

    <a-card title="所属课题组">
      <a-space direction="vertical" style="width: 100%" size="medium">
        <group-card v-for="i in 2"></group-card>
        <a-card hoverable>
          <div style="display: flex; justify-content: center">
            <a-button shape="circle" @click="visible=true">
              <icon-plus></icon-plus>
            </a-button>
          </div>
        </a-card>
      </a-space>

      <a-modal v-model:visible="visible">
        
      </a-modal>
    </a-card>

    <a-card >
      <div style="display: flex; justify-content: space-around">
        <a-statistic title="可使用总金额" :value="125670" show-group-separator >
          <template #suffix>
            <icon-arrow-rise />
          </template>
        </a-statistic>
        <a-statistic title="已使用金额" :value="50.52" :precision="2"  :value-style="{ color: '#0fbf60' }">
          <template #prefix>
            <icon-arrow-rise />
          </template>
          <template #suffix>%</template>
        </a-statistic>
        <a-statistic title="剩余金额" :value="50.52" :precision="2" :value-style="{ color: '#0fbf60' }">
          <template #prefix>
            <icon-arrow-rise />
          </template>
          <template #suffix>%</template>
        </a-statistic>
      </div>
    </a-card>
    <a-card title="申请记录">
      <template #extra>
        <a-link>More</a-link>
      </template>
      <application-table style="margin-bottom: 20px"></application-table>
    </a-card>



  </a-space>
</template>

<script>
import applicationTable from '@/components/application/application-table'
import groupCard from '@/components/group/group-card'

export default {
  name: "index",
  components:{
    applicationTable,
    groupCard,
  },
  data(){
    return{
      visible: false,
      userInfo:[
        {label: 'ID', value: this.$route.params.user},
        {label: '用户名', value: '李明'},
        {label: '邮箱', value: '12343214@qq.com'},
        {label: '手机号', value: 2424124124}
      ]
    }
  }
}
</script>

<style scoped>

</style>