<template>
  <div>
    <div class="deviceList" >
      <TableRes :table-data="devicesCfg"/>
    </div>
  </div>
</template>

<script>
import { mapActions } from 'vuex';
import TableRes from 'components/Table/TableRes.vue';

export default {
  components: {
    TableRes,
  },
  data() {
    return {
      devicesCfg: {
        caption: 'Device List',
        heads: [
          { id: 'time', name: 'Time' },
          { id: 'category', name: 'Category' },
          { id: 'source', name: 'Source' },
          { id: 'destination', name: 'Destination' },
          { id: 'detail', name: 'Detail' },
        ],
        body: [],
      },
    };
  },
  computed: {
    showDevices() {
      return !!this.devicesCfg.body.length;
    },
  },
  mounted() {
    this.setNav('Event Log');
    this.setDevices();
  },
  methods: {
    ...mapActions('Site', [
      'setNav',
    ]),
    setDevices() {
      this.devicesCfg.body = [];
    },
  },
};
</script>

<style scoped>

</style>
