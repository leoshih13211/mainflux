<template>
  <component :is="componentId" :row-data="rowData"/>
</template>

<script>
import Status from './Status.vue';
import CnntStatus from './CnntStatus.vue';

export default {
  components: {
    Status,
    CnntStatus,
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
};
</script>

<style scoped>

</style>
