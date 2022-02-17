<template>
  <div class="history d-flex">
    <div class="history__wraper">
      <button
        @click="scrollHistoryList('left')"
        class="bi bi-caret-left"
      ></button>
      <div class="history__list">
          
      </div>
      <button
        @click="scrollHistoryList('right')"
        class="bi bi-caret-right"
      ></button>
    </div>
</template>

<script>
export default {
  methods: {
    scrollHistoryList(vector) {
      let width = document.querySelector(".film__info").clientWidth;
      let box = document.querySelector(".history__list");
      if (vector == "left") box.scrollLeft -= width;
      if (vector == "right") box.scrollLeft += width;
    },
  },
};
</script>

<style>
</style>