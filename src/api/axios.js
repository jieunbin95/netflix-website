import axios from "axios"


const api=axios.create({
  baseURL: 'https://api.themoviedb.org/3',
  params:{
    api_key:'4beb80cfa389c3ed0a682d5985dbe012',
    language:'en-US'
  }
})

export default api;