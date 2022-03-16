<template>
  <div class="recomendationForFilm" v-if="infoArr.length > 0">
    <h2 class="recomendationForFilm__header">Рекомендации</h2>
    <div class="recomendationForFilm__wrapper">
      <button
        class="button recomendationForFilm__button bi bi-caret-left"
        v-if="infoArr.length > 1"
        @click="scrollList('left')"
      ></button>
      <div class="recomendationForFilm__list">
        <simple-card
          :header="items.nameRu"
          :text="items.year"
          :bgURL="items.posterUrl"
          :kpid="items.kinopoiskId"
          :ratingAgeLimits="items.ratingAgeLimits"
          type="little"
          :key="items"
          v-for="items in infoArr"
        ></simple-card>
      </div>
      <button
        class="button recomendationForFilm__button bi bi-caret-right"
        v-if="infoArr.length > 1"
        @click="scrollList('right')"
      ></button>
    </div>
  </div>
</template>

<script>
import Api from "../api";
import SimpleCard from "./SimpleCard.vue";
export default {
  components: { SimpleCard },
  data() {
    return {
      watchRecomsKpid: this.$route.params.kpid,
      infoArr: [],
    };
  },
  watch: {
    "$route.params.kpid"() {
      this.watchRecomsKpid = this.$route.params.kpid;
      this.init();
    },
  },
  methods: {
    init() {
      Api.getRecomsByKpid(this.watchRecomsKpid).then(({ data }) => {
        this.infoArr = data.items;
      });
      return this.infoArr;
    },
    scrollList(vector) {
      let width = document.querySelector(".film__info").clientWidth * 1.02;
      let box = document.querySelector(".recomendationForFilm__list");
      if (vector == "left") box.scrollLeft -= width;
      if (vector == "right") box.scrollLeft += width;
    },
  },
  mounted() {
    this.init();
  },
};
</script>

<style scoped>
.recomendationForFilm {
  display: flex;
  flex-direction: column;
  margin: 0 auto;
}
.recomendationForFilm__header {
  font-size: 1.5em;
  color: #f5f5f5;
}
.recomendationForFilm__wrapper {
  width: 80%;
  display: flex;
  margin: 0 auto;
  overflow: hidden;
}
.recomendationForFilm__button {
  overflow: visible;
  border: none;
  font-size: 2em;
  background: inherit;
  color: #f5f5f5;
}
.recomendationForFilm__list {
  touch-action: manipulation;
  display: flex;
  flex-wrap: nowrap;
  scroll-behavior: smooth;
  overflow-x: visible;
  overflow-y: hidden;
  min-width: 10em;
}
.recomendationForFilm__list::-webkit-scrollbar {
  width: 20px;
}
.recomendationForFilm__list::-webkit-scrollbar-thumb {
  border-radius: 100px;
  border: 6px solid transparent;
  background-clip: content-box;
  background-color: #ffffffb8;
}
@media screen and (max-width: 720px) {
  .recomendationForFilm__wrapper {
    width: 100%;
    display: flex;
    margin: 0 auto;
    overflow: hidden;
  }
}
</style>