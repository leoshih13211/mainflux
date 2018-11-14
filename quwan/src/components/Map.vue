<template>
  <div>
    <div class="searchBar">
      <label for="searchKeywords">Search</label>
      <input id ="searchKeywords" v-model="searchKeywords" type="text">
    </div>
    <div id="map"/>
  </div>
</template>

<script>
import L from 'leaflet';
import 'leaflet-curve';
import { createCmpInstance } from 'common/utilities';
import qButton from './Button/Button.vue';

export default {
  name: 'Map',
  props: {
    cfg: {
      type: Object,
      default: () => ({}),
    },
  },
  data() {
    return {
      map: {},
      layerSource: 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
      layerOptions: {
        minZoom: 1,
        maxZoom: 19,
      },
      initView: [25.037789, 121.560768], // Taipei
      status: {
        well: 'green',
        warning: 'orange',
        danger: 'red',
      },
      searchKeywords: '',
    };
  },
  computed: {
    layers() {
      const layers = this.cfg.labelName.map((name, key) => {
        const markers = this.cfg.markerGroup[key].map(marker => this.createMarker(marker));
        let lines = [];
        if (this.cfg.lineGroup[key]) {
          lines = this.cfg.lineGroup[key].map(line => this.createLine(line));
        }

        return L.layerGroup([...markers, ...lines]);
      });
      return layers;
    },
  },
  mounted() {
    const osm = new L.TileLayer(this.layerSource, this.layerOptions);
    const controller = this.createLayerController();

    // initialize the map on the "map" div
    this.map = this.createMap();
    // 建立 Leaflet 地圖
    // 設定經緯度座標
    this.map.setView(new L.LatLng(...this.initView), 5);
    // 設定圖資來源, 以OpenStreetMap為例
    this.map.addLayer(osm);
    this.layers.forEach((layer) => {
      Object.keys(layer._layers)
        .forEach(key => this.markerJump(layer._layers[key]));
    });

    // 建立圖層控制面板
    L.control.layers(...controller).addTo(this.map);

    this.setFitMap();
  },
  methods: {
    createMap() {
      return L.map('map', {
        layers: this.layers,
        worldCopyJump: true,
        Renderer: {
          padding: 1,
          tolerance: 0,
        },
      });
    },
    createMarker({ pos, popupText }) {
      const marker = L.marker(pos);
      marker.bindPopup(popupText);

      return marker;
    },
    createLayerController() {
      const baseLayers = {};
      const overlays = this.cfg.labelName.reduce((rs, label, key) => {
        rs[label] = this.layers[key];
        return rs;
      }, {});
      return [baseLayers, overlays];
    },
    createLine({ st, dt, status }) {
      const bt = createCmpInstance(qButton, {
        propsData: { name: 'get Status' },
      });
      return L.curve([
        'M', st,
        'Q', this.controlPoint(st, dt), dt,
      ], {
        color: this.status[status],
        Renderer: {
          padding: 100000,
        },
        weight: 5,
      }).bindPopup()
        .on('click', (e) => {
          const { sourceTarget } = e;
          sourceTarget.bindPopup((layer) => {
            // Simulate async mode
            setTimeout(() => layer.setPopupContent(bt.$el), 500);
            bt.$el.addEventListener('click', () => {
              layer.setPopupContent('wait...');
              setTimeout(() => {
                layer.setPopupContent(`
                  Connection Status: <span style="color: ${this.status[status]}">${status}</span>
                  <span>${new Date().getTime()}</span>
                `);
              }, 500);
            });
            return 'wait...';
          });
        });
    },
    onMapClick(e) {
      /*
        invoke: map.on('click', onMapClick);
      */
      // alert(`經緯度座標：${e.latlng}`);
      const { lat, lng } = e.latlng;
      const arr = [];
      arr.push(lat, lng);
      // arr.push(e.latlng);
      const marker = L.marker(arr);
      marker.addTo(this.map);
      marker.bindPopup(`<strong>地標</strong><br>標示的位置。${e.latlng}`);
    },
    markerJump(marker) {
      marker.on('click', () => {
        if (!marker.getLatLng) return;
        const pos = this.map.latLngToLayerPoint(marker.getLatLng());
        pos.y -= 25;
        const fx = new L.PosAnimation();

        fx.once('end', () => {
          pos.y += 25;
          fx.run(marker._icon, pos, 0.8);
        });

        fx.run(marker._icon, pos, 0.3);
        this.$emit('markerOnClick', marker);
      });
    },
    controlPoint(st, dt) {
      const [stX, stY] = st;
      const [dtX, dtY] = dt;
      if (Math.abs(dtX - stX) > Math.abs(dtY - stY)) {
        // 橫向距離(經度差) > 縱向距離(緯度差)
        return [
          (stX + dtX) / 2,
          stY + 2,
        ];
      }
      return [
        ((stX + dtX) / 2) + 15,
        (stY + dtY) / 2,
      ];
    },
    setFitMap() {
      let lats;
      switch (this.cfg.fitMap) {
        case 'line':
          lats = this.fitMapByLines();
          break;
        case 'world':
          lats = null;
          break;
        case 'marker':
        default:
          lats = this.fitMapByMarker();
          break;
      }
      if (!lats) this.map.fitWorld(); // default fit whole map
      else this.map.fitBounds(lats);
    },
    fitMapByLines() {
      return this.cfg.lineGroup
        .map(group => group.map(line => [line.st, line.dt]));
    },
    fitMapByMarker() {
      return this.cfg.markerGroup
        .map(group => group.map(marker => marker.pos));
    },
  },
};
</script>

<style scoped>
  /* Always set the map height explicitly to define the size of the div
    * element that contains the map. */
  #map {
    z-index: 0;
    height: 80vh;
    width: 100%;
    max-height: 500px;
    border-radius: 5px;
  }
</style>
