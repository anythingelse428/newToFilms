import axios from 'axios'
import API_PATH_METHOD from './config'
import API_GLOBAL from './global'
const jwt ='eyJhbGciOiJzaGEyNTYiLCJ0eXAiOiJKV1QiLCJ1bmlxdWUiOjEwfQ==.eyJ1aWQiOiIxMCIsImRvbWFpbiI6bnVsbCwicGFzc3dvcmQiOiJlNTE5Y2JjNzkzYTJiM2ZjNDU1YjkzY2IyZDBiMDczZTA1YTYwOTBmM2VhOGU4NGI5NjRkNjdkYTU3MmUwMDdhZDI3MmZmNWE2MTBhYzlkMjhkZTUyNTgxZDU0YzY4N2UiLCJuYW1lIjoiXHUwNDFmXHUwNDQwXHUwNDM4XHUwNDNiXHUwNDNlXHUwNDM2XHUwNDM1XHUwNDNkXHUwNDM4XHUwNDM1Iiwic3VybmFtZSI6Ilx1MDQyMlx1MDQ0MFx1MDQzOCIsImdlbmRlciI6Im1hbGUiLCJiaXJ0aGRheSI6IjIwMDAtMDYtMTUiLCJhdmF0YXIiOm51bGwsImVtYWlsIjoiYXBwLTNAaW55LnN1IiwiYWNjZXNzIjoiY28tYXV0aG9yIiwiYmxvY2tpbmciOiJub25lIiwiYXV0aCI6dHJ1ZX0=.452355a47d746e682aed763f3c4c72ee22c0c544837ca66e66df6f244ca97866' 
const Api={
    ...API_GLOBAL,
    /**
     * @returns {Object}
     */
    getRecomendationList: async()=>{
        return await axios.get('https://iny.su/api/method/watch.getTrand?v=1.0&')
    },
    getRecomsByKpid: async(id)=>{
      return await axios.get('https://iny.su/api/method/watch.getRecommendationsDataByKpid?v=1.0&kpid='+id)
    },
    getInfoKpid: async(id)=>{
        return await axios.get('https://iny.su/api/method/watch.getDataByKpid?v=1.0&kpid='+id+'&jwt='+jwt)
    },
    search: async(query)=>{
        return await axios.get('https://iny.su/api/method/watch.fastSearch?v=1.0&query='+query)
    },
    time: async()=>{
        return await axios.get(API_PATH_METHOD+'user.getPrivateInfo?v=1.0&jwt='+jwt+'&uid=1')
    },
    getActors: async(kpid)=>{
       return await axios.get( 'https://iny.su/api/method/watch.getStaffByKpid?v=1.0&kpid=' + kpid)
    }
}
export default Api