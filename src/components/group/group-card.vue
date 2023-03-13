<template>
  <a-card  hoverable >
    <a-space direction="vertical" size="medium" style="width: 100%">
      <a-space>
        <a-avatar :size="32" :style="{ backgroundColor: '#3370ff' }">
          <IconUser />
        </a-avatar>
        <a-link style="font-size: 20px">
          Zhang
        </a-link>
        <a-tag color="arcoblue">管理员身份</a-tag>
      </a-space>
      <div>
        总金额：2132 已使用金额：4214 剩余金额：421412
      </div>
      <div style="display: flex; justify-content: space-between">
        <a-avatar-group :size="32">
          <a-avatar>A</a-avatar>
          <a-avatar>A</a-avatar>
          <a-avatar>A</a-avatar>
          <a-avatar>A</a-avatar>
        </a-avatar-group>
        <a-space>
          <a-button>修改权限</a-button>
          <a-button status="danger">移除该组</a-button>
        </a-space>
      </div>

    </a-space>


  </a-card>
</template>

<script>
export default {
  name: "group-card"
}
</script>

<style scoped>

</style>