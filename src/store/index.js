import { createStore } from 'vuex'
import auth from "@/store/modules/auth";

export default createStore({
  state: {
    menuCollapse: false
  },
  getters: {
    getMenuCollapse(state){
      return state.menuCollapse
    }
  },
  mutations: {
    setMenuCollapse(state, menuCollapse){
      state.menuCollapse = menuCollapse
    }
  },
  actions: {
  },
  modules: {
    auth
  }
})
