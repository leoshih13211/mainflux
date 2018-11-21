<template>
  <nav class="nav nav-pills flex-column flex-sm-row">
    <a
      v-for="(nav, index) in navs"
      :class="{active: activeNav === nav.name}"
      :key="index"
      class="flex-sm-fill text-sm-center nav-link"
      href=""
      @click.prevent.stop="navOnClick(nav)">{{ nav.name }}</a>
  </nav>
</template>

<script>
import { mapState } from 'vuex';

export default {
  props: {
    navs: {
      type: Array,
      default: () => [],
    },
  },
  computed: {
    ...mapState('Site', [
      'activeNav',
    ]),
  },
  methods: {
    navOnClick(nav) {
      if (nav.router) this.$router.push(nav.router);
      this.$emit('navOnClick', nav);
    },
  },
};
</script>
