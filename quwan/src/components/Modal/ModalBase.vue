<template>
  <div>
    <!-- Bootstrap Modal -->
    <div
      id="exampleModal"
      :class="modalClass"
      :style="modalStyle"
      class="modal fade"
      tabindex="-1"
      role="dialog"
      aria-labelledby="exampleModalLabel"
      aria-hidden="true">
      <div class="modal-dialog" role="document">
        <div class="modal-content">
          <div class="modal-header">
            <h5 id="exampleModalLabel" class="modal-title">Modal title</h5>
            <button type="button" class="close" data-dismiss="modal" aria-label="Close">
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div class="modal-body">
            ...
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
            <button type="button" class="btn btn-primary">Save changes</button>
          </div>
        </div>
      </div>
    </div>
    <div :class="modalModualClass" class="modalModual fade"/>
  </div>
</template>

<script>
export default {
  name: 'Modal',
  data() {
    return {
      showModal: false,
    };
  },
  computed: {
    modalModualClass() {
      return {
        'modal-backdrop': this.showModal,
        show: this.showModal,
        'modal-open': this.showModal,
      };
    },
    modalClass() {
      return {
        show: this.showModal,
      };
    },
    modalStyle() {
      return {
        display: this.showModal ? 'block' : '',
        'padding-right': this.showModal ? 17 : 0,
      };
    },
  },
};
</script>

<style scoped>

</style>
