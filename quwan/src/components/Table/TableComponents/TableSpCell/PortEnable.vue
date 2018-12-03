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
    enabled() {
      return this.rowData.enable;
    },
    disabled() {
      return !this.rowData.enable;
    },
    statusClass() {
      return {
        enabled: this.enabled,
        disabled: this.disabled,
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
  &.enabled{
    background-color: $success_light;
  }
  &.disabled{
    background-color: $danger_light;
  }
}
</style>
