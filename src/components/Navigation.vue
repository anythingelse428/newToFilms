<template>
  <nav class="navbar navbar-expand-lg navbar-dark bg-dark sticky-top">
    <div class="container-fluid">
      <router-link to="/" class="navbar-brand" @click="ddshow = false">
        <span>ToFilms</span>
      </router-link>
      <button
        class="navbar-toggler"
        data-bs-toggle="collapse"
        data-bs-target="#navbarSupportedContent"
        aria-controls="navbarSupportedContent"
        aria-expanded="false"
        aria-label="Toggle navigation"
        @click="inputSearch = ''"
      >
        <i class="bi bi-list-nested"></i>
      </button>
      <div class="collapse navbar-collapse" id="navbarSupportedContent">
        <ul class="navbar-nav me-auto mb-2 mb-lg-0"></ul>
        <i class="bi bi-search p-2 me-2" @click="searchShow = !searchShow"></i>

          <transition name="slide-fade">
            <input
              v-if="searchShow"
              class="me-2"
              type="search"
              autocomplete="off"
              placeholder="Что смотрим сегодня?"
              aria-label="Search"
              @input="debouncedSearching($event)"
              v-model="inputSearch"
            />
          </transition>
        
        <ul class="navbar-nav mb-2 mb-lg-0">
          <li class="nav-item">
            <span v-if="IS_AUTH" class="d-flex justify-content-end">
              <router-link to="/profile" class="nav-link"
                ><i class="bi bi-person me-2"></i
              ></router-link>
              <router-link to="/" @click="actAuth('LOGOUT')" class="nav-link"
                ><i class="bi bi-box-arrow-in-right me-2"></i
              ></router-link>
            </span>
            <span class="nav-item" v-else @click="actAuth()"
              ><router-link to="/auth" class="nav-link"> Войти </router-link>
            </span>
          </li>
        </ul>
      </div>
    </div>
    <search-result
      :input="inputSearch"
      :array="searchData"
      @click="(ddshow = false), (inputSearch = '')"
    ></search-result>
  </nav>
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
      searchShow: false,
      searchData: [],
    };
  },
  created() {
    this.debouncedSearching = _.debounce(this.search, 200);
  },
  mounted() {
    Api.init(this);
    this.initAuth();
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
i {
  font-size: 1.5em;
  color: #87888c;
}
.navbar-toggler:focus {
  box-shadow: initial !important;
  border: none !important;
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
input {
  color: #e7e7e7;
  border: 0;
  border-bottom: 2px solid #bebfbf;
  background: inherit;
  padding: 0.5em;
  border-radius: 0.2em;
}
input:focus {
  background-color: #37373775 !important;
  outline: 0;
  box-shadow: 0 0.15rem rgb(201 214 201 / 23%);
}
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
</style>