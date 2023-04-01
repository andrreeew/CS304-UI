<template>
  <search-skeleton>
    <template v-slot:table>
      <application-table :select="true" v-model:rows="selectedKeys"></application-table>
      <div style="display: flex; justify-content: right">
        <a-pagination :total="50" size="medium" show-total show-jumper show-page-size />
      </div>
    </template>
    <template v-slot:header-left>
      <a-button type="primary" @click="$router.push({name:'user-application-new'})">
        <template #icon>
          <icon-plus />
        </template>
        Create
      </a-button>
      <a-button>Import</a-button>
      select {{selectedKeys.length}} records
    </template>

    <template v-slot:header-right>
      <a-tooltip content="撤回" >
        <delete-button></delete-button>
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
import {mapMutations} from "vuex";

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
    }
  },
  methods:{
    ...mapMutations(['setRoutes'])
  },
  created() {
    this.setRoutes([{label:'申请', name:'user-application'}])
  }

}
</script>

<style scoped>
</style>