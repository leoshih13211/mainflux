<template>
  <div class="SP_Desc">
    <qTextarea
      :valid="valid"
      :default-value="description"
      :read-only="readOnly"
      @mousedown.native.stop="inputOnClick"
      @blur.native.stop="inputOnBlur"
      @textareaEmit="textareaEmit"
    />
  </div>
</template>

<script>
import qTextarea from 'components/Input/Textarea.vue';

export default {
  components: {
    qTextarea,
  },
  props: {
    placeholder: {
      type: String,
      default: '',
    },
    valid: {
      type: Boolean,
      default: true,
    },
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
    description() {
      return this.rowData.description;
    },
  },
  methods: {
    inputOnClick() {
      this.readOnly = false;
    },
    inputOnBlur() {
      this.readOnly = true;
    },
    textareaEmit(value) {
      this.$emit('spCellEmit', {
        name: 'description',
        rowData: this.rowData,
        value,
      });
    },
  },
};
</script>

<style scoped lang="scss">
.SP_Desc{
  textarea{
    max-width: 100px;
  }
}
</style>
