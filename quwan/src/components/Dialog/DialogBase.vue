<template>
  <div class="Mask">
    <div :class="dgClassObj" class="dialog">
      <div class="head">
        <div class="headbtnlayout">
          <div class="btn close" >
            <slot name="altCloseIcon" />
          </div>
        </div>
        <div class="headtext">
          <slot name="dgHead"/>
        </div>
        <div class="subheadtext" >
          <slot name="dgSubHead"/>
        </div>
        <slot name="dgNaviHead" />
      </div>
      <div class="body">
        <slot name="dgBody"/>
      </div>
      <div ref="buttons" class="buttons">
        <slot name="btnLayout"/>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'DialogBase',
  props: {
    cfg: {
      type: Object,
      default: () => ({}),
    },
    dgClass: {
      type: Array,
      default: () => [],
    },
    dgType: {
      type: String,
      default: '',
    },
    closeBtnClass: {
      type: Array,
      default: () => [],
    },
  },
  computed: {
    dgClassObj() {
      const obj = {};
      this.dgClass.forEach((className) => {
        obj[className] = true;
      });
      return obj;
    },
  },
};
</script>

