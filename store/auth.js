export const state = () => ({
  token: null,
});

export const mutations = {
  setToken(state, token) {
    state.token = token;
  },
  clearToken(state) {
    state.token = null;
  },
};

export const actions = {
  async login({ commit, dispatch }, formData) {
    try {
      const { token } = await this.$axios.$post(
        '/api/auth/admin/login',
        formData
      );
      // dispatch вызывает именно actions
      dispatch('setToken', token);
    } catch (e) {
      // 3-й параметр -> смотреть мутацию в корне папки (store)
      commit('setError', e, { root: true });
      throw e;
    }
  },
  async createUser({ commit }, formData) {
    try {
      await this.$axios.$post('/api/auth/admin/create', formData);
    } catch (e) {
      commit('setError', e, { root: true });
      throw e;
    }
  },
  setToken({ commit }, token) {
    // commit вызывает мутации (setToken в данном случае)
    commit('setToken', token);
  },
  logout({ commit }) {
    commit('clearToken');
  },
};

export const getters = {
  isAuthenticated: (state) => !!state.token,
};
