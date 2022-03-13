<template>
  <div class="navigation-component">
    <nav class="navigation">
      <div class="navigation__brand">
        <router-link to="/" class="navigation__link" @click="ddshow = false">
          <span>ToFilms</span>
        </router-link>
      </div>
      <div class="tools navigation__tools" v-if="!mobile">
        <div class="search tools__search">
          <i
            class="bi bi-search navigation__link"
            @click="(searchShow = !searchShow), (inputSearch = '')"
          ></i>
          <transition name="slide-fade">
            <input
              v-if="searchShow || ddshow"
              class="search__input"
              type="search"
              autocomplete="off"
              placeholder="Что смотрим сегодня?"
              aria-label="Search"
              @input="debouncedSearching($event)"
              @focus="searchShow || ddshow"
              v-model="inputSearch"
            />
          </transition>
        </div>
        <div v-if="IS_AUTH" class="navigation__tools-auth">
          <router-link to="/profile" class="navigation__link"
            ><i class="bi bi-person"></i
          ></router-link>
          <router-link
            to="/"
            @click="actAuth('LOGOUT')"
            class="navigation__link"
            ><i class="bi bi-box-arrow-in-right"></i
          ></router-link>
        </div>
        <span
          class="navigation__tools-nonauth"
          v-if="!IS_AUTH"
          @click="actAuth()"
          ><router-link to="/auth" class="navigation__link">
            Войти
          </router-link>
        </span>
        <search-result
          :input="inputSearch"
          :array="searchData"
          @click="(ddshow = false), (inputSearch = '')"
        ></search-result>
      </div>
      <button
        v-if="mobile"
        class="colapseToggle navigation__colapseToggle"
        :class="{ 'colapseToggle-clicked': ddshow }"
        @click="ddshow = !ddshow"
      >
        <i class="bi bi-menu-button-wide"></i>
      </button>
    </nav>
    <transition name="fade">
      <div class="mobileBar navigation__tools-mobile" v-if="ddshow && mobile">
        <div class="mobileBar__tools">
          <i class="bi bi-x-lg" @click="ddshow = !ddshow"></i>
          <div v-if="IS_AUTH" class="navigation__tools-auth">
            <router-link to="/profile" class="navigation__link"
              ><i class="bi bi-person"></i
            ></router-link>
            <router-link
              to="/"
              @click="actAuth('LOGOUT')"
              class="navigation__link"
              ><i class="bi bi-box-arrow-in-right"></i
            ></router-link>
          </div>
          <span
            class="navigation__tools-nonauth"
            v-if="!IS_AUTH"
            @click="actAuth()"
            ><router-link to="/auth" class="navigation__link">
              Войти
            </router-link>
          </span>
        </div>

        <div class="mobileBar__searchGroup">
          <input
            v-if="searchShow || ddshow"
            class="search__input"
            type="search"
            autocomplete="off"
            placeholder="Что смотрим сегодня?"
            aria-label="Search"
            @input="debouncedSearching($event)"
            @focus="searchShow || ddshow"
            v-model="inputSearch"
          />
          <search-result
            :input="inputSearch"
            :array="searchData"
            @click="(ddshow = false), (inputSearch = '')"
          ></search-result>
        </div>
      </div>
    </transition>
  </div>
</template>

<script>
import _ from "lodash";
import Api from "../api/";
import SearchResult from "./SearchResult.vue";
export default {
  components: { SearchResult },
  data() {
    return {
      inputSearch: "",
      ddshow: false,
      mobile: false,
      searchShow: false,
      searchData: [],
      windowSize: window.innerWidth,
    };
  },
  created() {
    this.debouncedSearching = _.debounce(this.search, 200);
  },
  mounted() {
    Api.init(this);
    this.initAuth();
    this.checkWindowWidth();
    window.addEventListener("resize", () => {
      this.checkWindowWidth();
    });
  },
  updated() {
    this.checkWindowWidth();
  },
  methods: {
    checkWindowWidth() {
      this.windowSize = window.innerWidth;
      if (this.windowSize > 1100) return (this.mobile = false);
      else return (this.mobile = true);
    },
    checkMiddleware() {
      const name = "Auth";
      if (this.$route.meta.requiresAuth) {
        if (!this.IS_AUTH) {
          console.log("Non auth");
          this.$router.push({ name: name });
        }
      }
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

    search(evt) {
      this.inputSearch = evt.target.value;
      Api.search(this.inputSearch)
        .then((response) => {
          this.searchData = response.data.content;
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
  computed: {
    IS_AUTH() {
      return this.$store.getters.IS_AUTH;
    },
  },
};
</script>

<style scoped>
.navigation {
  display: flex;
  align-items: center;
  justify-content: space-between;
  background-color: rgb(27, 27, 27);
  font-size: 1.5em;
  padding: 0.55em;
  width: 100%;
  position: sticky;
}
.navigation__link {
  color: #ebebeb;
  text-decoration: none;
  margin: 0em 1em;
  transition: all 0.2s;
  cursor: pointer;
}
.colapseToggle {
  border: 0;
  background: transparent;
  color: #ebebeb;
}
.colapseToggle i::before {
  transition: all 0.51s;
}
.colapseToggle-clicked i::before {
  font-size: 1.2em !important;
}
.search__input {
  background: none;
  font-size: 0.9em;
  border: none;
  color: #d6d6d6;
  border-bottom: 2px solid;
  border-radius: 0.2em;
  padding: 0.2em;
  margin: 0 0.25em;
  outline: none;
}
@media screen and (min-width: 1100px) {
  .navigation__link:hover {
    color: #dadada;
  }
  .navigation__tools {
    display: flex;
    flex-wrap: nowrap;
    align-content: center;
    align-items: center;
  }
  .tools__search {
    color: white;
  }
}

@media screen and (max-width: 1100px) {
  .navigation__tools-mobile {
    display: flex;
    flex-direction: column;
    position: fixed;
    overflow: overlay;
    background: #2d2d2df5;
    bottom: 0;
    height: 100%;
    width: 100%;
    left: 0;
    right: 0;
    z-index: 1;
  }
  .mobileBar__tools {
    color: aliceblue;
    display: flex;
    flex-direction: row-reverse;
    justify-content: space-around;
    font-size: 1.5em;
    margin-bottom: 0.9em;
  }
  .navigation__link:first-child {
    margin-left: 0;
  }
  .navigation__link {
    color: #ebebeb;
    text-decoration: none;
    transition: all 0.2s;
    cursor: pointer;
  }
}
.search__input::placeholder,
.slide-fade-enter-active {
  transition: all 0.1s ease-in;
}
.slide-fade-leave-active {
  transition: all 0.15s cubic-bezier(1, 0.5, 0.8, 1);
}
.slide-fade-enter,
.slide-fade-leave-to {
  transform: translateX(10px);
  opacity: 0;
}
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>