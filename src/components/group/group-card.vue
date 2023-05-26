<template>
  <a-card  hoverable >
    <a-space direction="vertical" size="medium" style="width: 100%">
      <a-space>
        <a-avatar :size="32" :style="{ backgroundColor: '#3370ff' }">
          <IconUser />
        </a-avatar>
        <a-link  @click="$router.push({name:identity+'-group-detail', params:{groupId:info.id}})" style="font-size: 20px">
          {{info.name}}
        </a-link>
        <slot name="extra"></slot>

        <a-tag v-if="identity==='user'&&info.isAdmin" color="arcoblue">管理员身份</a-tag>
      </a-space>
      <div>
        总金额：{{info.total}} 已使用金额：{{info.total-info.left}} 剩余金额：{{info.left}}
      </div>
      <div style="display: flex; justify-content: space-between">
        <a-avatar-group :size="32">
          <a-avatar v-for="item in info.users">{{item.name}}</a-avatar>
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
    info: {
      default:{
        id: 'fas',
        name: 'fsaf',
        total: 0,
        cost: 0,
        left: 0,
        users: []
      }
    }
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