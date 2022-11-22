import { createRouter, createWebHistory } from 'vue-router';
import Home from '@/views/Home.vue';
import Login from '@/views/Login.vue';
import Profile from '@/views/Profile.vue';
import store from '@/store/index';

// eslint-disable-next-line consistent-return
const auth = () => {
  if (store.state.token === null) {
    return { name: 'Login' };
  }
};

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home,
    meta: { title: 'Groupomania' },
    beforeEnter: [auth],
  },
  {
    path: '/login',
    name: 'Login',
    component: Login,
    meta: { title: 'Groupomania - Login' },
  },
  {
    path: '/profile',
    name: 'Profile',
    component: Profile,
    meta: { title: 'Groupomania - Profile' },
    beforeEnter: [auth],
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
