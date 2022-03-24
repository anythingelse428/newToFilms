<template>
  <div class="registration">
    <h2>Регистрация</h2>
    <transition name="slide-fade">
      <div class="warningValidate" v-show="badData">
        <span>{{ valid.message }}</span>
      </div>
    </transition>
    <form class="form registration__form container-sm">
      <input
        type="text"
        placeholder="Имя"
        v-model="name"
        class="form__input"
        :class="valid.name + ' form__input'"
      />
      <input
        type="text"
        placeholder="Фамилия"
        v-model="sname"
        :class="valid.sname + ' form__input'"
      />
      <select
        name="gender"
        id=""
        v-model="gender"
        :class="valid.gender + ' form__select'"
      >
        <option disabled="disabled" value="">Гендер</option>
        <option value="male">Мужской</option>
        <option value="female">Женский</option>
        <option value="etc">Хеликоптер Хеликоптер...</option>
      </select>
      <input
        type="email"
        placeholder="E-mail"
        v-model="email"
        :class="valid.email + ' form__input'"
      />
      <div class="form__inputWrapper">
        <input
          :type="inputType"
          placeholder="Пароль"
          v-model="password"
          :class="valid.password + ' form__input'"
        />
        <label class="show__password" @click.prevent="changeInputType()">
          <i class="bi bi-eye-slash" v-show="inputType == 'password'"></i>
          <i class="bi bi-eye" v-show="inputType == 'text'"></i>
        </label>
      </div>
      <div class="form__inputWrapper">
        <input
          :type="inputType"
          placeholder="Подтвердите пароль"
          v-model="confirmPassword"
          :class="valid.confirmPassword + ' form__input'"
        />
        <label class="show__password" @click.prevent="changeInputType()">
          <i class="bi bi-eye-slash" v-show="inputType == 'password'"></i>
          <i class="bi bi-eye" v-show="inputType == 'text'"></i>
        </label>
      </div>
      <button @click.prevent="register()">Регистрация</button>
    </form>
  </div>
</template>

<script>
import Api from "../api";
export default {
  data() {
    return {
      name: "",
      sname: "",
      gender: "",
      email: "",
      password: "",
      confirmPassword: "",
      inputType: "password",
      badData: false,
      valid: {
        name: "good",
        sname: "good",
        password: "good",
        email: "good",
        confirmPassword: "good",
        gender: "good",
        message: "",
      },
    };
  },
  methods: {
    changeInputType() {
      if (this.inputType === "password") {
        return (this.inputType = "text");
      } else return (this.inputType = "password");
    },
    register() {
      Api.register(
        this,
        this.name,
        this.sname,
        this.email,
        this.gender,
        this.password
      )
        .then((data) => {
          if (data?.jwt) {
            this.$store.commit("LOGIN", data?.jwt);
            return this.$router.push("/profile");
          } else {
            switch (data.data.error) {
              case "enter your real name":
                this.showMessage("name", "Введите свое настоящее имя");
                break;
              case "enter your real surname":
                this.showMessage("sname", "Введите свою настоящую фамилию");
                break;
              case "the specified email address is not valid":
                this.showMessage("email", "Введите правильный email адрес");
                break;
              case "this email already has an account":
                this.showMessage("email", "Этот email уже занят");
                break;
              case "enter a password that exceeds 7 characters":
                this.showMessage(
                  "password",
                  "Пароль должен содеражать более 7 символов"
                );
                break;
            }
          }
        })
        .catch(() => {
          this.showMessage("", "Проверьте правильность введеных данных");
        });
    },
    showMessage(errItem, message) {
      this.valid[errItem] = "warn";
      this.badData = true;
      this.valid.message = message;
      setTimeout(() => {
        this.valid[errItem] = "good";
        this.badData = false;
      }, 2500);
    },
  },
};
</script>

<style scoped>
.slide-fade-enter-active {
  transition: all 1.3s ease;
}
.slide-fade-leave-active {
  transition: all 1.8s cubic-bezier(1, 0.5, 0.8, 1);
}
.slide-fade-enter,
.slide-fade-leave-to {
  transform: translateX(10px);
  opacity: 0;
}
.warningValidate {
  background: rgb(240, 34, 52);
  background: -moz-linear-gradient(
    0deg,
    rgba(240, 34, 52, 1) 0%,
    rgba(232, 66, 66, 0.96) 80%
  );
  background: -webkit-linear-gradient(
    0deg,
    rgba(240, 34, 52, 1) 0%,
    rgba(232, 66, 66, 0.96) 80%
  );
  background: linear-gradient(
    0deg,
    rgba(240, 34, 52, 1) 0%,
    rgba(232, 66, 66, 0.96) 80%
  );
  filter: progid:DXImageTransform.Microsoft.gradient(startColorstr="#f02234",endColorstr="#e84242",GradientType=1);
  width: 15%;
  float: right;
  right: 15%;
  position: fixed;
  color: white;
  padding: 1rem 1rem;
  border-radius: 0.25rem;
  transition: all ease-in-out 1s;
}
.warn {
  border-bottom: 2px solid #ff5454a8 !important;
}
.registration {
  height: 95vh;
  padding: 2em 0;
  font-size: 1.1em;
}
.form__inputWrapper {
  position: relative;
  width: 100%;
}
.form__inputWrapper .form__input {
  width: 100%;
  outline: none;
  border-radius: 5px;
}
.form__inputWrapper label {
  position: absolute;
  right: 0.9em;
  top: calc(100% - 66%);
  cursor: pointer;
}
.form__inputWrapper label > i {
  color: initial;
  font-size: initial;
}
@media screen and (min-width: 666px) {
  .registration__form {
    display: flex;
    flex-direction: column;
    margin: 0 auto;
    max-width: 35%;
  }
}
.registration__form {
  display: flex;
  flex-direction: column;
  margin: 0 auto;
  color: #e2e2e2;
}
.form__input {
  margin: 1em 0;
  border: none;
  border-radius: 0.2em;
  outline: none;
  border-bottom: 2px solid #464646a8;
  transition: all ease-in-out 0.2s;
  background: transparent;
}

.form__input:focus-visible,
.form__input:focus {
  background: #98ef9fe1;
  padding: 0.5em;
  border-radius: 5px;
  color: black;
}
.good {
  border-bottom: 2px solid #464646a8;
}
.form__select {
  -webkit-appearance: menulist;
  padding: 10px 40px 10px 1px;
  width: 100%;
  border: 0;
  border-bottom: 2px solid #464646a8;
  margin: 1em 0;
  color: #8f8f8f;
  border-radius: 5px;
  background: transparent;
  cursor: pointer;
}

option {
  background: transparent;
  color: initial;
}
button {
  border: 0;
  border-radius: 0.2em;
  background: rgb(139, 240, 172);
  font-family: system-ui;
  width: 8em;
  text-align: center;
  font-weight: 100;
  padding: 0.25em;
  transition: all 0.3s;
}
button:hover {
  width: 8.1em;
  font-weight: normal;
  background: rgb(139, 240, 161);
}
</style>