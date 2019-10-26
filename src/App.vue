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
            <v-img :src="imageProfil"></v-img>
          </v-avatar>{{prenom + ' ' + nom}}
        </router-link>
      </v-chip>

      <v-btn text v-if="this.$session.exists()">
        <router-link to="/my_events">
          Mes évènements
        </router-link>
      </v-btn>

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
      prenom: this.$session.get('prenom'),
      nom: this.$session.get('nom'),
      imageProfil: this.$session.get('imageProfil')
    }
  },
  methods: {
    logout () {
      this.$session.destroy()
      this.$router.push('/')
    }
  }
}
</script>
