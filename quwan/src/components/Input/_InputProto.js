import qInput from './Input.vue';

const vInputProto = {
  components: {
    qInput,
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
  },
};

export default vInputProto;
