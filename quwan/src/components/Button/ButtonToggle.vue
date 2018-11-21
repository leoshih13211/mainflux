<template>
  <div class="btn-group btnToggle-group">
    <Button
      v-for="(btn, index) in data"
      :key="index"
      :name="btn.name"
      :class="{active: btn.name === btnActive }"
      class="btnToggle"
      @btnOnClick="btnOnClick"/>
  </div>
</template>

<script>
import Button from './Button.vue';

export default {
  name: 'ButtonToggle',
  components: {
    Button,
  },
  props: {
    data: {
      type: Array,
      default: () => [],
    },
    pos: {
      type: String,
      default: 'left',
    },
  },
  data() {
    return {
      btnActive: '',
    };
  },
  mounted() {
    if (!this.data.length) return;
    this.btnActive = this.data
      .find(d => d.active)
      .name;
  },
  methods: {
    btnOnClick(emitData) {
      this.btnActive = emitData.name;
      this.$emit('btnToggleEmit', emitData);
    },
  },
};
</script>

<style scoped lang="scss">
$btn-color: theme-color('light-gray');
// $btn-bg-active: color('white');
$btn-bg-active: color('blue');
$btn-color-active: color('white');

.btnToggle-group{
  margin-bottom: 20px;
  .btnToggle{
    height: 25px;
    margin: 0px;
    background-color: transparent;
    transition: all .3s;
    /* overwrite */
    min-height: 25px;
    line-height: 10px;
    font-size: .8rem;
    min-width: 80px;
    &.active{
      background-color: $btn-bg-active;
      color: $btn-color-active;
      transition: all .3s;
    }
    &:not(:last-child){
      border-right: none;
      border-top-right-radius: 0;
      border-bottom-right-radius: 0;
    }
    &:last-child{
      border-top-left-radius: 0;
      border-bottom-left-radius: 0;
    }
    &:focus{
      outline: none;
    }
  }
}
</style>
