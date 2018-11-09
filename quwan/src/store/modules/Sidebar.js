import * as types from '@/store/mutation-types';

// getters
const getters = {};

// actions
const actions = {
  setGroup({ commit }, group) {
    commit(types.SET_TOPIC, group);
  },
};

// mutations
const mutations = {
  [types.SET_TOPIC](state, group) {
    state.selectedGroup = group;
  },
};


// initial state
const state = {
  selectedGroup: '',
};

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations,
};
