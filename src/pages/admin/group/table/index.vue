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
            <template v-slot:operation>
              <a-popconfirm :content="'确认移除 '+i.name +' 组?'" @ok="deleteGroup(i.id)" position="tr">
                <delete-button></delete-button>
              </a-popconfirm>

            </template>
          </group-card>
        </a-grid-item>
      </a-grid>

      <div style="display: flex; justify-content: right; margin-top: 20px">
        <a-pagination 
          v-model:current="current" 
          :total="total" 
          v-model:page-size="searchArgs.pageSize"
          :page-size-options="[8, 20, 40]"
          size="medium" 
          show-total 
          show-jumper 
          show-page-size 
          @change="changePage()"
        />
      </div>
      </a-spin>
    </template>

    <template v-slot:header-left>
      <a-button type="primary" @click="$router.push({name:'admin-group-new'})">
        <template #icon>
          <icon-plus />
        </template>
        创建课题组
      </a-button>
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
import deleteButton from '@/components/operation/delete-button'
import api from "@/api"
import {Message} from '@arco-design/web-vue'
import {mapMutations} from "vuex";


export default {
  name: "index",
  components:{
    groupCard,
    searchSkeleton,
    deleteButton
  },
  data(){
    return{
      loading:false,
      groups: [],
      searchArgs: {
        id: this.$route.query.id,
        pageSize: this.$route.query.pageSize|8,
        page: this.$route.query.p|1
      },
      total: 0,
      current: 1,
    }
  },
  methods: {
    ...mapMutations(['setRoutes']),
    changePage(){

      this.searchArgs.page = this.current
      this.searchGroups()
    },
    deleteGroup(id){
      this.loading=true
      api.deleteGroup(id).then(res => {
        Message.success(res.data.msg)
        this.changePage()
      }).finally(()=>{this.loading=true})
    },
    searchGroups(){
      this.loading=true
      api.getGroups(this.searchArgs).then(res => {
        this.groups = res.data.data.groups
        this.total = res.data.data.total
      }).finally(()=>{this.loading=false})
    },
    clear(){
      this.searchArgs.id = null
    }
  },
  created(){
    this.setRoutes([{label:'课题组', name:'admin-group'}])
    this.changePage()
  }
}
</script>

<style scoped>
.delete-button:hover {
  color: white;
  background-color: rgb(var(--red-6));
}
.dl-button:hover {
  color: white;
}
.search-item{
  align-items: baseline
}
</style>