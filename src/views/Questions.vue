<template>
  <div>
    <h1>Generate Questions etc.</h1>
    <!-- Show Spinner while loading  -->
    <img
      v-if="getLoadingQuestions"
      src="../assets/spinner.gif"
      alt="Loading..."
    />
    {{ allQuestions }}
  </div>
</template>

<script>
/* This Component fetches the Questions and does some Cleaning before they are being displayed. */
import { mapGetters, mapActions } from "vuex";
export default {
  name: "Questions",

  created() {
    // Makes API Calls and Safes Questions in store
    this.makeAPICalls();
  },
  updated() {
    this.$router.push("/question");
  },

  methods: {
    ...mapActions(["makeAPICalls"]),
  },
  computed: {
    ...mapGetters(["allAPICalls", "allQuestions", "getLoadingQuestions"]),
  },
};
</script>

<style>
</style>