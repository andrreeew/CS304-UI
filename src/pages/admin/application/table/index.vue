<template>
  <search-skeleton>
    <template v-slot:header-right>
      <a-input-search :style="{width:'320px'}" placeholder="Please enter something"/>
    </template>
    <template v-slot:header-left>
      <a-tabs type="rounded" :active-key="queryArgs.type" size="mini" v style="margin-bottom: -20px" @change="jump">
        <a-tab-pane key="all" title="全部">
        </a-tab-pane>
        <a-tab-pane key="underway" title="待审批">
        </a-tab-pane>
        <a-tab-pane key="reject" title="驳回">
        </a-tab-pane>
        <a-tab-pane key="complete" title="通过">
        </a-tab-pane>
      </a-tabs>
    </template>
    <template v-slot:table>
      <application-table 
        v-model:rows="selectedKeys" 
        :select="batch" 
        :data="applicationData"
        :loading="loading"
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
        <a-grid-item >
          <a-row class="search-item" >
            <a-col :span="8" >
              支出类别一级:
            </a-col>
            <a-col :span="16">
              <a-select></a-select>
            </a-col>
          </a-row>
        </a-grid-item>
        <a-grid-item >
          <a-row class="search-item" >
            <a-col :span="8" >
              支出类别二级:
            </a-col>
            <a-col :span="16">
              <a-select></a-select>
            </a-col>
          </a-row>
        </a-grid-item>
        <a-grid-item >
          <a-row class="search-item" >
            <a-col :span="8" >
              经费状态:
            </a-col>
            <a-col :span="16">
              <a-select></a-select>
            </a-col>
          </a-row>
        </a-grid-item>
        <a-grid-item >
          <a-row class="search-item" >
            <a-col :span="8" >
              模糊搜索:
            </a-col>
            <a-col :span="16">
              <a-input></a-input>
            </a-col>
          </a-row>
        </a-grid-item>
        <a-grid-item >
          <a-row class="search-item" >
            <a-col :span="8" >
              排序:
            </a-col>
            <a-col :span="16">
              <a-select></a-select>
            </a-col>
          </a-row>
        </a-grid-item>

        <a-grid-item >
          <a-row class="search-item" >
            <a-col :span="8" >
              升序降序:
            </a-col>
            <a-col :span="16">
              <a-switch>
                <template #checked>
                  升序
                </template>
                <template #unchecked>
                  降序
                </template>
              </a-switch>
            </a-col>
          </a-row>
        </a-grid-item>


      </a-grid>
    </template>
  </search-skeleton>
</template>

<script>
import deleteButton from "@/components/operation/delete-button"
import checkButton from '@/components/operation/check-button'
import applicationTable from '@/components/application/application-table'
import searchSkeleton from '@/components/operation/search-skeleton'
import {mapMutations} from "vuex"
import api from "@/api"
import {Message} from '@arco-design/web-vue'

export default {
  name: "index",
  components: {
    deleteButton,
    checkButton,
    applicationTable,
    searchSkeleton
  },
  data() {
    return {
      // selectedKeys: ['1'],
      batch: false,
      advance: false,
      pageSize:3,
      current:1,
      total:5,
      queryArgs:{
        type:null,
        page:null,
      },
      applicationData:[],
      loading:false
    }
  },
  methods:{
    ...mapMutations(['setRoutes']),
    jumpPage(queryArgs){
      this.$router.push({name:'admin-application-table', query:queryArgs})
    },
    init(){
      this.queryArgs.type=this.$route.query.type?this.$route.query.type:'all'
      console.log(this.type)
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
      api.getApplications({page:this.queryArgs.page, type:this.queryArgs.type}).then(res => {
        this.applicationData = res.data.data.data
        this.total = res.data.data.total
      }).finally(()=>{this.loading=false})
    },
  },
  watch: {
    $route() {
      this.init()
    },
  },
  created() {
    this.setRoutes([{label:'申请', name:'admin-application'}])
    this.init()
  },
}
</script>

<style scoped>
.search-item{
  align-items: baseline
}
</style>