<template>
  <textarea
    ref="textarea"
    :class="textareaClass"
    :placeholder="placeholder"
    :aria-placeholder="placeholder"
    :required="required"
    :readOnly="readOnly"
    v-model="userInput"
    :cols="cols"
    :rows="rows"
    @input.stop="onInput" />
</template>

<script>
import { debounce } from 'lodash';

export default {
  name: 'QTextarea',
  props: {
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
    readOnly: {
      type: Boolean,
      default: false,
    },
    defaultValue: {
      type: String,
      default: '',
    },
    rows: {
      type: Number,
      default: 1,
    },
    cols: {
      type: Number,
      default: 15,
    },
  },
  data() {
    return {
      userInput: '',
    };
  },
  computed: {
    textareaClass() {
      return {
        invalid: !this.valid,
        readOnly: this.readOnly,
      };
    },
  },
  mounted() {
    if (this.defaultValue !== '') this.userInput = this.defaultValue;
    this.$nextTick(() => {
      this.setAutosize();
    });
  },
  methods: {
    onInput: debounce(function (e) {
      const { target } = e;
      target.style.height = 'auto';
      target.style.height = `${target.scrollHeight}px`;
      // 'this' would be undifined while using arrow function
      this.$emit('textareaEmit', this.userInput);
    }, 50),
    setAutosize() {
      const tx = this.$refs.textarea;
      tx.setAttribute('style', `height:${tx.scrollHeight}px;overflow-y:hidden;`);
    },
  },
};
</script>
