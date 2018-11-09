<template>
  <div class="sidebar">
    <div
      v-for="(group, index) in groups"
      :key="index"
      :class="{selected: groupSelected === group.name}"
      class="group">
      <span>{{ group.name }}</span>
      <div
        v-for="(sub, subIndex) in group.children"
        :key="subIndex"
        class="subGroup"
        @click="subGroupOnclick(sub)">{{ sub.name }}</div>
    </div>
</div></template>

<script>
export default {

  name: 'Sidebar',
  data() {
    return {
      /*
        groups: [
          { name: '', router: '', children:[], icon: '' },
        ]
       */
      groups: [
        {
          name: 'Organization',
          children: [
            { name: 'Map', router: '/' },
          ],
        },
        {
          name: 'Site',
          children: [
            { name: 'Monitor', router: '/site/monitor', children: this.siteMonitorItems },
            { name: 'Setting', router: '/site/setting', children: this.siteSettingItems },
          ],
        },
      ],
      siteMonitorItems: [],
      siteSettingItems: [],
      groupSelected: 'Dashboard',
    };
  },
  methods: {
    subGroupOnclick(group) {
      this.groupSelected = group.name;
      this.$router.push(group.router);
    },
  },
};
</script>

<style scoped lang='scss'>
@import '~scss/_function';
$theme-primary: theme-color('primary');

.sidebar{
  background-color: lighten($theme-primary, 3%);
  width: 10vw;
  height: 100%;
  max-width: 230px;
  min-width: 200px;
  .group{
    color: color('dark-gray');
    min-height: 40px;
    padding-left: 20px;
    display: flex;
    flex-wrap: wrap;
    align-items: center;
  }
  .subGroup{
    width: 100%;
    padding: 10px 20px;
    cursor: pointer;
    &:hover{
      color: color('light-gray');
      background-color: darken($theme-primary, 3%);
    }
    &.selected{
      color: color('white');
      background-color: darken($theme-primary, 5%);
    }
  }
}
</style>
