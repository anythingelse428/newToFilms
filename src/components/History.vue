<template>
  <div class="history d-flex" v-if="userHistory">
    <h2>Вы смотрели</h2>
    <div class="history__wraper">
      <button
        @click="scrollHistoryList('left')"
        class="bi bi-caret-left"
      ></button>
      <div class="history__list">
        <div v-for="(item) in filmData" :key="item">
          <simple-card
            :kpid="item.kinopoiskId"
            :type="`little`"
            :bgURL="item.posterUrl"
            :header="item.nameRu"
            :ratingAgeLimits="item.ratingAgeLimits"
            :text="item.year"
            class="history__card"
          >
            <template #action>
              <i
                class="del bi bi-trash deleteHistory"
                @click.stop.prevent="deleteHistoryItem(item.kinopoiskId)"
              ></i>
            </template>
          </simple-card>
        </div>
      </div>
      <button
        @click="scrollHistoryList('right')"
        class="bi bi-caret-right"
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
      bgAddress: "https://kinopoiskapiunofficial.tech/images/posters/kp/",
    };
  },
  methods: {
    scrollHistoryList(vector) {
      let width = document.querySelector(".film__info").clientWidth * 1.2;
      let box = document.querySelector(".history__list");
      if (vector == "left") box.scrollLeft -= width;
      if (vector == "right") box.scrollLeft += width;
    },
    getHistory() {
      Api.getUserHistory().then((data) => {
        this.userHistory = [];
        this.filmData = []
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
    if (this.filmData.length<1){
      this.getHistory();
    }
    
  },
};
</script>

<style scoped>
h2 {
  width: 100%;
  margin: 0 auto;
}
button {
  overflow: visible;
  z-index: 5;
  border: none;
  font-size: 2em;
  background: inherit;
}
.history {
  display: flex;
  flex-direction: column;
  width: 90%;
  margin: 0 auto;
}
.history__wraper {
  width: 80%;
  display: flex;
  margin: 0 auto;
}
.history__list {
  margin: 0 auto;
  display: flex;
  flex-wrap: nowrap;
  position: relative;
  overflow: hidden;
  scroll-behavior: smooth;
}
.history__card:hover .del {
  display: block !important;
}
.deleteHistory {
  position: relative;

  color: #ffffff;
  font-size: 1.3em;
  cursor: pointer;
  overflow: overlay;
  transition: all 0.2s;
}
.deleteHistory:hover {
  color: red;
}
</style>