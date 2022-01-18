<template>
  <div class="userCabinet">
     <h1>{{USER.name}},кабинет еще не готов :( </h1>
     <p v-for="film in history" :key="film">
       <span>{{film}}</span>
     </p>
  </div>
</template>

<script>

export default {
  name:'Profile',
  data(){
    return{
      history:[]
    }
  },
  mounted(){
    this.history = this.$store.state.user.history 
  },
  computed:{
    USER(){
      return this.$store.getters.USER
    }
  },
}
</script>

<style scoped>
.userCabinet{
  margin-top: 5em;
}
</style>

