<template>
  <v-container>

    <v-alert
      class="text-center"
      :value="true"
      type="warning"
      v-if="!sessionInLive()"
    >
      Vous devez être connecté pour visualiser vos participations aux évènements !
    </v-alert>
    <v-row>
      <v-col cols="12" md="6">
        <v-card max-width="600" class="mx-auto">
          <v-toolbar color="blue" dark>
            <v-toolbar-title>Mes participations</v-toolbar-title>
          </v-toolbar>

          <v-list dense>
            <v-list-item-group>
              <template v-for="(event, index) in participations_events">
                <v-divider :key="index" v-if="index > 0"></v-divider>
                <v-list-item :key="event.Titre" @click="setMarker(event.Latitude, event.Longitude)">
                  <v-list-item-avatar>
                    <v-img :src="event.ImageProfil"></v-img>
                  </v-list-item-avatar>

                  <v-list-item-content>
                    <v-list-item-title class="text--primary" v-text="event.Titre"></v-list-item-title>
                    <v-list-item-subtitle v-text="event.Prenom + ' ' + event.Nom"></v-list-item-subtitle>
                    <v-list-item-subtitle v-text="event.Resume"></v-list-item-subtitle>
                    <v-list-item-subtitle v-text="event.Adresse"></v-list-item-subtitle>
                  </v-list-item-content>

                  <v-list-item-action>
                    <v-list-item-action-text>{{event.DateEvenement | formatDate}}</v-list-item-action-text>
                    <v-icon color="error" @click="unparticipate(event.Id_EVENEMENT, event)">mdi-close-circle</v-icon>
                  </v-list-item-action>
                </v-list-item>
              </template>
            </v-list-item-group>
          </v-list>
            <v-snackbar color="success" v-model="snackbar">{{text}}</v-snackbar>
        </v-card>
      </v-col>

      <v-col cols="12" md="6">
        <div class="map">
          <l-map :zoom="zoom" :center="center">
            <l-tile-layer :url="url"></l-tile-layer>
            <l-marker :lat-lng="marker"></l-marker>
          </l-map>
        </div>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import { LMap, LTileLayer, LMarker } from 'vue2-leaflet'
import { Icon } from 'leaflet'
import 'leaflet/dist/leaflet.css'
import axios from 'axios'
import Vue from 'vue'
import VueSession from 'vue-session'
Vue.use(VueSession)

delete Icon.Default.prototype._getIconUrl

Icon.Default.mergeOptions({
  iconRetinaUrl: require('leaflet/dist/images/marker-icon-2x.png'),
  iconUrl: require('leaflet/dist/images/marker-icon.png'),
  shadowUrl: require('leaflet/dist/images/marker-shadow.png')
})

export default {
  name: 'ParticipateEvents',
  components: {
    LMap,
    LTileLayer,
    LMarker
  },
  data () {
    return {
      participations_events: null,
      snackbar: false,
      text: '',

      // Map
      zoom: 15,
      center: [48.973526, 2.201292],
      url: 'http://{s}.tile.openstreetmap.fr/osmfr/{z}/{x}/{y}.png',
      marker: [48.973526, 2.201292]
    }
  },
  methods: {
    setMarker (latitude, longitude) {
      this.marker = [latitude, longitude]
      this.center = [latitude, longitude]
    },
    unparticipate (idEvent, event) {
      var self = this
      if (this.$session.exists()) {
        var data = {
          idEvent: idEvent,
          idSession: this.$session.get('key')
        }

        var headers = {
          'Content-Type': 'application/json'
        }
        axios
          .post('/delete_participation', data, {
            headers: headers
          })
          .then(function (response) {
            if (response.data.auth !== 'failed') {
              self.text = 'Vous ne participez plus à cet évènement'
              self.snackbar = true
            }
          })
          .catch(function (error) {
            console.log(error)
          })

        var index = this.participations_events.indexOf(event)
        this.participations_events.splice(index, 1)
      }
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
        .post('/my_participations', data, { headers: headers })
        .then(function (response) {
          if (response.data.auth !== 'failed') {
            self.participations_events = response.data
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
