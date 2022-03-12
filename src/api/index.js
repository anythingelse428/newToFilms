import axios from 'axios'
import API_PATH_METHOD from './config'
import API_GLOBAL from './global'
const serviceJWT = 'eyJhbGciOiJzaGEyNTYiLCJ0eXAiOiJKV1QiLCJ1bmlxdWUiOjM1fQ==.eyJ1aWQiOiIzNSIsImRvbWFpbiI6bnVsbCwicGFzc3dvcmQiOiI2YTA2ZjU0OTAzNzE3MTUyYTEwOWQ2ZDM4YWQ5NWJmNzljOTM5YTg3OTJiYzM2Nzc0ZGExM2U4MTJkMGEzM2VkZDA4YjZjZDFiMjgwNzliZGEwOWUzZmUwNzJkYjk3ZjgiLCJuYW1lIjoiXHUwNDE4XHUwNDNjXHUwNDRmIiwic3VybmFtZSI6Ilx1MDQyNFx1MDQzMFx1MDQzY1x1MDQzOFx1MDQzYlx1MDQzOFx1MDQ0ZiIsImdlbmRlciI6Im1hbGUiLCJiaXJ0aGRheSI6IjIwMDAtMDYtMTUiLCJhdmF0YXIiOm51bGwsImVtYWlsIjoiZGVmYXVsdEBkZWZhdWx0LmNvbSIsImFjY2VzcyI6InVzZXItZGVmYXVsdCIsImJsb2NraW5nIjoibm9uZSIsImF1dGgiOnRydWV9.cf3f35dc71198ad737dab26cd5f8a8315ba1ccb2cef97eab4d18e132153f4968'
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
        return await axios.get('https://iny.su/api/method/watch.getDataByKpid?v=1.0&kpid=' + id + '&jwt=' + serviceJWT)
    },
    getTrailer: async(id) => {
        return await axios.get('https://iny.su/api/method/watch.getTrailerData?v=1.0&kpid=' + id)
    },
    search: async (query) => {
        return await axios.get('https://iny.su/api/method/watch.fastSearch?v=1.0&query=' + query)
    },
    time: async () => {
        return await axios.get(API_PATH_METHOD + 'user.getPrivateInfo?v=1.0&jwt=' + serviceJWT + '&uid=1')
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