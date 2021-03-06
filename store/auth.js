import Cookie from 'cookie';
import Cookies from 'js-cookie';
import jwtDecode from 'jwt-decode';

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
    this.$axios.setToken(token, 'Bearer');
    Cookies.set('vue-blog-jwt-token', token);
    commit('setToken', token);
  },
  logout({ commit }) {
    this.$axios.setToken(false);
    Cookies.remove('vue-blog-jwt-token');
    commit('clearToken');
  },
  autoLogin({ dispatch }) {
    const cookieStr = process.browser
      ? document.cookie
      : this.app.context.req.headers.cookie;

    const cookies = Cookie.parse(cookieStr || '') || {};
    const token = cookies['vue-blog-jwt-token'];

    if (isJWTValid(token)) {
      dispatch('setToken', token);
    } else {
      dispatch('logout');
    }
  },
};

export const getters = {
  isAuthenticated: (state) => !!state.token,
  token: (state) => state.token,
};

function isJWTValid(token) {
  if (!token) {
    return false;
  }

  const jwtData = jwtDecode(token) || {};
  const expires = jwtData.exp || 0;
  return new Date().getTime() / 1000 < expires;
}
