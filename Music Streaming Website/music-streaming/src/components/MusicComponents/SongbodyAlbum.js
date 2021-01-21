import userEvent from '@testing-library/user-event';
import React, { useRef, useState } from 'react'
import { Link } from 'react-router-dom';
import SongService from '../../services/SongService';
import "../MusicComponents/Songs.css"

const SongBodyAlbum = params =>{
    return(
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
                            {params.songs.map((item, index) => (
                                
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
    )
                            }

                            export default SongBodyAlbum