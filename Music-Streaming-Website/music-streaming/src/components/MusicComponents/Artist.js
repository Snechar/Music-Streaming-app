import React, {  useRef, useState} from 'react'
import { useParams } from 'react-router-dom';
import SongService from '../../services/SongService';
import { Link } from 'react-router-dom';


import { Button, Card, Row,Col } from 'react-bootstrap';
import Album from './Album';

const Artist = params => {
    const [isLoading, setLoading] = useState(true);
    let {handle} = useParams()
    console.log("look here baka")
    console.log(handle)
    const artistRef = useRef();


    if (isLoading) {
   
        const search = window.location.search;
        const paramss = new URLSearchParams(search);
    const foo = paramss.get('id');
    console.log(foo)
    
    SongService.GetArtistById(foo).then((value)=> {artistRef.current = value.data 
        console.log(value.data)
    setLoading(false)})
    .catch(()=>{
        console.log("Works pls")
    
    })
    return(<div></div>)
}
return(
    <div>
<div className="card">
<Card className="card" style={{ width: '18rem'}}>
 <Card.Img variant="top" src={"Pfp"+"/"+artistRef.current.name +".jpg"} onError={(e)=>{e.target.onError=null; e.target.src="noImg.jpg"}} />
</Card>
<h1 className="center-text">{artistRef.current.name}</h1>
</div>
{artistRef.current.albums.map((item,index)=>(
    <div key = {index}>
    <Album id = {item.id} setsongUrl={params.setsongUrl} setSongData={params.setSongData} setAddPlaylist={params.setAddPlaylist} setDeletePlaylist ={params.setDeletePlaylist}/>
</div>
))}

</div>
)
}


export default Artist