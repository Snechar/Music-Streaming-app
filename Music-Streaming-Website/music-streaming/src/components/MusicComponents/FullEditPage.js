import AlbumEditPage from "./AlbumEditPage";
import React, {  useRef, useState} from 'react'
import { useParams } from 'react-router-dom';
import SongService from '../../services/SongService';
import { Link } from 'react-router-dom';

const EditPage = params => {
    const [isLoading, setLoading] = useState(true);
    const [message, setMessage] =useState("Loading");
    const numberRef = useRef();
if(isLoading)
{
    const search = window.location.search;
    const paramss = new URLSearchParams(search);
    var foo = paramss.get('id');
     numberRef.current= foo
    if(foo !== undefined)
    {
        setLoading(false)
    }
else{
    setMessage("Invalid Url")
}
    return(<div>{message}</div>)
}


return(
<div>
<AlbumEditPage id = {numberRef.current} setsongUrl={params.setsongUrl} setSongData={params.setSongData} setAddPlaylist={params.setAddPlaylist} setDeletePlaylist ={params.setDeletePlaylist}></AlbumEditPage>

</div>
 
           )}
           
           export default EditPage


