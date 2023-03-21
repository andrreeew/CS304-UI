<template>
  <a-space >
    <a-grid  :cols="{ xs: 1, sm: 1, md: 2, lg: 3, xl: 3, xxl:4}" :colGap=22 :rowGap="16" >
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
    <a-divider direction="vertical" style="height: 84px"></a-divider>
    <a-space direction="vertical">
      <a-button type="primary">查询</a-button>
      <a-button >清空</a-button>
    </a-space>
  </a-space>
</template>

<script>
export default {
  name: "search-head"
}
</script>

<style scoped>
.search-item{
  align-items: baseline
}

</style>