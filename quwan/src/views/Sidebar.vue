<template>
  <div class="sidebar">
    <div
      v-for="(group, index) in groups"
      :key="index"
      class="group">
      <span
        :class="{selected: selectedGroup === group.name}"
        class="groupName"
        @click="groupOnclick(group)">
        {{ group.name }}
        <i v-if="group.children" :class="{open: group.showChildren}"><font-awesome-icon
          icon="caret-up"/></i>
      </span>
      <div
        v-for="(sub, subIndex) in group.children"
        v-show="group.showChildren"
        :key="subIndex"
        class="subGroup">
        <span
          :class="{selected: selectedGroup === sub.name}"
          class="subGroupName"
          @click="subGroupOnclick(sub)">{{ sub.name }}</span>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState, mapActions } from 'vuex';

export default {
  name: 'Sidebar',
  data() {
    return {
      /*
        groups: [
          { name: '', router: '', children:[]},
        ]
       */
      groups: [
        { name: 'Overview', router: '/overview' },
        { name: 'Site', router: '/site' },
        { name: 'eMap', router: '/' },
        { name: 'System Status', router: '/' },
        { name: 'Static Route', router: '/' },
        { name: 'Network Status', router: '/' },
        {
          name: 'Report',
          children: [
            { name: 'Traffic', router: '/' },
            { name: 'Optimization', router: '/' },
          ],
        },
      ],
      siteMonitorItems: [],
      siteSettingItems: [],
    };
  },
  computed: {
    ...mapState('Sidebar', [
      'selectedGroup',
    ]),
  },
  methods: {
    ...mapActions('Sidebar', [
      'setGroup',
    ]),
    groupOnclick(group) {
      if (!group.children) {
        this.setGroup(group.name);
        this.$router.push(group.router);
      } else this.toggleGroup(group);
    },
    subGroupOnclick(subGroup) {
      this.setGroup(subGroup.name);
      this.$router.push(subGroup.router);
    },
    toggleGroup(group) {
      if (group.showChildren === undefined) this.$set(group, 'showChildren', false);
      group.showChildren = !group.showChildren;
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
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    cursor: pointer;
    box-sizing: border-box;
  }
  .subGroup{
    width: 100%;
    cursor: pointer;
  }
  .groupName, .subGroupName{
    display: inline-block;
    width: 100%;
    position: relative;
    &:hover{
      color: color('light-gray');
      background-color: darken($theme-primary, 3%);
    }
    &.selected{
      color: color('white');
      background-color: darken($theme-primary, 5%);
      &:after{
        content: '';
        width: 10px;
        border-right: color('gray') solid 10px;
        height: 44px;
        display: inline-block;
        position: absolute;
        right: 0px;
        top: 0px;
        border-top: solid 22px darken($theme-primary, 5%);;
        border-bottom: solid 22px darken($theme-primary, 5%);;
      }
    }
  }
  i{
      position: absolute;
      right: 0;
      top: 50%;
      transform: translateY(-50%) translateX(-50%) rotate(0deg);
      svg{
        transition: all .5s;
      }
      &.open svg{
        transform: rotate(-180deg);
      }
  }
  .groupName{
    padding-top: 10px;
    padding-bottom: 10px;
    padding-left: 20px;
  }
  .subGroupName{
    padding: 10px 40px;
  }
}
</style>
