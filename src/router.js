import Vue from 'vue';
import Router from 'vue-router';
import Home from './views/Home.vue';
import Signup from "./views/Signup.vue";
import Login from "./views/Login.vue";
import Logout from "./views/Logout.vue";
import AuditionsShow from './views/AuditionsShow.vue';
import AuditionsIndex from './views/AuditionsIndex.vue';
import AuditionsNew from './views/AuditionsNew.vue';
import AuditionsUpdate from './views/AuditionsUpdate.vue';
import AuditionsLive from './views/AuditionsLive.vue';
import ShowsShow from './views/ShowsShow.vue';
import ShowsIndex from './views/ShowsIndex.vue';
import ShowsNew from './views/ShowsNew.vue';
import ShowsUpdate from './views/ShowsUpdate.vue';

Vue.use(Router)

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      name: 'home',
      component: AuditionsIndex
    },
    {
      path: '/auditions/',
      name: 'auditions-index',
      component: AuditionsIndex
    },
    {
      path: '/auditions/new',
      name: 'auditions-new',
      component: AuditionsNew
    },
    {
      path: '/auditions/:id',
      name: 'auditions-show',
      component: AuditionsShow
    },
    {
      path: '/auditions/:id/edit',
      name: 'auditions-update',
      component: AuditionsUpdate
    },
    {
      path: '/auditions/:id/live',
      name: 'auditions-live',
      component: AuditionsLive
    },
    {
      path: '/shows/',
      name: 'shows-index',
      component: ShowsIndex
    },
    {
      path: '/shows/new',
      name: 'shows-new',
      component: ShowsNew
    },
    {
      path: '/shows/:id',
      name: 'shows-show',
      component: ShowsShow
    },
    {
      path: '/shows/:id/edit',
      name: 'shows-update',
      component: ShowsUpdate
    },
    {
      path: '/signup',
      name: 'signup',
      component: Signup
    },
    {
      path: '/login',
      name: 'login',
      component: Login
    },
    {
      path: '/logout',
      name: 'logout',
      component: Logout
    },
    {
      path: '/about',
      name: 'about',
      // route level code-splitting
      // this generates a separate chunk (about.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import(/* webpackChunkName: "about" */ './views/About.vue')
    }
  ]
})
