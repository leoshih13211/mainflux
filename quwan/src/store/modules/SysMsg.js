import * as types from '@/store/mutation-types';

// getters
// const getters = {};

// actions
const actions = {
  setSysMsg({ commit }, data) {
    commit(types.SET_MSG, data);
  },
  clearSysMsg({ commit }) {
    commit(types.CLEAR_MSG);
  },
};

// mutations
const mutations = {
  [types.SET_MSG](state, { type = '', msg = '' }) {
    state.type = type;
    state.msg = msg;
  },
  [types.CLEAR_MSG](state) {
    state.type = '';
    state.msg = '';
  },
};

// initial state
const state = {
  type: '',
  msg: '',
};

export default {
  namespaced: true,
  state,
  // getters,
  actions,
  mutations,
};
