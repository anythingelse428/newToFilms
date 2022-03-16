<template>
  <div class="categories">
    <div class="categories__header"></div>
    <div class="cards categorires__cards"></div>
  </div>
</template>

<script>
import Api from "../api";
export default {
  name: "Categories",
  data() {
    return {
      genre: this.$route.params.genre,
      filmData: [],
    };
  },
  mounted() {
    console.log(Api.getInfoGenre(this.genre));
  },
};
</script>

<style>
</style>