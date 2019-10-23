<template>
    <v-app>
        <v-card width="400" class="mx-auto mt-5">
            <v-card-title>
                <h1 class="display-1">Connexion</h1>
            </v-card-title>
            <v-card-text>
                <v-form>
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
                <v-btn rounded color="success" flat>Connexion</v-btn>
                <v-spacer></v-spacer>
                <v-btn color="info"><router-link to="/inscription">Inscription</router-link></v-btn>
            </v-card-actions>
        </v-card>
    </v-app>
</template>

<script>
import axios from 'axios'
import Vue from 'vue'
import VueSession from 'vue-session'
import Dialog from '../components/Dialogue'
Vue.use(VueSession)

export default {
  name: 'Connexion',
  data: () => ({
    showPassword: false,
    email: '',
    password: ''
  }),
  methods: {
    submit () {
      var self = this
      if (this.$refs.form.validate()) {
        console.log(this.pseudo)
        console.log(this.pass)
        var data = {
          pseudo: this.pseudo,
          password: this.pass
        }
        var headers = {
          'Content-Type': 'application/json'
        }
        axios.post('http://localhost:4000/connexion', data, {
          headers: headers
        }).then(function (response) {
          console.log(response.data.auth)
          if (response.data.auth == 'failed') {
            self.$refs.dialoginfo.setMessage(response.data.error)
            self.$refs.dialoginfo.setHeading('Authentification')
            self.$refs.dialoginfo.toggle()
          } else {
            var tmp = false;
            if(response.data.admin == 1) {
              tmp = true
              self.$store.commit('change', tmp)
              
            }
            console.log(tmp)
            self.$session.start()
            self.$session.set('pseudo', self.pseudo)
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
