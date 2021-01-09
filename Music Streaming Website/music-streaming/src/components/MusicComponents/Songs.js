import React, {  useRef, useState} from 'react'
import { Link } from 'react-router-dom';
import SongService from '../../services/SongService';
import "../MusicComponents/Songs.css"



const SongComponent = params => {
    const [isLoading, setLoading] = useState(true);
    const songRef = useRef();
    const [Showcase, setShowcase]= useState("'block'")
    var firstClick=0
    var failed = 0
function getDataFromURL(){
    const search = window.location.search;
    const paramss = new URLSearchParams(search);
const foo = paramss.get('page');
console.log(foo)
}
function myFunction(){
    console.log("clicked")
    if(document.getElementById("myDropdown"))
    {
        document.getElementById("myDropdown").classList.toggle("show")
    }
    }
    window.onclick = function(event) {
if(firstClick == 0)
{
     var ele = document.getElementsByClassName("dropdown-content")
    for (var i = 0; i < ele.length; i++ ) {
       if(ele[i].style.display == "block")
       {
            firstClick= 1
       }
    }
}
else{
    var ele = document.getElementsByClassName("dropdown-content")
    for (var i = 0; i < ele.length; i++ ) {
        ele[i].style.display = "none";
        firstClick=0
}
    


}
}
      
   


    if (isLoading) {
       // axios.get(API + "Songs")
         //   .then(res => {
         //       console.log(res.data)
         //       songRef.current = res.data
         //       console.log(songRef.current)
          //      songs = songRef.current
           //     console.log("this is " + songs)
           //     setLoading(false)
           // }
         //   )
         //Api call before service

         const search = window.location.search;
         const paramss = new URLSearchParams(search);
     const foo = paramss.get('page');
     console.log(foo)
          
         SongService.GetAllSubjects(foo).then((value)=> {songRef.current = value.data
            setLoading(false)})
            .catch((error) => {
                console.log("failed")
               var failed =1
               
			});
         
             return(
                 <div>
                     <a className="loading">Loading</a>
                 </div>
             )
         
    }
    else {

        return (

            <div>
                <div className="playlist-title">
                    <table>
                        <tbody className = "Fixed">
                            <tr className="first-row">
                            <td><i className="gg-play-button"style={{visibility:'hidden'}} /></td>
                                <td className="nav-links2">Title </td>
                                <td>Artist</td>
                                <td className="timer">Length</td>
                                <td><i className="fas fa-ellipsis-h" style={{visibility:'hidden'}}></i></td>      
                            </tr>
                        </tbody>
                        <tbody>
                            {songRef.current.map((item, index) => (
                                
                                <tr key={index} className="song-list">        
                                <td><i onClick={() => {params.setsongUrl("Music/" + item.artistName + "/" + item.albumName + "/" + item.id + ".mp3");params.setAddPlaylist("Music/" + item.artistName + "/" + item.albumName + "/" + item.id + ".mp3"); params.setSongData(item); params.setDeletePlaylist(1)}} className="gg-play-button play-button"></i></td>                    
                                    <td ><Link className="nav-links2" to={'album?id='+item.albumId}>{item.name}</Link></td>
                                    <td >{item.artistName}</td>
                                    <td className="timer">{item.length}</td>    
                                    
                                  <td className="drop-down"><i onClick ={()=>{document.getElementsByClassName("dropdown-content")[index].style.display="block"}} className="fas fa-ellipsis-h play-button dropbtn" ></i>
                                  <div id="myDropdown" className="dropdown-content">
                                  <a onClick={() => {params.setAddPlaylist("Music/" + item.artistName + "/" + item.albumName + "/" + item.id + ".mp3"); params.setSongData(item)}}>Add to Playlist</a>
                                  </div>
                                  </td>      
                                </tr> 
                                
                                

                          

                                

                            )
                            )}

                        </tbody>
                    </table>
                </div>

            </div>
        )




    }

}





export default SongComponent
