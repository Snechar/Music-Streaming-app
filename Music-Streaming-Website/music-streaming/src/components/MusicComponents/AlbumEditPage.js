import React, {  useRef, useState} from 'react'
import { useParams } from 'react-router-dom';
import SongService from '../../services/SongService';
import { Link } from 'react-router-dom';


import { Button, Card, Row,Col } from 'react-bootstrap';
import Album from './Album';
import AlbumSongEdit from "./AlbumSongEdit"

const AlbumEditPage = params => {
    const [isLoading, setLoading] = useState(true);
    const [message, setMessage] =useState("Loading");




const albumRef = useRef();


if (isLoading) {


SongService.GetAlbumByUserAndId(params.id).then(()=> {
    console.log("it loaded")
setLoading(false)})
.catch(()=>{
setMessage("You do not own this album")

})

return(
    <div data-testid="errormessageMain">{message}</div>
)
}
return(
    <div>
<AlbumSongEdit id = {params.id}/>
           </div>
 
           )}
           
           export default AlbumEditPage


