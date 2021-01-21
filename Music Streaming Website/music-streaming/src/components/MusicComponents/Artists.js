import React, {  useRef, useState} from 'react'
import { useParams } from 'react-router-dom';
import SongService from '../../services/SongService';
import { Link } from 'react-router-dom';


import { Button, Card, Row,Col } from 'react-bootstrap';
import "../MusicComponents/Album.css"


const Artist = params => {
    const [isLoading, setLoading] = useState(true);
    const [artistPage, setArtistPage] =useState(false);
    const [artistName,setArtistName] = useState();
    let {handle} = useParams()
    console.log("look here baka")
    console.log(handle)



const albumRef = useRef();


if (isLoading) {


SongService.GetArtists().then((value)=> {
    albumRef.current = value.data 
setLoading(false)})
.catch(()=>{
    console.log("Works pls")

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
        <Link  to={'/artist?id='+item.id}>
        <Card style={{ width: '11rem'}}>
         <Card.Img variant="top" src={"Pfp"+"/"+item.name+".jpg"} onError={(e)=>{e.target.onError=null; e.target.src="noImg.jpg"}}/>
       </Card>
       </Link>
       <Link  to={'/artist?id='+item.id}>        <h2 className="center-text" >{item.name}</h2></Link>
           
           </div>))}
</Row>
           </div>
 
           )}
           
           export default Artist

