<template>
  <tbody>
    <tr v-for="(row, rid) in data"
        :id="row.id"
        :key="rid">
      <td v-for="(head, hi) in heads"
          :id="`${row.id}_${head.id}`"
          :key="hi">
        <SpCell v-if="head.spCell" :component-id="head.spCell" :row-data="row"/>
        <span v-else>{{ row[head.id] }}</span>
      </td>
    </tr>
    <tr v-if="emptyData">
      <td :colspan="heads.length">No Data</td>
    </tr>
  </tbody>
</template>

<script>
import SpCell from './TableSpCell/SpCell.vue';

export default {
  components: {
    SpCell,
  },
  props: {
    heads: {
      type: Array,
      default: () => [],
    },
    data: {
      type: Array,
      default: () => [],
    },
  },
  computed: {
    emptyData() {
      return !this.data.length;
    },
  },
};
</script>
