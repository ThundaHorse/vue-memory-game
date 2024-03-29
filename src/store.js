import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

function shuffle(a) {
  var j, x, i;
  for (i = a.length - 1; i > 0; i--) {
    j = Math.floor(Math.random() * (i + 1));
    x = a[i];
    a[i] = a[j];
    a[j] = x;
  }
  return a;
}

function generateDeck() {
  let symbols = ["A", "B", "C", "D", "E", "F", "G", "H"];
  let deck = [];

  for (var i = 0; i < 16; i++) {
    deck.push({ idx: i, isFlipped: false, symbol: symbols[i % 8] });
  }

  shuffle(deck);
  return deck;
}

function generateSentences() {
  let questions = [
    {
      question: "What is life?",
      answer: "What?"
    },
    {
      question: "What is love?",
      answer: "Baby don't hurt me."
    }
  ];

  shuffle(questions);
  return questions;
}

export default new Vuex.Store({
  state: {
    cardDeck: [],
    pickedCards: [],
    sentences: []
  },
  getters: {
    allCards: state => state.cardDeck,
    allSentences: state => state.sentences
  },
  actions: {
    fetchCards({ commit }) {
      commit("setCards", generateDeck());
    },
    fetchSentences({ commit }) {
      commit("setSentences", generateSentences());
    },
    flipCard({ commit }, cardIndex) {
      let newDeck = this.state.cardDeck.map(card => {
        return card;
      });
      if (newDeck[cardIndex].isFlipped) {
        return;
      }
      newDeck[cardIndex].isFlipped = true;
      commit("pickedCards", newDeck[cardIndex]);
      console.log(this.state.pickedCards);

      if (this.state.pickedCards.length === 2) {
        var card1Idx = newDeck.indexOf(this.state.pickedCards[0]);
        var card2Idx = newDeck.indexOf(this.state.pickedCards[1]);
        var cardOptions = {
          card1: card1Idx,
          card2: card2Idx
        };

        if (newDeck[card1Idx].symbol !== newDeck[card2Idx].symbol) {
          setTimeout(() => {
            commit("unflipCards", cardOptions);
          }, 1000);
        }
        let picked = [];
        commit("resetPicked", picked);
      }
      commit("setCards", newDeck);
    },
    unflipCards({ commit }, card1Index, card2Index) {
      this.state.cardDeck[card1Index].isFlipped = false;
      this.state.cardDeck[card2Index].isFlipped = false;
      commit("setCards", this.state.cardDeck);
    }
  },
  mutations: {
    setCards: (state, cards) => (state.cardDeck = cards),
    resetPicked: (state, picked) => (state.pickedCards = picked),
    pickedCards: (state, picked) => state.pickedCards.push(picked),
    unflipCards: (state, options) => {
      state.cardDeck[options.card1].isFlipped = false;
      state.cardDeck[options.card2].isFlipped = false;
    },
    setSentences: (state, sentences) => (state.sentences = sentences)
  }
});
