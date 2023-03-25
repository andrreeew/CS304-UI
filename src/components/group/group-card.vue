<template>
  <a-card  hoverable >
    <a-space direction="vertical" size="medium" style="width: 100%">
      <a-space>
        <a-avatar :size="32" :style="{ backgroundColor: '#3370ff' }">
          <IconUser />
        </a-avatar>
        <a-link  @click="$router.push({name:'admin-group-detail', params:{groupId:23414}})" style="font-size: 20px">
          {{name}}
        </a-link>
        <slot name="extra"></slot>

<!--        <a-tag v-if="identity==='user'" color="arcoblue">管理员身份</a-tag>-->
      </a-space>
      <div>
        总金额：{{total}} 已使用金额：{{cost}} 剩余金额：{{left}}
      </div>
      <div style="display: flex; justify-content: space-between">
        <a-avatar-group :size="32">
          <a-avatar v-for="item in member">{{item[0]}}</a-avatar>
        </a-avatar-group>
        <a-space>

          <slot name="operation">
          </slot>
        </a-space>
      </div>
    </a-space>
  </a-card>
</template>

<script>
import deleteButton from '@/components/operation/delete-button'


export default {
  name: "group-card",
  components:{
    deleteButton,
  },
  props:{
    id: {default:1244},
    name: {default:'Zhang'},
    total: {default:129},
    cost: {default:21},
    left: {default:14},
    member: {default:['ABC', 'BSET', 'BSET', 'BSET']}
  },
  data(){
    return{
      identity:this.$route.path.substring(1).split('/')[0],
    }
  }
}
</script>

<style scoped>

</style>