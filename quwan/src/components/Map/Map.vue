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
/* global google MarkerClusterer */
import { debounce } from 'lodash';
import GmapsCubicBezier from './GmapsCubicBezier';

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
      status: {
        well: 'limegreen',
        warning: 'orange',
        danger: 'red',
      },
      searchKeywords: '',
      cfgFormat: {
        type: '',
        features: [],
      },
      HQ_COORDINATES: { lat: 25.0599030, lng: 121.6369863 },
      markers: [],
      polylinesGroup: [],
      infoWindow: null,
    };
  },
  computed: {
    userCfg() {
      return this.cfg;
    },
    features() {
      return this.userCfg.features;
    },
  },
  mounted() {
    // initialize the map on the "map" div
    this.createMap();
    this.setMarkers();
    this.setMarkerCluster();
    this.setPolylines();
    this.fitBounds();
  },
  methods: {
    createMap() {
      this.map = new google.maps.Map(document.getElementById('map'), {
        zoom: 3,
        maxZoom: 16,
        center: this.HQ_COORDINATES,
      });
    },
    setMarkers() {
      this.markers = this.features.map((marker) => {
        const { lat, lng } = marker.coordinate;
        return this.createMarker({
          pos: { lat, lng },
          desc: marker.desc,
        });
      });
    },
    setMarkerCluster() {
      return new MarkerClusterer(
        this.map,
        this.markers,
        { imagePath: 'https://developers.google.com/maps/documentation/javascript/examples/markerclusterer/m' },
      );
    },
    setPolylines() {
      this.polylinesGroup = this.createPolylineGroup();
      this.polylinesGroup.forEach((g) => {
        g.paths.map((p) => {
          const polyline = this.createCurveline(p.path, p.properties);
          polyline.setMap(this.map);
          return polyline;
        });
      });
    },
    createMarker({ pos, label, desc }) {
      const config = {
        position: pos,
        draggable: true,
        animation: google.maps.Animation.DROP,
        map: this.map,
      };
      if (label) config.label = label;
      if (desc) config.desc = desc;

      const marker = new google.maps.Marker(config);
      this.setMarkerEvent(marker);

      return marker;
    },
    createPolylineGroup() {
      const targetMapping = this.features.reduce((rs, marker) => {
        const { id } = marker;
        rs[id] = marker;
        return rs;
      }, {});

      return this.features.reduce((gruop, marker) => {
        const { targets } = marker;
        let paths = [];
        if (!targets || !targets.length) return gruop;

        paths = targets.map(target => ({
          path: [
            { lat: marker.coordinate.lat, lng: marker.coordinate.lng },
            {
              lat: targetMapping[target.id].coordinate.lat,
              lng: targetMapping[target.id].coordinate.lng,
            },
          ],
          properties: target,
        }));
        gruop.push({
          gid: marker.id,
          paths,
        });
        return gruop;
      }, []);
    },
    createPolyline(pathCoordinates, options) {
      const lineStatus = this.status.well;
      const config = {
        path: pathCoordinates,
        geodesic: true,
        strokeColor: lineStatus,
        strokeOpacity: 1.0,
        strokeWeight: 4,
      };
      if (options.status !== undefined) {
        config.strokeColor = this.resolvePathStatus(options.status);
      }
      return new google.maps.Polyline(config);
    },
    createCurveline(pathCoordinates, options) {
      const [st, dt] = pathCoordinates;
      const st_latlng = new google.maps.LatLng(st.lat, st.lng);
      const dt_latlng = new google.maps.LatLng(dt.lat, dt.lng);
      const lineLength = google.maps.geometry.spherical.computeDistanceBetween(
        st_latlng,
        dt_latlng,
      );
      const lineHeading = google.maps.geometry.spherical.computeHeading(
        st_latlng,
        dt_latlng,
      );
      const c1_latlng = google.maps.geometry.spherical.computeOffset(
        st_latlng,
        lineLength / 3,
        (lineHeading + 60),
      );
      const c2_latlng = google.maps.geometry.spherical.computeOffset(
        dt_latlng,
        lineLength / 3,
        lineHeading + 120,
      );
      const controlPoint1 = {
        lat: c1_latlng.lat(),
        lng: c1_latlng.lng(),
      };
      const controlPoint2 = {
        lat: c2_latlng.lat(),
        lng: c2_latlng.lng(),
      };

      const curveLine = new GmapsCubicBezier(st, controlPoint1, controlPoint2, dt, 1);
      return this.createPolyline(curveLine, options);
    },
    createInfoWindow(contentString) {
      return new google.maps.InfoWindow({
        content: contentString,
      });
    },
    fitBounds() {
      const bounds = new google.maps.LatLngBounds();
      for (let i = 0; i < this.markers.length; i++) {
        bounds.extend(this.markers[i].getPosition());
      }

      this.map.fitBounds(bounds);
    },
    setMarkerEvent(marker) {
      marker.addListener('click', () => {
        this.markerJump(marker);
        this.showInfoWindow(marker);
      });
    },
    markerJump: debounce((marker) => {
      let timer = null;
      if (timer) {
        if (marker.getAnimation() !== null) {
          marker.setAnimation(null);
        }
        clearTimeout(timer);
        timer = null;
      } else {
        marker.setAnimation(google.maps.Animation.BOUNCE);
        timer = setTimeout(() => {
          marker.setAnimation(null);
        }, 1000);
      }
    }),
    showInfoWindow(marker) {
      const contentString = `
        <div>${marker.desc}</div>
      `;
      if (this.infoWindow) {
        this.infoWindow.close();
        this.infoWindow = null;
      }
      this.infoWindow = this.createInfoWindow(contentString);
      this.infoWindow.open(this.map, marker);
    },
    resolvePathStatus(status) {
      console.log('status :', status);
      switch (status) {
        case 0:
          return this.status.danger;
        case 1:
          return this.status.well;
        case 2:
          return this.status.warning;
        default:
          return this.status.well;
      }
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
