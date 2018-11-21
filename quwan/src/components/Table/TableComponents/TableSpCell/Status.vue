<template>
  <div :class="statusClass" class="align-text-top status"/>
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
    statusClass() {
      return {
        online: this.rowData.status,
        offline: !this.rowData.status,
      };
    },
  },
};
</script>

<style scoped lang="scss">
@import '~scss/_function.scss';
$online_light: theme-color('success');
$offline_light: color('light-gray');

.status{
  width: 1rem;
  height: 1rem;
  border-radius: 1rem;
  display: inline-block;
  &.online{
    background-color: $online_light;
  }
  &.offline{
    background-color: $offline_light;
  }
}
</style>
