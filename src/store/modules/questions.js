const state = {
  calls: [],
};
const getters = {
  allAPICalls: (state) => state.calls,
};
const actions = {
  createAPICall({ commit }, apiCall) {
    commit('setAPICall', apiCall);
  },

  /*
  async fetchCategoriesTEST({ commit }) {
    const response = await fetch('https://opentdb.com/api.php?amount=2');
    const data = await response.json();
    commit('setQuestions', data);
  },
  */
};
const mutations = {
  setAPICall: (state, call) => state.calls.push(call),
};

export default {
  state,
  getters,
  actions,
  mutations,
};
