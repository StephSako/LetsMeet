<template>
  <v-container>

    <v-alert
      :value="true"
      type="error"
      v-if="!sessionInLive()"
    >
      Vous devez être connecté pour accéder à vos évènements !
    </v-alert>
    <v-row v-if="sessionInLive()">
      <v-col cols="12" md="6">
        <v-card max-width="500" class="mx-auto">
          <v-toolbar color="blue" dark>
            <v-toolbar-title>Vos évènements</v-toolbar-title>
          </v-toolbar>

          <v-list two-line>
            <v-list-item-group>
              <template v-for="(event, index) in my_events">
                <v-divider :key="index" v-if="index > 0"></v-divider>
                <v-list-item :key="event.Titre" @click="setMarker(event.Latitude, event.Longitude)">
                  <v-list-item-avatar>
                    <v-img :src="event.ImageProfil"></v-img>
                  </v-list-item-avatar>

                  <v-list-item-content>
                    <v-list-item-title class="text--primary" v-text="event.Titre"></v-list-item-title>
                    <v-list-item-subtitle v-text="event.Prenom + ' ' + event.Nom"></v-list-item-subtitle>
                    <v-list-item-subtitle v-text="event.Resume"></v-list-item-subtitle>
                  </v-list-item-content>

                  <v-list-item-action>
                    <v-list-item-action-text>{{event.DateEvenement | formatDate}}</v-list-item-action-text>
                    <v-btn
                      color="success"
                      @click="modifier(event.Id_EVENEMENT)"><v-icon>mdi-pencil-outline</v-icon></v-btn>
                      <v-btn
                      color="error"
                      @click="supprimer(event.Id_EVENEMENT)"><v-icon>mdi-delete</v-icon></v-btn>
                    <v-snackbar v-model="snackbar">
                      Vous participer maintenant à '{{event.Titre}}'
                    </v-snackbar>
                  </v-list-item-action>
                </v-list-item>
              </template>
            </v-list-item-group>
          </v-list>
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

// this part resolve an issue where the markers would not appear
delete Icon.Default.prototype._getIconUrl

Icon.Default.mergeOptions({
  iconRetinaUrl: require('leaflet/dist/images/marker-icon-2x.png'),
  iconUrl: require('leaflet/dist/images/marker-icon.png'),
  shadowUrl: require('leaflet/dist/images/marker-shadow.png')
})

export default {
  name: 'MyEvents',
  components: {
    LMap,
    LTileLayer,
    LMarker
  },
  data () {
    return {
      my_events: null,
      snackbar: false,

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
    sessionInLive () {
      return this.$session.exists()
    },
    modifier (idEvent) {
      console.log('modifier : ' + idEvent)
    },
    supprimer (idEvent) {
      console.log('supprimer : ' + idEvent)
    }
  },
  mounted () {
    var headers = { 'Content-Type': 'application/json' }
    var self = this

    if (this.$session.exists()) {
      var data = { idSession: this.$session.get('key') }
      axios
        .post('http://localhost:4000/my_events', data, { headers: headers })
        .then(function (response) {
          if (response.data.auth !== 'failed') {
            self.my_events = response.data
          } else {
            console.log('error')
          }
        }).catch(function (error) {
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
