<template>
  <footer class="footer">
    <p>
      created with <i class="bi bi-suit-heart-fill text-danger"></i>
      <a
        href="https://github.com/anythingelse428"
        target="_blank"
        class="footer__link"
        ><i>anythingelse428</i>
      </a>
    </p>
  </footer>
</template>

<script>
export default {
  name: "Footer",
};
</script>

<style>
.footer {
  position: relative;
  bottom: 0;
  padding: 0.51em;
  color: white !important;
  background: rgb(8, 8, 8);
  justify-content: center;
}
.footer__link,
.footer__link:visited {
  cursor: pointer;
  color: inherit;
  margin-left: 0.5em;
}
.footer__link:hover {
  text-decoration: underline;
  cursor: pointer;
}
.footer__link:hover {
  color: rgb(250, 81, 75);
}
</style>