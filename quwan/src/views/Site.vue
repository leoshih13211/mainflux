<template>
  <div>
    <NavFlex :navs="navs" :active-nav="activeNav"/>
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
        { name: 'Device', router: '/site/device' },
        { name: 'Service', router: '/site/service' },
        // { name: 'Gateway', router: '/site/gateway' },
        // { name: 'VPN' },
        { name: 'Device Log', router: '/site/deviceLog' },
        // { name: 'Summary Report', router: '/site/report' },
      ],
      activeNav: 'Overview',
    };
  },
  mounted() {
    this.setGroup('Site Dashboard');
  },
  methods: {
    ...mapActions('Sidebar', [
      'setGroup',
    ]),
  },
};
</script>

<style scoped lang="scss">

nav{
  padding-top: 0px;
}

.tabContent{
  width: 100%;
  box-sizing: border-box;
  border-radius: 5px;
}

</style>
