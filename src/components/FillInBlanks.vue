<template>
  <div class="fillIn">
    <div class="container">
      <div v-for="(question, index) in allSentences" :key="index">{{ question.question }}</div>
    </div>
  </div>
</template>

<style>
</style>

<script>
import { mapGetters, mapActions } from "vuex";

export default {
  name: "FillInBlanks",
  data: function() {
    return {};
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
