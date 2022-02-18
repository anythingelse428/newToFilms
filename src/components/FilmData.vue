<template>
  <div class="filmData">
    <div class="main filmData__main">
      <div class="title main__title">
        <h2>
          <span>{{ infoArr.filmType + " " }}</span>
          <span>{{ infoArr.filmName }}</span> смотреть онлайн
        </h2>
      </div>
      <div class="description filmData__description">
        <div class="about description__about">
          <h2
            class="about__type"
            v-if="
              infoArr.filmType == 'Фильм' ||
              infoArr.filmType == 'Мини-сериал' ||
              infoArr.filmType == 'Сериал'
            "
          >
            О <span>{{ infoArr.filmType }}</span
            >е
          </h2>
          <h2
            class="about__type"
            v-if="infoArr.filmType == 'Видео' || infoArr.filmType == 'Шоу'"
          >
            О <span>{{ infoArr.filmType }}</span>
          </h2>
          <div
            class="about__text"
            v-if="infoArr.filmDescription && infoArr.filmDescriptionFull"
          >
            <p class="about__text about__text_default">
              {{ infoArr.filmDescription }}
              <b
                class="about__text_show"
                v-if="showMore == false"
                @click="showMore = !showMore"
              >
                Больше
              </b>
            </p>

            <div class="about__text about__text_more" v-show="showMore">
              {{ infoArr.filmDescriptionFull }}
              <b
                class="about__text_hide"
                v-if="showMore == true"
                @click="showMore = !showMore"
              >
                Скрыть
              </b>
            </div>
          </div>
          <div class="about__text" v-else>
            <p>
              {{ infoArr.filmDescriptionFull }}{{ infoArr.filmDescription }}
            </p>
          </div>
        </div>
      </div>
      <div class="subinfo main__subinfo">
        <ul class="characteristics subinfo__characteristics">
          <span>{{ infoArr.filmCountry }}</span>
          <li
            class="characteristics__characteristic"
            v-for="genre in infoArr.filmGenre"
            :key="genre.id"
          >
            {{ genre }}
          </li>
        </ul>
        <p>
          {{ infoArr.filmYear }} {{ infoArr.filmTime }} {{ infoArr.filmAge }}+
        </p>
        <div class="rating subinfo__rating">
          <b
            class="rating_border border"
            :style="`background:${infoArr.ratingColor}`"
            ><span>{{ infoArr.filmRating[0] }}</span></b
          >
        </div>
      </div>
    </div>
    <div class="filmData__actors">
      <h2>Актеры</h2>
      <div class="actors" v-if="infoArr.filmActors.length">
        <div
          class="actor actors__actor"
          v-for="actor in infoArr.filmActors"
          :key="actor.staffId"
        >
          <span>
            {{ actor.nameRu }}
          </span>
        </div>
      </div>
      <div v-else>У нас пока нет данных, но мы скоро все добавим</div>
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
        if (data.staff.ACTOR) {
          console.log(data.staff.ACTOR);
          let i = data.staff.ACTOR.length < 10 ? data.staff.ACTOR.length : 10;
          for (let k = 0; k < i; k++) {
            this.infoArr.filmActors.push(data.staff.ACTOR[k]);
          }
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
  padding-left: 2.5em;
  margin-top: 1.5em;
}

.main {
  display: flex;
  margin: 0 auto;
  justify-content: flex-start;
  flex-direction: column;
}
.main__title {
  text-align: left;
}
.description {
  display: flex;
  width: 100%;
  margin-top: 0.5em;
}
.about {
  text-align: left;
}
.about__text {
  margin-bottom: 1em;
}
.about__text_show,
.about__text_hide {
  cursor: pointer;
}
/*


*/
.main__subinfo {
  margin: 0;
  display: flex;
  justify-content: flex-start;
  align-items: flex-start;
  flex-direction: column;
  text-align: start;
}
.characteristics {
  padding: 0 !important;
}
.characteristics__characteristic {
  display: inline;
}
.characteristics__characteristic::before {
  content: " ";
  width: 2px;
  height: 2px;
  text-align: center;
  background-color: rgba(255, 255, 255, 0.72);
  margin-left: 6px;
  margin-right: 6px;
  margin-bottom: 3px;
}
.characteristics__characteristic:first-child::before {
  width: 2px;
  height: 2px;
  text-align: center;
  background-color: rgba(255, 255, 255, 0.72);
  margin-left: 6px;
  margin-right: 6px;
  margin-bottom: 3px;
}
.rating {
  display: flex;
  flex-direction: column;
  align-items: center;
}
.border {
  padding: 0.7em;
  border-radius: 0.2em;
  border-color: transparent !important;
}
/*

*/
.actors__actor {
  width: 100%;
  margin: 0.5em;
  text-align: start;
}

@media screen and (max-width: 770px) {
  .filmData {
    background: #0a0a0a;
    color: white;
    width: 90%;
    padding-left: 1.5em;
  }
  .description__about {
    display: flex;
    flex-direction: column;
  }
}
</style>