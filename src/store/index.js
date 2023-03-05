import { createStore } from 'vuex'

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
  }
})
