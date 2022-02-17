<template>
  <div class="watch">
    <div class="watch__primary">
      <div class="watch__video-wrapper ratio ratio-16x9">
        <iframe
          :src="getSrc()"
          frameborder="0"
          allowfullscreen
          referrerpolicy="origin"
        ></iframe>
      </div>
      <div class="watch__choose-player">
        <button @click="player = 'Bazon'">Плеер 1</button>
        <button @click="player = 'Sveta'">Плеер 2</button>
      </div>
    </div>
    <div class="watch__secondary">
      <film-data></film-data>
    </div>
    <div class="watch__section">
      <watch-recoms-list></watch-recoms-list>
    </div>
  </div>
</template>
<script>
import FilmData from "../components/FilmData.vue";
import WatchRecomsList from "../components/WatchRecomsList.vue";
export default {
  name: "Watch",
  components: { FilmData, WatchRecomsList },
  data() {
    return {
      watchKpid: this.$route.params.kpid,
      player: "Bazon",
      src: "",
    };
  },
  methods: {
    getSrc() {
      this.watchKpid = this.$route.params.kpid;
      switch (this.player) {
        case "Bazon":
          this.src = "//v1632823834.bazon.site/kp/" + this.watchKpid;
          break;
        case "Sveta":
          this.src = "//7043.svetacdn.in/LDSZJq4uCNvY?kp_id=" + this.watchKpid;
          break;
        default:
          break;
      }
      return this.src;
    },
  },

  mounted() {
    this.getSrc();
    if (localStorage.player) this.player = localStorage.player; //save choosen player variable
  },
  watch: {
    "$route.params.kpid"() {
      this.watchKpid = this.$route.params.kpid;
    },
    player(newPlayer) {
      localStorage.player = newPlayer;
    },
  },
};
</script>

<style scoped>
button {
  border: 0;
  border-radius: 0.1em;
  background: aliceblue;
  color: #504e4e;
  font-family: system-ui;
  width: 8em;
  text-align: center;
  font-weight: 100;
}
iframe {
  background-color: rgb(141, 141, 141);
}
.watch {
  display: flow-root;
  width: 100%;
  background: #0a0a0a;
  padding-bottom: 5em;
}
.watch__primary {
  display: block;
  width: 70%;
  float: left;
  margin-bottom: 1em;
}
.watch__secondary {
  display: block;
  width: 30%;
  float: right;
}
.watch__section {
  width: 65%;
  float: left;
}
.watch__section h2 {
  color: aliceblue;
}
@media screen and (max-width: 1100px) {
  .watch {
    display: flex;

    flex-direction: column;
  }
  .watch__primary {
    width: 100%;
  }
  .watch__secondary {
    display: block;
    width: 100%;
  }
  .watch__section {
    width: 100%;
  }
}
</style>
