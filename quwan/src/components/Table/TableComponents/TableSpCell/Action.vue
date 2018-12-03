<template>
  <div class="SP_Action">
    <i
      v-if="actions.edit"
      ref="editBtn"
      @click.stop="editOnClick"><font-awesome-icon icon="edit" alt="edit"/></i>
    <i
      v-if="actions.delete"
      ref="deleteBtn"
      @click.stop="deletenClick"><font-awesome-icon icon="trash" alt="trash"/></i>
  </div>
</template>

<script>
export default {
  props: {
    rowData: {
      type: Object,
      default: () => ({}),
    },
    actions: {
      type: Object,
      default: () => ({
        edit: true,
        delete: true,
      }),
    },
  },
  methods: {
    editOnClick() {
      this.$emit('spCellEmit', {
        name: 'edit',
        rowData: this.rowData,
        value: this.rowData,
      });
    },
    deletenClick() {
      this.$emit('spCellEmit', {
        name: 'delete',
        rowData: this.rowData,
        value: this.rowData,
      });
    },
  },
};
</script>

<style lang="scss" scoped>
.SP_Action{
  min-width: 6rem;
  i{
    width: 2rem;
    height: 2rem;
    border-radius: 2rem;
    text-align: center;
    cursor: pointer;
    vertical-align: top;
    svg{
      top: 50%;
      position: relative;
      transform: translateY(-50%);
    }
    &:hover{
      background-color: color('light-gray');
    }
  }
}
</style>

