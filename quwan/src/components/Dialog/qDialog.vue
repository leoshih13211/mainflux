<template>
  <component :is="dialogType" :config="CFG" :dg-type="dialogType"/>
</template>

<script>

import Loading from './Loading.vue';

export default {
  components: {
    Loading,
  },
  props: {
    dialogType: {
      type: String,
      default: '',
    },
    dialogConfig: {
      type: Object,
      default: () => ({}),
    },
  },
  computed: {
    CFG() {
      const rs = {};

      if (Object.keys(this.dialogConfig).length) {
        Object.keys(this.dialogConfig).forEach((key) => {
          rs[key] = this.dialogConfig[key];
        });
      }

      return rs;
    },
  },
};
</script>
