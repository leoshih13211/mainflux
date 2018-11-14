<template>
  <qTable :caption="tableData.capteion" class="table-responsive">
    <template slot="tHead">
      <tr>
        <th scope="col">#</th>
        <th
          v-for="(head, index) in tableData.heads"
          :id="head.id"
          :key="index" scope="col">{{ head.name }}</th>
      </tr>
    </template>
    <template slot="tBody">
      <tr v-for="(data, di) in tableData.body"
          :id="data.id"
          :key="di">
        <th scope="row">{{ di+1 }}</th>
        <td v-for="(head, hi) in tableData.heads"
            :id="`${data.id}_${head.id}`"
            :key="hi">{{ data[head.id] }}</td>
      </tr>
    </template>
  </qTable>
</template>

<script>
import qTable from './Table.vue';

export default {
  components: {
    qTable,
  },
  props: {
    tableData: {
      type: Object,
      default: () => ({}),
    },
  },
};
</script>

<style scoped>

</style>
