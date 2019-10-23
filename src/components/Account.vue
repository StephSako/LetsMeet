<template>
  <v-container class="grey lighten-5">
    <v-row>
      <v-flex md3 class="text-xs-center">
        <v-card max-width="344" class="pa-3 mx-auto mt-10">
          <v-img src="../assets/bato.jpg"></v-img>
          <input type="file" id="file" ref="file" v-on:change="handleFileUpload()" class="mt-1"/>
        </v-card>
      </v-flex>

      <v-flex md9>
        <v-card class="pa-3 ma-5" tile justify="end">
          <v-text-field label="Nom"></v-text-field>
        </v-card>

        <v-card class="pa-3 ma-5" tile justify="end">
          <v-text-field label="Prénom"></v-text-field>
        </v-card>

        <v-card class="pa-3 ma-5" tile justify="end">
          <v-text-field label="Mail"></v-text-field>
        </v-card>

        <v-card class="pa-3 ma-5" tile justify="end">
          <v-text-field
            label="Mot de passe actuel"
            type="password"
            v-model="passOld"
            required
          ></v-text-field>
          <v-text-field
            label="Nouveau mot de passe"
            type="password"
            v-model="pass1"
            required
          ></v-text-field>
          <v-text-field
            label="Nouveau mot de passe (verification)"
            type="password"
            v-model="pass2"
            required
          ></v-text-field>
        </v-card>
      </v-flex>
    </v-row>
    <v-row justify="center">
      <v-btn depressed large color="primary" class="ma-5">Sauvegarder</v-btn>
    </v-row>
  </v-container>
</template>

<script>

export default {
  data: () => ({
    pass1: '',
    pass2: '',
    valid: false
  }),
  methods: {
    checkForm: function (e) {
      if (this.pass.equals(this.pass2) && this.pass1.length() > 5) {
        this.valid = true
      }
      e.preventDefault()
    }
  }
}
</script>
