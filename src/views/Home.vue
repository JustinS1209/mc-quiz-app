<template>
  <div class="container">
    <h2>Choose some Categories</h2>
    <form action="#">
      <input
        type="checkbox"
        id="general_knowledge"
        :value="{ name: 'general_knowledge', id: 9 }"
        v-model="checkedCategories"
      />
      <label for="general_knowledge">General Knowledge</label>
      <br />
      <input
        type="checkbox"
        id="science_and_nature"
        :value="{ name: 'science_and_nature', id: 17 }"
        v-model="checkedCategories"
      />
      <label for="science_and_nature">Science & Nature</label>
      <br />
      <input
        type="checkbox"
        id="mythology"
        :value="{ name: 'mythology', id: 20 }"
        v-model="checkedCategories"
      />
      <label for="mythology">Mythology</label>
      <br />
    </form>
    <h2>How difficult should the Quiz be?</h2>
    <form action="#">
      <input type="radio" id="easy" v-model="difficulty" value="easy" />
      <label for="easy">Easy</label>
      <br />
      <input type="radio" id="medium" v-model="difficulty" value="medium" />
      <label for="medium">Medium</label>
      <br />
      <input type="radio" id="hard" v-model="difficulty" value="hard" />
      <label for="hard">Hard</label>
      <br />
    </form>
    <h2>How many Questions would you like to have? (10-50)</h2>
    <!-- Implement Amount -->
    <b-button pill block variant="primary" @click.prevent="generateAPICalls">
      Submit
    </b-button>
  </div>
</template>

<script>
export default {
  name: "Home.vue",

  data() {
    return {
      checkedCategories: [],
      difficulty: "",
      apiCalls: [],
    };
  },
  methods: {
    generateAPICalls() {
      if (this.checkedCategories.length > 0 && this.difficulty) {
        this.checkedCategories.forEach((category) => {
          const apiCall = `https://opentdb.com/api.php?amount=10&category=${category.id}&difficulty=${this.difficulty}`;
          this.apiCalls.push(apiCall);
        });

        this.$emit("api-calls", this.apiCalls);
        this.$emit("is-customized", true);
      } else {
        alert("Please choose at least one Category and a Difficulty");
      }
    },
  },
};
</script>
