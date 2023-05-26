<template>
  <router-view/>
</template>

<script>
import api from "@/api";
import {mapMutations} from 'vuex'
import {Message} from "@arco-design/web-vue";

export default {
  created() {
    // this.init()
  },

  methods:{
    ...mapMutations('auth', ['clearToken']),
    init(){
      // console.log('fsafa')
      // console.log(this.$route)
      // api.getIdentity().then(res=>{
      //   var identity = res.data.data.identity
      //   console
      //   if(identity===''){
      //     Message.warning('请先登录')
      //     this.clearToken()
      //     this.$router.push({name: 'login'})
      //   }else{
      //     if(this.$route.name==='layout'){
      //       this.$router.push({name: identity})
      //     }else {
      //       var id = this.$route.name.split('-')[0]
      //       if((id==='admin'&&identity==='user')||(id==='user'&&identity==='admin')){
      //         Message.warning('没有权限')
      //         this.$router.push({name: identity})
      //       }
      //     }
      //
      //   }
      // })
    }
  },

  watch: {
    $route() {
      // this.init()

    },
  },
}

</script>

<style>
*{
  box-sizing: border-box;
}
#app {
  /*font-family: Avenir, Helvetica, Arial, sans-serif;*/
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;

  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
}


::-webkit-scrollbar {
  width: 10px;
  height: 5px;
}

::-webkit-scrollbar-thumb {
  border-radius: 10px;
  background-color: var(--color-neutral-3);
  margin-left: 1px;
}

::-webkit-scrollbar-thumb:hover{
  border-radius: 10px;
  background-color:var(--color-neutral-5);
}

::-webkit-scrollbar-track {
  border-radius: 10px;
  background: transparent;
}

</style>
