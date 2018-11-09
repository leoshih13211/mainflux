import * as types from '@/store/mutation-types';

// getters
const getters = {
  getAllDialogs: state => state.dialogs,
  findDialog: state => keyword => state.dialogs.find(d => d.dialogType === keyword),
};

// actions
const actions = {
  open({ commit }, { type = '', config = {} }) {
    commit(types.DIALOG_OPEN, { type, config });
  },
  update({ commit }, { type = '', config = {} }) {
    commit(types.DIALOG_UPDATE, { type, config });
  },
  close({ commit }, { type = '' }) {
    commit(types.DIALOG_CLOSE, { type });
  },
};

// mutations
const mutations = {
  [types.DIALOG_OPEN](state, { type, config }) {
    const obj = {};
    if (state.typeIndex[type] !== undefined) return;
    obj.dialogType = type;
    obj.dialogCfg = config;

    state.dialogs.push(obj);
    state.typeIndex[type] = state.dialogs.length - 1;
  },
  [types.DIALOG_UPDATE](state, { type, config }) {
    if (state.typeIndex[type] === undefined) return;
    const index = state.typeIndex[type];
    state.dialogs[index].dialogCfg = JSON.parse(JSON.stringify(config));
  },
  [types.DIALOG_CLOSE](state, { type }) {
    const index = state.typeIndex[type];
    if (index === undefined) return;
    state.dialogs = state.dialogs.filter(d => d.dialogType !== type);
    state.typeIndex[type] = undefined;
  },
};

// initial state
const state = {
  dialogs: [],
  typeIndex: {}, // 紀錄各個dialog在dialogs內位置的索引值
};


export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations,
};
