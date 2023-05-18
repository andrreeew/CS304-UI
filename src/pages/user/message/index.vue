<template>
  <search-skeleton>
    <template v-slot:header-right>
      <a-input-search :style="{width:'320px'}" placeholder="Please enter something"/>
    </template>
    <template v-slot:header-left>
      <a-tabs type="rounded" size="mini" :active-key="type" v style="margin-bottom: -20px" @change="jump">
        <a-tab-pane key="all" title="全部通知">
        </a-tab-pane>
        <a-tab-pane key="old" title="已读通知">
        </a-tab-pane>
        <a-tab-pane key="new" title="未读通知">
        </a-tab-pane>
      </a-tabs>
    </template>
    <template v-slot:table>
      <a-list :bordered="false" hoverable style="border-top:1px solid var(--color-neutral-3);border-bottom: 1px solid var(--color-neutral-3);;">
        <a-list-item v-for="item in msg"  >
          <div style="display: flex;justify-content: space-between; align-items: center">
            <a-space style="padding-right: 150px" align="center" size="medium">
              <a-tag v-if="item.type==='系统通知'" color="arcoblue">{{item.type}}</a-tag>
              <a-tag v-else color="green">{{item.type}}</a-tag>
              <a-typography-paragraph
                  :ellipsis="{
                    rows: 1,
                  }"
                  class="msg" @click="showDetail(item)">
                {{item.msg}}
              </a-typography-paragraph>
              <a-badge v-if="item.new" text="new"></a-badge>
            </a-space>

            <div style="color: var(--color-neutral-6)">{{item.date}}</div>
          </div>

        </a-list-item>
      </a-list>
      <a-modal v-model:visible="visible" >
        <template #title>
          {{selected.type}}
        </template>
        <div>
          {{selected.msg}}
        </div>
        <div style="display: flex; justify-content: right; margin-top: 10px">
          <div style="color: var(--color-neutral-6)">日期: {{selected.date}}</div>
        </div>
      </a-modal>

      <div style="display: flex; justify-content: right">
        <!-- <a-pagination :total="50" size="medium" show-total show-jumper show-page-size/> -->
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
import searchSkeleton from '@/components/operation/search-skeleton'
import {mapMutations} from "vuex";
import api from "@/api"

export default {
  name: "index",
  components: {
    searchSkeleton
  },
  data() {
    return {
      // selectedKeys: ['1'],
      msg:[
        // {type:'系统通知', date:'2010-10-1', new:true, msg:'A design is a plan or specification for the construction of an object or system or for the implementation of an activity or process, or the result of that plan or specification in the form of a prototype, product or process. The verb to design expresses the process of developing a design. The verb to design expresses the process of developing a design.A design is a plan or specification for the construction of an object or system or for the implementation of an activity or process, or the result of that plan or specification in the form of a prototype, product or process. The verb to design expresses the process of developing a design. The verb to design expresses the process of developing a design.'},
        // {type:'审批通知', date:'2010-10-1',new:false, msg:'A design is a plan or specification for the construction of an object or system or for the implementation of an activity or process, or the result of that plan or specification in the form of a prototype, product or process. The verb to design expresses the process of developing a design. The verb to design expresses the process of developing a design.A design is a plan or specification for the construction of an object or system or for the implementation of an activity or process, or the result of that plan or specification in the form of a prototype, product or process. The verb to '}
      ],
      visible:false,
      batch: false,
      advance: false,
      selected: '',
      type:'',
      pageSize:4,
      current:1,
      total:5,
      queryArgs:{
        type:null,
        page:null,
      },
      loading:false
    }
  },
  methods:{
    ...mapMutations(['setRoutes']),
    showDetail(item){
      this.selected = item
      this.visible = true
    },
    // init(){
    //   this.type=this.$route.query.type?this.$route.query.type:'all'
    // },
    // jump(value){
    //   this.$router.push({name:'user-message', query:{type:value}})
    // }
    jumpPage(queryArgs){
      this.$router.push({name:'admin-message', query:queryArgs})
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
      api.getAdminMessages({page:this.queryArgs.page, type:this.queryArgs.type}).then(res => {
        this.msg = res.data.data.data
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
    this.setRoutes([{label:'通知', name:'user-message'}])
    this.init()
  },
}
</script>

<style scoped>
.search-item{
  align-items: baseline
}

.msg{
  padding-top: 13px;
}
.msg:hover{
  cursor: pointer;
  color: #3370ff;
}
</style>