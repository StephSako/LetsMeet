import Vue from 'vue'
import Router from 'vue-router'
import Home from './views/Home.vue'
import Connexion from './views/Connexion.vue'
import Inscription from './views/Inscription.vue'
import Account from './views/Account.vue'
import MyEvents from './views/MyEvents.vue'
// import AddEvent from './views/Connexion.vue'
Vue.use(Router)

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home
    },
    {
      path: '/connexion',
      name: 'connexion',
      component: Connexion
    },
    {
      path: '/inscription',
      name: 'inscription',
      component: Inscription
    },
    {
      path: '/compte',
      name: 'compte',
      component: Account
    },
    {
      path: '/my_events',
      name: 'my_events',
      component: MyEvents
    }/* ,
    {
      path: '/add_event',
      name: 'add_event',
      component: AddEvent
    } */
  ]
})
