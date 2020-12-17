export const state = () => ({
  error: null,
});

export const actions = {
  // Запускается до клиента, при инициализации сервера
  nuxtServerInit({ dispatch }) {
    dispatch('auth/autoLogin');
  },
};

export const mutations = {
  setError(state, error) {
    state.error = error;
  },
  clearError(state) {
    state.error = null;
  },
};

export const getters = {
  error: (state) => state.error,
};
