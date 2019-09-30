<template>
  <v-container>
    <v-row>
      <v-col cols="12" md="4">
        <v-card class="mx-auto" max-width="400" tile>
          <v-list three-line>
            <template v-for="(item, index) in items">
              <v-subheader v-if="item.header" :key="item.header" v-text="item.header"></v-subheader>

              <v-divider v-else-if="item.divider" :key="index" :inset="item.inset"></v-divider>

              <v-list-item v-else :key="item.title" @click="setMarker (item.place)">
                <v-list-item-avatar>
                  <v-img :src="item.avatar"></v-img>
                </v-list-item-avatar>

                <v-list-item-content>
                  <v-list-item-title v-html="item.title"></v-list-item-title>
                  <v-list-item-subtitle v-html="item.subtitle"></v-list-item-subtitle>
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

export default {
  name: 'Map',
  components: {
    LMap,
    LTileLayer,
    LMarker
  },
  data () {
    return {
      // Valeurs de test
      items: [
        { header: 'Public' },
        {
          avatar:
            'https://scontent-cdg2-1.xx.fbcdn.net/v/t1.0-9/26195607_112740102887757_2314119618193327834_n.jpg?_nc_cat=102&_nc_oc=AQlosCGgyTaRpg7SXbSLEwL5Alpj5ZUUH6IKqUYJgViFjUD452Ksy_p6L-FqyKDv3G5OEba0S3PWpDbDiEIR0KOO&_nc_ht=scontent-cdg2-1.xx&oh=d5fab06d66503cedcaa72adb724f1587&oe=5DF39453',
          title:
            'Répétition de basse &mdash;  <span class="grey--text text--lighten-1">Sept 25, 2019</span>',
          subtitle:
            "<span class='text--primary'>" +
            'Théo M.' +
            "</span> &mdash; J'ai répétion de musique (basse). Si quelqu'un veut venir ...",
          place: [48.6634, 2.351319999999987]
        },
        { divider: true, inset: true },
        {
          avatar:
            'https://scontent-cdg2-1.xx.fbcdn.net/v/t1.0-9/1441480_1493698737576427_6631517073958365519_n.jpg?_nc_cat=102&_nc_oc=AQmhqY_LannUDZXSg7_ImT284Gs58LsDBT_rKEXj3pg5jYG3gFfpU2ZPyt9Of1xngR46doYHlQ4FKsdXeSin3t34&_nc_ht=scontent-cdg2-1.xx&oh=01bcbc4b7e3d7feabd2dcf67ccba648d&oe=5DF25824',
          title:
            'Rediff ZEvent &mdash;  <span class="grey--text text--lighten-1">April 31, 2020</span>',
          subtitle:
            "<span class='text--primary'>" +
            'Florian P.' +
            '</span> &mdash; ' +
            "Je regarderai la rediff du ZEvent dans la salle TV. Venez c'est peace.",
          place: [48.94936557505792, 2.2383533753512665]
        },
        { divider: true, inset: true },
        {
          avatar:
            'https://scontent-cdg2-1.xx.fbcdn.net/v/t1.0-9/44258687_341554849913535_4498742182567477248_n.jpg?_nc_cat=108&_nc_oc=AQkYgwlDf-uDtsbRicIP0YDW-nHLfYqLueVLdCXao4tP6jHzaCy3qekwC3DLtqBqctm8Onj-xOIa0pYvwsOlIlCa&_nc_ht=scontent-cdg2-1.xx&oh=8173cc53a8b415127c0f9dafad04e0cd&oe=5E33E917',
          title:
            'Billard &mdash;  <span class="grey--text text--lighten-1">Mars 21, 2019</span>',
          subtitle:
            "<span class='text--primary'>" +
            'Stephen S' +
            '</span> &mdash; ' +
            'Billard à Indiana Club 100% compet les pélos !',
          place: [48.828155875468724, 2.3793447017669678]
        },
        { divider: true, inset: true },
        {
          avatar:
            'https://scontent-cdg2-1.xx.fbcdn.net/v/t1.0-9/69755472_555993814939654_862110411455987712_n.jpg?_nc_cat=109&_nc_oc=AQmD3QBYOox7dERhnhoq1s4AX6rbPAJznXRjDoW2ryiXL44Xpq3qnJkmsXIdykd1osEpRNMWuulDTFbfry2FkDHC&_nc_ht=scontent-cdg2-1.xx&oh=bf19a3919653cefe224c5262886a8565&oe=5DFCF513',
          title:
            'Sultan à Ivry &mdash;  <span class="grey--text text--lighten-1">May 19, 2019</span>',
          subtitle:
            "<span class='text--primary'>" +
            'Emilie G. S.' +
            '</span> &mdash; ' +
            'Wesh Sultan demain midi ça vous dit ?',
          place: [48.81141552764814, 2.3850497603416443]
        },
        { divider: true, inset: true },
        {
          avatar:
            'https://scontent-cdg2-1.xx.fbcdn.net/v/t1.0-9/11902572_535238106631394_4671378484779443631_n.jpg?_nc_cat=101&_nc_oc=AQnGOZOkIwe0KZ14GszoMsgrAATeU_E9UY0WFnuvpArbAzYnT764XqkUW7hlqC-lIBl42cyHpGZykKYp75HriVtL&_nc_ht=scontent-cdg2-1.xx&oh=5cfa37715d09617ef148724d695f48cc&oe=5E04A379',
          title:
            'Visite Loch Ness &mdash;  <span class="grey--text text--lighten-1">Sept 24, 2019</span>',
          subtitle:
            "<span class='text--primary'>" +
            'Nesrine O.' +
            '</span> &mdash; ' +
            'On pourrai visiter le Loch Ness ce week-end non ?',
          place: [55.9521476, -3.1889908]
        }
      ],
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
    setMarker (place) {
      this.marker = place
      this.center = place
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
