<template>
  <Map :cfg="mapData" @markerOnClick="markerOnClick"/>
</template>

<script>
import Map from 'components/Map.vue';

export default {
  components: {
    Map,
  },
  data() {
    return {
      mapData: {
        labelName: [
          '<b>IEI</b><ul><li>Africa</li><li>South America</li></ul>',
          `<b>QNAP</b>
            <ul>
              <li>Taipei</li>
              <li>Shanghai</li>
              <li>LA</li>
            </ul>`,
        ],
        markerGroup: [
          [
            {
              pos: [25.037789, 121.560768],
              popupText: 'This is Taipei, CO.',
            },
            {
              pos: [31.224926, 121.486544],
              popupText: 'This is Shanghai, CO.',
            },
            {
              pos: [33.613203, -118.212888],
              popupText: 'This is LA, CO.',
            },
          ],
          [
            {
              pos: [16.024273, 11.953125],
              popupText: 'This is Africa, CO.',
            },
            {
              pos: [-14.577273, -53.367183],
              popupText: 'This is South America, CO.',
            },
          ],
        ],
        lineGroup: [
          [
            { st: [25.037789, 121.560768], dt: [31.224926, 121.486544], status: 'well' },
            { st: [25.037789, 121.560768], dt: [33.613203, -118.212888], status: 'warning' }, // default status is 'well'
          ],
          [
            { st: [16.024273, 11.953125], dt: [-14.577273, -53.367183], status: 'well' },
          ],
        ],
        lineLayerDepends: 'status', // default 'color'
      },
    };
  },
  methods: {
    markerOnClick(marker) {
      console.log(marker);
    },
  },
};
</script>

<style scoped>
</style>
