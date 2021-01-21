import React, {  useRef, useState} from 'react'
import { useParams } from 'react-router-dom';
import SongService from '../../services/SongService';
import { Link } from 'react-router-dom';
import UploadComponent from "../AccountComponents/UploadComponent"

import { Button, Card, Row,Col } from 'react-bootstrap';
import "../MusicComponents/Album.css"


const AlbumEditSelection = params => {
    const [isLoading, setLoading] = useState(true);
    const [artistPage, setArtistPage] =useState();
    const [upload, setUpload] = useState(false);
    const[message, setMessage] = useState();
    let {handle} = useParams()


const albumRef = useRef();


if (isLoading) {


SongService.GetAlbumByUser().then((value)=> {
    albumRef.current = value.data 
    setLoading(false)})
.catch(()=>{
    setMessage("You are not an artist")

})

return(
    <div data-testid="errormessage2" className="center-text">{message}</div>
)
}
const  handleChange =(e)=>{
    setArtistPage({ ...artistPage, name: e.target.value })
}


return(
    <div>
    <Row xs="5">
    {albumRef.current.map((item,index) => (
        <div data-testid={"albumbox"+index} key ={index} className="card">
        <Link  to={'/albumedit?id='+item.id}>
        <Card style={{ width: '9rem'}}>
         <Card.Img variant="top" src={"Music"+"/" +item.artistName+"/"+item.name+"/"+item.name+".jpg"} onError={(e)=>{e.target.onError=null; e.target.src="noImg.jpg"}}/>
       </Card>
       </Link>
       
       
       <Link  to={'/albumedit?id='+item.id}> <h1 className="center-text" >{item.name}</h1></Link>
           
           </div>))}

           <div className="card">
        <Card data-testid = "card-click-to-add" onClick={()=>{setUpload(!upload)}}  style={{ width: '9rem'}}>
         <Card.Img variant="top" src={"addAlbum.jpg"} onError={(e)=>{e.target.onError=null; e.target.src="noImg.jpg"}}/>
       </Card>
       {upload
                                ? <div><input data-testid="album-create-input" type="text" placeholder="Album Name" onChange={handleChange}></input><br/><button data-testid="create-album-button" className="add-button" onClick={()=>
                                {if(window.confirm("Are you sure you want to create an album?"))
                                {
                                    try{
                                    if(artistPage.name.length >4)
                                    {
                                     SongService.CreateAlbum(artistPage).then(res=>{
                                        if(window.confirm("Album has been created"))
                                        {
                                            window.location.reload();
                                        }
                                     }).catch((error) => {
				setMessage(error.response.data.message);
			});

                                    }
                                    else{
                                        setMessage("Album name too short (4 characters minimum)")
                                    }

                                    }
                                    catch{
                                        setMessage("Input field can't be empty")
                                    }
                                }
                                }}>Create Album</button><br/><h1 data-testid="errormessage" className="center-text">{message}</h1></div>
                                : <div><h1 className="center-text">Add Album</h1></div>
                                }
           
           </div>
</Row>

           </div>
 
           )}
           
           export default AlbumEditSelection


