<template>
  <div>
    <NavFlex :navs="navs" :active-nav="activeNav" @navOnClick="nsvOnClick"/>
    <transition name="component-fade" mode="out-in">
      <router-view class="tabContent"/>
    </transition>
  </div>
</template>

<script>
import { mapActions } from 'vuex';
import NavFlex from 'components/Nav/NavFlex.vue';

export default {
  components: {
    NavFlex,
  },
  data() {
    return {
      navs: [
        { name: 'Overview', router: '/site/overview' },
        // { name: 'Devices', router: 'devices' },
        // { name: 'Throughtput' },
        { name: 'Gateway', router: '/site/gateway' },
        { name: 'VPN' },
        { name: 'Event Log' },
        { name: 'Summary Report' },
      ],
      activeNav: 'Overview',
    };
  },
  mounted() {
    this.setGroup('Site');
  },
  methods: {
    ...mapActions('Sidebar', [
      'setGroup',
    ]),
    nsvOnClick(nav) {
      console.log(nav);
      // if (nav.router) this.$router.push(nav.router);
    },
  },
};
</script>

<style scoped lang="scss">
@import '~scss/_function';

nav{
  padding-top: 0px;
}

.tabContent{
  width: 100%;
  height: 100%;
  box-sizing: border-box;
  border-radius: 5px;
}

</style>
