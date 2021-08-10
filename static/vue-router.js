import Router from 'vue-router'

const router = new Router({
   mode: 'history',
   routes: [
      {
         path: '/',
         name: 'home',
         component: () => import('./components/TodoList.vue')
      },
      {
         path: '/login',
         name: 'login',
         component: () => import('./components/auth/Login.vue')
      }, {
         path: '/register',
         name: 'register',
         component: () => import('./components/auth/Register.vue')
      },
      {
         path: '*',
         name: '404',
         beforeEnter(to, from, next) {
            next({name: 'home'})
         }
      }
   ]
})
export default router