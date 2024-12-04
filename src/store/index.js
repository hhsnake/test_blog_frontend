import { createStore } from 'vuex'

export default createStore({
  state: {
    token: null,
  },
  mutations: {
    setToken(state, token) {
      state.token = token;
    },
    clearToken(state) {
      state.token = null;
    },
  },
  actions: {
    saveToken({ commit }, token) {
      commit('setToken', token);
      localStorage.setItem('token', token);
    },
    loadToken({ commit }) {
      const token = localStorage.getItem('token');
      if (token) {
        commit('setToken', token);
      }
    },
    logout({ commit }) {
      commit('clearToken');
      localStorage.removeItem('token');
    },
  },
  getters: {
    isAuthenticated: (state) => !!state.token,
    authHeader: (state) => (state.token ? `Token ${state.token}` : ''),
  },
})
