<template>
  <div class="home">
    <div class="jumbotron jumbotron-fluid">
      <h1>Memory Game!</h1>
      <p>Select what you would like to do!</p>
    </div>

    <div class="container" id="radioOptions">
      <div>
        <input type="radio" v-model="selection" id="options" name="matching" value="match" checked />
        <label for="match">Match</label>
      </div>
      <div>
        <input type="radio" v-model="selection" id="options" name="sent" value="sentence" checked />
        <label for="sentence">Sentence</label>
      </div>
      <div>
        <input type="radio" v-model="selection" id="options" name="fillIn" value="fillIn" checked />
        <label for="fillIn">Fill In the Blank</label>
      </div>
    </div>

    <div v-if="selection =='match'" class="matchcard">
      <MatchCard />
    </div>
    <div v-if="selection == 'sentence'">
      <Sentences />
    </div>
    <div v-if="selection == 'fillIn'">
      <FillInBlanks />
    </div>
  </div>
</template>

<script>
import MatchCard from "../components/MatchCard";
import Sentences from "../components/Sentences";
import FillInBlanks from "../components/FillInBlanks";

export default {
  name: "Home",
  components: {
    MatchCard,
    Sentences,
    FillInBlanks
  },
  data: function() {
    return {
      selection: ""
    };
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
