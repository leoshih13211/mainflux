<template>
  <section>
    <div class="toggleMenu">
      <ButtonToggle :data="toggleMenu" @btnToggleEmit="btnToggleEmit"/>
    </div>
    <div class="mapContainer">
      <Map v-if="showMap" :cfg="mapData" @markerOnClick="markerOnClick"/>
    </div>
    <Topology v-if="showTopology"/>
  </section>
</template>

<script>
import Map from 'components/Map/Map.vue';
import Topology from 'components/Topology.vue';
import { mapActions } from 'vuex';
import ButtonToggle from 'components/Button/ButtonToggle.vue';
import mock_cnntData from 'mock/gm_connection.json';

export default {
  components: {
    Map,
    Topology,
    ButtonToggle,
  },
  data() {
    return {
      mapData: mock_cnntData,
      toggleMenu: [
        { name: 'Map', active: true },
        { name: 'Topology', active: true },
      ],
      currentView: 'Map',
    };
  },
  computed: {
    showMap() {
      return this.currentView === 'Map';
    },
    showTopology() {
      return this.currentView === 'Topology';
    },
  },
  mounted() {
    this.setGroup('WorldMap');
  },
  methods: {
    ...mapActions('Sidebar', [
      'setGroup',
    ]),
    markerOnClick() {
    },
    btnToggleEmit(emitData) {
      this.currentView = emitData.name;
    },
  },
};
</script>
<style lang="scss" scoped>
.mapContainer{
  width: 100%;
  height: 75vh;
}
.toggleMenu{
  width: 100%;
  display: flex;
  justify-content: flex-end;
}
</style>
