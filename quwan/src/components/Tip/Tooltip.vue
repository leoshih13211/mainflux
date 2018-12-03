<template>
  <div class="qTooltip" @mouseenter.stop="showPopper" @mouseleave="hidePopper">
    <transition name="component-fade" mode="out-in">
      <div v-show="showPop" ref="qPopper" :class="popperClass" class="qPopper">{{ msg }}</div>
    </transition>
    <slot/>
  </div>
</template>

<script>
import Popper from 'popper.js';
import { cloneDeep } from 'lodash';

export default {
  props: {
    msg: {
      type: String,
      default: 'tooltip',
    },
    pos: {
      type: String,
      default: 'bottom',
    },
    options: {
      type: Object,
      default: () => ({}),
    },
  },
  data() {
    return {
      showPop: false,
      popperInstance: {},
      defaultOptions: {
        placement: this.pos,
        modifiers: {
          flip: {
            behavior: ['left', 'bottom', 'top'],
          },
        },
      },
    };
  },
  computed: {
    popperClass() {
      const rs = {
        top: false,
        left: false,
        right: false,
        bottom: false,
      };

      const find = Object.keys(rs)
        .find(key => key === this.pos);

      if (find) rs[this.pos] = true;
      return rs;
    },
  },
  mounted() {
    this.$nextTick(() => {
      if (!this.$slots.default) return;
      const reference = this.$slots.default[0].elm;
      const popper = this.$refs.qPopper;
      let options = {};

      if (Object.keys(this.options).length) options = this.setCustomOptions();
      else options = cloneDeep(this.defaultOptions);

      this.popperInstance = new Popper(reference, popper, options);
    });
  },
  updated() {
    if (this.popperInstance instanceof Popper) {
      this.popperInstance.scheduleUpdate();
    }
  },
  methods: {
    showPopper() {
      this.showPop = true;
    },
    hidePopper() {
      this.showPop = false;
    },
    setCustomOptions() {
      const options = cloneDeep(this.defaultOptions);
      Object.keys(this.options).forEach((key) => {
        if (key in options) Object.assign(options[key], this.options[key]);
      });

      console.log(options);
      return options;
    },
  },
};
</script>
