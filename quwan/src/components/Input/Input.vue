<template>
  <input
    :type="type"
    :class="inputClass"
    :placeholder="placeholder"
    :aria-placeholder="placeholder"
    :required="required"
    :name="type"
    v-model="userInput"
    :autocomplete="autocomplete ? 'on' : 'off'"
    @input.stop="onInput" >
</template>

<script>
import { debounce } from 'lodash';

export default {
  name: 'VInput',
  props: {
    type: {
      type: String,
      default: 'text',
    },
    placeholder: {
      type: String,
      default: '',
    },
    valid: {
      type: Boolean,
      default: false,
    },
    required: {
      type: Boolean,
      default: false,
    },
    autocomplete: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      userInput: '',
    };
  },
  computed: {
    inputClass() {
      return {
        invalid: !this.valid,
      };
    },
  },
  methods: {
    onInput: debounce(function () {
      // 'this' would be undifined while using arrow function
      this.$emit('onInput', this.userInput);
    }, 50),
  },
};
</script>

<style scoped lang="scss" />
