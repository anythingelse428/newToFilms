<template >
  <div @click="inputSearch = ''">
    <nav class="navbar navbar-expand-lg navbar-dark bg-dark sticky-top">
      <div class="container-fluid">
        <router-link to="/" class="navbar-brand">
          <span>ToFilms</span>
        </router-link>
        <button
          class="navbar-toggler"
          data-bs-toggle="collapse"
          data-bs-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <i class="bi bi-list-nested"></i>
        </button>
        <div class="collapse navbar-collapse" id="navbarSupportedContent">
          <ul class="navbar-nav me-auto mb-2 mb-lg-0">
            <li class="nav-item">
              <router-link to="/" class="nav-link" @click="ddshow = false">
                <span> Главная </span>
              </router-link>
            </li>
          </ul>
          <div class="d-flex">
            <input
              class="form-control me-2"
              type="search"
              autocomplete="off"
              placeholder="Что смотрим сегодня"
              aria-label="Search"
              @input="debouncedSearching($event)"
              v-model="inputSearch"
              autofocus
            />
          </div>
          <ul class="navbar-nav mb-2 mb-lg-0">
            <li class="nav-item">
              <span v-if="IS_AUTH" class="d-flex justify-content-around">
                <router-link to="/profile" class="nav-link"
                  ><i class="bi bi-person"></i
                ></router-link>
                <router-link to="/" @click="actAuth('LOGOUT')" class="nav-link"
                  ><i class="bi bi-box-arrow-in-right"></i
                ></router-link>
              </span>
              <span class="nav-item" v-else @click="actAuth()"
                ><router-link to="/auth" class="nav-link"> Войти </router-link>
              </span>
            </li>
          </ul>
        </div>
      </div>
    </nav>
    <div class="searchResult">
      <ul v-if="inputSearch">
        <li v-if="(searchData.length == 0) & (inputSearch.length > 3)">
          ничего нет(
        </li>
        <div v-for="res in searchData" :key="res.kinopoiskId">
          <router-link
            :to="{ name: 'Watch', params: { kpid: Number(res.kinopoiskId) } }"
            @click="inputSearch = ''"
          >
            <li class="SearchedFilm" v-if="res.nameRu">
              <img
                :src="res.posterUrl"
                alt=""
                srcset=""
                width="30"
                class="me-1"
              />
              <span>{{ res.nameRu }} </span>
            </li>
          </router-link>
        </div>
      </ul>
    </div>
    <router-view />
    <footer>
      <p>
        created with <i class="bi bi-suit-heart-fill text-danger"> </i>
        <i @click="footerLinkShow = !footerLinkShow" class="footerMe"> anythingelse428 </i>
      </p>
      <transition
        @before-enter="beforeEnter"
        @enter="enter"
        @leave="leave"
        :css="false"
      >
        <div class="footerLinks" v-show="footerLinkShow">
          <a href="https://github.com/anythingelse428"
            ><i class="bi bi-github"></i
          ></a>
          <a href="https://t.me/bug0g0"><i class="bi bi-telegram"></i></a>
        </div>
      </transition>
    </footer>
  </div>
</template>

<style>  
@import url("https://cdn.jsdelivr.net/npm/bootstrap-icons@1.7.0/font/bootstrap-icons.css");
@import url("https://cdn.jsdelivr.net/npm/bootstrap@5.0.2/dist/css/bootstrap.min.css");
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
}
footer {
  display: inline-flex;
  width: 100%;
  padding: .51em;
  color: white !important;
  background: rgb(8, 8, 8);
  position: static;
  bottom: 0;
  justify-content: center;
}
footer a,
footer a:visited {
  cursor: pointer;
  color: inherit;
  margin-left: .5em;
}
.footerMe:hover{
  text-decoration: underline;
  cursor: pointer;
}
footer a:hover{
  color: rgb(250, 81, 75);
}
.navbar-toggler:focus {
  box-shadow: initial !important;
  border: none !important;
}
.contact {
  display: flex;
  width: 33%;
}
.contact div {
  margin-right: 2em;
}
html,
body {
  margin: 0;
  padding: 0;
}
* {
  box-sizing: border-box;
}
.navbarDropdown__menu {
  white-space: nowrap;
  padding: 1em;
  border-radius: 0.25em;
  background: rgba(24, 24, 24, 0.7098039215686275);
  right: 5%;
  position: absolute;
  display: flex;
  flex-direction: column;
  text-align: start;
  list-style: none;
  transition: 0.2s ease-in-out;
}
.searchResult {
  z-index: 100500;
  width: 20%;
  position: fixed;
  display: flex;
  flex-wrap: wrap;
  flex-direction: column;
  align-items: center;
  right: 5em;
}
.nav-link > i {
  font-size: 1.5em;
}
.searchResult ul {
  width: 100%;
  list-style: none;
  color: white !important;
  background: #2c2c2cf0;
  text-align: left;
  margin: 0;
  padding: 0;
}
.SearchedFilm {
  padding: 1em;
}
.searchResult ul > div > a {
  text-decoration: none;
  color: aliceblue;
}
.SearchedFilm:hover,
.SearchedFilm:focus-visible,
.SearchedFilm:focus-within,
.SearchedFilm span:focus-visible,
.SearchedFilm > a:focus-visible {
  border: none;
  background: rgb(17, 17, 17);
  outline: 0;
}
@media screen and (max-width: 991px) {
  .searchResult {
    z-index: 100500;
    width: 100%;
    position: fixed;
    display: flex;
    flex-wrap: wrap;
    flex-direction: column;
    align-items: center;
    right: 0em;
    top: 11em;
  }
  .navbarDropdown__menu {
    width: 100%;
    position: relative;
  }
}
</style>
<script>
import gsap from 'gsap'
import Api from "./api";
import _ from "lodash";
export default {
  data() {
    return {
      inputSearch: "",
      searchData: [],
      ddshow: false,
      footerLinkShow: false,
    };
  },
  mounted() {
    Api.init(this);
    this.initAuth();
  },
  created() {
    this.debouncedSearching = _.debounce(this.searching, 200);
  },
  computed: {
    IS_AUTH() {
      return this.$store.getters.IS_AUTH;
    },
  },
  methods: {
    checkMiddleware() {
      const name = "Auth";
      if (this.$route.meta.requiresAuth) {
        if (!this.IS_AUTH) {
          console.log("Non auth");
          this.$router.push({ name: name });
        }
      }
    },
    beforeEnter(el) {
      gsap.set(el, {
        opacity: .7,
      });
    },
    enter(el, done) {
      gsap.to(el, {
        duration: 1,
        opacity: 1,
        x: 5,
        ease: "elastic.inOut(2.5, 1)",
        onComplete: done,
      });
    },
    leave(el, done) {
      gsap.to(el, {
        duration: 0.7,
        x: 40,
        ease: "elastic.inOut(2.5, 1)",
      });
      gsap.to(el, {
        duration: 0.2,
        delay: 0.5,
        opacity: 0,
        onComplete: done,
      });
    },

    actAuth(act = "") {
      if (!this.IS_AUTH) {
        this.$router.push("/auth");
      }
      if (act == "LOGOUT") {
        Api.logout(this);
        this.$router.push("/");
      }
    },
    initAuth() {
      window.addEventListener("storage", (event) => {
        if (event.key === "jwt") {
          if (event.newValue === "LOGOUT" || event.newValue === "")
            this.$store.commit("LOGOUT");
          else this.$store.commit("LOGIN", event.newValue);
        }
      });

      const jwt = localStorage.getItem("jwt");
      if (jwt && jwt !== "LOGOUT") this.$store.commit("LOGIN", jwt);
    },
    searching(evt) {
      this.inputSearch = evt.target.value;
      Api.search(this.inputSearch)
        .then((response) => {
          this.searchData = response.data.content;
          console.log(this.searchData);
        })
        .catch(() => {
          this.searchData = [];
          return;
        });
    },
  },
  watch: {
    "$route.name"() {
      this.checkMiddleware();
      if (location.pathname.indexOf("watch") == -1) {
        return (document.title = "ToFilms");
      }
    },
    forMiddleware() {
      this.checkMiddleware();
    },
    IS_AUTH() {
      setTimeout(() => {
        const dropdownElementList = [].slice.call(
          document.querySelectorAll(".dropdown-toggle")
        );
        const dropdownList = dropdownElementList.map(function (
          dropdownToggleEl
        ) {
          return new window.bootstrap.Dropdown(dropdownToggleEl);
        });
        return dropdownList;
      }, 200);
    },
  },
};
</script>

