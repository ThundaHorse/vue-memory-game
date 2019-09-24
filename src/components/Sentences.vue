<template>
  <div class="sentences">
    <div class="container">
      <h1>Score {{ currentScore }}</h1>
      <div v-for="(question, index) in allSentences" :key="index">{{ question.question }}</div>
      <br />
      <div v-for="answer in allSentences" :key="answer.answer">
        <input type="radio" v-model="selected" :value="answer.answer" />
        <label :for="answer.answer">{{ answer.answer }}</label>
      </div>
    </div>
  </div>
</template>

<style>
</style>

<script>
import { mapGetters, mapActions } from "vuex";

export default {
  name: "Sentences",
  data: function() {
    return {
      selected: "",
      currentScore: 0
    };
  },
  computed: mapGetters(["allSentences"]),
  methods: {
    ...mapActions(["fetchSentences"])
  },
  created() {
    this.fetchSentences();
  }
};
</script>
