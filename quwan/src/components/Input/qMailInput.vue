<template>
  <qInput
    :placeholder="placeholder"
    :valid="valid"
    type="email"
    required
    autocomplete
    @onInput="onInput"/>
</template>

<script>
import _qInputProto from './_qInputProto';

export default {
  name: 'MailInput',
  extends: _qInputProto,
  methods: {
    onInput(email) {
      this.$emit('onInput', email);
    },
  },
};
</script>

<style scoped >

</style>
