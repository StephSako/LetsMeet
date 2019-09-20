<template>
  <v-container>
    <v-row>
      <v-col cols="12" md="4">
        <v-card width="400" class="mx-auto mt-5">
          <v-card-title>
            <h1 class="display-1">{{ title }}</h1>
          </v-card-title>
          <v-card-text>
            <v-form>
              <v-text-field v-model="name" label="Username" prepend-icon="mdi-account" />
              <v-text-field
                v-model="password"
                :type="showPassword ? 'text' : 'password'"
                label="Password"
                prepend-icon="mdi-lock"
                :append-icon="showPassword ? 'mdi-eye' : 'mdi-eye-off'"
                @click:append="showPassword = !showPassword"
              />
            </v-form>
          </v-card-text>
          <v-divider></v-divider>
          <v-card-actions>
            <v-btn color="success" @click="addElement">Register</v-btn>
            <v-btn color="info">Login</v-btn>
          </v-card-actions>
        </v-card>
      </v-col>

      <v-col cols="12" md="4">
        <v-card class="mx-auto mt-5" max-width="400" tile>
          <v-list-item two-line v-for="(friend, index) in friends" :key="friend.index">
            <v-list-item-content>
              <v-list-item-title>{{ friend.name }}</v-list-item-title>
              <v-btn color="red darken-2" @click="rmElement(index)">Supprimer</v-btn>
            </v-list-item-content>
          </v-list-item>
        </v-card>

        <v-radio-group>
            <v-radio
                v-for="n in 4"
                :key="n"
                :label="nomsMap[n-1]"
                :value="URLMap[n-1]"
                :checked="URLMap[n-1] === url ? 'true' : 'false'"
                @change="showMap(n-1)"
            ></v-radio>
        </v-radio-group>
      </v-col>

      <v-col cols="12" md="4" style="height: 500px; width: 500px">
        <div class="map">
          <l-map :zoom="zoom" :center="center">
            <l-tile-layer :url="url" :attribution="attribution"></l-tile-layer>
          </l-map>
        </div>
      </v-col>
    </v-row>

  </v-container>
</template>

<script>
import { LMap, LTileLayer } from 'vue2-leaflet'

export default {
  name: 'Map',
  components: {
    LMap,
    LTileLayer
  },
  data () {
    return {
      name: '',
      password: '',
      showPassword: false,
      title: 'Login',
      friends: [
        { name: 'Marie', password: 'password' },
        { name: 'Florian', password: 'test' },
        { name: 'Antoine', password: '12334' },
        { name: 'Théo', password: 'homemaison' }
      ],

      // Map
      zoom: 13,
      nomsMap: ['Open Street Map', 'ArcGIS Online', 'HeiGIT', 'Wikimédia'],
      URLMap: ['http://{s}.tile.openstreetmap.fr/osmfr/{z}/{x}/{y}.png',
        'https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}',
        'https://maps.heigit.org/openmapsurfer/tiles/roads/webmercator/{z}/{x}/{y}.png',
        'https://maps.wikimedia.org/osm-intl/{z}/{x}/{y}{r}.png'],
      center: [51.505, -0.09],
      url:
        'http://{s}.tile.openstreetmap.fr/osmfr/{z}/{x}/{y}.png',
      attribution:
        '&copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>'
    }
  },
  methods: {
    rmElement (index) {
      this.friends.splice(index, 1)
    },
    addElement () {
      this.friends.push({ name: this.name, password: this.password })
    },
    showMap (n) {
      this.url = this.URLMap[n]
    },
    checkedURL (index) {
      return this.URLMap[index] === this.url ? 'true' : 'false'
    }
  }
}
</script>

<style scoped>
.map {
  height: 450px;
  width: 450px;
}
</style>
