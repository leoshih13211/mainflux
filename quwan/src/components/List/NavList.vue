<template>
  <div class="qNavList">
    <div v-for="(d, index) in data" :key="index" class="qList_item">
      <List :title="d.title" :heads="heads" :data="d"/>
    </div>
  </div>
</template>

<script>
import List from './List.vue';

export default {
  components: {
    List,
  },
  props: {
    listData: {
      type: Object,
      default: () => ({}),
    },
  },
  computed: {
    heads() {
      return this.listData.heads;
    },
    data() {
      return this.listData.data;
    },
  },
};
</script>

<style scoped>

</style>
