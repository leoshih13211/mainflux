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
import _qInputProto from './_qInputProto';

export default {
  name: 'PwInput',
  extends: _qInputProto,
  methods: {
    onInput(pwd) {
      this.$emit('onInput', md5(pwd));
    },
  },
};
</script>

<style scoped>
</style>
