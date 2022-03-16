<template>
  <router-link :to="{ name: 'Watch', params: { kpid: Number(kpid) } }">
    <div
      :class="'film ratio ratio-16x9 ' + cardTypeClass"
      :style="`background-image: url(${bgURL})`"
    >
      <div class="film__info info">
        <div class="info__text">
          <b
            ><span v-if="ratingAgeLimits">{{ ratingAgeLimits }}+</span></b
          >
          <h2>
            <span v-if="header">{{ header }}</span>
          </h2>
          <p>
            <span v-if="text">{{ text }}</span>
          </p>
          <p>
            <slot name="time"></slot>
          </p>
          <p>
            <slot name="action"></slot>
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
    header: { type: String, required: true, default: "" },
    text: { type: String, required: false, default: "" },
    bgURL: { type: String, required: false },
    type: { type: String, required: false },
    ratingAgeLimits: { type: String, required: false },
    kpid: { type: String, required: true },
  },
  computed: {
    cardTypeClass() {
      if (this.type === "default") return "film_default";
      if (this.type === "little") return "film_little";
      return "film_default";
    },
  },
  methods: {
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
  transition: 2s all;
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
  width: 30em;
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
.info::before {
  content: "";
  display: inline-block;
  height: 100%;
  vertical-align: middle;
}
.info__text {
  display: inline-block;
  vertical-align: middle;
  text-align: center;
  font-size: 1.5rem;
  padding: 1rem;
}
.film_little .info__text {
  display: inline-block;
  vertical-align: middle;
  text-align: center;
  font-size: 1.25rem;
  padding: 0rem;
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
    width: 20em;
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