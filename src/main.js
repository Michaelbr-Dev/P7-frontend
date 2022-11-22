import { createApp } from 'vue';
import App from './App.vue';
import router from './router';
import store from './store';

createApp({
  extends: App,
  beforeCreate() {
    this.$store.commit('INITIALIZE_STORE');
  },
})
  .use(router)
  .use(store)
  .mount('#app');
