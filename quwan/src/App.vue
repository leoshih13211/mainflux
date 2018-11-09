<template>
  <div id="app">
    <SysMsg :type="sysMsgType" :msg="sysMsg"/>
    <transition name="component-fade" mode="out-in">
      <router-view/>
    </transition>
    <qDialog
      v-for="(dialog, index) in dialogs"
      :key="index"
      :dialog-config="dialog.dialogCfg"
      :dialog-type="dialog.dialogType"/>
  </div>
</template>

<script>
import Home from 'views/Home.vue';
import Login from 'views/Login.vue';
import SignUp from 'views/SignUp.vue';
import qDialog from 'components/Dialog/qDialog.vue';
import SysMsg from 'components/Message/SysMsg.vue';
import { mapState } from 'vuex';

export default {
  components: {
    Home,
    Login,
    SignUp,
    SysMsg,
    qDialog,
  },
  computed: {
    ...mapState('SysMsg', {
      sysMsgType: 'type',
      sysMsg: 'msg',
    }),
    ...mapState('Dialog', [
      'dialogs',
    ]),
  },
};
</script>

<style lang='scss' src="scss/quwan.scss">
</style>
