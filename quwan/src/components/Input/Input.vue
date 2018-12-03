<template>
  <input
    :type="type"
    :class="inputClass"
    :placeholder="placeholder"
    :aria-placeholder="placeholder"
    :required="required"
    :name="type"
    :readOnly="readOnly"
    v-model="userInput"
    :autocomplete="autocomplete ? 'on' : 'off'"
    @input.stop="onInput" >
</template>

<script>
import { debounce } from 'lodash';

export default {
  name: 'QInput',
  props: {
    type: {
      type: String,
      default: 'text',
    },
    placeholder: {
      type: String,
      default: 'Type something here...',
    },
    valid: {
      type: Boolean,
      default: true,
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
    defaultValue: {
      type: String,
      default: '',
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
    console.log(this.defaultValue);
    if (this.defaultValue !== '') this.userInput = this.defaultValue;
  },
  methods: {
    onInput: debounce(function () {
      // 'this' would be undifined while using arrow function
      this.$emit('onInput', this.userInput);
    }, 50),
  },
};
</script>
