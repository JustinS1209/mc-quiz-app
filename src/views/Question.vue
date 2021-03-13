<template v-if="this.questions.lenght > 0">
  <b-container>
    <div style="margin-top: 25vh"></div>
    <b-card>
      <h2>{{ currentQuestion.question }}</h2>
      <b-list-group>
        <!-- Maybe Refactor Styled Radiobuttons -->
        <b-list-group-item
          v-for="answer in currentQuestion.answers"
          :key="answer.index"
          @click="selectAnswer(answer.index)"
          :class="[answer.isPicked ? 'picked' : '']"
          style="
            margin-top: 5px;
            margin-bottom: 10px;
            border: 1px solid gray;
            border-radius: 10px;
          "
        >
          {{ answer.text }}
        </b-list-group-item>
      </b-list-group>
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
export default {
  name: "Question",

  methods: {
    // Make sure only one Question can be clicked
    selectAnswer(index) {
      console.log(index);
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
      if (this.questions.length > 0) {
        const nextQuestion = this.questions.pop();
        this.currentQuestion.question = nextQuestion.question;

        // Clean ASCII  Characters
        this.currentQuestion.question = this.replaceHTMLEncoding(
          this.currentQuestion.question
        );
        this.currentQuestion.correctAnswer = nextQuestion.correct_answer;
        let answers = nextQuestion.incorrect_answers;
        answers.push(nextQuestion.correct_answer);
        answers.forEach((answer) => this.replaceHTMLEncoding(answer));

        // Prepare Answer Objects.
        this.currentQuestion.answers = answers.map((answer, index) => {
          const obj = {};
          obj["text"] = answer;
          obj["index"] = index;
          obj["isPicked"] = false;
          return obj;
        });

        // Shuffle the Answers
        this.currentQuestion.answers = this.shuffle(
          this.currentQuestion.answers
        );
      } else {
        // Do Something when there are no more Questions
        alert("No more Questions");
      }
    },
    replaceHTMLEncoding(string) {
      string = string
        .replaceAll("&quot;", '"')
        .replaceAll("&#039;", "‘")
        .replaceAll("&rdquo;", '"')
        .replaceAll("&rldquo;", '"')
        .replaceAll("&ouml;", "ö")
        .replaceAll("&auml;", "ä")
        .replaceAll("&deg;,", "°");

      return string;
    },

    shuffle(a) {
      for (let i = a.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [a[i], a[j]] = [a[j], a[i]];
      }
      return a;
    },
  },
  async mounted() {
    // Make API Calls and safe to questions array
    const calls = Array.from(this.apiCalls);
    for (let i = 0; i < calls.length; i++) {
      const res = await fetch(calls[i]);
      const data = await res.json();
      const questions = data.results;
      this.questions.push(...questions);
    }

    // Shuffle the Questions
    this.questions = this.shuffle(this.questions);
    console.log(this.questions);

    this.nextQuestion();
    // Shuffle damit die Reihenfolge nicht Erkennbar ist
    // Parser der &quot etc. zu den entsprechenden ASCII Zeichen konvertiert
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

  props: {
    apiCalls: Array,
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

.picked {
  border: 2px solid steelblue;
}
</style>