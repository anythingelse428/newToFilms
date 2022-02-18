<template>
  <div class="history" v-if="userHistory">
    <h2 class="history__header">Вернуться к просмотру</h2>
    <div class="history__wrapper">
      <button
        class="button history__button bi bi-caret-left"
        v-if="filmData.length > 1"
        @click="scrollHistoryList('left')"
      ></button>
      <div class="history__list">
        <simple-card
          :kpid="item.kinopoiskId"
          :type="`little`"
          :bgURL="item.posterUrl"
          :header="item.nameRu"
          :ratingAgeLimits="item.ratingAgeLimits"
          :text="item.year"
          class="history__card"
          v-for="item in filmData"
          :key="item"
        >
          <template #action>
            <i
              class="history__card_delete bi bi-trash"
              @click.stop.prevent="deleteHistoryItem(item.kinopoiskId)"
            ></i>
          </template>
        </simple-card>
      </div>
      <button
        class="button history__button bi bi-caret-right"
        v-if="filmData.length > 1"
        @click="scrollHistoryList('right')"
      ></button>
    </div>
  </div>
</template>

<script>
import Api from "../api/index";
import SimpleCard from "./SimpleCard.vue";
export default {
  components: { SimpleCard },
  data() {
    return {
      userHistory: [],
      filmData: [],
    };
  },
  methods: {
    scrollHistoryList(vector) {
      let width = document.querySelector(".film__info").clientWidth * 1.02;
      let box = document.querySelector(".history__list");
      if (vector == "left") box.scrollLeft -= width;
      if (vector == "right") box.scrollLeft += width;
    },
    getHistory() {
      Api.getUserHistory().then((data) => {
        this.userHistory = [];
        this.filmData = [];
        this.userHistory = data.data;
        this.userHistory.forEach((el) => {
          Api.getInfoKpid(el.kpid).then(({ data }) => this.filmData.push(data));
        });
      });
    },
    deleteHistoryItem(kpid) {
      Api.deleteHistoryItem(kpid);
      this.getHistory();
    },
  },
  mounted() {
    if (this.filmData.length < 1) {
      this.getHistory();
    }
  },
};
</script>

<style scoped>
.history {
  display: flex;
  flex-direction: column;
  width: 90%;
  margin: 0 auto;
}
.history__header {
  width: 100%;
  margin: 0.5em;
}
.history__wrapper {
  width: 80%;
  display: flex;
  margin: 0 auto;
}
.button {
  overflow: visible;
  z-index: 5;
  border: none;
  font-size: 2em;
  background: inherit;
}
.history__list {
  touch-action: manipulation;
  display: flex;
  flex-wrap: nowrap;
  scroll-behavior: smooth;
  overflow-x: visible;
  overflow-y: auto;
  margin: 0 auto;
}
.history__list::-webkit-scrollbar {
  width: 20px;
}
.history__list::-webkit-scrollbar-thumb {
  border-radius: 100px;
  border: 5px solid transparent;
  background-clip: content-box;
  background-color: #000000b8;
}

.history__card_delete {
  position: relative;
  color: #ffffff;
  font-size: 1.3em;
  cursor: pointer;
  overflow: overlay;
  transition: all 0.2s;
}
.history__card_delete:hover {
  color: red;
}
</style>