<template>
  <div class="home">
    <div class="container">
      <div class="row">
        <div class="col-sm-3" v-for="(card, index) in allCards" :key="index">
          {{ index }}
          <br />
          <div class="MemoryCard" @click="flipCard(index)">
            <div
              v-bind:class="{
              'MemoryCardInner flipped': card.isFlipped,
              'MemoryCardInner': !card.isFlipped
            }"
            >
              <div class="MemoryCardBack">
                <img
                  src="https://image.flaticon.com/icons/png/512/36/36601.png"
                  alt="question-mark"
                />
              </div>
              <div class="MemoryCardFront">{{ card.symbol }}</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.col-sm-3 {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}
.MemoryCardBack {
  background: repeating-linear-gradient(
    45deg,
    #6080bc,
    #60aabc 10px,
    #46984a 10px,
    #7f9846 20px
  );
}

.MemoryCardBack img {
  width: 60px;
  padding-top: 5px;
}

.MemoryCard {
  display: inline-block;
  width: 150px;
  height: 80px;
  margin: 5px;
  cursor: pointer;
  position: relative;
  perspective: 800px;
}

.MemoryCardInner {
  width: 100%;
  height: 100%;
  position: absolute;
  transform-style: preserve-3d;
  transition: transform 0.8s cubic-bezier(0.175, 0.885, 0.32, 1.275);
  border-radius: 5px;
  border: 3px solid navy;
  box-shadow: 0 6px 16px rgba(0, 0, 0, 0.15);
}

.MemoryCardFront {
  font-size: 30px;
  padding-top: 20px;
  transform: rotateY(180deg);
}

.MemoryCardFront,
.MemoryCardBack {
  position: absolute;
  width: 100%;
  height: 100%;
  backface-visibility: hidden;
}

.MemoryCardInner.flipped {
  transform: rotateY(180deg);
}
</style>

<script>
import { mapGetters, mapActions } from "vuex";

export default {
  name: "MemoryCard",
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
