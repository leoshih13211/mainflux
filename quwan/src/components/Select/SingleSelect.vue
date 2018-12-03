<template>
  <select v-model="selected" class="qSelect" @change.stop="optionOnChange">
    <option
      v-for="(opt, idx) in options"
      :key="idx"
      :value="opt.value"
    >{{ opt.name }}</option>
  </select>
</template>

<script>
export default {
  props: {
    selectedCfg: {
      type: Object,
      default: () => ({}),
    },
  },
  data() {
    return {
      selected: '',
    };
  },
  computed: {
    options() {
      return this.selectedCfg.options;
    },
    defaultValue() {
      return this.selectedCfg.defaultValue || '';
    },
  },
  mounted() {
    this.selected = this.defaultValue;
  },
  methods: {
    optionOnChange() {
      this.$emit('optionEmit', this.selected);
    },
  },
};
</script>

<style scoped>

</style>
