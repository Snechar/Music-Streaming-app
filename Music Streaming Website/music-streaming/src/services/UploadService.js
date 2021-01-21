import axios from "axios"
import http from "../../src/common-api.js";
var API = "http://localhost:8000/"

const Upload =(data)=>{
    return http.httpupload().post("/upload",data)
}

export default{
    Upload,
}