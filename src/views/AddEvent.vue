<template>
  <v-container>
    <v-row>
      <v-col cols="12" md="6">
        <v-card width="400" class="mx-auto mt-5">
          <v-card-title>
            <h1 class="display-1">{{ titleEvent }}</h1>
          </v-card-title>
          <v-card-text>
            <v-form>
              <v-text-field
                v-model="nameEvent"
                label="Nom de l'événement"
                prepend-icon="mdi-domain"
              />
              <v-text-field
                v-model="descriptionEvent"
                label="Description de l'événement"
                prepend-icon="mdi-format-list-bulleted-type"
              />
            </v-form>
          </v-card-text>
          <v-card-actions>
            <v-btn color="success" @click="addEvent">Créer l'événement</v-btn>
          </v-card-actions>
          <v-divider></v-divider>
        </v-card>
      </v-col>
      <v-col cols="12" md="6">
        <div class="map">
          <l-map :zoom="zoom" :center="center">
            <l-tile-layer :url="url"></l-tile-layer>
            <l-marker :lat-lng="marker"></l-marker>
            <v-geosearch :options="geosearchOptions" ></v-geosearch>
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
import { OpenStreetMapProvider } from 'leaflet-geosearch'
import VGeosearch from 'vue2-leaflet-geosearch'
import axios from 'axios'
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
      nameEvent: '',
      descriptionEvent: '',
      addFriend: '',
      titleEvent: 'Nouvel événement',
      // Map
      geosearchOptions: {
        provider: new OpenStreetMapProvider()
      },
      events: null,
      zoom: 15,
      nomsMap: ['Open Street Map', 'ArcGIS Online', 'HeiGIT', 'Wikimédia'],
      layers: [
        {
          url: 'http://{s}.tile.openstreetmap.fr/osmfr/{z}/{x}/{y}.png',
          name: 'Open Street Map'
        },
        {
          url:
            'https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}',
          name: 'ArcGIS Online'
        },
        {
          url:
            'https://maps.heigit.org/openmapsurfer/tiles/roads/webmercator/{z}/{x}/{y}.png',
          name: 'HeiGIT'
        },
        {
          url: 'https://maps.wikimedia.org/osm-intl/{z}/{x}/{y}{r}.png',
          name: 'Wikimédia'
        }
      ],
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
    }
  },
  mounted () {
    var headers = { 'Content-Type': 'application/json' }
    var self = this
    axios.get('http://localhost:4000/events', { headers: headers }).then(function (response) {
      self.events = response.data
    })
  },
  addEvent () {
    var self = this
    if (this.$refs.form.validate()) {
      var data = {
        title: this.nameEvent,
        description: this.descriptionEvent
      }
      var headers = {
        'Content-Type': 'application/json'
      }
      axios.post('http://localhost:4000/addevent', data, {
        headers: headers
      }).then(function (response) {
        if (response.data.auth !== 'failed') {
          self.$session.start()
          self.$session.set('title', this.title)
          self.$session.set('content', this.content)
          self.$router.push('/')
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
