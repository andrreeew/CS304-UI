<template>
  <search-skeleton>
    <template v-slot:table>
      <a-spin :loading="loading" style="width: 100%">
        <div v-if="groups.length===0" style="min-height:200px;
      border-top: 1px solid var(--color-neutral-3);border-bottom: 1px solid var(--color-neutral-3);
      display: flex; align-items: center">
          <a-empty />
        </div>

        <a-grid v-else :cols="{ xs: 1, sm: 1, md: 1, lg: 2, xl:2, xxl:3}" :colGap="20" :rowGap="16" >
          <a-grid-item span="1" v-for="i in groups">
            <group-card :info="i">
            </group-card>
          </a-grid-item>
        </a-grid>

        <!-- <div style="display: flex; justify-content: right; margin-top: 20px">
          <a-pagination
              v-model:current="current"
              :total="total"
              :page-size="searchArgs.pageSize"
              :page-size-options="[searchArgs.pageSize]"
              size="medium"
              show-total
              show-jumper
              show-page-size
          />
        </div> -->
      </a-spin>
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
import groupCard from '@/components/group/group-card'
import searchSkeleton from '@/components/operation/search-skeleton'
import {mapMutations} from "vuex";
import api from "@/api"


export default {
  name: "index",
  components:{
    groupCard,
    searchSkeleton,
  },
  data(){
    return{
      loading:false,
      groups: [],
      searchArgs: {
        id: this.$route.query.id,
        pageSize: this.$route.query.pageSize|3,
        page: this.$route.query.p|1
      },
      total: 0,
      current: 1,
    }
  },
  methods: {
    ...mapMutations(['setRoutes']),
    getGroups(){
      api.getUserGroups().then(res => {
        this.groups = res.data.data
      })
    },
  },
  created(){
    this.getGroups()
    this.setRoutes([{label:'课题组', name:'user-group'}])
  }
}
</script>

<style scoped>

.search-item{
  align-items: baseline
}
</style>