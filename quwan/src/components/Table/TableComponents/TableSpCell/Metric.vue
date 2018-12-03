<template>
  <div>
    <NumberInput
      :valid="valid"
      :default-value="metric"
      :read-only="readOnly"
      autocomplete
      @onNumberInput="onNumberInput"
      @mousedown.native.stop="inputOnClick"
      @blur.native.stop="inputOnBlur"/>
  </div>
</template>

<script>
import NumberInput from 'components/Input/NumberInput.vue';

export default {
  components: {
    NumberInput,
  },
  props: {
    rowData: {
      type: Object,
      default: () => ({}),
    },
    valid: {
      type: Boolean,
      default: true,
    },
  },
  data() {
    return {
      readOnly: true,
    };
  },
  computed: {
    metric() {
      return this.rowData.metric;
    },
  },
  methods: {
    inputOnClick() {
      this.readOnly = false;
    },
    inputOnBlur() {
      this.readOnly = true;
    },
    onNumberInput(value) {
      console.log(value);
      this.$emit('spCellEmit', {
        name: 'metric',
        rowData: this.rowData,
        value,
      });
    },
  },
};
</script>

<style scoped lang="scss">
  input{
    max-width: 50px;
  }
</style>
