<template>
  <v-container>
    <v-alert
      class="text-center"
      :value="true"
      type="warning"
      v-if="!sessionInLive()"
    >Vous devez être connecté pour créer un évènement !</v-alert>

    <v-row>
      <v-col cols="12" md="6">
        <v-card width="400" class="mx-auto mt-5">
          <v-card-title>
            <h1 class="display-1">Créer un évènement</h1>
          </v-card-title>
          <v-card-text>
            <v-form>
              <v-text-field
                v-model="titre"
                label="Nom de l'événement"
                prepend-icon="mdi-domain"
              />

              <v-text-field
                v-model="resume"
                label="Description de l'événement"
                prepend-icon="mdi-format-list-bulleted-type"
              />

              <v-text-field
                type="text"
                v-model="adresse"
                label="Adresse de l'événement"
                prepend-icon="mdi-map"
              />

              <v-text-field
                type="date"
                v-model="dateEvent"
                label="Date de l'événement"
                prepend-icon="mdi-calendar-range"
              />

              <v-text-field
                type="number"
                step="0.0001"
                v-model="latitude"
                label="Latitude de l'événement"
                prepend-icon="mdi-map-marker"
              />

              <v-text-field
                type="number"
                step="0.0001"
                v-model="longitude"
                label="Longitude de l'événement"
                prepend-icon="mdi-map-marker"
              />
            </v-form>
          </v-card-text>
          <v-card-actions>
            <v-row justify="center">
              <v-btn color="success" @click="addEvent">Créer l'événement</v-btn>
            </v-row>
          </v-card-actions>
          <v-divider></v-divider>
        </v-card>
      </v-col>

      <v-col cols="12" md="6">
        <div class="map">
          <l-map :zoom="zoom" :center="center">
            <l-tile-layer :url="url"></l-tile-layer>
            <l-marker :lat-lng="marker"></l-marker>
            <v-geosearch :options="geosearchOptions"></v-geosearch>
          </l-map>
        </div>
        <v-snackbar color="success" v-model="snackbar">{{text}}</v-snackbar>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import { LMap, LTileLayer, LMarker } from 'vue2-leaflet'
import { Icon } from 'leaflet'
import 'leaflet/dist/leaflet.css'
import { OpenStreetMapProvider } from 'leaflet-geosearch'
import VGeosearch from 'vue2-leaflet-geosearch'
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
  name: 'AddEvent',
  components: {
    LMap,
    LTileLayer,
    LMarker,
    VGeosearch
  },
  data () {
    return {
      titre: '',
      resume: '',
      adresse: '',
      dateEvent: '',
      longitude: '',
      latitude: '',
      text: '',
      snackbar: false,
      // Map
      geosearchOptions: {
        provider: new OpenStreetMapProvider()
      },
      events: null,
      zoom: 15,
      center: [48.973526, 2.201292],
      url: 'http://{s}.tile.openstreetmap.fr/osmfr/{z}/{x}/{y}.png',
      marker: [48.973526, 2.201292]
    }
  },
  methods: {
    rmEvent (index) {
      this.items.splice(index, 1)
    },
    showMap (url) {
      this.url = url
    },
    setMarker (latitude, longitude) {
      this.marker = [latitude, longitude]
      this.center = [latitude, longitude]
    },
    sessionInLive () {
      return this.$session.exists()
    },
    addEvent () {
      if (this.sessionInLive()) {
        var self = this
        var headers = {
          'Content-Type': 'application/json'
        }

        var currentDate = new Date()
        var dateNow = Vue.filter('formatDate')(currentDate)

        var data = {
          titre: this.titre,
          resume: this.resume,
          dateEvent: this.dateEvent,
          adresse: this.adresse,
          latitude: this.latitude,
          longitude: this.longitude,
          idSession: this.$session.get('key'),
          dateCreation: dateNow
        }
        axios
          .post('http://localhost:4000/add_event', data, { headers: headers })
          .then(function (response) {
            if (response.data.auth !== 'failed') {
              self.$router.push('/')
            } else {
              console.log('error : ' + response.data.error)
            }
          })
          .catch(function (error) {
            console.log(error)
          })
      } else {
        this.text = 'Vous devez être connecté !'
        this.snackbar = true
      }
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
