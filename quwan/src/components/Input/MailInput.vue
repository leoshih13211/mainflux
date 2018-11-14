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
import _InputProto from './_InputProto';

export default {
  name: 'MailInput',
  extends: _InputProto,
  methods: {
    onInput(email) {
      this.$emit('onInput', email);
    },
  },
};
</script>

<style scoped >

</style>
