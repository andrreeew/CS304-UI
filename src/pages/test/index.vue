<template>
  <TransitionGroup name="list" >
    <li v-for="item in items" :key="item">
      {{ item }}
    </li>
    <div v-if="visible">fsaf</div>
  </TransitionGroup>

  <a-button @click="visible=true"></a-button>
  <a-button @click="items.push('fsa')"></a-button>
  <search-skeleton @clear="clear" @search="search">
    <template v-slot:header-right>
      <a-button type="primary">fasfa</a-button>
    </template>
    <template v-slot:header-left>
      <a-button>fasfa</a-button>
    </template>
    <template v-slot:table>
      <a-table></a-table>
    </template>

    <template v-slot:search-option>
      <a-table style="width: 100%"></a-table>
    </template>
  </search-skeleton>
</template>

<script>
import searchSkeleton from '@/components/operation/search-skeleton'

export default {
  components: {
    searchSkeleton
  },
  data() {
    return {
      items: ['foo', 'bar', 'baz'],
      visible: false,
    }
  },
  computed: {

  },
  methods:{
    containerHeight() {
      this.$nextTick(() => {
        console.log(this.$refs.myComponent.offsetHeight)
        return this.$refs.myComponent.offsetHeight
      })
    },
    clear(){
      console.log('clear')
    },
    search(){
      console.log('search')
    }

  }
}
</script>

<style>
.list-move, /* 对移动中的元素应用的过渡 */
.list-enter-active,
.list-leave-active {
  transition: all 0.5s ease;
}

.list-enter-from,
.list-leave-to {
  opacity: 0;
  transform: translateX(30px);
}

/* 确保将离开的元素从布局流中删除
  以便能够正确地计算移动的动画。 */
.list-leave-active {
  position: absolute;
}
</style>
