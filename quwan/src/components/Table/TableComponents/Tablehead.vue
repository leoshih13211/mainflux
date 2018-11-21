<template>
  <thead>
    <tr>
      <th
        v-for="(head, index) in data"
        :id="head.id"
        :key="index" scope="col">{{ head.name }}</th>
    </tr>
  </thead>
</template>

<script>
export default {
  props: {
    data: {
      type: Array,
      default: () => [],
    },
  },
};
</script>
