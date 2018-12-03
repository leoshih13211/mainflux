<template>
  <div class="deviceList qBlock">
    <TableRes :table-data="deviceLogTable"/>
  </div>
</template>

<script>
import { mapActions } from 'vuex';
import TableRes from 'components/Table/TableRes.vue';
import DeviceLog from 'mock/nebula/DeviceLog.json';

export default {
  components: {
    TableRes,
  },
  data() {
    return {
      deviceLogTable: {
        heads: [
          { id: 'timestamp', name: 'Time' },
          { id: 'severity', name: 'Severity' },
          { id: 'category', name: 'Category' },
          { id: 'logmessage', name: 'Message' },
          { id: 'srcip', name: 'Sourece IP' },
          { id: 'proto_name', name: 'Protocol' },
          { id: 'note', name: 'Note' },
        ],
        body: [],
      },
    };
  },
  mounted() {
    this.setNav('Device Log');
    this.setDevicesLog();
  },
  methods: {
    ...mapActions('Site', [
      'setNav',
    ]),
    setDevicesLog() {
      this.deviceLogTable.body = DeviceLog;
    },
  },
};
</script>

<style scoped>

</style>
