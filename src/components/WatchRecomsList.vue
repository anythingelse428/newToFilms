<template>
  <div class="watchRecomsList" v-if="infoArr">
  <div class="">

    <h2>Рекомендации</h2>
    <div class="watchRecoms">
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
        this.infoArr=(data.items);
      });
      return this.infoArr;
    },
  },
  mounted() {
    this.init();
  },
};
</script>

<style scoped>
h2{
  color: #f7f5fdd0;
}
.watchRecoms {
  white-space: nowrap;
  touch-action: manipulation;
  background-color: #0a0a0a;
  box-sizing: border-box;
  display: flex;
  overflow-y: hidden;
  overflow-x: auto;
  direction: ltr;
  scrollbar-width: thin;
  align-items: center;
  align-content: flex-start;
  flex-wrap: nowrap;
}

.watchRecoms::-webkit-scrollbar {
  width: 20px;
}

.watchRecoms::-webkit-scrollbar-track {
  background-color: inherit;
  border-radius: 100px;
}

.watchRecoms::-webkit-scrollbar-thumb {
  border-radius: 100px;
  border: 5px solid transparent;
  background-clip: content-box;
  background-color: #efebffb4;
}
</style>