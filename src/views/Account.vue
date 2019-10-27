<template>
  <v-app>
    <v-container>
      <v-alert
        class="text-center"
        :value="true"
        type="warning"
        v-if="!sessionInLive()"
      >Vous devez être connecté pour accéder à votre compte !</v-alert>

      <div v-if="sessionInLive()" class="grey lighten-5">
        <v-row>
          <v-flex md3 class="text-xs-center">
            <v-card max-width="344" class="pa-3 mx-auto mt-10">
              <v-img :src="editUser.imageProfil"></v-img>

              <v-text-field label="Image de profil" v-model="editUser.imageProfil"></v-text-field>
            </v-card>
          </v-flex>

          <v-flex md9>
            <v-card class="pa-3 ma-5" tile justify="end">
              <v-text-field label="Nom" v-model="editUser.nom"></v-text-field>

              <v-text-field label="Prénom" v-model="editUser.prenom"></v-text-field>

              <v-text-field label="Mail" v-model="editUser.email"></v-text-field>

              <v-divider></v-divider>

              <v-row justify="center">
                <v-btn
                  depressed
                  large
                  color="primary"
                  class="ma-5"
                  @click="updateAccount()"
                >Mettre à jour le profil</v-btn>
              </v-row>
            </v-card>

            <v-card class="pa-3 ma-5" tile justify="end">
              <v-text-field label="Mot de passe actuel" type="password" v-model="passOld" required></v-text-field>

              <v-text-field label="Nouveau mot de passe" type="password" v-model="pass1" required></v-text-field>

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
          <v-snackbar v-model="snackbar">{{text}}</v-snackbar>
        </v-row>
      </div>
    </v-container>
  </v-app>
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
    snackbar: false,
    text: null,
    editUser: {
      prenom: '',
      nom: '',
      email: '',
      imageProfil: ''
    }
  }),
  methods: {
    checkForm: function (e) {
      if (this.pass.equals(this.pass2) && this.pass1.length() > 5) {
        this.valid = true
      }
      e.preventDefault()
    },
    updateAccount () {
      var self = this
      var headers = {
        'Content-Type': 'application/json'
      }
      var data = {
        nom: this.editUser.nom,
        prenom: this.editUser.prenom,
        email: this.editUser.email,
        imageProfil: this.editUser.imageProfil,
        idSession: this.$session.get('key')
      }
      axios
        .post('http://localhost:4000/update_account', data, {
          headers: headers
        })
        .then(function (response) {
          console.log(response.data.auth)
          if (response.data.auth !== 'failed') {
            self.text = 'Compte mis à jour ! Rafraichissez la page'
            self.snackbar = true
          } else {
            console.log('error')
          }
        })
        .catch(function (error) {
          console.log(error)
        })
    },
    sessionInLive () {
      return this.$session.exists()
    }
  },
  mounted () {
    var headers = { 'Content-Type': 'application/json' }
    var self = this
    if (this.$session.exists()) {
      var data = {
        idSession: this.$session.get('key')
      }
      axios
        .post('http://localhost:4000/get_account', data, { headers: headers })
        .then(function (response) {
          if (response.data.auth !== 'failed') {
            self.editUser.prenom = response.data.prenom
            self.editUser.nom = response.data.nom
            self.editUser.email = response.data.email
            self.editUser.imageProfil = response.data.imageProfil
          } else {
            console.log('error')
          }
        })
        .catch(function (error) {
          console.log(error)
        })
    }
  }
}
</script>
