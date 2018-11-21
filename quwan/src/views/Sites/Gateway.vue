<template>
  <div>
    This is gateway
  </div>
</template>

<script>
import { mapActions } from 'vuex';

export default {
  mounted() {
    this.setNav('Gateway');
  },
  methods: {
    ...mapActions('Site', [
      'setNav',
    ]),
  },
};
</script>

<style scoped>

</style>
