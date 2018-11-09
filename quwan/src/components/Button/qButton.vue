<template>
  <button :type="type" class="qButton">
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
};
</script>

<style scoped lang="scss">
  .btnName{
    vertical-align: middle;
    height: 100%;
    display: inline-block;
    display: flex;
    align-items: center;
    justify-content: center;
  }
</style>
