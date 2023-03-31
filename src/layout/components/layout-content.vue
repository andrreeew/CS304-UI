<template>

  <div style="width: 100%; padding: 15px 30px">
      <div style="width: 100%; margin-bottom: 10px">
        <a-breadcrumb :routes="getRoutes" >
          <template #item-render="{route, paths}">
            <a-link @click="this.$router.push({name:route.name})">
              {{ route.label }}
            </a-link>
          </template>
        </a-breadcrumb>
      </div>

      <router-view></router-view>
  </div>
</template>

<script>
import {mapGetters} from 'vuex'

export default {
  name: "layout-content",
  computed:{
    ...mapGetters(['getRoutes'])
    // routes() {
    //   let routes = [];
    //   let dir = []
    //   routes.push({
    //     dir: [],
    //     label: this.$route.meta.name
    //   })
    //   if(this.$route.meta.name==='账号'){
    //     if(this.$route.params.user){
    //       routes.push({
    //         dir: [],
    //         label: this.$route.params.user
    //       })
    //     }
    //   }else if(this.$route.meta.name==='课题组'){
    //     if(this.$route.params.groupId){
    //       routes.push({
    //         dir: [],
    //         label: this.$route.params.groupId
    //       })
    //     }
    //   }
    //   // if (this.$route.params.dir !== '') {
    //   //   this.$route.params.dir.forEach(item => {
    //   //     dir.push(item)
    //   //     routes.push({
    //   //       dir: JSON.parse(JSON.stringify(dir)),
    //   //       label: item
    //   //     })
    //   //   })
    //   // }
    //   return routes
    // }
  },
  data(){
    return{

    }
  }
}
</script>

<style scoped>

</style>