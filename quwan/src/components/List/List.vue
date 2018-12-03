<template>
  <div class="qList">
    <div class="qList_item">
      <h4 class="title">{{ title }}</h4>
      <div v-for="(head, index) in heads" :key="index" class="line">
        <span class="name">{{ head.name }}</span>
        <span>: </span>
        <span class="value">{{ data[head.id] }}</span>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    title: {
      type: String,
      default: '',

    },
    heads: {
      type: Array,
      default: () => [],
    },
    data: {
      type: Object,
      default: () => ({}),
    },
  },
};
</script>

<style scoped>

</style>
