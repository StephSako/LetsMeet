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
              <v-text-field label="Mot de passe actuel"
                type="password"
                v-model="passOld"
                required>
              </v-text-field>

              <v-text-field
                label="Nouveau mot de passe"
                type="password"
                v-model="pass1"
                required>
              </v-text-field>

              <v-text-field
                label="Nouveau mot de passe (verification)"
                type="password"
                v-model="pass2"
                required>
              </v-text-field>

              <v-divider></v-divider>

              <v-row justify="center">
                <v-btn
                  depressed
                  large
                  color="primary"
                  class="ma-5"
                  @click="updatePassword()">Changer le mot de passe</v-btn>
              </v-row>
            </v-card>
          </v-flex>
          <v-snackbar color="success" v-model="snackbar" center>{{text}}</v-snackbar>
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
        .post('/update_account', data, {
          headers: headers
        })
        .then(function (response) {
          console.log(response.data.auth)
          if (response.data.auth !== 'failed') {
            self.$session.set('email', self.editUser.email)
            self.$session.set('prenom', self.editUser.prenom)
            self.$session.set('nom', self.editUser.nom)
            self.$session.set('imageProfil', self.editUser.imageProfil)
            self.text = 'Compte mis à jour !'
            self.snackbar = true
            console.log(self.$session.get('prenom'))
          } else {
            console.log('error')
          }
        })
        .catch(function (error) {
          console.log(error)
        })
    },
    updatePassword () {
      if (this.pass1 !== null && this.pass2 !== null && this.pass1 !== '' && this.pass1 !== '') {
        if (this.pass1 !== this.pass2) {
          this.text = 'Les mots de passe sont différents'
          this.snackbar = true
        } else {
          var self = this
          var headers = {
            'Content-Type': 'application/json'
          }
          var data = {
            actualPassword: this.passOld,
            newPassword: this.pass1,
            idSession: this.$session.get('key')
          }
          axios
            .post('/update_password', data, {
              headers: headers
            })
            .then(function (response) {
              console.log(response.data.auth)
              if (response.data.auth !== 'failed') {
                self.text = 'Mot de passe mis à jour !'
                self.snackbar = true
                self.passOld = ''
                self.pass1 = ''
                self.pass2 = ''
              } else {
                console.log('error')
                this.text = 'Le mot de passe actuel est incorrect'
                this.snackbar = true
              }
            })
            .catch(function (error) {
              console.log(error)
            })
        }
      } else {
        this.text = 'Les mots de passe sont vides'
        this.snackbar = true
      }
    },
    sessionInLive () {
      return this.$session.exists()
    }
  },
  mounted () {
    this.editUser.nom = this.$session.get('nom')
    this.editUser.prenom = this.$session.get('prenom')
    this.editUser.email = this.$session.get('email')
    this.editUser.imageProfil = this.$session.get('imageProfil')
  }
}
</script>
