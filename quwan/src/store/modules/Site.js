import * as types from '@/store/mutation-types';

// getters
const getters = {
  // checkoutStatus: state => state.checkoutStatus
};

// actions
const actions = {
  setNav({ commit }, nav) {
    commit(types.SET_NAV, nav);
  },
};

// mutations
const mutations = {
  [types.SET_NAV](state, nav) {
    state.activeNav = nav;
  },
};


// initial state
const state = {
  activeNav: 'Overview',
};

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations,
};
