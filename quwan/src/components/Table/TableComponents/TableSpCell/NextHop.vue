<template>
  <div class="SP_NextHop">
    <SingleSelect
      :selected-cfg="nextHopSelection"
      @optionEmit="optionEmit"/>
    <qInput
      v-if="showIPAddr"
      :placeholder="placeholder"
      :valid="inputValid"
      :default-value="ip"
      autocomplete
      @onInput="onInput"
      @mousedown.native.stop="inputOnClick"
      @blur.native.stop="inputOnBlur"/>
  </div>
</template>

<script>
import SingleSelect from 'components/Select/SingleSelect.vue';
import qInput from 'components/Input/Input.vue';

export default {
  components: {
    SingleSelect,
    qInput,
  },
  props: {
    rowData: {
      type: Object,
      default: () => ({}),
    },
    placeholder: {
      type: String,
      default: '',
    },
    valid: {
      type: Boolean,
      default: true,
    },
  },
  data() {
    return {
      nextHopSelection: {
        defaultValue: 1,
        options: [
          { name: 'Ip Address', value: 1 },
          { name: 'WAN 1', value: 2 },
          { name: 'WAN 2', value: 3 },
          { name: 'Employee', value: 4 },
          { name: 'Guest', value: 5 },
        ],
      },
      nextHopType: 1,
      readOnly: true,
      customIP: '',
    };
  },
  computed: {
    showIPAddr() {
      return this.nextHopType === 1;
    },
    nextHop() {
      return this.rowData.nextHop;
    },
    ip() {
      return this.rowData.ip;
    },
    inputValid() {
      return this.showIPAddr && !!this.customIP;
    },
  },
  created() {
    this.setDefaultOpt();
  },
  mounted() {
    this.setCustomIP();
  },
  methods: {
    optionEmit(value) {
      this.nextHopType = value;
    },
    setDefaultOpt() {
      let defaultVal = 1;
      switch (this.rowData.nextHopType) {
        case 'wan':
          if (this.nextHop === 'WAN1') defaultVal = 2;
          else if (this.nextHop === 'WAN2') defaultVal = 3;
          break;
        case 'lan':
          if (this.nextHop === '7') defaultVal = 4;
          else if (this.nextHop === '9') defaultVal = 5;
          break;
        case 'ip':
        default:
          defaultVal = 1;
          break;
      }
      this.nextHopSelection.defaultValue = defaultVal;
      this.nextHopType = defaultVal;
    },
    setCustomIP() {
      this.customIP = this.ip;
    },
    onInput(value) {
      this.customIP = value;
      this.$emit('spCellEmit', {
        name: 'nextHop',
        rowData: this.rowData,
        value,
      });
    },
    inputOnClick() {
      this.readOnly = false;
    },
    inputOnBlur() {
      this.readOnly = true;
    },
  },
};
</script>

<style scoped lang="scss">
  .SP_NextHop{
    max-width: 300px;
    input{
      width: 50px;
    }
  }
</style>
