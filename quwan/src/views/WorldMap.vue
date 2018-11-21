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
import Map from 'components/Map.vue';
import Topology from 'components/Topology.vue';
import { mapActions } from 'vuex';
import ButtonToggle from 'components/Button/ButtonToggle.vue';

export default {
  components: {
    Map,
    Topology,
    ButtonToggle,
  },
  data() {
    return {
      mapData: {
        labelName: [
          '<span>Xinsheng</span>',
          '<span>Hsinchu</span>',
          // `
          //   <b>IEI</b>
          //   <ul>
          //     <li>Africa</li>
          //     <li>South America</li>
          //   </ul>`,
          // `<b>QNAP</b>
          //   <ul>
          //     <li>Taipei</li>
          //     <li>Shanghai</li>
          //     <li>LA</li>
          //   </ul>`,
        ],
        markerGroup: [
          [
            {
              pos: [25.0599101, 121.6346364],
              popupText: 'This is Xizhi, CO.',
            },
            {
              pos: [25.0405318, 121.5302981],
              popupText: 'This is Xinsheng, CO.',
            },
          ],
          [
            {
              pos: [25.0599101, 121.6346364],
              popupText: 'This is Xizhi, CO.',
            },
            {
              pos: [24.797848, 121.0025818],
              popupText: 'This is Hsinchu, CO.',
            },
            // {
            //   pos: [16.024273, 11.953125],
            //   popupText: 'This is Africa, CO.',
            // },
            // {
            //   pos: [-14.577273, -53.367183],
            //   popupText: 'This is South America, CO.',
            // },
          ],
        ],
        lineGroup: [
          // default status is 'well'
          [
            { st: [25.0599101, 121.6346364], dt: [25.0405318, 121.5302981], status: 'well' },
            // { st: [25.0599101, 121.6346364], dt: [33.613203, -118.212888], status: 'warning' },
          ],
          [
            { st: [25.0599101, 121.6346364], dt: [24.797848, 121.0025818], status: 'warning' },
            // { st: [16.024273, 11.953125], dt: [-14.577273, -53.367183], status: 'well' },
          ],
        ],
        fitMap: 'marker', // default marker
        showController: true,
      },
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
