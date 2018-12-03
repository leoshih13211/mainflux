<template>
  <component :is="componentId" :row-data="rowData" @spCellEmit="spCellEmit"/>
</template>

<script>
import Status from './Status.vue';
import CnntStatus from './CnntStatus.vue';
import PortEnable from './PortEnable.vue';
import Action from './Action.vue';
import LanZone from './LanZone.vue';
import Subnet from './Subnet.vue';
import Description from './Description.vue';
import NextHop from './NextHop.vue';
import Metric from './Metric.vue';
import JoinAutoVPN from './JoinAutoVPN.vue';
import StaticRouteAction from './StaticRouteAction.vue';

export default {
  components: {
    Status,
    CnntStatus,
    PortEnable,
    Action,
    LanZone,
    Subnet,
    Description,
    NextHop,
    Metric,
    JoinAutoVPN,
    StaticRouteAction,
  },
  props: {
    componentId: {
      type: String,
      default: '',
    },
    rowData: {
      type: Object,
      default: () => ({}),
    },
  },
  methods: {
    spCellEmit(payload) {
      this.$emit('spCellEmit', payload);
    },
  },
};
</script>

<style scoped>

</style>
