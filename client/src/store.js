import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    userLog: null,
    allData: []
  },
  mutations: {
    currentUserMutation ( state, payload) {
      state.userLog = payload
    },
    fetchDataMutation (state, payload){
      state.allData = payload
    }
  },
  actions: {
    loadData ({ commit }, payload) {
      commit('allData')
      axios({})
        .then()
        .catch()

    },
    currentUser ({ commit }, payload) {
      commit('currentUserMutation', payload)
    },
    fetchData ({ commit }, payload) {
      commit('fetchDataMutation', payload)
    }
  }
})
