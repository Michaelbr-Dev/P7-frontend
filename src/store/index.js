import { createStore } from 'vuex';

export default createStore({
  state: {},

  getters: {},

  mutations: {
    /* eslint-disable no-return-assign */
    INITIALIZE_STORE(state) {
      const keys = Object.keys(localStorage);
      keys
        .filter((key) => /^VUEX_[a-zA-Z]+$/.test(key))
        .forEach((key) => {
          const data = localStorage.getItem(key);
          state[key.split('VUEX_')[1]] = JSON.parse(data);
        });
      // state.token = JSON.parse(localStorage.getItem('token'));
      // state.userId = JSON.parse(localStorage.getItem('userId'));
      // state.isAdmin = JSON.parse(localStorage.getItem('isAdmin'));
      // state.authenticatedUser = JSON.parse(
      //   localStorage.getItem('authenticatedUser'),
      // );
    },
    SET_TOKEN(state, token) {
      state.token = token;
      localStorage.setItem('VUEX_token', JSON.stringify(token));
    },
    SET_USER_ID(state, userId) {
      state.userId = userId;
      localStorage.setItem('VUEX_userId', JSON.stringify(userId));
    },
    SET_IS_ADMIN(state, isAdmin) {
      state.isAdmin = isAdmin;
      localStorage.setItem('VUEX_isAdmin', JSON.stringify(isAdmin));
    },
    // setIsAdmin: (state, isAdmin) => (state.isAdmin = isAdmin),
    SET_AUTHENTICATED_USER(state, user) {
      state.authenticatedUser = user;
      localStorage.setItem('VUEX_authenticatedUser', JSON.stringify(user));
    },
    /* eslint-enable no-return-assign */
  },

  actions: {
    setToken(context, payload) {
      context.commit('SET_TOKEN', payload.token);
    },
    setUserId(context, payload) {
      context.commit('SET_USER_ID', payload.userId);
    },
    setIsAdmin(context, payload) {
      context.commit('SET_IS_ADMIN', payload.isAdmin);
    },
    async refreshUserData(context) {
      try {
        const res = await fetch(
          `${process.env.VUE_APP_API_BASE_URL}/users/${context.state.userId}`,
          {
            headers: {
              Authorization: `Bearer ${context.state.token}`,
            },
          },
        );
        if (!res.ok) {
          throw Error(res.message);
        }
        const data = await res.json();
        context.dispatch('setAuthenticatedUser', { user: data.user });
      } catch (error) {
        // eslint-disable-next-line no-alert
        alert(error.message);
      }
    },
    setAuthenticatedUser(context, payload) {
      context.commit('SET_AUTHENTICATED_USER', payload.user);
    },
  },

  modules: {},
});
