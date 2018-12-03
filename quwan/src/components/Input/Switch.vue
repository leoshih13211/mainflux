<template>
  <label class="Switch" @change="onChange">
    <input
      :readOnly="readOnly"
      :checked="value"
      type="checkbox"
    >
    <span class="slider round"/>
  </label>
</template>

<script>
export default {
  props: {
    defaultValue: {
      type: Boolean,
      default: false,
    },
    readOnly: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      value: false,
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
  created() {
    /* Event: mousedown-->mousemove-->mouseup-->click */
    this.value = this.defaultValue;
  },
  methods: {
    onChange() {
      this.value = !this.value;
      this.$emit('switchEmit', this.value);
    },
  },
};
</script>
