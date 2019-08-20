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
    pickedCards: [],
    score: 0
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
        return { ...card };
      });
      let matches = this.state.score;
      if (newDeck[cardIndex].isFlipped) return;
      newDeck[cardIndex].isFlipped = true;

      let newPickedCards = this.state.pickedCards.concat(cardIndex);
      // if second card is selected, compare the two
      // if cards are not identical, flip back over
      if (newPickedCards.length === 2) {
        var card1Index = newPickedCards[0];
        var card2Index = newPickedCards[1];
        var card1 = newDeck[card1Index];
        var card2 = newDeck[card2Index];

        if (card1.symbol !== card2.symbol) {
          // unflip both cards
          setTimeout(() => {
            this.unflipCards(card1Index, card2Index);
          }, 1000);
        }

        // Increment score if successful match
        if (card1.symbol === card2.symbol) {
          matches += 1;
        }

        // Reset picked cards to select another pair
        newPickedCards = [];
      }
      commit("flipCard", newDeck, matches);
    },
    unflipCards({ commit }, card1Index, card2Index) {
      let newDeck = this.state.deck.map(card => {
        return { ...card };
      });

      newDeck[card1Index].isFlipped = false;
      newDeck[card2Index].isFlipped = false;

      commit("unflipCards", newDeck);
    }
  },
  mutations: {
    setCards: (state, cards) => (state.cardDeck = cards),
    flipCard: (state, deck, matches) => (
      (state.cardDeck = deck), (state.score = matches)
    ),
    unflipCards: (state, deck) => {
      state.cardDeck = deck;
    }
  }
});
