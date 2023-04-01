<template>
<div><a-button @click="handleClick()">test</a-button>
<a-button @click="this.$socket.send('admin')">admin</a-button>
</div>
</template>

<script>
import groupCard from '@/components/group/group-card'
import { Notification } from '@arco-design/web-vue';

export default {
  name: "index",
  components:{
    groupCard
  },
  data(){
    return{
      websocket:'',
      groups:[
        {id: 42, name: 'Zha', total: 120, cost: 21, left: 14, member: ['ABC', 'BSET', 'BSET', 'BSET'], identity:true},
        {id: 42, name: 'Zhang', total: 120, cost: 21, left: 14, member: ['ABC', 'BSET', 'BSET', 'BSET'], identity:false},
        {id: 42, name: 'Zha', total: 120, cost: 21, left: 14, member: ['ABC', 'BSET', 'BSET', 'BSET'], identity: false},
      ],
      messages:[]
    }

  },
  mounted() {
    // this.websocket = new WebSocket('')
    // this.websocket = new WebSocket('ws://localhost:5002');
    // // 监听WebSocket事件
    // this.websocket.onopen = () => console.log('WebSocket连接已打开');
    // this.websocket.onmessage = event =>{this.messages.push(event.data);console.log(this.messages)};
    // this.websocket.onclose = () => console.log('WebSocket连接已关闭');
    // this.websocket.onerror = error => console.error('WebSocket错误', error);
    // },
    this.$options.sockets.onmessage = (message) => {
      var data = JSON.parse(message.data)
      this.messages.push(data.msg)
      this.handleNotification(data.msg)
    }
  },
  methods:{
    handleNotification(msg){
      Notification.info({
        title: 'Notification',
        content: msg,
      })
    },
    handleClick(){
      console.log(this.$route.query.s)
      // console.log(this.messages)
      // this.$socket.send('fasf')
    }
  }


}
</script>

<style scoped>
.panel{
  padding-left: 15px;
  border-right: 1px solid rgb(var(--gray-2));
}
</style>






