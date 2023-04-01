<template>
  <!--  <a-card  style="width: 100%;">-->
  <a-space direction="vertical" :size=20 style="width: 100%;">
    <TransitionGroup name="list">
      <div class="head" v-if="advance">
        <div style=" display: grid; grid-template-columns: 1fr 100px; align-items: center">
          <slot name="search-option"></slot>
          <a-space>
            <a-divider direction="vertical" style="height: 84px"></a-divider>

            <a-space direction="vertical">
              <a-button type="primary" @click="this.$emit('search')">查询</a-button>
              <a-button @click="this.$emit('clear')">清空</a-button>
            </a-space>
          </a-space>
        </div>
        <a-divider style="margin-bottom: -8px"></a-divider>
      </div>

      <div class="content">
        <a-space direction="vertical" :size=20 style="width: 100%">
          <div style="display: flex;justify-content: space-between;width: 100%; ">
            <a-space>
            <slot name="header-left">

            </slot>
            </a-space>


            <a-space>
              <slot name="header-right"></slot>
              <a-button type="primary" @click="advance=!advance">
                <template #icon>
                  高级搜索
                </template>
                <template #default><icon-up v-if="advance"/><icon-down v-else></icon-down></template>
              </a-button>

            </a-space>
          </div>

          <slot name="table"></slot>


        </a-space>
      </div>
    </TransitionGroup>


  </a-space>
  <!--  </a-card>-->
</template>

<script>


export default {
  name: "search-skeleton",

  data() {
    return {
      advance: false,
    }
  },

}
</script>

<style scoped>
.content {
  padding: 16px 16px;
  background-color: white;
  border: 1px solid var(--color-neutral-3);
  border-radius: var(--border-radius-small);
  border-top: 0px

}

.head {
  padding: 16px 16px;
  background-color: white;
  border: 1px solid var(--color-neutral-3);
  border-radius: var(--border-radius-small);
  border-bottom: 0px;
}

.list-move, /* 对移动中的元素应用的过渡 */
.list-enter-active,
.list-leave-active {

  transition: all 0.5s ease;
}

.list-enter-from {
  opacity: 0;
}


.list-leave-to {
  opacity: 0;
  margin-right: 30px;
}

.list-leave-from {
  margin-right: 30px;
}

.list-leave-active {
  position: absolute;
}


</style>