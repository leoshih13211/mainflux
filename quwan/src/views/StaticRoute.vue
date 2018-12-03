<template>
  <div>
    <div class="headBar">
      <h4 class="title">Static Route Setting</h4>
    </div>
    <div class="qBlock">
      <div class="ctlPanel">
        <div class="panelLeft">
          <ButtonIcon
            front-fa="plus"
            name="Add Rule"
            class="btn qBtn-white qText-blue"
            @click.native="addRule"/>
        </div>
        <div class="panelRight">
          <ButtonIcon
            :disabled="saveDisabled"
            front-fa="save"
            name="Save"
            class="btn qBtn-success"
            @click.native="addRule"/>
        </div>
      </div>
      <TableRes :table-data="deviceLogTable" @spCellEmit="spCellEmit"/>
    </div>
  </div>
</template>

<script>
import { mapActions } from 'vuex';
import { cloneDeep, isEqual } from 'lodash';
import TableRes from 'components/Table/TableRes.vue';
import ButtonIcon from 'components/Button/ButtonIcon.vue';
import StaticRoute from 'mock/nebula/StaticRoute.json';

export default {
  components: {
    TableRes,
    ButtonIcon,
  },
  data() {
    return {
      deviceLogTable: {
        heads: [
          { id: 'subnet', name: 'Subnet', spCell: 'Subnet' },
          { id: 'nextHop', name: 'Next Hop', spCell: 'NextHop' },
          { id: 'metric', name: 'Metric', spCell: 'Metric' },
          { id: 'description', name: 'Description', spCell: 'Description' },
          { id: 'joinAutoVPN', name: 'Join AutoVPN', spCell: 'JoinAutoVPN' },
          { id: 'action', name: 'Action', spCell: 'StaticRouteAction' },
        ],
        body: [],
      },
      defaultRule: {
        name: 'static_name',
        subnet: '10.0.0.0/24',
        nextHop: '1.1.1.1',
        nextHopType: 'ip',
        ip: '1.1.1.1',
        metric: 0,
        description: '',
        joinAutoVPN: false,
      },
      routingRules: [],
      routingShadow: [],
      saveDisabled: true,
    };
  },
  mounted() {
    this.setNav('Device Log');
    this.getStaticRoute();
    this.setRouteTable();
  },
  methods: {
    ...mapActions('Site', [
      'setNav',
    ]),
    getStaticRoute() {
      this.routingRules = cloneDeep(StaticRoute);
      this.routingShadow = cloneDeep(StaticRoute);
    },
    setRouteTable() {
      this.deviceLogTable.body = this.routingShadow;
    },
    addRule() {
      const newRule = cloneDeep(this.defaultRule);
      newRule.id = Math.floor(Math.random() * 1000) / 1000;
      this.routingShadow.push(newRule);
    },
    spCellEmit({ name, rowData, value }) {
      switch (name) {
        case 'subnet':
          this.updateRowData(rowData, 'subnet', value);
          break;
        case 'nextHop':
          this.updateRowData(rowData, 'nextHop', value);
          break;
        case 'metric':
          this.updateRowData(rowData, 'metric', value);
          break;
        case 'description':
          this.updateRowData(rowData, 'description', value);
          break;
        case 'joinAutoVPN':
          this.updateRowData(rowData, 'joinAutoVPN', value);
          break;
        case 'delete':
          this.removeRow(rowData);
          break;
        default:
          break;
      }
      this.alterValidation();
    },
    alterValidation() {
      const alter = !(isEqual(this.routingShadow, this.routingRules));
      this.saveDisabled = !alter;
    },
    updateRowData(rowData, key, value) {
      rowData[key] = value;
    },
    removeRow({ id }) {
      this.routingShadow = this.routingShadow.filter(row => row.id !== id);
      this.setRouteTable();
    },
  },
};
</script>

<style scoped lang="scss">
.headBar{
  width: 100%;
}
.ctlPanel{
  display: flex;
  justify-content: space-between;
  margin: 10px;
  padding-bottom: 10px;
  button{
    width: 120px;
  }
}
</style>
