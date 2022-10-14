import { createRouter, createWebHistory } from 'vue-router';
import Home from '@/views/Home.vue';
import Login from '@/views/Login.vue';

// eslint-disable-next-line consistent-return
const auth = () => {
  const token = localStorage.getItem('token');
  if (token === null) {
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
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
