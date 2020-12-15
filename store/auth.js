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
    const token = await new Promise((resolve) => {
      setTimeout(() => resolve('mock-token'), 2000);
    });
    // dispatch вызывает именно actions
    dispatch('setToken', token);
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
