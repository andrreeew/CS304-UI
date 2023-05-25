<template>
  <search-skeleton>
    <template v-slot:table>
      <application-table 
        v-model:rows="selectedKeys" 
        :select="true" 
        :data="applicationData"
        @deny="cancelApplication"
        :update-data="getData"
      >
      </application-table>

      <div style="display: flex; justify-content: right">
        <a-pagination 
          v-model:current="current" 
          :total="total" 
          :page-size="pageSize" 
          :page-size-options="[pageSize]" 
          size="medium" 
          show-total 
          show-jumper 
          show-page-size 
          @change="changePage"
        />
      </div>
    </template>
    <template v-slot:header-left>
      <a-button type="primary" @click="$router.push({name:'user-application-new'})">
        <template #icon>
          <icon-plus />
        </template>
        创建申请
      </a-button>
      <a-button>导入</a-button>
      选中 {{selectedKeys.length}} 条申请
    </template>

    <template v-slot:header-right>
      <a-tooltip content="撤回" >
        <delete-button @click="batchCancelApplication"></delete-button>
      </a-tooltip>

      <a-input-search></a-input-search>
    </template>

    <template v-slot:search-option>
      <a-grid  style="width: 100%" :cols="{ xs: 1, sm: 1, md: 2, lg: 3, xl: 3, xxl:4}" :colGap=22 :rowGap="16" >
        <a-grid-item >
          <a-row class="search-item" >
            <a-col :span="8" >
              经费编号:
            </a-col>
            <a-col :span="16">
              <a-select></a-select>
            </a-col>
          </a-row>
        </a-grid-item>
        <a-grid-item >
          <a-row class="search-item" >
            <a-col :span="8" >
              经费名称:
            </a-col>
            <a-col :span="16">
              <a-select></a-select>
            </a-col>
          </a-row>
        </a-grid-item>
        <a-grid-item >
          <a-row class="search-item" >
            <a-col :span="8" >
              课题组:
            </a-col>
            <a-col :span="16">
              <a-select></a-select>
            </a-col>
          </a-row>
        </a-grid-item>
        <a-grid-item >
          <a-row class="search-item" >
            <a-col :span="8" >
              申请日期:
            </a-col>
            <a-col :span="16">
              <a-range-picker/>
            </a-col>
          </a-row>
        </a-grid-item>
        <a-grid-item >
          <a-row class="search-item" >
            <a-col :span="8" >
              金额:
            </a-col>
            <a-col :span="16">
              <a-space>
                <a-input  placeholder="first" />
                -
                <a-input  placeholder="second" />
              </a-space>
            </a-col>
          </a-row>
        </a-grid-item>
        <a-grid-item >
          <a-row class="search-item" >
            <a-col :span="8" >
              经办人:
            </a-col>
            <a-col :span="16">
              <a-select></a-select>
            </a-col>
          </a-row>
        </a-grid-item>



      </a-grid>
    </template>
  </search-skeleton>
</template>

<script>
import applicationTable from '@/components/application/application-table'
import deleteButton from '@/components/operation/delete-button'
import searchSkeleton from '@/components/operation/search-skeleton'
import {mapMutations} from "vuex"
import api from "@/api"
import {Message} from '@arco-design/web-vue'

export default {
  name: "index",
  components:{
    applicationTable,
    searchSkeleton,
    deleteButton
  },
  data(){
    return{
      selectedKeys:[],
      pageSize:3,
      current:1,
      total:5,
      queryArgs:{
        type:null,
        page:null,
      },
      applicationData:null,
      loading:false
    }
  },
  methods:{
    ...mapMutations(['setRoutes']),
    jumpPage(queryArgs){
      this.$router.push({name:'user-application-table', query:queryArgs})
    },
    init(){
      this.type=this.$route.query.type?this.$route.query.type:'all'
      this.queryArgs.page=this.$route.query.page?this.$route.query.page:1
      if (this.$route.query.page == null) {
        this.current = 1
      }
      this.getData()
    },
    jump(value){
      this.jumpPage({type:value})
    },
    changePage(){
      this.queryArgs.page = this.current
      this.queryArgs.type = this.type
      this.jumpPage(this.queryArgs)
    },
    getData(){
      this.loading = true
      //{page:this.queryArgs.page, type:this.queryArgs.type}
      api.getUserApplications({page:this.queryArgs.page,type:"reject"}).then(res => {
        this.applicationData = res.data.data.data
        this.total = res.data.data.total
      }).finally(()=>{this.loading=false})
    },
    cancelApplication(id){
      api.cancelApplication([id]).then(res => {
        if (res.data.code == 200) {
          Message.success(res.data.msg)
          this.getData()
        } else {
          Message.error(res.data.msg)
        }
      })
    },
    batchCancelApplication(){
      if (this.selectedKeys.length === 0) {
        Message.error('未选中申请记录！')
        return
      }
      api.batchCancelApplication(this.selectedKeys).then(res => {
        if (res.data.code == 200) {
          Message.success(res.data.msg)
          this.getData()
        } else {
          Message.error(res.data.msg)
        }
      })
    }
  },
  watch: {
    $route() {
      this.init()
    },
  },
  created() {
    this.setRoutes([{label:'申请', name:'user-application'}])
    this.init()
  }
}
</script>

<style scoped>
</style>