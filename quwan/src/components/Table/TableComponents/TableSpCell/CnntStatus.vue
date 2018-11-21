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
    connected() {
      return this.rowData.status === 1;
    },
    warning() {
      return this.rowData.status === 2;
    },
    disconnected() {
      return this.rowData.status === 0;
    },
    statusClass() {
      return {
        connected: this.connected,
        warning: this.warning,
        disconnected: this.disconnected,
      };
    },
  },
};
</script>

<style scoped lang="scss">
@import '~scss/_function.scss';
$success_light: theme-color('success');
$warning_light: theme-color('warning');
$danger_light: theme-color('danger');

.status{
  width: 1rem;
  height: 1rem;
  border-radius: 1rem;
  display: inline-block;
  &.connected{
    background-color: $success_light;
  }
  &.warning{
    background-color: $warning_light;
  }
  &.disconnected{
    background-color: $danger_light;
  }
}
</style>
