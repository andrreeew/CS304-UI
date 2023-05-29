<template>
  <search-skeleton @clear="clearForm" @search="search">
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
          v-model:page-size="pageSize"
          :page-size-options="[10, 30, 50]"
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
              <a-input v-model="form.fundId"></a-input>
            </a-col>
          </a-row>
        </a-grid-item>
        <a-grid-item >
          <a-row class="search-item" >
            <a-col :span="8" >
              经费名称:
            </a-col>
            <a-col :span="16">
              <a-input v-model="form.fundName"></a-input>
            </a-col>
          </a-row>
        </a-grid-item>
        <a-grid-item >
          <a-row class="search-item" >
            <a-col :span="8" >
              课题组:
            </a-col>
            <a-col :span="16">
              <a-input v-model="form.group"></a-input>
            </a-col>
          </a-row>
        </a-grid-item>
        <a-grid-item >
          <a-row class="search-item" >
            <a-col :span="8" >
              申请日期:
            </a-col>
            <a-col :span="16">
              <a-range-picker @select="selectDate"/>
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
                <a-input v-model="form.startValue" placeholder="first" />
                -
                <a-input v-model="form.endValue" placeholder="second" />
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
              <a-input v-model="form.person"></a-input>
            </a-col>
          </a-row>
        </a-grid-item>
        <a-grid-item >
          <a-row class="search-item" >
            <a-col :span="8" >
              支出类别:
            </a-col>
            <a-col :span="16">
              <a-select v-model="form.category">
                <a-option v-for="item in categorise">{{item}}</a-option>
              </a-select>
            </a-col>
          </a-row>
        </a-grid-item>
        <!-- <a-grid-item >
          <a-row class="search-item" >
            <a-col :span="8" >
              支出类别二级:
            </a-col>
            <a-col :span="16">
              <a-select></a-select>
            </a-col>
          </a-row>
        </a-grid-item> -->
        <a-grid-item >
          <a-row class="search-item" >
            <a-col :span="8" >
              经费状态:
            </a-col>
            <a-col :span="16">
              <a-select v-model="formtype">
                <a-option v-for="item in types">{{ item }}</a-option>
              </a-select>
            </a-col>
          </a-row>
        </a-grid-item>
        <!-- <a-grid-item >
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
        </a-grid-item> -->
        <a-grid-item >
          <a-row class="search-item" >
            <a-col :span="8" >
              排序:
            </a-col>
            <a-col :span="16">
              <a-select v-model="sortBy">
                <a-option v-for="item in sortOptions">{{ item }}</a-option>
              </a-select>
            </a-col>
          </a-row>
        </a-grid-item>

        <a-grid-item >
          <a-row class="search-item" >
            <a-col :span="8" >
              升序降序:
            </a-col>
            <a-col :span="4">
              <a-switch v-model="form.ascend">
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
      pageSize:10,
      current:1,
      total:5,
      queryArgs:{
        type:null,
        page:null,
      },
      applicationData:[],
      loading:false,
      form: {
        // fundId: 1,
        // fundName: 'fund',
        // group: 'group',
        // startDate: '2023-5-27',
        // endDate: '2023-5-28',
        // startValue: 1,
        // endValue: 2,
        // person: 'Li',
        // category: '电脑费',
        // type: 'complete'
      },
      categorise : ['电脑费', '文印费', '打车费'],
      types: ['通过', '驳回', '待审批'],
      formtype: '',
      sortOptions: ['经费名称','课题组','金额','申请日期','经办人','支出类别'],
      sortBy: ''
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
      api.getApplications({page:this.queryArgs.page, type:this.queryArgs.type, pageSize:this.pageSize}).then(res => {
        this.applicationData = res.data.data.data
        this.total = res.data.data.total
      }).finally(()=>{this.loading=false})
    },
    selectDate(dateString, date) {
      this.form.startDate = dateString[0]
      this.form.endDate = dateString[1]
    },
    clearForm() {
      console.log(this.form);
      this.form = {ascend: false}
      this.formtype = ''
      this.sortBy = ''
    },
    search() {
      let args = this.form
      args.page = 1
      args.pageSize = this.pageSize
      this.loading = true
      api.getApplications(args).then(res => {
        console.log(args);
        this.applicationData = res.data.data.data
        this.total = res.data.data.total
      }).finally(()=>{this.loading=false})
    }
  },
  watch: {
    $route() {
      this.init()
    },
    formtype() {
      if (this.formtype == '通过') {
        this.form.type = 'complete'
      } else if (this.formtype == '驳回') {
        this.form.type = 'reject'
      } else {
        this.form.type = 'underway'
      }
    },
    sortBy() {
      if (this.sortBy == '经费名称') {
        this.form.sortBy = 'fundName'
      } else if (this.sortBy == '课题组') {
        this.form.sortBy = 'group'
      } else if (this.sortBy == '金额') {
        this.form.sortBy = 'value'
      } else if (this.sortBy == '申请日期') {
        this.form.sortBy = 'date'
      } else if (this.sortBy == '经办人') {
        this.form.sortBy = 'person'
      } else if (this.sortBy == '支出类别') {
        this.form.sortBy = 'category'
      }
    }
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