<template>
  <div class="SP_JoinAutoVPN">
    <qSwitch
      :default-value="joinAutoVPN"
      @switchEmit="switchEmit"
    />
  </div>
</template>

<script>
import qSwitch from 'components/Input/Switch.vue';

export default {
  components: {
    qSwitch,
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
  computed: {
    joinAutoVPN() {
      return this.rowData.joinAutoVPN;
    },
  },
  methods: {
    switchEmit(value) {
      this.$emit('spCellEmit', {
        name: 'joinAutoVPN',
        rowData: this.rowData,
        value,
      });
    },
  },
};
</script>

<style scoped lang="scss">
.SP_JoinAutoVPN{
  display: flex;
  align-items: center;
  height: 5vh;
  input{
    width: 50px;
  }
}
</style>
