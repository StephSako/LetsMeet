<template>
  <v-app>
    <v-toolbar dense>
      <v-toolbar-title>
        <router-link to="/">Let's Meet</router-link>
      </v-toolbar-title>

      <div class="flex-grow-1"></div>

      <v-chip v-if="this.$session.exists()">
        <router-link to="/compte">
          <v-avatar left>
            <v-img :src="this.$session.get('imageProfil')"></v-img>
          </v-avatar>
          {{this.$session.get('prenom') + ' ' + this.$session.get('nom')}}
        </router-link>
      </v-chip>

      <v-btn text v-if="this.$session.exists()">
        <router-link to="/my_events">Mes évènements</router-link>
      </v-btn>

      <v-btn text v-if="this.$session.exists()">
        <router-link to="/participate_events">Mes Participations</router-link>
      </v-btn>

      <v-btn text v-if="!this.$session.exists()">
        <router-link to="/connexion">Se connecter</router-link>
      </v-btn>

      <v-btn text v-if="!this.$session.exists()">
        <router-link to="/inscription">S'inscrire</router-link>
      </v-btn>

      <v-btn icon v-if="this.$session.exists()" @click="logout">
        <router-link to="/logout"><v-icon>mdi-account-remove-outline</v-icon></router-link>
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
    return {}
  },
  methods: {
    logout () {
      this.$session.destroy()
      this.$router.push('/')
    }
  }
}
</script>
