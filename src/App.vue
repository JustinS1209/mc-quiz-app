<template>
  <div id="app"><Question /></div>
</template>

<script>
import Question from "./components/Question";
export default {
  name: "App",
  components: {
    Question,
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
</style>
