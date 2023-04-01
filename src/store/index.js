import { createStore } from 'vuex'
import auth from "@/store/modules/auth";

export default createStore({
  state: {
    menuCollapse: false,
    routes:[],
  },
  getters: {
    getMenuCollapse(state){
      return state.menuCollapse
    },
    getRoutes(state){
      return state.routes
    }
  },
  mutations: {
    setMenuCollapse(state, menuCollapse){
      state.menuCollapse = menuCollapse
    },
    setRoutes(state, routes){
       state.routes = routes
    }
  },
  actions: {
  },
  modules: {
    auth
  }
})
