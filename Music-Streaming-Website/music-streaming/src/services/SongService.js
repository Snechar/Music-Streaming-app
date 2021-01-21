import axios from "axios"
import http from "../../src/common-api.js";
var API = "https://localhost:44348/api/"
axios.defaults.headers.common['Authorization'] =
    'Bearer ' + localStorage.getItem("token");

    const SetApiGateway=()=>{
      API = "https://localhost:44348/api/"
axios.defaults.headers.common['Authorization'] =
    'Bearer ' + localStorage.getItem("token");
    }
    const GetAllSubjects = (page) => {
        if(page==null)
        {
            page = 0
        }
        return http.httpdefault().get("/Songs"+"?pageIndex="+page);
      };
      const AddSong =(data)=>{
        return http.httpdefault().post("/Songs", data)
      }

      const GetAlbumById = (id) =>{
        return http.httpdefault().get("/Albums/"+id);
      };
      const GetPlaylists =( )=>{
        return http.httpdefault().get("/Playlists/User");
      }
      const GetArtistById=(id)=>
      {
        return http.httpdefault().get("/Artists/"+id);
      }
      const GetAlbums = (page) =>{
        if(page==null)
        {
            page = 0
        }
        return http.httpdefault().get("/Albums?pageindex="+page);
      };
      const GetArtists = () =>{
        return http.httpdefault().get("/Artists");
      };
      const GetAlbumByUser=()=>{
        return http.httpdefault().get("/Albums/user")
      }
      const GetAlbumByUserAndId=(id)=>{
        return http.httpdefault().get("/Albums/user/"+id)
      }
      const GetMyArtist=()=>{
        return http.httpdefault().get("/Artists/me")
      }
      const CreateArtist=(name)=>{
        return http.httpdefault().post("/Artists", name)
      }
      const CreateAlbum =(name)=>{
        return http.httpdefault().post("/Albums", name)
      }
      const DeleteAlbum =(id)=>{
        return http.httpdefault().delete("/Albums/"+id)
      }
      const DeleteSong =(id)=>{
        return http.httpdefault().delete("/Songs/"+id)
      }
      const UpdateSongName =(id, data)=>{
        return http.httpdefault().put("/Songs/"+id,data)
      }






export default {
    GetAllSubjects,
    GetAlbumById,
    GetPlaylists,
    GetArtistById,
    GetAlbums,
    GetArtists,
    GetAlbumByUser,
    GetAlbumByUserAndId,
    SetApiGateway,
    AddSong,
    GetMyArtist,
    CreateArtist,
    CreateAlbum,
    DeleteAlbum,
    DeleteSong,
    UpdateSongName,
};