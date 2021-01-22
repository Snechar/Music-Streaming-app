import React, {  useRef, useState} from 'react'
import { useParams } from 'react-router-dom';
import SongService from '../../services/SongService';
import { Link } from 'react-router-dom';


import { Button, Card, Row,Col } from 'react-bootstrap';
import "../MusicComponents/Album.css"
import SongBodyAlbum from "./SongbodyAlbum.js"


const Album = params => {
    const [isLoading, setLoading] = useState(true);
    const [artistPage, setArtistPage] =useState(false);
    const [artistName,setArtistName] = useState();
    let {handle} = useParams()



const albumRef = useRef();
const playlistRef =useRef();


if (isLoading) {
    var songId 
   if(params.id == null )
   {
    const search = window.location.search;
    const paramss = new URLSearchParams(search);
    const foo = paramss.get('id');
    songId =foo
   }
   else{
songId = params.id
   }



SongService.GetAlbumById(songId).then((value)=> {albumRef.current = value.data 
    console.log(value.data.artistName)
    if(params.id == null)
    {
        setArtistName(value.data.artistName)
    }
    SongService.GetPlaylists().then((value)=>
    {
        playlistRef.current = value.data
        setLoading(false)

    })})
.catch(()=>{
    console.log("Works pls")

})
return(
    <div className="card">
    <Card className="card" style={{ width: '18rem', backgroundColor: '#F16E10'}}>
    <Card.Img variant="top" src="404.jpg" />
  </Card>
  
  <h1 className="center-text alert-danger">Album Not Found</h1>
  </div>
)

  
}


    return(
        <div className="card">
 <Card className="card" style={{ width: '18rem'}}>
  <Card.Img variant="top" src={"Music"+"/" +albumRef.current.artistName+"/"+albumRef.current.name+"/"+albumRef.current.name+".jpg"} onError={(e)=>{e.target.onError=null; e.target.src="noImg.jpg"}}/>
</Card>

<h1 className="center-text">{albumRef.current.name}</h1>
  <h2 className="center-text">{artistName}</h2>

<SongBodyAlbum setsongUrl={params.setsongUrl} setSongData={params.setSongData} setAddPlaylist={params.setAddPlaylist} setDeletePlaylist ={params.setDeletePlaylist}
playlists = {playlistRef.current} songs={albumRef.current.songs}/>
</div>

    )

}

export default Album