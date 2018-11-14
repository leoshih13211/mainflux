<template>
  <div class="qTable">
    <slot name="caption">
      <h3 class="title">{{ capteion }}</h3>
    </slot>
    <table class="table">
      <thead>
        <slot name="tHead" />
      </thead>
      <tbody>
        <slot name="tBody" />
      </tbody>
    </table>
  </div>
</template>

<script>
export default {
  props: {
    capteion: {
      type: String,
      default: 'Table',
    },
  },
};
</script>

<style scoped>

</style>
