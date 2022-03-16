<template>
  <div class="recomendation">
    <div class="" v-for="colections in recomendation" :key="colections">
      <div class="recomendation__block" v-if="recomendation.length > 0">
        <h2 class="recomendation__title">
          {{ colections.collection_title }}
        </h2>
        <div class="recomendation__line">
          <button
            @click="scroll('left', `.line--${colections.collection_id}`)"
            class="button recomendation__button bi bi-caret-left"
          ></button>
          <div
            class="line recomendation__line"
            :class="`line--${colections.collection_id}`"
          >
            <div
              class="line__items"
              v-for="film in colections.items"
              :key="film"
            >
              <simple-card
                :header="film.nameRu"
                :bgURL="film.posterUrl"
                :kpid="String(film.kinopoiskId)"
                type="little"
              ></simple-card>
            </div>
          </div>
          <button
            @click="scroll('right', `.line--${colections.collection_id}`)"
            class="button recomendation__button bi bi-caret-right"
          ></button>
        </div>
      </div>
      <span class="recomendation__placeholder" v-else> нема рекав </span>
    </div>
  </div>
</template>

<script>
import SimpleCard from "./SimpleCard.vue";
import categories from "../store/categories";

export default {
  components: {
    SimpleCard,
  },
  data() {
    return {
      recomendation: [],
    };
  },
  methods: {
    scroll(vector, selector) {
      let width = document.querySelector(".film__info").clientWidth * 1.02;
      let box = document.querySelector(selector);
      if (vector == "left") box.scrollLeft -= width;
      if (vector == "right") box.scrollLeft += width;
      console.log(box.scrollLeft);
    },
  },
  mounted() {
    this.recomendation = categories;
  },
};
</script>

<style scoped>
.recomendation {
  margin: 5em auto;
  padding: 1em;
  width: 90%;
}
.recomendation__block {
  display: flex;
  flex-wrap: wrap;
  margin: 0 auto;
  margin-top: 5em;
  align-items: center;
  justify-content: center;
}
.recomendation__title {
  width: 100%;
}
.recomendation__line,
.line {
  touch-action: manipulation;
  display: flex;
  flex-wrap: nowrap;
  scroll-behavior: smooth;
  overflow-x: visible;
  overflow-y: hidden;
  width: 90%;
}
.line__items {
  overflow: visible;
  transition: all 0.82s;
}
.line__items:hover {
  position: relative;
  z-index: 6;
  transform: scale(1.12);
}
.button {
  color: #fdfdff;
  overflow: visible;
  border: none;
  font-size: 4em;
  background: inherit;
  transition: all 0.2s;
}
.button:hover {
  color: #aaaaaa;
}
.line::-webkit-scrollbar {
  width: 20px;
}
.line::-webkit-scrollbar-thumb {
  border-radius: 100px;
  border: 5px solid transparent;
  background-clip: content-box;
  background-color: #fafafab8;
}
.recomendation__goUp {
  position: fixed;
  z-index: 100500;
  bottom: 2em;
  right: 1em;
}
.recomendation__goUp i {
  font-size: 1.5em;
  color: rgb(0, 0, 0);
}

@media screen and (max-width: 600px) {
  .button {
    font-size: 1em;
  }
}
</style>
