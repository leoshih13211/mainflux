<template>
  <div>
    <div class="wanSetting qBlock" >
      <h4 class="title">{{ wanTable.caption }}</h4>
      <TableRes :table-data="wanTable"/>
    </div>
    <div class="lanSetting qBlock" >
      <h4 class="title">{{ lanTable.caption }}</h4>
      <TableRes :table-data="lanTable"/>
    </div>
  </div>
</template>

<script>
import { mapActions } from 'vuex';
import TableRes from 'components/Table/TableRes.vue';
import mockPort from 'mock/nebula/Port.json';

export default {
  components: {
    TableRes,
  },
  data() {
    return {
      wanTable: {
        caption: 'WAN Setting',
        heads: [
          { id: 'port', name: 'Port Name' },
          { id: 'enable', name: 'Status', spCell: 'PortEnable' },
          { id: 'portType', name: 'Port Type' },
          { id: 'bandwidth', name: 'Bandwidth' },
          { id: 'bandwidthUnit', name: 'Bandwidth Unit' },
          { id: 'zone', name: 'Zone' },
          { id: 'transport', name: 'Type' },
          { id: 'publicIpType', name: 'Public Ip Type' },
          { id: 'role', name: 'Primary/Backup' },
          { id: 'action', name: 'Action', spCell: 'Action' },
        ],
        body: [],
      },
      lanTable: {
        caption: 'LAN Setting',
        heads: [
          { id: 'port', name: 'Port Name' },
          { id: 'status', name: 'Status', spCell: 'PortEnable' },
          { id: 'portType', name: 'Port Type' },
          { id: 'zone', name: 'Zone(VLAN)', spCell: 'LanZone' },
          { id: 'permission', name: 'Permission' },
          { id: 'action', name: 'Actions', spCell: 'Action' },
        ],
        body: [],
      },
    };
  },
  computed: {
    wanData() {
      return this.deviceData.wanSetting;
    },
    lanData() {
      return this.deviceData.lanSetting;
    },
  },
  mounted() {
    this.deviceData = mockPort;
    this.setNav('Device');
    this.setWANTable();
    this.setLANTable();
  },
  methods: {
    ...mapActions('Site', [
      'setNav',
    ]),
    setWANTable() {
      this.wanTable.body = this.wanData;
    },
    setLANTable() {
      this.lanTable.body = this.lanData;
    },
  },
};
</script>

<style scoped lang="scss">
  .qBlock{
    padding: 1rem;
  }
</style>
