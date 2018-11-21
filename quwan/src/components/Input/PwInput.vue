<template>
  <qInput
    :placeholder="placeholder"
    :valid="valid"
    type="password"
    required
    @onInput="onInput" />
</template>

<script>
import md5 from 'md5';
import _InputProto from './_Input_Proto';

export default {
  name: 'PwInput',
  extends: _InputProto,
  methods: {
    onInput(pwd) {
      this.$emit('onInput', md5(pwd));
    },
  },
};
</script>

<style scoped>
</style>
