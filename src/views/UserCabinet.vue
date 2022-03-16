<template>
  <div class="userCabinet">
    <h1>{{ USER.name }},кабинет еще не готов :(</h1>
    <div class="userCabinet__tools">
      <hr />
      <h2>Эксперементальные настройки</h2>
      <div class="tool">
        <label for="tool1">
          <h2>Записывать и отображать историю</h2>
        </label>
        <div class="">
          <input
            type="checkbox"
            name=""
            id="tool1"
            class="tool__checkbox"
            v-model="isWriteHistory"
            @click="isWriteHistorySwitch()"
          />
          <label for="tool1"></label>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Api from "../api";
export default {
  name: "Profile",
  data() {
    return {
      history: [],
      isWriteHistory: 1,
    };
  },
  methods: {
    isWriteHistorySwitch() {
      if (this.isWriteHistory == 1) {
        console.log("change to false");
        return Api.showHistoryToggle(null);
      } else {
        console.log("change to true");
        return Api.showHistoryToggle(1);
      }
    },
  },
  mounted() {
    Api.isHistoryShow().then((res) => {
      let idx = res.data.length < 2 ? 0 : res.data.length - 1;
      if (res.data[idx].showHistory == 1) {
        return (this.isWriteHistory = true);
      } else {
        return (this.isWriteHistory = false);
      }
    });
  },
  computed: {
    USER() {
      return this.$store.getters.USER;
    },
  },
};
</script>

<style scoped>
.userCabinet {
  height: 90vh;
  margin-top: 5em;
}
.userCabinet__tools {
  width: 80%;
  margin: 0 auto;
}
.tool {
  margin-top: 1em;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-around;
}
.tool__checkbox {
  position: absolute;
  z-index: -1;
  opacity: 0;
}
.tool__checkbox + label {
  display: inline-flex;
  align-items: center;
  user-select: none;
  cursor: pointer;
}
.tool__checkbox + label::before {
  content: "";
  display: inline-block;
  padding: 0.5em 1.5em;
  flex-shrink: 0;
  flex-grow: 0;
  border: 1px solid #adb5bd;
  border-radius: 0.5em;
}
.tool__checkbox:checked + label::before {
  border-color: #188c0f;
  background-color: #21c565;
  content: "\2714";
}
.tool__checkbox:not(:checked) + label::before {
  border-color: #8c1e0f;
  background-color: #da341f;
  content: "\00D7";
}
.tool__checkbox:not(:disabled):active + label::before {
  background-color: #b3d7ff;
  border-color: #b3d7ff;
}
.tool__checkbox:focus + label::before {
  box-shadow: 0 0 0 0.2rem rgba(189, 189, 189, 0.25);
}

.tool__checkbox:focus:not(:checked) + label::before {
  border-color: #d3d3d3;
}
.tool__checkbox:disabled + label::before {
  background-color: #e9ecef;
}
</style>

