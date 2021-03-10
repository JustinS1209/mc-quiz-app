<template>
  <div class="container">
    <h2>{{ currentQuestion.question }}</h2>
    <ul>
      <li
        v-for="(answer, index) in currentQuestion.answers"
        :key="index"
        @click="selectQuestion(index)"
        :class="[answer.isPicked ? 'picked' : '']"
      >
        {{ answer.text }}
      </li>
    </ul>
    <h2 v-if="gotCorrectAnswer">Correct Answer</h2>
    <div v-if="gotWrongAnswer">
      <h2>Wrong Answer!</h2>
      <h3>Correct Answer: {{ currentQuestion.correctAnswer }}</h3>
    </div>
    <button
      v-show="!gotCorrectAnswer && !gotWrongAnswer"
      class="btn"
      @click="evaluateAnswer"
    >
      Submit
    </button>
    <button
      v-if="gotWrongAnswer || gotCorrectAnswer"
      class="btn"
      @click="nextQuestion"
    >
      Next Question
    </button>
  </div>
</template>

<script>
export default {
  name: "Question",

  methods: {
    // Make sure only one Question can be clicked
    selectQuestion(index) {
      let alreadyPickedQuestion = this.currentQuestion.answers.some(
        (answer) => answer.isPicked && answer.index !== index
      );

      if (!alreadyPickedQuestion) {
        this.currentQuestion.answers[index].isPicked = !this.currentQuestion
          .answers[index].isPicked;
      }
    },
    evaluateAnswer() {
      let questionPicked = this.currentQuestion.answers.filter(
        (answer) => answer.isPicked
      );
      if (questionPicked.length > 0) {
        const guess = questionPicked[0].text;
        const correctAnswer = this.currentQuestion.correctAnswer;

        if (guess === correctAnswer) {
          this.gotCorrectAnswer = true;
        } else {
          this.gotWrongAnswer = true;
        }
      } else {
        alert("Please pick a Question");
      }
    },

    async nextQuestion() {
      this.currentQuestion = { question: "", answers: [], correctAnswer: "" };
      this.gotCorrectAnswer = false;
      this.gotWrongAnswer = false;

      const test = await this.fetchQuestion();

      const randomQuestion = test;
      this.currentQuestion.question = randomQuestion.question;

      this.currentQuestion.correctAnswer = randomQuestion.correct_answer;

      const answers = randomQuestion.incorrect_answers;
      answers.push(randomQuestion.correct_answer);

      this.currentQuestion.answers = answers.map((answer, index) => {
        const obj = {};
        obj["text"] = answer;
        obj["index"] = index;
        obj["isPicked"] = false;
        return obj;
      });
    },

    async fetchQuestion() {
      const res = await fetch("https://opentdb.com/api.php?amount=1");
      const data = await res.json();
      const question = data.results[0];

      return question;
    },
  },

  created() {
    this.nextQuestion();
    // Shuffle damit die Reihenfolge nicht Erkennbar ist
    // Parser der &quot etc. zu den entsprechenden ASCII Zeichen konvertiert
  },

  data() {
    return {
      gotCorrectAnswer: false,
      gotWrongAnswer: false,

      currentQuestion: {
        question: "",
        answers: [],
        correctAnswer: "",
      },
    };
  },
};
</script>

<style scoped>
.container {
  display: inline-block;
  width: 400px;
  max-width: 100%;
}

ul {
  justify-content: center;
  list-style: none;
  margin-top: 100px;
}

li {
  padding: 10px;
  font-weight: 900;
  font-size: 1.5rem;
  border: 1px solid #565656;
  margin-top: 15px;
  text-align: center;
}

li.picked {
  border: 2px solid steelblue;
}
</style>