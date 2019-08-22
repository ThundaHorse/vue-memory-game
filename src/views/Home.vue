<template>
  <div class="home">
    <div class="jumbotron jumbotron-fluid">
      <h1>Memory Game!</h1>
      <p>Match Cards to win..</p>
    </div>
    <div class="matchcard">
      <MatchCard />
    </div>
  </div>
</template>

<script>
import MatchCard from "../components/MatchCard";
import { mapGetters, mapActions } from "vuex";

export default {
  name: "Home",
  components: {
    MatchCard
  }
};
</script>

<style scoped>
.jumbotron.jumbotron-fluid {
  text-align: center;
}

.jumbotron.jumbotron-fluid {
  height: 80px;
  background-color: #232935;
  /* min-height: 30vh; */
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  font-size: calc(10px + 2vmin);
  color: white;
}

.jumbotron.jumbotron-fluid p {
  color: #8c8b8b;
}
</style>
