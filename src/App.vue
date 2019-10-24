<template>
  <v-app>
    <v-toolbar dense>
      <v-toolbar-title>
        <router-link to="/">Let's Meet</router-link>
      </v-toolbar-title>

      <div class="flex-grow-1"></div>

      <v-chip pill v-model="prenom" v-if="this.$session.exists()">
        <v-avatar left>
          <v-img src="https://cdn.vuetifyjs.com/images/john.png"></v-img>
        </v-avatar>{{prenom}}
      </v-chip>

      <v-btn icon v-if="!this.$session.exists()">
        <router-link to="/connexion">
          <v-icon>mdi-account-arrow-right-outline</v-icon>
        </router-link>
      </v-btn>

      <v-btn icon v-if="!this.$session.exists()">
        <router-link to="/inscription">
          <v-icon>mdi-account-plus-outline</v-icon>
        </router-link>
      </v-btn>

      <v-btn text v-if="this.$session.exists()">
        <router-link to="/compte">
          <v-icon>mdi-account-circle</v-icon>
        </router-link>
      </v-btn>

      <v-btn text v-if="this.$session.exists()" @click="logout">
        <router-link to="/logout">
          <v-icon>mdi-account-remove-outline</v-icon>
        </router-link>
      </v-btn>
    </v-toolbar>
    <router-view></router-view>
  </v-app>
</template>

<script>
import Vue from 'vue'
import VueSession from 'vue-session'
Vue.use(VueSession)
export default {
  data () {
    return {
      email: '',
      prenom: '',
      nom: ''
    }
  },
  methods: {
    logout () {
      this.$session.destroy()
      this.$router.push('/')
    }
  },
  mounted () {
    /* if (this.$session.exists()) {
      this.email = this.$session.get('email')
      this.prenom = this.$session.get('prenom')
      this.nom = this.$session.get('nom')
    } else {
      console.log('no session')
    } */
  }
}
</script>
