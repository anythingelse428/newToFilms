import axios from 'axios'
import API_PATH_METHOD from './config'
import API_GLOBAL from './global'
let jwt = localStorage.getItem('jwt')
let client_id = localStorage.getItem('client_id')

const Api = {
    ...API_GLOBAL,
    /**
     * @returns {Object}
     */
    getRecomendationList: async () => {
        return await axios.get('https://iny.su/api/method/watch.getTrand?v=1.0&')
    },
    getRecomsByKpid: async (id) => {
        return await axios.get('https://iny.su/api/method/watch.getRecommendationsDataByKpid?v=1.0&kpid=' + id)
    },
    getInfoKpid: async (id) => {
        return await axios.get('https://iny.su/api/method/watch.getDataByKpid?v=1.0&kpid=' + id + '&jwt=' + jwt)
    },
    search: async (query) => {
        return await axios.get('https://iny.su/api/method/watch.fastSearch?v=1.0&query=' + query)
    },
    time: async () => {
        return await axios.get(API_PATH_METHOD + 'user.getPrivateInfo?v=1.0&jwt=' + jwt + '&uid=1')
    },
    getActors: async (kpid) => {
        return await axios.get('https://iny.su/api/method/watch.getStaffByKpid?v=1.0&kpid=' + kpid)
    },
    addUserHistory: async (kpid) => {
        return await axios.get('https://anythingelse.iny.su/api/method/user.addHistory?v=1.0&kpid=' + kpid + '&jwt=' + jwt + '&client_id=' + client_id)
    },
    getUserHistory: async () => {
        return await axios.get('https://anythingelse.iny.su/api/method/user.getHistory?v=1.0&jwt=' + jwt + '&client_id=' + client_id)
    },
    deleteHistoryItem: async (kpid) => {
        return await axios.get('https://anythingelse.iny.su/api/method/user.deleteHistoryItem?v=1.0&jwt=' + jwt + '&client_id=' + client_id + '&kpid=' + kpid)

    }


}
export default Api