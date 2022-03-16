import Vuex from 'vuex'
import Api from '../api'
const loadHistory = (time) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(Api.getUserHistory().then(({ data }) => { return data }))
    }, time)
  })
}
export default new Vuex.Store({
  state: {
    preloader: {
      duration: 1500,
      offset: 1500
    },

    history: [],
    isAuth: false,

    jwt: '',

    user: {
      uid: 0,
      domain: '',
      name: '',
      surname: '',
      email: '',
      gender: '',
    },

    device: {
      client_id: ''
    }
  },
  getters: {
    getHistory(state) {
      return state.history
    },
    PRELOADER_DURATION: state => {
      return state.preloader.duration
    },
    PRELOADER_OFFSET: state => {
      return state.preloader.offset
    },
    IS_AUTH: state => {
      return state.isAuth
    },
    USER: state => {
      return state.user
    },
    JWT: state => {
      return state.jwt
    },
  },
  mutations: {
    SET_HISTORY(state, payload) {
      state.history = payload
    },
    LOGIN(state, jwt) {
      const user = JSON.parse(atob(jwt.split('.')[1]))
      state.isAuth = true
      state.user = {
        uid: user.uid,
        domain: user.domain,
        name: user.name,
        surname: user.surname,
        email: '',
        gender: '',
        history: user.history
      }
      state.jwt = jwt
      localStorage.setItem('jwt', jwt)
    },
    LOGOUT(state) {
      state.isAuth = false
      state.user = {
        uid: 0,
        domain: '',
        name: '',
        surname: '',
        email: '',
        gender: '',
        history: []
      }
      state.jwt = ''
      localStorage.setItem('jwt', 'LOGOUT')
    }
  },
  actions: {
    async loadHistory({ commit }, payload) {
      try {
        const history = await loadHistory(payload)
        commit('SET_HISTORY', history)
      } catch (error) {
        console.log(error);
      }
    }
  }

})