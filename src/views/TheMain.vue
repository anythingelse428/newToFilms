<template>
  <div class="main">
    <recomendation-list></recomendation-list>
  </div>
</template>

<script>
import RecomendationList from "../components/RecomendationList.vue";
export default {
  components: {
    RecomendationList,
  },
  data() {
    return {};
  },
};
</script>
<style scoped>
.main{
  background: #f3f3ef;
}
</style>