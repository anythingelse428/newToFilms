<template>
  <footer>
    <p>
      created with <i class="bi bi-suit-heart-fill text-danger"> </i>
      <i @click="footerLinkShow = !footerLinkShow" class="footerMe">
        anythingelse428
      </i>
    </p>
    <transition
      @before-enter="beforeEnter"
      @enter="enter"
      @leave="leave"
 
    >
      <div class="footerLinks" v-show="footerLinkShow">
        <a href="https://github.com/anythingelse428" target="_blank"
          ><i class="bi bi-github"></i
        ></a>
        <a href="https://t.me/bug0g0" target="_blank"
          ><i class="bi bi-telegram"></i
        ></a>
      </div>
    </transition>
  </footer>
</template>

<script>
import gsap from "gsap";

export default {
  name: "Footer",
  methods: {
        beforeEnter(el) {
      gsap.set(el, {
        opacity: 0,
      });
    },
    enter(el, done) {
      gsap.to(el, {
        duration: 0.7,
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
        duration: 0.5,
        delay: 0.1,
        opacity: 0,
        onComplete: done,
      });
    },
  },
};
</script>

<style>
footer {
  display: inline-flex;
  padding: 0.51em;
  left: 0;
  right: 0;
  color: white !important;
  background: rgb(8, 8, 8);
  position: absolute;
  bottom: 0;
  justify-content: center;
}
footer a,
footer a:visited {
  cursor: pointer;
  color: inherit;
  margin-left: 0.5em;
}
.footerMe:hover {
  text-decoration: underline;
  cursor: pointer;
}
footer a:hover {
  color: rgb(250, 81, 75);
}
</style>