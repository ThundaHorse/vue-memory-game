<template>
  <div class="sentences">
    <div class="container">
      <p>Testing in progress</p>
    </div>
  </div>
</template>

<style scoped>
</style>

<script>
import { mapGetters, mapActions } from "vuex";

export default {
  name: "Sentences",
  data: function() {
    return {};
  },
  computed: mapGetters(["allCards"]),
  methods: {
    ...mapActions(["fetchCards", "flipCard", "unflipCards"])
  },
  created() {
    this.fetchCards();
  }
};
</script>
