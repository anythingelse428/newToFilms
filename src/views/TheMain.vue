<template>
  <div class="main">
    <history></history>
    <recomendation-list></recomendation-list>
  </div>
</template>

<script>
import RecomendationList from "../components/RecomendationList.vue";
import History from "../components/History.vue";

export default {
  components: {
    RecomendationList,
    History,
  },
};
</script>

<style scoped>
</style>
