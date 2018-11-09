<template>
  <qButton :name="name">
    <template slot="icon_front">
      <img :src="frontIcon" class="iconFront">
    </template>
    <template slot="icon_back">
      <img v-if="backIcon" :src="backIconPath" class="iconBack">
    </template>
  </qButton>
</template>
<script>
import qButton from './qButton.vue';

export default {
  name: 'QIconButton',
  components: {
    qButton,
  },
  props: {
    name: {
      type: String,
      default: '',
    },
    frontIcon: {
      type: String,
      default: '',
    },
    backIcon: {
      type: String,
      default: '',
    },
  },
  data() {
    return {
      assetsPath: '../../assets/',
    };
  },
  computed: {
    frontIconPath() {
      return this.assetsPath + this.frontIcon;
    },
    backIconPath() {
      return this.assetsPath + this.backIcon;
    },
  },
};
</script>

<style scoped lang="scss">
  img{
    height: 100%;
    padding: 5px;
    &.iconFront{
      float: left;
      border-right: 1px solid #d4d4d4;
      padding-right: 10px;
    }
    &.iconBack{
      float: left;
      border-left: 1px solid #d4d4d4;
      padding-left: 10px;
    }
  }
</style>
