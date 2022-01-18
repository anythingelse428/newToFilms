<template>
  <div class="filmData">
    <div class="filmData__main">
      <div class="main__title"  @click="addHistory()">
        <h1>{{ infoArr.filmType }} {{ infoArr.filmName }} смотреть онлайн</h1>
      </div>
    </div>
    <div class="filmData__description">
      <div class="description__about">
        <h2>О {{ infoArr.filmType }}е</h2>
        <div
          class="description__about__text"
          v-if="infoArr.filmDescription && infoArr.filmDescriptionFull"
        >
          <div class="filmData__about__text">
            {{ infoArr.filmDescription }}
            <span @click="showMore = !showMore" class="mt-5">
              <b v-if="showMore == false"> Больше </b>
              <b v-if="showMore == true"> Скрыть </b>
            </span>
          </div>
          <div class="filmData__about__text" v-show="showMore">
            {{ infoArr.filmDescriptionFull }}
          </div>
        </div>
        <div class="filmData__about__text" v-else>
          {{ infoArr.filmDescriptionFull }}{{ infoArr.filmDescription }}
        </div>

        <div class="main__subinfo">
          <ul>
            <span>{{ infoArr.filmCountry }}</span>
            <li v-for="genre in infoArr.filmGenre" :key="genre.id">
              {{ genre }}
            </li>
          </ul>
          <p>
            {{ infoArr.filmYear }} {{ infoArr.filmTime }} {{ infoArr.filmAge }}+
          </p>
          <div class="title__rating">
            <b
              id="mark"
              class="filmData_elemBorder"
              :style="`background:${infoArr.ratingColor}`"
              ><span>{{ infoArr.filmRating[0] }}</span></b
            >
          </div>
        </div>
      </div>
    </div>
    <div class="filmData__actors">
      <h2>Актеры</h2>
      <div class="actors">
        <div
          class="actors__actor"
          v-for="actor in infoArr.filmActors"
          :key="actor.id"
        >
          <div class="actor__ico filmData_elemBorder" id="actor">
            <i class="bi bi-person-fill"></i>
          </div>
          <label for="actor">{{ actor.nameRu }}</label>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Api from "../api";
export default {
  data() {
    return {
      infoKpid: this.$route.params.kpid,
      showMore: false,
      infoArr: {
        filmDescriptionFull: "",
        filmDescription: "",
        filmCountry: "",
        filmSlogan: "",
        filmActors: [],
        filmRating: [],
        filmGenre: [],
        filmYear: "",
        filmType: "",
        filmName: "",
        filmTime: "",
        filmAge: "",
        ratingColor: "",
      },
    };
  },

  methods: {
        addHistory() {
      console.log(this.$store.state.user.history);
    },
    init() {
      //geting info about film
      this.infoKpid = this.$route.params.kpid;
      Api.getInfoKpid(this.infoKpid).then(({ data }) => {
        let info = data;
        this.infoArr.filmDescription = info.shortDescription;
        this.infoArr.filmDescriptionFull = info.description;
        this.infoArr.filmRating = info.ratingKinopoisk;
        this.infoArr.filmSlogan = info.slogan;
        this.infoArr.filmGenre = info.genres.split(",");
        this.infoArr.filmYear = info.year;
        this.infoArr.filmName = info.nameRu;
        document.title = this.infoArr.filmName;
        this.infoArr.filmAge = info.ratingAgeLimits;
        this.infoArr.filmCountry = info.countries;
        this.infoArr.filmTime = `${Math.trunc(info.filmLength / 60)}ч. ${
          info.filmLength - Math.trunc(info.filmLength / 60) * 60
        } мин.`;
        switch (data.type) {
          case "TV_SERIES":
            this.infoArr.filmType = "Сериал";
            break;
          case "FILM":
            this.infoArr.filmType = "Фильм";
            break;
          case "VIDEO":
            this.infoArr.filmType = "Видео";
            break;
          case "MINI_SERIES":
            this.infoArr.filmType = "Мини-сериал";
            break;
          case "TV_SHOW":
            this.infoArr.filmType = "Шоу";
            break;
        }

        console.log(parseInt(this.infoArr.filmRating, 10));
        switch (parseInt(this.infoArr.filmRating, 10)) {
          case 7:
          case 8:
          case 9:
          case 10:
            this.infoArr.ratingColor = "rgb(90 175 100)";
            break;
          case 6:
          case 5:
          case 4:
            this.infoArr.ratingColor = "rgb(205 171 47 / 90%)";
            break;
          case 3:
          case 2:
          case 1:
          case 0:
            this.infoArr.ratingColor = "rgb(185 62 62)";
            break;
        }
      });
      Api.getActors(this.infoKpid).then(({ data }) => {
        this.infoArr.filmActors = [];
        for (let i = 0; i < 17; i++) {
          this.infoArr.filmActors.push(data.staff.ACTOR[i]);
        }
      });
      return this.infoArr;
    },
  },
  watch: {
    "$route.params.kpid"() {
      this.infoKpid = this.$route.params.kpid;
      this.init();
    },
  },
  mounted() {
    this.init();
  },
};
</script>

<style scoped>
.filmData {
  background: #0a0a0a;
  color: white;
  width: 90%;
  height: calc(100%);
}
.filmData__main {
  display: flex;
  margin: 0 auto;
  justify-content: flex-start;
  flex-direction: column;
}
.filmData__description {
  display: flex;
  width: 100%;
  margin-top: 3em;
}
.description__about {
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  width: 100%;
}
.description__about p {
  text-align: left;
  margin-left: 2em;
  margin-bottom: 2em;
}
.description__about__text {
  text-align: left;
  width: 75%;
}
.description__about__text span {
  cursor: pointer;
}

.description__about h2 {
  margin-left: 1em;
  text-align: left;
  margin-bottom: 0;
}
.filmData__about__text {
  text-align: start;
  margin-left: 2em;
  margin-bottom: 1em;
}
.filmData_elemBorder {
  border: 0.4em solid;
  border-radius: 15%;
  padding: 0.5em;
  width: -webkit-fit-content;
  width: -moz-fit-content;
  width: fit-content;
}
.main__subinfo {
  margin: 0;
  display: flex;
  justify-content: flex-start;
  align-items: flex-start;
  flex-direction: column;
  text-align: start;
}
.main__subinfo p {
  margin-bottom: 0;
}
.main__title {
  display: inline-flex;
  align-items: center;
}
.main__title h1 {
  text-align: left;
  margin: 0 .6em;
  margin-top: 1em;
}
.title__rating b {
  border-color: #232c36ad;
  color: white;
}
.title__rating {
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-left: 2em;
  margin-top: 1em;
}
.actor__ico {
  border-color: #0c0f13c4;
  background: rgb(39, 39, 39);
}
.actor__ico i {
  color: white;
  font-size: 1.4em;
}
.filmData__actors {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  margin: 0 auto;
  flex-direction: column;
  align-items: center;
}
.actors__actor {
  display: flex;
  align-items: center;
  width: 15%;
  flex-wrap: wrap;
  margin: 0.5em;
  justify-content: center;
}
.actors__actor p {
  text-align: center;
  min-width: fit-content;
}
.actors {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: center;
}
li {
  display: inline;
}
li::before {
  content: " ";
  width: 2px;
  height: 2px;
  text-align: center;
  background-color: rgba(255, 255, 255, 0.72);
  margin-left: 6px;
  margin-right: 6px;
  margin-bottom: 3px;
}
li:first-child::before {
  width: 2px;
  height: 2px;
  text-align: center;
  background-color: rgba(255, 255, 255, 0.72);
  margin-left: 6px;
  margin-right: 6px;
  margin-bottom: 3px;
}
@media screen and (max-width: 770px) {
  .filmData {
    width: 100%;
  }
  .filmData__description {
    display: flex;
    width: 85vw;
  }
  .description__about {
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    width: 85vw;
  }
  .actors__actor {
    display: flex;
    align-items: center;
    width: 25%;
    flex-wrap: wrap;
    margin: 0.5em;
    justify-content: center;
  }
}
</style>