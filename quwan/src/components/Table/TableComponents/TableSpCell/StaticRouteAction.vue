<template>
  <Action :row-data="rowData" :actions="actions" @spCellEmit="spCellEmit"/>
</template>

<script>
import Action from './Action.vue';

export default {
  components: {
    Action,
  },
  props: {
    rowData: {
      type: Object,
      default: () => ({}),
    },
  },
  data() {
    return {
      actions: {
        edit: false,
        delete: true,
      },
    };
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
