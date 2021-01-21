import userEvent from '@testing-library/user-event';
import React, { useRef, useState } from 'react'
import { Link } from 'react-router-dom';
import SongService from '../../services/SongService';
import "../MusicComponents/Songs.css"

const SongBody = params =>{
return(
 <div>
 <div className="playlist-title">
     <table>
         <tbody className="Fixed">
             <tr className="first-row">
                 <td><i className="gg-play-button" style={{ visibility: 'hidden' }} /></td>
                 <td className="nav-links2">Title </td>
                 <td>Artist</td>
                 <td className="timer">Length</td>
                 <td><i className="fas fa-ellipsis-h" style={{ visibility: 'hidden' }}></i></td>
             </tr>
         </tbody>
         <tbody>
         
             {params.songs.map((item, index) => (

                 <tr key={index} className="song-list">
                     <td><i data-testid={"play-button"+index} onClick={() => { params.setsongUrl("Music/" + item.artistName + "/" + item.albumName + "/" + item.id + ".mp3"); params.setAddPlaylist("Music/" + item.artistName + "/" + item.albumName + "/" + item.id + ".mp3"); params.setSongData(item); params.setDeletePlaylist(1) }} className="gg-play-button play-button"></i></td>
                     <td ><Link className="nav-links2" to={'album?id=' + item.albumId}>{item.name}</Link></td>
                     <td ><Link className="nav-links2" to={'artist?id=' + item.artistId}>{item.artistName}</Link></td>
                     <td className="timer">{item.length}</td>

                     <td data-testid={"3dots"+index} className="drop-down"><i onClick={() => { document.getElementsByClassName("dropdown-content")[index].style.display = "block" }} className="fas fa-ellipsis-h play-button dropbtn" ></i>
                         <div data-testid={"playlistadd"+index} id="myDropdown" className="dropdown-content">
                             <a onClick={() => { params.setAddPlaylist("Music/" + item.artistName + "/" + item.albumName + "/" + item.id + ".mp3"); params.setSongData(item) }}>Add to Playlist</a>
                             {params.playlists.map((item2,index)=>(
                                 <a data-testid={"playlist-button"+index} key={index}>Add to:{item2.name}</a>
                             ))}
                         </div>
                     </td>
                 </tr>







             )
             )}

         </tbody>
     </table>
     <div className="center-text">
     {params.pageNumber >0 ?<button onClick={(e)=>{params.setPage(params.pageNumber-1);params.setLoading(true)}}>Previous Page</button>:<div></div>}
     {params.songs.length >30 ?<button onClick={(e)=>{params.setPage(params.pageNumber+1);params.setLoading(true)}}>Next Page</button>:<div></div>}
     </div>
 </div>

</div>
)
}
export default SongBody