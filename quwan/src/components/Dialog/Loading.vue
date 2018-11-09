<template>
  <DialogBase :dg-class="addDgClass" :cfg="dbCfg" :dg-type="dgType">
    <template slot="dgBody">
      <font-awesome-icon icon="spinner" pull="left" pulse/>
      <span class="ml-2">Loading...</span>
    </template>
  </DialogBase>
</template>

<script>
import DialogBase from './DialogBase.vue';

export default {
  components: {
    DialogBase,
  },
  props: {
    config: {
      type: Object,
      default: () => ({}),
    },
    dgType: {
      type: String,
      default: '',
    },
  },
  data() {
    return {
      addDgClass: ['Loading'],
      dbCfg: {
        body: null,
        mask: true,
        cancelClick: true,
      },
    };
  },
};
</script>
