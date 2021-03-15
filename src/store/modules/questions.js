const state = {
  calls: [],
  questions: [],
  loadingQuestions: true,
};
const getters = {
  allAPICalls: (state) => state.calls,
  allQuestions: (state) => state.questions,
  getLastQuestion: (state) => state.questions[state.questions.length - 1],
  questionsLength: (state) => state.questions.length,
  getLoadingQuestions: (state) => state.loadingQuestions,
};
const actions = {
  generateAPICall({ commit }, apiCall) {
    commit('setAPICall', apiCall);
  },

  // Makes API Calls and Cleans the Questions
  async makeAPICalls({ commit, getters }) {
    const calls = getters.allAPICalls;
    let questions = [];

    for (let i = 0; i < calls.length; i++) {
      const res = await fetch(calls[i]);
      const data = await res.json();
      questions = data.results;
    }

    questions = questions.map((question) => {
      const qObj = {};
      qObj.question = replaceHTMLEncoding(question.question);

      qObj.correctAnswer = replaceHTMLEncoding(question.correct_answer);
      let answers = question.incorrect_answers;
      answers.push(qObj.correctAnswer);
      answers.forEach((answer) => replaceHTMLEncoding(answer));

      qObj.answers = answers.map((answer, index) => {
        const obj = {};
        obj['text'] = answer;
        obj['index'] = index;
        obj['isPicked'] = false;
        return obj;
      });
      qObj.answers = shuffle(qObj.answers);

      return qObj;
    });

    commit('setQuestions', questions);
    commit('toggleLoading');
  },
  popQuestion({ commit }) {
    commit('popQuestion');
  },
};
const mutations = {
  setAPICall: (state, call) => state.calls.push(call),
  setQuestions: (state, questions) => state.questions.push(...questions),
  toggleLoading: (state) => (state.loadingQuestions = !state.loadingQuestions),
  popQuestion: (state) => state.questions.pop(),
};

export default {
  state,
  getters,
  actions,
  mutations,
};

/* Helper Methods */

function replaceHTMLEncoding(string) {
  string = string
    .replaceAll('&quot;', '"')
    .replaceAll('&#039;', '‘')
    .replaceAll('&rdquo;', '"')
    .replaceAll('&rldquo;', '"')
    .replaceAll('&ouml;', 'ö')
    .replaceAll('&auml;', 'ä')
    .replaceAll('&deg;,', '°');

  return string;
}

function shuffle(a) {
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}
