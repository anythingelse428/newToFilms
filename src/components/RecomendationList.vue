<template>
  <div class="recomendation" v-if="recomendation">
    <div class="recomendation__cards" v-if="recomendation.length > 0">
      <simple-card
        :header="reki.nameRu"
        :text="reki.year"
        :bgURL="reki.posterUrl"
        :key="reki.kinopoiskId"
        :kpid="reki.kinopoiskId"
        :ratingAgeLimits="reki.ratingAgeLimits"
        type="default"
        v-for="reki in recomendation"
      >
      </simple-card>
    </div>
    <span class="recomendation__placeholder" v-else> нема рекав </span>
  </div>
</template>

<script>
import Api from "../api";
import SimpleCard from "./SimpleCard.vue";

export default {
  components: {
    SimpleCard,
  },
  data() {
    return {
      recomendation: [],
    };
  },
  methods: {},
  mounted() {
    Api.getRecomendationList().then(({ data }) => {
      this.recomendation = data.content;
    });
  },
};
</script>

<style scoped>
.recomendation__cards {
  display: grid;
  grid-column-gap: 0.5em;
  grid-row-gap: 0.5em;
  width: 100%;
  grid-template-rows: repeat(1fr, 7%);
  grid-template-columns: repeat(3, 1fr);
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
@media screen and (max-width: 425px) {
  .recomendation__cards {
    display: flex;
    flex-direction: column;
    width: 100%;
  }
  .recomendation {
    margin: 0 auto;
    padding: 1em;
  }
}
@media screen and (min-width: 425px) and (max-width: 768px) {
  .recomendation {
    display: flex;
    justify-content: center;
    margin: 0 auto;
    padding: 1em;
    width: 90%;
  }
  .recomendation__cards {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    grid-column-gap: 0.5em;
    grid-row-gap: 0.5em;
    width: 100%;
  }
  .recomendation__placeholder {
    font-size: 1.5rem;
    margin: 0 auto;
    align-items: center;
  }
}
@media screen and (min-width: 425px) {
  .recomendation {
    margin: 0 auto;
    padding: 1em;
    width: 80%;
  }
}
</style>
