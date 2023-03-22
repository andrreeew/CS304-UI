<template>
  <a-space style="width: 100%" size="medium" direction="vertical">
    <a-card>
      <a-card :bordered="false"  title="个人信息">
        <a-descriptions :data="userInfo"  size="large" :column="{xs:1, lg:2}"/>
      </a-card>
    </a-card>

    <a-card>
      <a-card :bordered="false" title="所属课题组">
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
      </a-card>

      <a-modal v-model:visible="visible" title="加入课题组">
        <a-form>
          <a-form-item label="加入课题组">
            <a-select v-model="form.group" multiple>
              <a-option v-for="item in groups">{{item.label}}</a-option>
            </a-select>
          </a-form-item>
          <a-form-item  label="管理员权限">
            <a-checkbox-group v-model="form.admin" :options="form.group">
            </a-checkbox-group>
          </a-form-item>
        </a-form>
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
    <a-card >
      <a-card :bordered="false" title="申请记录">
      <template #extra>
        <a-link>More</a-link>
      </template>
      <application-table style="margin-bottom: 20px"></application-table>
      </a-card>
    </a-card>
  </a-space>
</template>

<script>
import applicationTable from '@/components/application/application-table'
import groupCard from '@/components/group/group-card'
import api from "@/api"

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
        {label: 'ID', value: ''},
        {label: '用户名', value: ''},
        {label: '邮箱', value: ''},
        {label: '手机号', value: ''}
      ],
      groups:[],
      form:{
        group:[],
        admin:[],
      },
    }
  },
  created(){
    api.getUsers({key:this.$route.params.user,pageSize:1,page:1}).then(res => {
      let info = res.data.data.users[0]
      this.userInfo[0].value = info.key
      this.userInfo[1].value = info.name
      this.userInfo[2].value = info.email
      this.userInfo[3].value = info.phone
      this.groups = info.group
    })
  }
}
</script>

<style scoped>

</style>