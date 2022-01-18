<template>
  <div class="registration">
    <h2>Регистрация</h2>
    <transition name="slide-fade">
      <div class="warningValidate" v-show="badData">
        <span>{{ valid.message }}</span>
      </div>
    </transition>
    <form class="container-sm registration__form">
      <input
        type="text"
        placeholder="Имя"
        v-model="name"
        class="input"
        :class="valid.name"
      />
      <input
        type="text"
        placeholder="Фамилия"
        v-model="sname"
        class="input"
        :class="valid.sname"
      />
      <select name="gender" id="" v-model="gender" :class="valid.gender">
        <option disabled="disabled" value="">Гендер</option>
        <option value="male">Мужской</option>
        <option value="female">Женский</option>
        <option value="etc">Хеликоптер Хеликоптер...</option>
      </select>
      <input
        type="email"
        placeholder="E-mail"
        v-model="email"
        :class="valid.email"
      />
      <input
        :type="inputTypePassword"
        placeholder="Пароль"
        v-model="password"
        :class="valid.password"
      />
      <input
        :type="inputTypePassword"
        placeholder="Подтвердите пароль"
        v-model="confirmPassword"
        :class="valid.confirmPassword"
      />
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
      inputTypePassword: "text",
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
    register() {
      this.validate();

      Api.register(
        this,
        this.name,
        this.sname,
        this.email,
        this.gender,
        this.password
      ).then((data) => {
        if (data?.jwt) {
          this.$store.commit("LOGIN", data?.jwt);
          return this.$router.push("/profile");
        } else {
          console.log(data.data);
          switch (data.data.error) {
            case "enter your real name":
              this.valid.message = "Введите свое настоящее имя";
              this.valid.name = "warn";
              this.badData = true;
              setTimeout(() => {
                this.valid.name = "good";
                this.badData = false;
              }, 3500);
              break;
            case "enter your real surname":
              this.valid.message = "Введите свою настоящую фамилию";
              this.valid.sname = "warn";
              this.badData = true;
              setTimeout(() => {
                this.valid.sname = "good";
                this.badData = false;
              }, 2500);
              break;
            case "the specified email address is not valid":
              this.valid.message = "Введите правильный email адрес";
              this.valid.email = "warn";
              this.badData = true;
              setTimeout(() => {
                this.valid.email = "good";
                this.badData = false;
              }, 2500);
              break;
            case "this email already has an account":
              this.valid.message = "Этот email уже занят";
              this.valid.email = "warn";
              this.badData = true;
              setTimeout(() => {
                this.valid.email = "good";
                this.badData = false;
              }, 2500);
              break;
            case "enter a password that exceeds 7 characters":
              this.valid.message = "Пароль должен содеражать более 7 символов";
              this.valid.password = "warn";
              this.badData = true;
              setTimeout(() => {
                this.valid.password = "good";
                this.badData = false;
              }, 2500);
              break;
          }
        }
      });
    },
    validate() {
      if (this.name.length === 0) {
        this.valid.name = "warn";
        setTimeout(() => {
          this.valid.name = "good";
        }, 3000);
        return
      }
      if (this.sname.length == 0) {
        this.valid.sname = "warn";
        setTimeout(() => {
          this.valid.sname = "good";
        }, 3000);
        return
      }
      if (this.email.length == 0) {
        this.valid.email = "warn";
        setTimeout(() => {
          this.valid.email = "good";
        }, 3000);
        return
      }
      if (this.gender.length == 0) {
        this.valid.gender = "invalidGender";
        setTimeout(() => {
          this.valid.gender = "good";
        }, 3000);
        return
      }
      if (this.password.length < 4) {
        this.valid.password = "warn";
        setTimeout(() => {
          this.valid.password = "good";
        }, 3000);
        return
      }
      if (this.password != this.confirmPassword) {
        this.valid.message = "Пароли не совпадают";
        this.badData = true;
        this.valid.confirmPassword = "warn";
        setTimeout(() => {
          this.valid.confirmPassword = "good";
          this.badData = false;
        }, 3000);
        return
      }
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
.invalidGender {
  background: #ff54549c;
}
option:disabled {
  color: -internal-light-dark(gray, rgb(170, 170, 170));
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
}
.registration__form input,
select {
  font-size: 1.1em;
  margin: 1em 0;
  border: none;
  outline: none;
  border-bottom: 2px solid #464646a8;
  transition: all ease-in-out 0.2s;
}
input:focus-visible {
  background: #98ef9fb3;
  padding: 0.5em;
  border-radius: 5px;
  color: black;
}
.good {
  border-bottom: 2px solid #464646a8;
}
select {
  -webkit-appearance: menulist;
  padding: 10px 40px 10px 10px;
  width: 100%;
  border: 1px solid #464646a8;
  border-radius: 5px;
  background: transparent;
  cursor: pointer;
}

option {
  background: transparent;
}
button {
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
button:hover {
  width: 8.1em;
  font-weight: normal;
  background: rgb(139, 240, 161);
}
</style>