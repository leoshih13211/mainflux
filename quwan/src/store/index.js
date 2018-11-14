import Vue from 'vue';
import Vuex from 'vuex';
import Sidebar from './modules/Sidebar';
import SysMsg from './modules/SysMsg';
import Dialog from './modules/Dialog';
import Site from './modules/Site';

Vue.use(Vuex);

const debug = process.env.NODE_ENV !== 'production';

export default new Vuex.Store({
  modules: {
    Sidebar,
    SysMsg,
    Dialog,
    Site,
  },
  strict: debug,
});
