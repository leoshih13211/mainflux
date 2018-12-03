<template>
  <div class="align-text-top zone">{{ displayName }}</div>
</template>

<script>
export default {
  props: {
    rowData: {
      type: Object,
      default: () => ({}),
    },
  },
  computed: {
    zones() {
      return this.rowData.zones;
    },
    displayName() {
      return this.zones.map(d => d.zoneName)
        .join(', ');
    },
  },
};
</script>
