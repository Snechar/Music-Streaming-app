import axios from "axios"
import Cookie from "js-cookie"
import http from "../../src/common-api.js";
const API = "https://localhost:44348/api/"
axios.defaults.headers.common['Authorization'] =
    'Bearer ' + localStorage.getItem("token");

    const GetAllSubjects = (page) => {
        if(page==null)
        {
            page = 0
        }
        return http.httpdefault().get("/Songs"+"?pageIndex="+page);
      };

      const GetAlbumById = (id) =>{
        return http.httpdefault().get("/Albums/"+id);
      };



export default {
    GetAllSubjects,
    GetAlbumById
};