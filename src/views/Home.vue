<template>
  <b-container>
    <div style="margin-top: 25vh"></div>
    <b-form-checkbox-group
      id="checkbox-group-1"
      v-model="checkedCategories"
      name="Categories"
    >
      <b-row>
        <b-col>
          <b-card
            @click="markCategory({ name: 'general_knowledge', id: 9 })"
            img-bottom
            img-src="https://store-images.s-microsoft.com/image/apps.61688.13681578430655207.a59a05e2-81fc-4b9b-870f-931088be9ad8.f1b4cdf8-0e3d-47ac-b295-7e56a5cf90c7?mode=scale&q=90&h=200&w=200&background=%230078D7"
          >
            <b-form-checkbox :value="{ name: 'general_knowledge', id: 9 }"
              >General Knowledge</b-form-checkbox
            >
          </b-card>
        </b-col>
        <b-col>
          <b-card
            @click="markCategory({ name: 'science_and_nature', id: 17 })"
            img-bottom
            img-src="https://previews.123rf.com/images/batsheba/batsheba1606/batsheba160600006/58458583-open-book-with-science-and-nature-study-symbols-education-concept-illustration.jpg"
          >
            <b-form-checkbox :value="{ name: 'science_and_nature', id: 17 }"
              >Science and Nature</b-form-checkbox
            >
          </b-card>
        </b-col>
        <b-col>
          <b-card
            @click="markCategory({ name: 'mythology', id: 20 })"
            img-bottom
            img-src="https://mythopedia.com/assets/images/greek-mythology--social.jpg"
          >
            <b-form-checkbox :value="{ name: 'mythology', id: 20 }"
              >Mythology</b-form-checkbox
            >
          </b-card>
        </b-col>
      </b-row>
      <b-form-invalid-feedback :state="state" style="font-size: 1rem"
        >Please select at least one Category</b-form-invalid-feedback
      >
    </b-form-checkbox-group>

    <b-form-group label="How difficult should the Quiz be?">
      <b-form-radio-group
        id="radio-group-difficulty"
        v-model="difficulty"
        :options="difficulties"
        name="radio-difficulties"
        stacked
      ></b-form-radio-group>
    </b-form-group>

    <!-- Implement Amount -->
    <b-button
      pill
      block
      pressed
      variant="success"
      @click.prevent="generateAPICalls"
    >
      Submit
    </b-button>
  </b-container>
</template>

<script>
// Necessary for Vuex to Work
import { mapActions } from "vuex";

export default {
  name: "Home.vue",

  data() {
    return {
      checkedCategories: [],
      difficulty: "easy",
      //apiCalls: [],
      difficulties: [
        { text: "Easy", value: "easy" },
        { text: "Medium", value: "medium" },
        { text: "Hard", value: "hard" },
      ],
    };
  },
  computed: {
    state() {
      return this.checkedCategories.length > 0;
    },
  },

  methods: {
    ...mapActions(["createAPICall"]),

    generateAPICalls() {
      if (this.checkedCategories.length > 0 && this.difficulty) {
        this.checkedCategories.forEach((category) => {
          const apiCall = `https://opentdb.com/api.php?amount=10&category=${category.id}&difficulty=${this.difficulty}`;
          this.createAPICall(apiCall);
          console.log(apiCall);
        });
      } else {
        alert("Please choose at least one Category and a Difficulty");
      }
      // Simuliert einen click auf einen <router-link to="/questions">
      this.$router.push("/question");
    },
    markCategory(category) {
      if (!this.checkedCategories.some((cat) => category.id === cat.id)) {
        this.checkedCategories.push(category);
      } else {
        this.checkedCategories = this.checkedCategories.filter(
          (cat) => cat.id !== category.id
        );
      }
    },
  },
};
</script>