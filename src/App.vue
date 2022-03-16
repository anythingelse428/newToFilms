<template >
  <main>
    <Navigation />
    <router-view />
    <Footer />
  </main>
</template>

<script>
import Footer from "./components/Footer.vue";
import Navigation from "./components/Navigation.vue";
import { mapActions } from "vuex";
export default {
  components: {
    Footer,
    Navigation,
  },
  methods: {
    ...mapActions({ load: "loadHistory" }),
  },
  created() {
    this.load(1);
  },
  mounted() {

    window.addEventListener("load", () => {
      this.load(1);
    });
  },
};
</script>

<style>
@import url("https://cdn.jsdelivr.net/npm/bootstrap-icons@1.7.0/font/bootstrap-icons.css");
@import url("https://cdn.jsdelivr.net/npm/bootstrap@5.0.2/dist/css/bootstrap.min.css");
* {
  box-sizing: border-box;
}

html,
body {
  margin: 0;
  padding: 0;
  color: #dddddd;
}
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
}
main {
  background: #2a2929;
  min-height: 100vh;
  padding-top: 6em;
}
</style>
