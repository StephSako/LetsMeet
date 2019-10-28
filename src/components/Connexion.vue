<template>
    <v-app>
        <v-card width="400" class="mx-auto mt-5">
            <v-card-title>
                <h1 class="display-1">Connexion</h1>
            </v-card-title>
            <v-card-text>
                <v-form ref="form">

                    <v-text-field
                    label="Email"
                    v-model="email"
                    prepend-icon="mdi-account-circle"/>

                    <v-text-field
                    v-model="password"
                    :type="showPassword ? 'text' : 'password'"
                    label="Mot de passe"
                    prepend-icon="mdi-lock"
                    :append-icon="showPassword ? 'mdi-eye' : 'mdi-eye-off'"
                    @click:append="showPassword=!showPassword"
                    />
                </v-form>
            </v-card-text>
            <v-divider></v-divider>
            <v-card-actions>
                <v-btn rounded color="success" @click="connexion"><router-link to="/connexion">Connexion</router-link></v-btn>
                <v-spacer></v-spacer>
                <v-btn color="info"><router-link to="/inscription">Inscription</router-link></v-btn>
            </v-card-actions>

            <v-snackbar color="error" v-model="snackbar">{{text}}</v-snackbar>
        </v-card>
    </v-app>
</template>

<script>
import axios from 'axios'
import Vue from 'vue'
import VueSession from 'vue-session'
Vue.use(VueSession)

export default {
  name: 'Connexion',
  data: () => ({
    showPassword: false,
    email: '',
    prenom: '',
    nom: '',
    imageProfil: '',
    password: '',
    snackbar: false,
    text: ''
  }),
  methods: {
    connexion () {
      var self = this
      if (this.$refs.form.validate()) {
        var data = {
          email: this.email,
          password: this.password
        }
        var headers = {
          'Content-Type': 'application/json'
        }
        axios.post('/api/connexion', data, {
          headers: headers
        }).then(function (response) {
          if (response.data.auth !== 'failed') {
            self.$session.start()
            self.$session.set('email', self.email)
            self.$session.set('prenom', response.data.prenom)
            self.$session.set('nom', response.data.nom)
            self.$session.set('key', response.data.key)
            self.$session.set('imageProfil', response.data.imageProfil)
            self.$router.push('/')
          } else {
            self.snackbar = true
            self.text = response.data.error
          }
        }).catch(function (error) {
          console.log(error)
        })
      }
    }
  }
}
</script>
