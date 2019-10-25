<template>
    <v-app>
        <v-card width="400" class="mx-auto mt-5">
            <v-card-title>
                <h1 class="display-1">Inscription</h1>
            </v-card-title>
            <v-card-text>
                <v-form ref="form">
                    <v-text-field
                    label="Nom"
                    v-model="nom"
                    prepend-icon="mdi-account-card-details"/>

                    <v-text-field
                    label="Prénom"
                    v-model="prenom"
                    prepend-icon="mdi-account-card-details"/>

                    <v-text-field
                    label="Email"
                    v-model="email"
                    prepend-icon="mdi-email"/>

                    <v-text-field
                    :type="showPassword ? 'text' : 'password'"
                    label="Mot de passe"
                    v-model="password"
                    prepend-icon="mdi-lock"
                    :append-icon="showPassword ? 'mdi-eye' : 'mdi-eye-off'"
                    @click:append="showPassword=!showPassword"
                    />
                </v-form>
            </v-card-text>
            <v-divider></v-divider>
            <v-card-actions>
                <v-btn rounded color="success" @click="inscription"><router-link to="/inscription">Inscription</router-link></v-btn>
                <v-spacer></v-spacer>
                <v-btn color="info"><router-link to="/connexion">Connexion</router-link></v-btn>
            </v-card-actions>
        </v-card>
    </v-app>
</template>

<script>
import axios from 'axios'
import Vue from 'vue'
import VueSession from 'vue-session'
Vue.use(VueSession)

export default {
  name: 'Inscription',
  data: () => ({
    showPassword: false,
    email: '',
    prenom: '',
    nom: '',
    password: ''
  }),
  methods: {
    inscription () {
      var self = this
      if (this.$refs.form.validate()) {
        var data = {
          email: this.email,
          password: this.password,
          prenom: this.prenom,
          nom: this.nom,
          imageProfil: 'crouton.png'
        }
        var headers = {
          'Content-Type': 'application/json'
        }
        axios.post('http://localhost:4000/inscription', data, {
          headers: headers
        }).then(function (response) {
          if (response.data.auth !== 'failed') {
            self.$session.start()
            self.$session.set('email', self.email)
            self.$session.set('prenom', self.prenom)
            self.$session.set('nom', self.nom)
            self.$session.set('imageProfil', 'crouton.png')
            self.$router.push('/')
          }
        }).catch(function (error) {
          console.log(error)
        })
      }
    }
  }
}
</script>
