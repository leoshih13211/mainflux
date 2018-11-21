<template>
  <div>
    <div class="deviceInfo" >
      <h4 class="title">{{ devicesCfg.caption }}</h4>
      <TableRes :table-data="devicesCfg"/>
    </div>
  </div>
</template>

<script>
import { mapActions } from 'vuex';
import TableRes from 'components/Table/TableRes.vue';
import mockDevices from '@/../mock/mock_devices.json';

export default {
  components: {
    TableRes,
  },
  data() {
    return {
      devicesCfg: {
        caption: 'Device Info',
        heads: [
          { id: 'status', name: 'Status', spCell: 'CnntStatus' },
          { id: 'name', name: 'Interface Name' },
          { id: 'macAddress', name: 'MAC Address' },
          { id: 'method', name: 'Method' },
          { id: 'routeMode', name: 'Rooute Mode' },
          { id: 'priority', name: 'priority' },
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
    this.setNav('Device');
    this.setDevices();
  },
  methods: {
    ...mapActions('Site', [
      'setNav',
    ]),
    setDevices() {
      this.devicesCfg.body = mockDevices;
    },
  },
};
</script>

<style scoped>

</style>
