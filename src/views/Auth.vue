<template>
  <div class="auth">
    <h2>Авторизация</h2>
    <div class="form auth__form container-sm">
      <input
        type="email"
        v-model="mail"
        placeholder="E-mail"
        :class="valid.email"
        class="input form__input"
      />

      <input
        type="password"
        v-model="password"
        placeholder="Пароль"
        :class="valid.password"
        class="input form__input"
      />

      <button class="button form__button" @click="login(), loginValidate()">Войти</button>
    </div>
    <sub
      >Ещё нет аккаунта?
      <router-link to="registration" class=""> Регистрация </router-link></sub
    >
  </div>
</template>

<script>
import Api from "../api";
export default {
  name: "Auth",
  data() {
    return {
      password: "",
      mail: "",
      valid: {
        password: "good",
        email: "good",
      },
    };
  },
  computed: {
    USER() {
      return this.$store.getters.USER;
    },
  },
  methods: {
    login() {
      Api.login(this, this.mail, this.password).then((data) => {
        if (data?.jwt) {
          this.$store.commit("LOGIN", data?.jwt);
          this.$router.push("/profile");
        } else {
          if (
            data.data.error ==
            "the account with the specified email address was not found"
          )
            return (this.valid.email = "warn");
          if (data.data.error == "invalid password")
            return (this.valid.password = "warn");
        }
        this.loginValidate();
      });
    },
    loginValidate() {
      if (this.mail.length == 0) this.valid.email = "warn";
      if (!this.password) this.valid.password = "warn";
      // console.log(this.valid);
    },
  },
};
</script>

<style scoped>
.auth{
  height: 90vh;
}
.auth__form {
  display: flex;
  flex-direction: column;
}
.button {
  border: 0;
  border-radius: 0.2em;
  background: rgb(139, 240, 172);
  color: #504e4e;
  font-family: system-ui;
  width: 8em;
  text-align: center;
  font-weight: 100;
  padding: 0.25em;
  transition: all 0.3s;
}
.button:hover {
  width: 8.1em;
  font-weight: normal;
  background: rgb(139, 240, 161);
}
sub {
  color: #787878;
}
.input {
  font-size: 1.1em;
  margin: 1em 0;
  border: none;
  outline: none;
  padding: 0.5em;
  border-bottom: 2px solid #464646a8;
  transition: all ease-in-out 0.2s;
}
.input:focus-visible {
  background: #98ef9fb3;
  padding: 0.5em;
  border-radius: 5px;
  color: black;
}
.warn {
  border-bottom: 2px solid #ff5454a8 !important;
}
</style>