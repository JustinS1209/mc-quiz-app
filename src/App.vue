<template>
  <div id="app">
    <Customization
      v-if="!isCustomized"
      @api-calls="forwardAPICalls"
      @is-customized="setCustomized"
    />
    <Question v-if="isCustomized" :apiCalls="apiCalls" />
  </div>
</template>

<script>
import Question from "./components/Question";
import Customization from "./components/Customization";

export default {
  name: "App",
  components: {
    Question,
    Customization,
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

<style>
@import url("https://fonts.googleapis.com/css?family=Open+Sans:400,600&display=swap");
body {
  background-color: #f7f8fc;
  font-family: "Open Sans", sans-serif;
  display: flex;
  align-items: center;
  justify-content: center;
  min-height: 100vh;
  margin: 0;
}

.btn {
  cursor: pointer;
  background-color: #141c2c;
  border: 2px solid #141c2c;
  border-radius: 3px;
  color: #fff;
  display: flex;
  align-items: center;
  justify-content: center;
  font-family: inherit;
  font-weight: bold;
  font-size: 14px;
  padding: 10px;
  margin: 20px 0;
  width: 100%;
}
</style>
