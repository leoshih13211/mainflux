<template>
  <qButton :name="name" class="buttonIcon">
    <template slot="icon_front">
      <img v-if="frontImage" :src="frontImage" class="iconFront">
      <font-awesome-icon v-if="frontFa" :icon="frontFa"/>
    </template>
    <template slot="icon_back">
      <img v-if="backImage" :src="backImage" class="iconBack">
      <font-awesome-icon v-if="backFa" :icon="backFa"/>
    </template>
  </qButton>
</template>
<script>
import qButton from './Button.vue';

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
    frontImage: {
      type: String,
      default: '',
    },
    backImage: {
      type: String,
      default: '',
    },
    frontFa: {
      type: String,
      default: '',
    },
    backFa: {
      type: String,
      default: '',
    },
  },
  data() {
    return {
    };
  },
};
</script>

<style scoped lang="scss">
  .buttonIcon{
    padding: 0px 11px;

  }
  img{
    height: 100%;
    max-width: 70px;
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
