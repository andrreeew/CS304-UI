<template>
  <search-skeleton>
    <template v-slot:header-right>
      <a-input-search :style="{width:'320px'}" placeholder="Please enter something"/>
    </template>
    <template v-slot:header-left>
      <a-tabs type="rounded" :active-key="type" size="mini" v style="margin-bottom: -20px" @change="jump">
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
      <application-table v-model:rows="selectedKeys" :select="batch"></application-table>

      <div style="display: flex; justify-content: right">
        <a-pagination :total="50" size="medium" show-total show-jumper show-page-size/>
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
import {mapMutations} from "vuex";

export default {
  name: "index",
  components: {
    deleteButton,
    checkButton,
    applicationTable,
    searchSkeleton
  },
  watch: {
    $route() {
      this.init()

    },
  },


  methods:{
    init(){
      this.type=this.$route.query.type?this.$route.query.type:'all'
    },
    ...mapMutations(['setRoutes']),
    jump(value){
      this.$router.push({name:'admin-application-table', query:{type:value}})
    }
  },
  created() {
    this.setRoutes([{label:'申请', name:'admin-application'}])
    this.init()
  },

  data() {
    return {
      // selectedKeys: ['1'],
      batch: false,
      advance: false,
      type:''
    }
  },

}
</script>

<style scoped>
.search-item{
  align-items: baseline
}
</style>