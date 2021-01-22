import React, {  useRef, useState} from 'react'
import { useParams } from 'react-router-dom';
import SongService from '../../services/SongService';
import { Link } from 'react-router-dom';


import { Button, Card, Row,Col } from 'react-bootstrap';
import "../MusicComponents/Album.css"


const Album = params => {
    const [isLoading, setLoading] = useState(true);
    const [page, setPage] = useState(0);
    let {handle} = useParams()



const albumRef = useRef();


if (isLoading) {


SongService.GetAlbums(page).then((value)=> {
    albumRef.current = value.data 
setLoading(false)})
.catch(()=>{


})

return(
    <div>Loading</div>
)
}
return(
    <div>
    <Row xs="5">
    {albumRef.current.map((item,index) => (
        <div key ={index} className="card">
        <Link  to={'/album?id='+item.id}>
        <Card style={{ width: '9rem'}}>
         <Card.Img variant="top" src={"Music"+"/" +item.artistName+"/"+item.name+"/"+item.name+".jpg"} onError={(e)=>{e.target.onError=null; e.target.src="noImg.jpg"}}/>
       </Card>
       </Link>
       
       
       <Link  to={'/album?id='+item.id}> <h1 className="center-text" >{item.name}</h1></Link>
       
       <Link  to={'/artist?id='+item.artistId}>        <h2 className="center-text" >{item.artistName}</h2></Link>
           
           </div>))}
</Row>
<div className="center-text">
 {page >0 ?<button onClick={(e)=>{setPage(page-1);setLoading(true)}}>Previous Page</button>:<div></div>}
{albumRef.current.length >30 ?<button onClick={(e)=>{setPage(page+1);setLoading(true)}}>Next Page</button>:<div></div>}
</div>

           </div>
 
           )}
           
           export default Album


