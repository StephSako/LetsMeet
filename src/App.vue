<template>
  <v-app>
      <v-toolbar dense>
      <v-app-bar-nav-icon></v-app-bar-nav-icon>

      <v-toolbar-title>Let's Meet</v-toolbar-title>

      <div class="flex-grow-1"></div>

      <v-btn icon>
        <router-link to="/connexion"><v-icon>mdi-account-plus-outline</v-icon></router-link>
      </v-btn>

      <v-btn icon>
        <v-icon>mdi-account-multiple-plus-outline</v-icon>
      </v-btn>

      <v-btn icon>
        <v-icon>mdi-account-circle</v-icon>
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
