<template>
  <!-- This component only works for an array with my structure, because I use kinopoiskId as key -->
  <div class="searchResult" v-if="input">
    <ul class="searchResult__found found">
      <li v-if="(array.length == 0) & (input.length > 3)">ничего нет(</li>
      <div v-for="item in array" :key="item.kinopoiskId">
        <router-link
          :to="{ name: 'Watch', params: { kpid: Number(item.kinopoiskId) } }"
        >
          <li
            class="found__list"
            v-if="item.nameRu"
          >
            <img
              :src="item.posterUrl"
              alt=""
              srcset=""
              width="30"
              class="me-1"
            />
            <span>{{ item.nameRu }} </span>
          </li>
        </router-link>
      </div>
    </ul>
  </div>
</template>

<script>
export default {
  props: {
    input: {
      type: String,
      required: true,
      default: "",
    },
    array: {
      type: Array,
      required: true,
    },
  },
};
</script>

<style scoped>
.searchResult {
  width: 20%;
  min-width: 400px;
  position: fixed;
  display: flex;
  flex-wrap: wrap;
  flex-direction: column;
  right: 0em;
  height: 70%;
  top: 5em;
}
.searchResult__found::-webkit-scrollbar {
  display: none;
}
.searchResult__found {
  width: 100%;
  list-style: none;
  color: white !important;
  background: #2c2c2cf0;
  text-align: left;
  margin: 0;
  padding: 0;
  overflow-y: scroll;
}
.found__list {
  padding: 1em;
}
.searchResult ul > div > a {
  text-decoration: none;
  color: aliceblue;
}
.found__list:hover,
.found__list:focus-visible,
.found__list:focus-within,
.found__list span:focus-visible,
.found__list > a:focus-visible {
  border: none;
  background: rgb(17, 17, 17);
  outline: 0;
}
@media screen and (max-width: 991px) {
  .searchResult {
    width: 100%;
    position: fixed;
    display: flex;
    flex-wrap: wrap;
    flex-direction: column;
    align-items: center;
    right: 0em;
    top: 11em;
  }
}
</style>