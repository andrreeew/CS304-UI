<template>
  <search-skeleton>
    <template v-slot:table>
      <fund-table ></fund-table>
      <div style="display: flex; justify-content: right">
        <a-pagination :total="50" size="medium" show-total show-jumper show-page-size/>
      </div>
    </template>
    <template v-slot:header-left>
      <a-tabs type="rounded" :active-key="type" size="mini" v style="margin-bottom: -20px" @change="jump">
        <a-tab-pane key="0" title="全部">
        </a-tab-pane>
        <a-tab-pane key="1" title="待分配">
        </a-tab-pane>
        <a-tab-pane key="2" title="未达标">
        </a-tab-pane>
      </a-tabs>
    </template>
    <template v-slot:header-right>
      <a-input-search></a-input-search>
    </template>
    <template v-slot:search-option>
      <a-grid  style="width: 100%" :cols="{ xs: 1, sm: 1, md: 2, lg: 3, xl: 3, xxl:4}" :colGap=40 :rowGap="16" >
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
        <!-- <a-grid-item >
          <a-row class="search-item" >
            <a-col :span="8" >
              课题组:
            </a-col>
            <a-col :span="16">
              <a-select></a-select>
            </a-col>
          </a-row>
        </a-grid-item> -->
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
        <!-- <a-grid-item >
          <a-row class="search-item" >
            <a-col :span="8" >
              经办人:
            </a-col>
            <a-col :span="16">
              <a-select></a-select>
            </a-col>
          </a-row>
        </a-grid-item> -->
      </a-grid>
    </template>
  </search-skeleton>
</template>

<script>
import searchSkeleton from '@/components/operation/search-skeleton'
import fundTable from '@/components/fund/fund-table'
import {mapMutations} from 'vuex'

export default {
  name: "index",
  components:{
    searchSkeleton,
    fundTable
  },
  data(){
    return{
      type:'',
      form: {
        fundId: 1,
        fundName: 'fund',

      }
    }
  },
  methods:{
    ...mapMutations(['setRoutes']),
    init(){
      this.type=this.$route.query.type?this.$route.query.type:'0'
    },
    jump(value){
      this.$router.push({name:'admin-fund-table', query:{type:value}})
    }
  },
  created() {
    this.init()
    this.setRoutes([{label:'经费', name:'admin-fund'}])
  },
  watch: {
    $route() {
      this.init()

    },
  },

}
</script>

<style scoped>
.search-item{
  align-items: baseline
}
</style>