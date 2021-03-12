<template>
  <div id="app">
    <!-- <router-view /> -->
    <Home
      v-if="!isCustomized"
      @api-calls="forwardAPICalls"
      @is-customized="setCustomized"
    />
    <Question v-if="isCustomized" :apiCalls="apiCalls" />
  </div>
</template>

<script>
import Question from "./views/Question";
import Home from "./views/Home";

export default {
  name: "App",
  components: {
    Question,
    Home,
  },
  methods: {
    forwardAPICalls(apiCalls) {
      this.apiCalls = apiCalls;
    },

    setCustomized(bool) {
      this.isCustomized = bool;
    },
  },

  data() {
    return {
      isCustomized: false,
      apiCalls: [],
    };
  },
};
</script>

<style lang="scss">
@import url("https://fonts.googleapis.com/css?family=Open+Sans:400,600&display=swap");
@import "node_modules/bootstrap/scss/bootstrap";
</style>
