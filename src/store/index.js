import {createStore} from 'vuex'
export default createStore({
    state: {
      preloader: {
        duration: 1500,
        offset: 1500
      },

      isAuth: false,

      jwt: '',

      user: {
        uid: 0,
        domain: '',
        name: '',
        surname: '',
        email: '',
        gender: '',
        history:[],
      },

      device: {
        client_id: ''
      }
    },
    getters: {
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
      }
    },
    mutations: {
      ADD_HISTORY:(state, title)=>{
        state.user.history.push(title)
      },
      LOGIN: (state, jwt) => {
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
      LOGOUT: state => {
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
    }
  })