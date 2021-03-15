<template>
  <b-container style="width: 100%">
    <div style="margin-top: 25vh"></div>
    <b-card style="max-width: 900px; margin: 0 auto; float: none">
      <h2>{{ currentQuestion.question }}</h2>
      <b-list-group flush>
        <b-list-group-item
          v-for="answer in currentQuestion.answers"
          :key="answer.index"
          @click="selectAnswer(answer.index)"
          :class="[answer.isPicked ? 'picked' : '']"
          style="text-align: center"
        >
          <div class="answer-item">
            {{ answer.text }}
          </div>
        </b-list-group-item>
      </b-list-group>
      <div style="margin-bottom: 20px"></div>

      <h2 v-if="gotCorrectAnswer">Correct Answer</h2>
      <div v-if="gotWrongAnswer">
        <h2>Wrong Answer!</h2>
        <h3>Correct Answer: {{ currentQuestion.correctAnswer }}</h3>
      </div>
      <b-button
        v-show="!gotCorrectAnswer && !gotWrongAnswer"
        @click="evaluateAnswer"
        pill
        block
        pressed
        variant="info"
      >
        Submit
      </b-button>
      <b-button
        v-if="gotWrongAnswer || gotCorrectAnswer"
        pill
        block
        pressed
        @click="nextQuestion"
      >
        Next Question
      </b-button>
    </b-card>
  </b-container>
</template>

<script>
import { mapGetters, mapActions } from "vuex";

export default {
  name: "Question",
  methods: {
    // Make sure only one Question can be clicked
    selectAnswer(index) {
      let alreadyPickedQuestion = this.currentQuestion.answers.some(
        (answer) => answer.isPicked && answer.index !== index
      );
      if (!alreadyPickedQuestion) {
        this.currentQuestion.answers.forEach((answer) => {
          if (answer.index === index) {
            answer.isPicked = !answer.isPicked;
          }
        });
      } else {
        // Wackelbewegung auf geklicktes Objekt
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
        alert("Please pick an Answer");
      }
    },

    nextQuestion() {
      // Reset Current Question
      this.currentQuestion = { question: "", answers: [], correctAnswer: "" };
      this.gotCorrectAnswer = false;
      this.gotWrongAnswer = false;

      // Load new Question if there is any.
      if (this.questionsLength > 0) {
        // Get from Vuex
        const nextQuestion = this.getLastQuestion;
        this.popQuestion();
        this.currentQuestion = Object.assign(nextQuestion);
      } else {
        // Do Something when there are no more Questions
        alert("No more Questions - Moving Back to Home");
        this.$router.push("/");
      }
    },
    ...mapActions(["popQuestion"]),
  },

  beforeMount() {
    this.nextQuestion();
  },

  computed: {
    ...mapGetters(["allAPICalls", "questionsLength", "getLastQuestion"]),
  },

  data() {
    return {
      gotCorrectAnswer: false,
      gotWrongAnswer: false,
      questions: [],
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
h2 {
  text-align: center;
}
.container {
  display: inline-block;
  width: 400px;
  max-width: 100%;
}

.answer-item {
  margin: 5px 0px 5px 0px;
  padding: 10px;
  border: 2px solid gray;
}

.picked {
  background-color: steelblue;
}
</style>