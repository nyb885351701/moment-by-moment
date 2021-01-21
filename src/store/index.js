import Vue from 'vue'
import Vuex from 'vuex'
import getters from './getters'
import app from './modules/app'
import vuexPersist from 'vuex-persist'

Vue.use(Vuex)

const store = new Vuex.Store({
  state: {
    search_history_list: [],
    token: ''
  },
  mutations: {
    // 登录
    login(state, data) {
      state.token = data.token
    },
    // 退出
    out(state) {
      state.token = ''
    },
    clear_search_history(state) {
      state.search_history_list = []
    },
    add_search_history(state, items) {
      state.search_history_list.unshift(items)
      state.search_history_list = [...new Set(state.search_history_list)]
    },
    remove_search_history(state, data) {
      state.search_history_list.forEach((element, index) => {
        if (element == data) {
          state.search_history_list.splice(index, 1)
        }
      })
    }
  },
  modules: {
    app
  },
  getters: {},
  plugins: [
    new vuexPersist({
      storage: window.localStorage
    }).plugin
  ]
})

export default store
