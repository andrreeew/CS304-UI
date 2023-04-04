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
                    <a-tag v-if="group.identity" color="arcoblue">管理员</a-tag>
                  </template>

                  <template v-slot:operation>
                    <a-space>
                      <a-button>
                        修改权限
                      </a-button>
                      <a-tooltip content="将该人移除该组">
                        <delete-button></delete-button>
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
            <a-avatar :size="70" style="color: rgb(var(--arcoblue-6)); background-color: rgb(var(--arcoblue-1))">A</a-avatar>
            <a-typography style="color:white;font-size: 22px">
              账号：1224
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

export default {
  name: "index",
  components:{
    DeleteButton,
    applicationTable,
    groupCard,
    detailSkeleton
  },
  methods:{
    ...mapMutations(['setRoutes'])
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

      groups:[
        {id: 42, name: 'Zha', total: 120, cost: 21, left: 14, member: ['ABC', 'BSET', 'BSET', 'BSET'], identity:true},
        {id: 42, name: 'Zhang', total: 120, cost: 21, left: 14, member: ['ABC', 'BSET', 'BSET', 'BSET'], identity:false},
        {id: 42, name: 'Zha', total: 120, cost: 21, left: 14, member: ['ABC', 'BSET', 'BSET', 'BSET'], identity: false},
      ],
      form:{
        group:[],
        admin:[],
      },
    }
  },
  created(){
    this.setRoutes([{label:'账号', name:'admin-account'}])
    // api.getUsers({key:this.$route.params.user,pageSize:1,page:1}).then(res => {
    //   let info = res.data.data.users[0]
    //   this.userInfo[0].value = info.key
    //   this.userInfo[1].value = info.name
    //   this.userInfo[2].value = info.email
    //   this.userInfo[3].value = info.phone
    //   // this.groups = info.group
    // })
  }
}
</script>

<style scoped>

</style>