import React, {  useRef, useState} from 'react'
import { useParams } from 'react-router-dom';
import SongService from '../../services/SongService';
import { Link } from 'react-router-dom';


import { Button, Card, Row,Col } from 'react-bootstrap';
import "../MusicComponents/Album.css"


const Album = params => {
    const [isLoading, setLoading] = useState(true);
    let {handle} = useParams()
    console.log("look here baka")
    console.log(handle)



const albumRef = useRef();


if (isLoading) {
   
    const search = window.location.search;
    const paramss = new URLSearchParams(search);
const foo = paramss.get('id');
console.log(foo)

SongService.GetAlbumById(foo).then((value)=> {albumRef.current = value.data 
    console.log(value.data)
setLoading(false)})
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
<h2 className="center-text">{albumRef.current.artistName}</h2>
<table>
<tbody>
                            <tr className="first-row">
                            <td><i className="gg-play-button"style={{visibility:'hidden'}} /></td>
                                <td className="nav-links2">Title </td>
                                <td>Length</td>
                                <td><i className="fas fa-ellipsis-h" style={{visibility:'hidden'}}></i></td>      
                            </tr>
                        </tbody>
<tbody>
                            {albumRef.current.songs.map((item,index) => (
                                
                                <tr key={index} className="song-list">        
                                <td><i onClick={() => {params.setsongUrl("Music/" + item.artistName + "/" + item.albumName + "/" + item.id + ".mp3");params.setAddPlaylist("Music/" + item.artistName + "/" + item.albumName + "/" + item.id + ".mp3"); params.setSongData(item); params.setDeletePlaylist(1)}} className="gg-play-button play-button"></i></td>                    
                                    <td ><Link className="nav-links2" to={'album/'+item.albumId}>{item.name}</Link></td>

                                    <td className="timer">{item.length}</td>    
                                    
                                  <td className="drop-down"><i onClick ={()=>{document.getElementsByClassName("dropdown-content")[index].style.display="block"}} className="fas fa-ellipsis-h play-button dropbtn" ></i>
                                  <div id="myDropdown"  className="dropdown-content">
                                  <a onClick={() => {params.setAddPlaylist("Music/" + item.artistName + "/" + item.albumName + "/" + item.id + ".mp3");params.setSongData(item)}}>Add to Playlist</a>
                                  </div>
                                  </td>      
                                </tr> 
                                
                                

                          

                                

                            )
                            )}

                        </tbody>
</table>
</div>

    )

}

export default Album