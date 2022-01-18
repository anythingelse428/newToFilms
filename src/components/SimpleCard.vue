<template>
  <router-link
  @click="addHistory(header)"
    :to="{ name: 'Watch', params: { kpid: Number(kpid) } }"
  >
    <div
      :class="'film ratio ratio-16x9 ' + cardTypeClass"
      :style="`background-image: url(${bgURL})`"
    >
      <div class="film__info">
        <div class="film__info__text">
          <b
            ><span>{{ ratingAgeLimits }}+</span></b
          >
          <h2>
            <span>{{ header }}</span>
          </h2>
          <p>
            <span>{{ text }}</span>
          </p>
        </div>
      </div>
    </div>
  </router-link>
</template>

<script>
export default {
  name: "SimpleCard",
  props: {
    header: String,
    text: String,
    bgURL: String,
    type: String,
    ratingAgeLimits: String,
    kpid: String,
  },
  computed: {
    cardTypeClass() {
      if (this.type === "default") return "film_default";
      if (this.type === "little") return "film_little";
      return "film_default";
    },
  },
  methods: {
addHistory(title){
  this.$store.commit('ADD_HISTORY',title)
  
},
    go() {
      return (window.location.href = "/watch/" + this.kpid);
    },
  },
};
</script>

<style scoped>
.film {
  background-repeat: no-repeat;
  background-size: cover;
  background-color: rgb(141, 141, 141);
  border-radius: 0.5em;
  cursor: pointer;
}
.film_default {
  width: 100%;
  height: 100%;
  background-position: center;
}
.film_little {
  background-size: cover;
  background-position: center;
  position: relative;
  width: 35em;
  margin: 0.2em;
}
.film__info {
  opacity: 0;
  background: #000000de;
  border: 1px solid #111;
  border-radius: 0.5em;
  color: aliceblue;
  text-align: center;
  height: 100%;
  width: 100%;
  transition: 200ms ease-in-out;
}
.film__info:hover {
  opacity: 1;
}
.film__info__text {
  position: relative;
  top: 25%;
  width: 90%;
  margin: 0 auto;
  font-size: 1.5rem;
}
.film:hover {
  background-color: #fff;
}
@media screen and (max-width: 425px) {
  .film_default {
    width: 100%;
    height: 60%;
    border-radius: 0;
    background-position: center;
    margin-bottom: 0.5em;
  }
  .film__info {
    border-radius: 0;
  }
  .film_little {
    background-size: cover;
    background-position: center;
    position: relative;
    width: 15em;
  }
}
@media screen and (min-width: 425px) and (max-width: 900px) {
  .film_little {
    background-size: cover;
    background-position: center;
    position: relative;
    width: 25em;
  }
}
</style>