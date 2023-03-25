<template>
  <search-skeleton>
    <template v-slot:table>
      <a-grid :cols="{ xs: 1, sm: 1, md: 1, lg: 2, xl:2, xxl:3}" :colGap="20" :rowGap="16" >
        <a-grid-item span="1" v-for="i in 5">
          <group-card>
            <template v-slot:operation>
              <a-tooltip content="移除该组">
                <delete-button></delete-button>
              </a-tooltip>
            </template>
          </group-card>
        </a-grid-item>
      </a-grid>

      <div style="display: flex; justify-content: right">
        <a-pagination :total="50" size="medium" show-total show-jumper show-page-size />
      </div>
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
import dayjs from 'dayjs'
import groupCard from '@/components/group/group-card'
import searchSkeleton from '@/components/operation/search-skeleton'
import deleteButton from '@/components/operation/delete-button'


export default {
  name: "index",
  components:{
    groupCard,
    searchSkeleton,
    deleteButton
  },
  data(){
    return{
    }
  },
  methods: {
    showDetail(record){
      this.$router.push({name:'account-detail', params:{user:record.id}})
    }
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
</style>