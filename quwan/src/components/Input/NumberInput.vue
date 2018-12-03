<template>
  <input
    :class="inputClass"
    :required="required"
    :readOnly="readOnly"
    :min="min"
    :max="max"
    v-model="userInput"
    :autocomplete="autocomplete ? 'on' : 'off'"
    type="number"
    @input.stop="onInput" >
</template>

<script>
import { debounce } from 'lodash';

export default {
  name: 'QNumberInput',
  props: {
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
    readOnly: {
      type: Boolean,
      default: false,
    },
    min: {
      type: Number,
      default: Infinity,
    },
    max: {
      type: Number,
      default: Infinity,
    },
    defaultValue: {
      type: Number,
      default: 0,
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
        readOnly: this.readOnly,
      };
    },
  },
  mounted() {
    if (this.defaultValue !== '') this.userInput = this.defaultValue;
  },
  methods: {
    onInput: debounce(function () {
      // 'this' would be undifined while using arrow function
      this.$emit('onNumberInput', this.userInput);
    }, 50),
  },
};
</script>
