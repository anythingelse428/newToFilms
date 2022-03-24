<template>
  <div class="watch">
    <div class="watch__primary">
      <div class="watch__videoWrapper ratio ratio-16x9">
        <iframe
          v-if="!hide"
          :src="GET_SRC"
          frameborder="0"
          allowfullscreen
        ></iframe>
        <div
          v-else
          :style="{ 'background-image': 'url(' + GET_SRC + ')' }"
          class="watch__video-bad"
        >
          <h2>Сайт создан исключительно с целью ознакомления</h2>
          <h3 class="hidden">Авторизация легитимизирует пиратство </h3>
        </div>
      </div>
      <div class="watch__choosePlayer" v-if="!hide">
        <a
          href="#"
          @click="player = 'Bazon'"
          :class="
            `choosePlayer__button ` +
            [
              !activeButtonClass
                ? ' choosePlayer__button-active'
                : 'choosePlayer__button-inactive',
            ]
          "
        >
          Плеер 1
        </a>
        <a
          href="#"
          @click="player = 'Sveta'"
          :class="
            `choosePlayer__button ` +
            [
              activeButtonClass
                ? ' choosePlayer__button-active'
                : 'choosePlayer__button-inactive',
            ]
          "
        >
          Плеер 2
        </a>
      </div>
    </div>
    <div class="watch__secondary">
      <film-data></film-data>
    </div>
    <div class="watch__section">
      <recomendation-for-film></recomendation-for-film>
    </div>
  </div>
</template>
<script>
import Api from "../api/";
import FilmData from "../components/FilmData.vue";
import RecomendationForFilm from "../components/RecomendationForFilm.vue";
export default {
  name: "Watch",
  components: { FilmData, RecomendationForFilm },
  data() {
    return {
      watchKpid: this.$route.params.kpid,
      player: "Bazon",
      src: "",
      hide: true,
      logHistory: false,
      //if activeButtonClass is false button for call Bazon player is active, for this reason it have .choosePlayer__button-active class by default
      activeButtonClass: false,
    };
  },
  methods: {
    getSrc() {
      this.watchKpid = this.$route.params.kpid;
      if (
        localStorage.getItem("jwt") == "LOGOUT" ||
        localStorage.getItem("jwt") == null
      ) {
        Api.getTrailer(this.watchKpid).then(({ data }) => {
          console.log(data);
          this.src = data.posterUrl;
        });
        return this.src;
      } else {
        this.hide = false;
        switch (this.player) {
          case "Bazon":
            this.src = "//v1632823834.bazon.site/kp/" + this.watchKpid;
            this.activeButtonClass = false;
            break;
          case "Sveta":
            this.src =
              "//7043.svetacdn.in/LDSZJq4uCNvY?kp_id=" + this.watchKpid;
            this.activeButtonClass = true;

            break;
          default:
            break;
        }
        return this.src;
      }
    },
    addHistory(kpid) {
      Api.addUserHistory(kpid);
    },
  },
  computed: {
    GET_SRC() {
      return this.getSrc();
    },
  },
  created() {
    Api.isHistoryShow().then((res) => {
      let idx = res.data.length < 2 ? 0 : res.data.length - 1;
      if (res.data[idx].showHistory == 1) {
        console.log("HISTORY LOGGED");
        this.addHistory(this.watchKpid);
        return (this.logHistory = true);
      } else {
        console.log("HISTORY LOG DISALLOW");
        return (this.logHistory = false);
      }
    });
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
.watch__choosePlayer {
  margin-top: 0.2em;
}
.choosePlayer__button {
  display: inline-block;
  position: relative;
  padding: 0.21em;
  border: 0;
  border-radius: 0.1em;
  font-family: system-ui;
  font-weight: 100;
  width: 8em;
  text-align: center;
  text-decoration: none;
}
.choosePlayer__button-inactive {
  background: #ff616d;
  color: #5b0707;
}
.choosePlayer__button-active {
  background: #66de93;
  color: #015220;
}
.choosePlayer__button-active::after,
.choosePlayer__button-inactive::after {
  content: "_";
  color: transparent;
  position: absolute;
  z-index: 0;
  margin: 0.1em auto;
  left: 0;
  right: 0;
  max-width: 1em;
  transition: transform cubic-bezier(0.55, 0.055, 0.675, 0.19) 0.41s;
  font-weight: 900;
}
.choosePlayer__button-active:hover::after,
.choosePlayer__button-inactive:hover::after {
  color: inherit;
  transform: scaleX(10);
}
.watch {
  display: flow-root;
  width: 100%;
  padding: 2.5em 0.5em;
}
iframe {
  background-color: #444444;
}
.watch__video-bad {
  background-size: cover !important;
  background: no-repeat;
  filter: grayscale(0.9);
}
.watch__video-bad h2 {
  color: rgb(248, 248, 248);
  background: rgb(24, 24, 24);
  padding: 0.5em;
}
.hidden{
  color: transparent;
  background: transparent;

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
