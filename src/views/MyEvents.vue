<template>
  <v-app>
    <v-container>
      <v-alert
        class="text-center"
        :value="true"
        type="error"
        v-if="!sessionInLive()"
      >Vous devez être connecté pour accéder à vos évènements !</v-alert>

      <v-card v-if="sessionInLive()" class="mx-auto">
        <v-toolbar color="blue" dark>
          <v-toolbar-title>Vos évènements</v-toolbar-title>
        </v-toolbar>

        <v-list flat>
          <v-list-item-group>
            <template v-for="(event, index) in my_events">
              <v-divider :key="index" v-if="index > 0"></v-divider>

              <template v-if="idEvent != event.Id_EVENEMENT">
                <v-list-item :key="event.Titre">
                  <v-list-item-avatar>
                    <v-img :src="event.ImageProfil"></v-img>
                  </v-list-item-avatar>

                  <v-list-item-content>
                    <v-list-item-title v-text="'Titre : ' + event.Titre"></v-list-item-title>
                    <v-list-item-title v-text="'Résumé : ' + event.Resume"></v-list-item-title>
                    <v-list-item-title>Date : {{event.DateEvenement | formatDate}}</v-list-item-title>
                    <v-list-item-title v-text="'Adresse : ' + event.Adresse"></v-list-item-title>
                    <v-list-item-title v-text="'Latitude : ' + event.Latitude"></v-list-item-title>
                    <v-list-item-title v-text="'Longitude : ' + event.Longitude"></v-list-item-title>
                  </v-list-item-content>

                  <v-list-item-action>
                    <v-btn color="info" @click="onEdit(event)">
                      <v-icon>mdi-pencil-outline</v-icon>
                    </v-btn>

                    <v-btn color="error" @click="onDelete(event.Id_EVENEMENT)">
                      <v-icon>mdi-delete</v-icon>
                    </v-btn>

                    <v-snackbar v-model="snackbar">{{text}}'</v-snackbar>
                  </v-list-item-action>
                </v-list-item>
              </template>

              <template v-else>
                <v-list-item :key="event.Titre">
                  <v-list-item-avatar>
                    <v-img :src="event.ImageProfil"></v-img>
                  </v-list-item-avatar>
                  <v-list-item-title>
                    <v-text-field type="text" label="Titre :" v-model="editEvent.titre" />
                  </v-list-item-title><br>

                  <v-list-item-title>
                    <v-text-field type="text" label="Resume :" v-model="editEvent.resume" />
                  </v-list-item-title>

                  <v-list-item-title>
                    <v-text-field type="date" label="Date :" v-model="editEvent.dateEvent" />
                  </v-list-item-title>

                  <v-list-item-title>
                    <v-text-field type="text" label="Adresse :" v-model="editEvent.adresse" />
                  </v-list-item-title>

                  <v-list-item-title>
                    <v-text-field type="number" step="0.0001" label="Latitude :" v-model="editEvent.latitude" />
                  </v-list-item-title>

                  <v-list-item-title>
                    <v-text-field type="number" step="0.0001" label="Longitude :" v-model="editEvent.longitude" />
                  </v-list-item-title>

                  <v-list-item-action>
                    <v-btn color="success" @click="onEditSubmit(event.Id_EVENEMENT)">
                      <v-icon>mdi-check-circle</v-icon>
                    </v-btn>

                    <v-btn color="error" @click="onCancel()">
                      <v-icon>mdi-cancel</v-icon>
                    </v-btn>

                    <v-snackbar v-model="snackbar">{{text}}</v-snackbar>
                  </v-list-item-action>
                </v-list-item>
              </template>
            </template>
          </v-list-item-group>
        </v-list>
      </v-card>
    </v-container>
  </v-app>
</template>

<script>
import axios from 'axios'
import Vue from 'vue'
import VueSession from 'vue-session'
Vue.use(VueSession)
export default {
  name: 'MyEvents',
  data () {
    return {
      my_events: null,
      text: null,
      snackbar: false,
      idEvent: '',
      editEvent: {
        titre: '',
        resume: '',
        dateEvent: '',
        adresse: '',
        latitude: '',
        longitude: ''
      }
    }
  },
  methods: {
    dateFormation (dateToFormat) {
      return Vue.filter('formatDate')(dateToFormat)
    },
    sessionInLive () {
      return this.$session.exists()
    },
    onDelete (idEventToDelete) {
      var self = this
      var headers = {
        'Content-Type': 'application/json'
      }
      var data = {
        idEvent: idEventToDelete
      }
      axios
        .post('http://localhost:4000/delete_event', data, { headers: headers })
        .then(function (response) {
          if (response.data.auth !== 'failed') {
            self.text = 'Évènement supprimé ! Rafraichissez la page ...'
            self.snackbar = true
          } else {
            console.log('error')
          }
        })
        .catch(function (error) {
          console.log(error)
        })
    },
    onEdit (eventEdit) {
      this.idEvent = eventEdit.Id_EVENEMENT
      this.editEvent.titre = eventEdit.Titre
      this.editEvent.resume = eventEdit.Resume
      this.editEvent.dateEvent = this.dateFormation(eventEdit.DateEvenement)
      this.editEvent.adresse = eventEdit.Adresse
      this.editEvent.latitude = eventEdit.Latitude
      this.editEvent.longitude = eventEdit.Longitude
    },
    onCancel () {
      this.idEvent = ''
      this.editEvent.titre = ''
      this.editEvent.resume = ''
      this.editEvent.dateEvent = ''
      this.editEvent.adresse = ''
      this.editEvent.latitude = ''
      this.editEvent.longitude = ''
    },
    onEditSubmit (idEvent) {
      var self = this
      var headers = {
        'Content-Type': 'application/json'
      }
      var data = {
        titre: this.editEvent.titre,
        resume: this.editEvent.resume,
        dateEvent: this.editEvent.dateEvent,
        adresse: this.editEvent.adresse,
        latitude: this.editEvent.latitude,
        longitude: this.editEvent.longitude,
        idEvent: idEvent
      }
      axios
        .post('http://localhost:4000/update_event', data, { headers: headers })
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
      this.idEvent = ''
      this.editEvent.titre = ''
      this.editEvent.resume = ''
      this.editEvent.dateEvent = ''
      this.editEvent.adresse = ''
      this.editEvent.latitude = ''
      this.editEvent.longitude = ''
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
        .post('http://localhost:4000/my_events', data, { headers: headers })
        .then(function (response) {
          if (response.data.auth !== 'failed') {
            self.my_events = response.data
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

<style scoped>
.map {
  height: 450px;
  width: 600px;
}
</style>
