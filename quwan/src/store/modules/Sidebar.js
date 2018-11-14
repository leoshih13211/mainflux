import * as types from '@/store/mutation-types';

// getters
const getters = {};

// actions
const actions = {
  setGroup({ commit }, group) {
    commit(types.SET_GROUP, group);
  },
};

// mutations
const mutations = {
  [types.SET_GROUP](state, group) {
    state.selectedGroup = group;
  },
};


// initial state
const state = {
  selectedGroup: 'Overview',
};

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations,
};
