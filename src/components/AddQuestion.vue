<template>
  <div class="addQuestion">
    <div class="container">
      <h1>Enter your question</h1>
      <form @submit.prevent="addQuestions(questionBody, questionAnswer)">
        <input v-model="questionBody" />
        <br />
        <h1>Enter your answer</h1>
        <input v-model="questionAnswer" />
        <br />
        <br />
        <button class="btn btn-round btn-primary" value="submit">Submit</button>
      </form>
    </div>
    <!-- Visual for questions -->
    <div v-for="(q, index) in newQuestion" :key="index">{{ q }}</div>
  </div>
</template>

<style>
</style>

<script>
export default {
  name: "AddQuestion",
  data: function() {
    return {
      questionBody: "",
      questionAnswer: "",
      newQuestion: []
    };
  },
  created: function() {},
  methods: {
    addQuestions(body, bodyAnswer) {
      this.newQuestion.push({
        question: body,
        answer: bodyAnswer
      });
      this.questionBody = "";
      this.questionAnswer = "";
    }
  }
};
</script>