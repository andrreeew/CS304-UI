<template>
  <detail-skeleton>
    <template v-slot:left>
      <a-space style="width: 100%" size="medium" direction="vertical">
        <a-card title="个人信息">

            <a-descriptions :data="userInfo"  size="large" :column="{xs:1, lg:2}"/>
        </a-card>

        <a-card title="所属课题组">
          <a-card :bordered="false" >
            <a-grid :cols="{ xs: 1, sm: 1, md: 1, lg: 2, xl:2, xxl:2}" :colGap="20" :rowGap="16" >
              <a-grid-item span="1" v-for="group in groups">
                <group-card :info="group" >
                  <template v-slot:extra>
                    <a-tag v-if="isAdmin(group)" color="arcoblue">管理员</a-tag>
                  </template>

                  <template v-slot:operation>
                    <a-space>
                      <a-button @click="changeUserAdmin(group.name, userId)">
                        修改权限
                      </a-button>
                      <a-tooltip content="将该人移除该组">
                        <delete-button  @click="deleteUser(group.name, userId)"></delete-button>
                      </a-tooltip>
                    </a-space>
                  </template>

                </group-card>

              </a-grid-item>

              <a-grid-item>
                <a-card hoverable style="display: flex; justify-content: center; align-items: center;height: 148px">

                  <a-button shape="circle" @click="visible=true">
                    <icon-plus></icon-plus>
                  </a-button>
                </a-card>
              </a-grid-item>

            </a-grid>

          </a-card>

          <a-modal v-model:visible="visible" @ok="addGroups" @cancel="clearForm" title="加入课题组">
            <a-form>
              <a-form-item label="加入课题组">
                <a-select v-model="form.group" multiple>
                  <a-option v-for="item in allGroupNames">{{item}}</a-option>
                </a-select>
              </a-form-item>
              <a-form-item  label="管理员权限">
                <a-checkbox-group v-model="form.admin" :options="form.group">
                </a-checkbox-group>
              </a-form-item>
            </a-form>
          </a-modal>
        </a-card>

        <!--    <a-card >-->
        <!--      <div style="display: flex; justify-content: space-around">-->
        <!--        <a-statistic title="可使用总金额" :value="125670" show-group-separator >-->
        <!--          <template #suffix>-->
        <!--            <icon-arrow-rise />-->
        <!--          </template>-->
        <!--        </a-statistic>-->
        <!--        <a-statistic title="已使用金额" :value="50.52" :precision="2"  :value-style="{ color: '#0fbf60' }">-->
        <!--          <template #prefix>-->
        <!--            <icon-arrow-rise />-->
        <!--          </template>-->
        <!--          <template #suffix>%</template>-->
        <!--        </a-statistic>-->
        <!--        <a-statistic title="剩余金额" :value="50.52" :precision="2" :value-style="{ color: '#0fbf60' }">-->
        <!--          <template #prefix>-->
        <!--            <icon-arrow-rise />-->
        <!--          </template>-->
        <!--          <template #suffix>%</template>-->
        <!--        </a-statistic>-->
        <!--      </div>-->
        <!--    </a-card>-->
<!--        <a-card >-->
<!--          <a-card :bordered="false" title="申请记录">-->
<!--            <template #extra>-->
<!--              <a-link>More</a-link>-->
<!--            </template>-->
<!--            <application-table style="margin-bottom: 20px"></application-table>-->
<!--          </a-card>-->
<!--        </a-card>-->
      </a-space>
    </template>
    <template v-slot:right>
      <a-space direction="vertical" style="width: 100%" size="medium">
        <a-card style="background-color:rgb(var(--arcoblue-6))">
          <a-space size="medium">
            <a-avatar :size="70" style="color: rgb(var(--arcoblue-6)); background-color: rgb(var(--arcoblue-1))">{{this.userInfo[1].value.charAt(0).toUpperCase()}}</a-avatar>
            <a-typography style="color:white;font-size: 22px">
              账号：{{this.userInfo[1].value}}
            </a-typography>
          </a-space>
        </a-card>
      </a-space>
    </template>
  </detail-skeleton>

</template>

<script>
import applicationTable from '@/components/application/application-table'
import groupCard from '@/components/group/group-card'
import api from "@/api"
import DeleteButton from "@/components/operation/delete-button";
import {mapMutations} from 'vuex'
import detailSkeleton from "@/components/operation/detail-skeleton";
import {Message} from '@arco-design/web-vue'

export default {
  name: "index",
  components:{
    DeleteButton,
    applicationTable,
    groupCard,
    detailSkeleton
  },
  computed:{

  },

  methods:{
    ...mapMutations(['setRoutes']),
    init(){
      api.getUsers({key:this.$route.params.user,pageSize:1,page:1}).then(res => {
        if(res.data.code===200){
          let info = res.data.data.users[0]
          this.userInfo[0].value = info.key
          this.userInfo[1].value = info.name
          this.userInfo[2].value = info.email
          this.userInfo[3].value = info.phone
          this.userId = info.id
          this.groups = info.group
        }else{
          this.$router.push({name: 'notFound', params: {pathMatch: this.$route.path.substring(1).split('/')}})
        }

      })
    },
    changeUserAdmin(groupName, userId){
      api.changeGroupUserAdmin(groupName, userId).then(res => {
        if (res.data.code === 200) {
          Message.success(res.data.msg)
          this.data = res.data.data
        } else {
          Message.error(res.data.msg)
        }
        console.log('chamge admin')
      }).finally(()=>this.init())
    },
    deleteUser(groupName, userId){
      api.deleteGroupUser(groupName, userId).then(res => {
        if (res.data.code === 200) {
          Message.success(res.data.msg)
          this.data = res.data.data
        } else {
          Message.error(res.data.msg)
        }
      }).finally(()=>this.init())
    },
    addGroups(){
      api.addUserToGroups(this.userInfo[0].value, this.form.group, this.form.admin).then(res => {
        if (res.data.code ===200) {
          Message.success(res.data.msg)
          this.groups = res.data.data

        } else {
          Message.error(res.data.msg)
        }
      }).finally(()=>this.init())
      this.clearForm()
    },
    clearForm(){
      this.form.group = []
      this.form.admin = []
    },
    getAllGroupNames(){
      api.getAllGroupName().then(res => {
        this.allGroupNames = res.data.data
      })
    },
    isAdmin(group){
      console.log(group)
      for (let i = 0; i < group.users.length; i++) {
        if(group.users[i].id===this.userId){
          return group.users[i].admin
        }
      }
      return true
    }
  },
  data(){
    return{
      visible: false,
      userInfo:[
        {label: 'ID', value: ''},
        {label: '用户名', value: ''},
        {label: '邮箱', value: ''},
        {label: '手机号', value: ''},
        {label:'密码', value:''},
      ],
      userId:'',
      groups:[
        // {id: 42, name: 'Zha', total: 120, cost: 21, left: 14, member: ['ABC', 'BSET', 'BSET', 'BSET'], identity:true},
        // {id: 42, name: 'Zhang', total: 120, cost: 21, left: 14, member: ['ABC', 'BSET', 'BSET', 'BSET'], identity:false},
        // {id: 42, name: 'Zha', total: 120, cost: 21, left: 14, member: ['ABC', 'BSET', 'BSET', 'BSET'], identity: false},
      ],
      form:{
        group:[],
        admin:[],
      },
      allGroupNames:[]
    }
  },
  created(){
    this.setRoutes([{label:'账号', name:'admin-account'}])
    this.getAllGroupNames()
    this.init()
  }
}
</script>

<style scoped>

</style>