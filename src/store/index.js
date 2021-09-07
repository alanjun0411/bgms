import { createStore } from 'vuex'

export default createStore({
  state: {
    login: 0
  },
  mutations: {
    loginIn (state) {
      state.login = 1
    },
    loginOut (state) {
      state.login = 0
    }
  },
  actions: {
  },
  modules: {
  }
})
