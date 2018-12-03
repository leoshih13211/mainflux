<template>
  <div class="SP_Subnet">
    <qInput
      :valid="valid"
      :default-value="subnet"
      :read-only="readOnly"
      @click.native.stop="inputOnClick"
      @blur.native.stop="inputOnBlur"
      @onInput="onInput"
    />
  </div>
</template>

<script>
import _inputProto from 'components/Input/_Input_Proto';

export default {
  extends: _inputProto,
  props: {
    rowData: {
      type: Object,
      default: () => ({}),
    },
  },
  data() {
    return {
      readOnly: true,
    };
  },
  computed: {
    subnet() {
      return this.rowData.subnet;
    },
  },
  methods: {
    inputOnClick() {
      this.readOnly = false;
    },
    inputOnBlur() {
      this.readOnly = true;
    },
    onInput(value) {
      this.$emit('spCellEmit', {
        name: 'subnet',
        rowData: this.rowData,
        value,
      });
    },
  },
};
</script>

<style scoped lang="scss">
.SP_Subnet{
  input{
    max-width: 120px;
  }
}
</style>
