import { createRouter, createWebHistory } from 'vue-router'
import Login from '../views/Login.vue'
import Register from '../views/Register.vue'
import Restore from '../views/Restore.vue'
import BlogList from '../views/BlogList.vue'
import store from '../store'

const routes = [
  { path: '/login', name: 'Войти', component: Login },
  { path: '/register', name: 'Register', component: Register },
  { path: '/restore', name: 'Restore', component: Restore },
  {
    path: '/blogs',
    name: 'BlogList',
    component: BlogList,
    meta: { requiresAuth: true },
  },
  { path: '/', redirect: '/blogs' },
]

const router = createRouter({
  history: createWebHistory(),
  routes,
})

// Проверка аутентификации
router.beforeEach((to, from, next) => {
  if (to.meta.requiresAuth && !store.getters.isAuthenticated) {
    next('/login');
  } else {
    next();
  }
})

export default router
