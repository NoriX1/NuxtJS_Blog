export default function ({ $axios, redirect, store }) {
  // Перехватываем все запросы
  $axios.interceptors.request.use((request) => {
    /* 
      Если юзер авторизован, и в заголовках отсутствует token, нужно его добавить
      Это сделано для SSR, т.к. при SSR нет this, и токен не был бы добавлен
      в setToken action в store 
    */
    if (
      store.getters['auth/isAuthenticated'] &&
      !request.headers.common.Authorization
    ) {
      const token = store.getters['auth/token'];
      request.headers.common.Authorization = `Bearer ${token}`;
    }

    return request;
  });

  $axios.onError((error) => {
    if (error.response) {
      if (error.response.status === 401) {
        redirect('/admin/login?message=session');
        store.dispatch('auth/logout');
      }

      if (error.response.status === 500) {
        console.error('Server 500 error');
      }
    }
  });
}
