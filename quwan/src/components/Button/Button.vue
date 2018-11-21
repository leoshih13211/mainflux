<template>
  <button :type="type" class="qButton" @click.stop="btnOnClick">
    <slot name="icon_front"/>
    <slot>
      <span class="btnName">{{ name }}</span>
    </slot>
    <slot name="icon_back"/>
  </button>
</template>

<script>
export default {
  name: 'QButton',
  props: {
    name: {
      type: String,
      default: '',
    },
    type: {
      type: String,
      default: 'button',
    },
  },
  methods: {
    btnOnClick(e) {
      this.$emit('btnOnClick', {
        event: e,
        name: this.name,
        type: this.type,
      });
    },
  },
};
</script>

<style scoped lang="scss">
  .btnName{
    vertical-align: middle;
    width: 100%;
    height: 100%;
    display: inline-block;
    display: flex;
    align-items: center;
    justify-content: center;
  }
</style>
