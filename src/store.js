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
  let symbols = [
    "Yeet",
    "YurYeet",
    "Yurt",
    "Skrt",
    "Skirt",
    "Brrt",
    "Brick",
    "Skididy"
  ];
  let deck = [];

  for (var i = 0; i < 16; i++) {
    deck.push({ idx: i, isFlipped: false, symbol: symbols[i % 8] });
  }

  shuffle(deck);
  return deck;
}

export default new Vuex.Store({
  state: {
    cardDeck: [],
    pickedCards: []
  },
  getters: {
    allCards: state => state.cardDeck
  },
  actions: {
    fetchCards({ commit }) {
      commit("setCards", generateDeck());
    },

    flipCard({ commit }, cardIndex) {
      let newDeck = this.state.cardDeck.map(card => {
        return card;
      });

      if (newDeck[cardIndex].isFlipped) {
        return;
      }
      newDeck[cardIndex].isFlipped = true;

      // let pickedPairs = this.state.pickedCards.concat(newDeck[cardIndex]);
      commit("pickedCards", newDeck[cardIndex]);
      console.log(this.state.pickedCards);

      if (this.state.pickedCards.length === 2) {
        var card1Idx = newDeck.indexOf(this.state.pickedCards[0]);
        var card2Idx = newDeck.indexOf(this.state.pickedCards[1]);
        var card1 = newDeck[card1Idx];
        var card2 = newDeck[card2Idx];

        if (card1.symbol !== card2.symbol) {
          setTimeout(() => {
            commit("unflipCards", card1Idx, card2Idx);
          }, 1000);
        }
        if (card1.symbol === card2.symbol) {
          let picked = [];
          commit("resetPicked", picked);
        }
      }
      commit("setCards", newDeck);
    },

    unflipCards({ commit }, card1Index, card2Index) {
      let newDeck = this.state.deck.map(card => {
        // console.log(card);
        return { ...card };
      });
      newDeck[card1Index].isFlipped = false;
      newDeck[card2Index].isFlipped = false;
      console.log(newDeck[card1Index]);
      commit("setCards", newDeck);
    }
  },
  mutations: {
    setCards: (state, cards) => (state.cardDeck = cards),
    resetPicked: (state, picked) => (state.pickedCards = picked),
    pickedCards: (state, picked) => state.pickedCards.push(picked),
    unflipCards: (state, idx1, idx2) => {
      // state.cardDeck = deck;
      state.cardDeck[idx1].isFlipped = false;
      state.cardDeck[idx2].isFlipped = false;
      // state.cardDeck;
    }
  }
});
