<template>
  <div class="qTable">
    <div class=" table-responsive-xl">
      <table class="table">
        <Tablehead :data="tableData.heads"/>
        <TableBody :data="tableData.body" :heads="tableData.heads" @spCellEmit="spCellEmit"/>
      </table>
    </div>
  </div>
</template>

<script>
import Tablehead from './TableComponents/Tablehead.vue';
import TableBody from './TableComponents/TableBody.vue';

export default {
  components: {
    Tablehead,
    TableBody,
  },
  props: {
    tableData: {
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
