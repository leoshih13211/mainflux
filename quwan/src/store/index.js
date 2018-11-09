import Vue from 'vue';
import Vuex from 'vuex';
import SysMsg from './modules/SysMsg';
import Dialog from './modules/Dialog';

Vue.use(Vuex);

const debug = process.env.NODE_ENV !== 'production';

export default new Vuex.Store({
  modules: {
    SysMsg,
    Dialog,
  },
  strict: debug,
});
