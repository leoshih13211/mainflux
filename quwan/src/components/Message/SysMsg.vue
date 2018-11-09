<template>
  <div :class="mxClass" class="qMsg">
    <i class="symbol">
      <font-awesome-icon v-if="msgSymbol" :icon="msgSymbol" pull="left" />
    </i>
    <span>{{ dispalyMsg }}</span>
    <i class="closeMsg" @click="removeSysMsg">
      <font-awesome-icon icon="times" pull="left" />
    </i>
  </div>
</template>

<script>
import { mapActions } from 'vuex';

export default {
  name: 'SystemMsg',
  props: {
    type: {
      type: String,
      default: '',
    },
    msg: {
      type: String,
      default: '',
    },
  },
  data() {
    return {
      defaultMsg: {
        success: 'Congratulations! It works.',
        warning: 'You got a warning',
        danger: 'A new error occored',
        info: 'You got a new infomation',
      },
      timer: null,
    };
  },
  computed: {
    getType() {
      const type = this.type.toLowerCase();

      if (type in this.defaultMsg) return type;
      return '';
    },
    mxClass() {
      const className = `qMsg-${this.getType}`;
      return {
        [className]: true,
        show: this.show,
      };
    },
    iconClass() {
      return {
        'icon-alert': this.type === 'danger',
      };
    },
    dispalyMsg() {
      let type = this.getType;
      let letterArr = [];
      const msg = this.msg || this.defaultMsg[this.type];
      if (!type) return '';

      letterArr = type.split('');
      letterArr[0] = letterArr[0].toUpperCase();
      type = letterArr.join('');

      return `${msg}`;
    },
    msgSymbol() {
      let symbol = '';
      switch (this.type) {
        case 'danger':
          symbol = 'times';
          break;
        case 'success':
          symbol = 'check';
          break;
        default:
          break;
      }
      return symbol;
    },
    show() {
      return !!(this.type || this.msg);
    },
  },
  watch: {
    show(state) {
      if (!state) {
        this.removeSysMsg();
        return;
      }

      // this.show = true;
      this.timer = setTimeout(() => {
        // this.show = false;
        this.timer = null;
        setTimeout(() => {
          this.clearSysMsg();
        }, 500);
      }, 5000);
    },
  },
  beforeDestroy() {
    this.removeSysMsg();
  },
  methods: {
    ...mapActions('SysMsg', [
      'clearSysMsg',
    ]),
    clearTimer() {
      clearTimeout(this.timer);
      this.timer = null;
    },
    removeSysMsg() {
      // this.show = false;
      this.clearTimer();
      this.clearSysMsg();
    },
  },
};
</script>

<style scoped lang="scss">
  .closeMsg{
    position: absolute;
    right: 0px;
    cursor: pointer;
  }
</style>
