<template>
  <v-app>
      <v-toolbar dense>
      <v-app-bar-nav-icon></v-app-bar-nav-icon>

      <v-toolbar-title><router-link to="/">Let's Meet</router-link></v-toolbar-title>

      <div class="flex-grow-1"></div>

      <v-btn icon>
        <router-link to="/connexion"><v-icon>mdi-account-plus-outline</v-icon></router-link>
      </v-btn>

      <v-btn icon>
        <router-link to="/inscription"><v-icon>mdi-account-multiple-plus-outline</v-icon></router-link>
      </v-btn>

      <v-btn icon>
        <router-link to="/connexion"><v-icon>mdi-account-circle</v-icon></router-link>
      </v-btn>

    </v-toolbar>
    <router-view></router-view>
  </v-app>
</template>

<script>
export default {
  name: 'App',
  data: () => ({
    //
  })
}
</script>
