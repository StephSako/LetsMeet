import Vue from 'vue'
import Router from 'vue-router'
import Home from './components/Home.vue'
import Connexion from './components/Connexion.vue'
import Inscription from './components/Inscription.vue'
import Account from './components/Account.vue'
import MyEvents from './components/MyEvents.vue'
import AddEvent from './components/AddEvent.vue'
import ParticipateEvents from './components/ParticipateEvents.vue'
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
    },
    {
      path: '/add_event',
      name: 'add_event',
      component: AddEvent
    },
    {
      path: '/participate_events',
      name: 'participate_events',
      component: ParticipateEvents
    }
  ]
})
