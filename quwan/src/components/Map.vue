<template>
  <div class="map-group">
    <div class="searchBar">

      <!-- <label for="searchKeywords">Search</label> -->
      <!-- <input id ="searchKeywords" v-model="searchKeywords" type="text"> -->
    </div>
    <div id="map"/>
  </div>
</template>

<script>
import L from 'leaflet';
import 'leaflet-curve';
import { cloneDeep } from 'lodash';
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
        maxZoom: 18, // max 19
      },
      initView: [25.037789, 121.560768], // Taipei
      status: {
        well: 'green',
        warning: 'orange',
        danger: 'red',
      },
      searchKeywords: '',
      cfgFormat: {
        labelName: [],
        markerGroup: [],
        lineGroup: [],
        fitMap: 'marker', // default marker
        showController: false,
      },
      userCfg: {},
    };
  },
  computed: {
    layers() {
      const layers = this.userCfg.markerGroup.map((name, key) => {
        const markers = this.userCfg.markerGroup[key].map(marker => this.createMarker(marker));
        let lines = [];
        if (this.userCfg.lineGroup[key]) {
          lines = this.userCfg.lineGroup[key].map(line => this.createLine(line));
        }

        return L.layerGroup([...markers, ...lines]);
      });
      return layers;
    },
  },
  created() {
    this.userCfg = cloneDeep(this.cfgFormat);
    Object.keys(this.cfg)
      .forEach((key) => {
        if (key in this.userCfg) this.userCfg[key] = this.cfg[key];
      });
  },
  mounted() {
    const osm = new L.TileLayer(this.layerSource, this.layerOptions);

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
    if (this.userCfg.showController) this.createLayerController();

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
      const overlays = this.userCfg.labelName.reduce((rs, label, key) => {
        rs[label] = this.layers[key];
        return rs;
      }, {});
      const controller = [baseLayers, overlays];
      L.control.layers(...controller).addTo(this.map);
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
        ((stX + dtX) / 2) * 1.002,
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
  .map-group, #map{
    height: 100%;
    width: 100%;
  }
  #map {
    z-index: 0;
    border-radius: 5px;
  }
</style>
