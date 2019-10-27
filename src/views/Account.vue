<template>
  <v-container class="grey lighten-5">
    <v-row>
      <v-flex md3 class="text-xs-center">
        <v-card max-width="344" class="pa-3 mx-auto mt-10">
          <v-img :src="this.$session.get('imageProfil')"></v-img>

          <v-text-field
            label="Image de profil"
            v-model="imageProfil">
          </v-text-field>
        </v-card>
      </v-flex>

      <v-flex md9>
        <v-card class="pa-3 ma-5" tile justify="end">
          <v-text-field
            label="Nom"
            v-model="nom">
          </v-text-field>

          <v-text-field
            label="Prénom"
            v-model="prenom">
          </v-text-field>

          <v-text-field
            label="Mail"
            v-model="email">
          </v-text-field>

          <v-divider></v-divider>

          <v-row justify="center">
            <v-btn depressed large color="primary" class="ma-5">Mettre à jour le profil</v-btn>
          </v-row>
        </v-card>

        <v-card class="pa-3 ma-5" tile justify="end">
          <v-text-field
            label="Mot de passe actuel"
            type="password"
            v-model="passOld"
            required></v-text-field>

          <v-text-field
            label="Nouveau mot de passe"
            type="password"
            v-model="pass1"
            required></v-text-field>

          <v-text-field
            label="Nouveau mot de passe (verification)"
            type="password"
            v-model="pass2"
            required
          ></v-text-field>

          <v-divider></v-divider>

          <v-row justify="center">
            <v-btn depressed large color="primary" class="ma-5">Changer le mot de passe</v-btn>
          </v-row>
        </v-card>
      </v-flex>
    </v-row>
  </v-container>
</template>

<script>
import axios from 'axios'
import Vue from 'vue'
import VueSession from 'vue-session'
Vue.use(VueSession)

export default {
  data: () => ({
    pass1: null,
    pass2: null,
    passOld: null,
    valid: false,
    email: null,
    prenom: null,
    nom: null,
    imageProfil: null
  }),
  methods: {
    checkForm: function (e) {
      if (this.pass.equals(this.pass2) && this.pass1.length() > 5) {
        this.valid = true
      }
      e.preventDefault()
    },
    onEditSubmit (idEvent) {
      var self = this
      var headers = {
        'Content-Type': 'application/json'
      }
      var data = {
        nom: this.nom,
        prenom: this.prenom,
        email: this.email,
        imageProfil: this.imageProfil,
        idSession: this.$session.get('key')
      }
      axios
        .post('http://localhost:4000/update_account', data, { headers: headers })
        .then(function (response) {
          if (response.data.auth !== 'failed') {
            self.text = 'Évènement modifié ! Rafraichissez la page'
            self.snackbar = true
          } else {
            console.log('error')
          }
        })
        .catch(function (error) {
          console.log(error)
        })
    }
  },
  mounted () {
    if (this.$session.exists()) {
      this.email = this.$session.get('email')
      this.prenom = this.$session.get('prenom')
      this.nom = this.$session.get('nom')
      this.imageProfil = this.$session.get('imageProfil')
    } else {
      console.log('no session')
    }
  }
}
</script>
