import React, { useRef, useState } from 'react'
import SongService from '../../services/SongService';
import "../MusicComponents/Songs.css"
import SongBody from "./Songbody.js"



const SongComponent = params => {
    const [isLoading, setLoading] = useState(true);
    const songRef = useRef();
    const playlistRef = useRef();
    const [page, setPage] = useState(0)
    const [message, setMessage] = useState("Loading")
    if (isLoading) {
        SongService.GetAllSubjects(page).then((value) => {
            songRef.current = value.data
            SongService.GetPlaylists().then((value)=>
            {
                playlistRef.current = value.data
                setLoading(false)
            }).catch(err=>{
                console.log(err)
            })
        })
            .catch((error) => {
                playlistRef.current= []
                setMessage("Api not responding")

            });

        return (
            <div>
                <a className="loading">{message}</a>
            </div>
        )

    }
    else {

        return (
<SongBody setsongUrl={params.setsongUrl} setSongData={params.setSongData} setAddPlaylist={params.setAddPlaylist} setDeletePlaylist ={params.setDeletePlaylist}
playlists = {playlistRef.current} songs={songRef.current} setPage ={setPage} pageNumber ={page} setLoading={setLoading}></SongBody>
           
        )




    }

}





export default SongComponent
