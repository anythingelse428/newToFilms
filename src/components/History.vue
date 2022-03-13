<template>
  <div class="history" v-if="filmData.length > 0">
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
          v-for="(item, idx) in filmData"
          :key="item"
        >
          <!-- юзаю индекс шобы пробегать по массиву со временем, проверял: он от 0 идет -->
          <template #time>
            <span>{{ userHistoryTime[idx] }}</span>
          </template>
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
      userHistoryTime: [],
      filmData: [],
      tempData: [],
    };
  },
  methods: {
    scrollHistoryList(vector) {
      let width = document.querySelector(".film__info").clientWidth * 1.02;
      let box = document.querySelector(".history__list");
      if (vector == "left") box.scrollLeft -= width;
      if (vector == "right") box.scrollLeft += width;
    },
    initHistory() {
      Api.getUserHistory()
        .then(({ data }) => {
          this.tempData = data;
        })
        .finally(() => this.getHistory());
    },
    getHistory() {
      /*ПРОБЛЕМА
      я хочу к истории добавить две вещи: 
      1. убрать дубликаты просмотреного (чтобы не забивать пулл с историей юзеру)
      2. сортировать по времени (от последнего к первому)
      
      дубли я убрал, по времени отсортировал, но если посидеть пообновлять,
      порядок карточек иногда меняется,
      скореее всего нужно иначе пихать данные по массивам или умудряться подсовывывать данные прям в объект

     КАРОЧЕ: массивы с данными не синхронизируются, я хз как синхронизировать, спаси пыж
      */
      if (this.tempData.length > 0) {
        //обнуляю все парметры истории
        this.filmData = []; //этот хранит данные о фильме с карты (заголовок, год и т.д)
        this.userHistoryTime = []; //этот хранит только даты
        const flagList = new Set(); // для фильтра
        let history;
        console.log("tempData", this.tempData);
        //deleting objects with the same KPIDs and sort by time
        history = this.tempData
          //сортирую по дате (тоже работает, судя по сортированному userHistoryTime)
          .sort(function (a, b) {
            if (a.time < b.time) return 1;
            if (a.time > b.time) return -1;
            return 0;
          })
          //чищу дубли (работает, в history дублей кпидов нет)
          .filter(function (item) {
            if (!flagList.has(item["kpid"])) {
              flagList.add(item["kpid"]);
              return true;
            }
          });
        //getting data for each KPIDs from API
        console.log("history", history);
        history.forEach((el) => {
          Api.getInfoKpid(el.kpid).then(({ data }) => this.filmData.push(data)); //получил данные с апишки  и пихаю в массив
          //converting time from ********** to normal data
          //конвертирую время и пихаю в массив
          this.userHistoryTime.push(
            new Date(el.time * 1000).toLocaleString("ru", {
              dateStyle: "medium",
              timeStyle: "short",
            })
          );
        });
        console.log("filmdata", this.filmData);
        console.log("userhistoryTime", this.userHistoryTime);
      }
    },
    deleteHistoryItem(kpid) {
      Api.deleteHistoryItem(kpid);
      this.initHistory();
    },
  },
  mounted() {
    this.initHistory();
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
  overflow: auto;
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
  overflow-y: hidden;
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