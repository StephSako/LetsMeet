<template>
  <v-container>
    <v-row>
      <v-col cols="12" md="4">
        <v-card class="mx-auto" max-width="400" tile>
          <v-list three-line>
            <template v-for="(event, index) in events">
              <v-divider :key="index" v-if="index > 0"></v-divider>

              <v-list-item :key="event.Titre" @click="setMarker(event.Latitude, event.Longitude)">
                <v-list-item-avatar>
                  <v-img :src="event.ImageProfil"></v-img>
                </v-list-item-avatar>

                <v-list-item-content>
                  <v-list-item-title v-html="event.Titre"></v-list-item-title>
                  <v-list-item-subtitle v-html="event.Resume"></v-list-item-subtitle>
                </v-list-item-content>
              </v-list-item>
            </template>
          </v-list>
        </v-card>
      </v-col>

      <v-col cols="12" md="4" >
        <div class="map">
          <l-map :zoom="zoom" :center="center">
            <l-tile-layer :url="url"></l-tile-layer>
            <l-marker :lat-lng="marker"></l-marker>
            <v-geosearch :options="geosearchOptions" ></v-geosearch>
          </l-map>
        </div>

        <v-radio-group>
          <v-radio
            v-for="layer in layers"
            v-model="layer.url"
            :key="layer.url"
            :label="layer.name"
            :value="layer.url"
            @change="showMap(layer.url)"
          ></v-radio>
        </v-radio-group>
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

// this part resolve an issue where the markers would not appear
delete Icon.Default.prototype._getIconUrl

Icon.Default.mergeOptions({
  iconRetinaUrl: require('leaflet/dist/images/marker-icon-2x.png'),
  iconUrl: require('leaflet/dist/images/marker-icon.png'),
  shadowUrl: require('leaflet/dist/images/marker-shadow.png')
})

export default {
  name: 'Map',
  components: {
    LMap,
    LTileLayer,
    LMarker,
    VGeosearch
  },
  data () {
    return {
      geosearchOptions: {
        provider: new OpenStreetMapProvider()
      },
      events: null,

      // Map
      zoom: 15,
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
  }
}
</script>

<style scoped>
.map {
  height: 450px;
  width: 600px;
}
</style>
