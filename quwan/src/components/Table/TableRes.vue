<template>
  <div class="qTable qShadow">
    <div class=" table-responsive-xl">
      <table class="table">
        <Tablehead :data="tableData.heads"/>
        <TableBody :data="tableData.body" :heads="tableData.heads"/>
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
};
</script>
