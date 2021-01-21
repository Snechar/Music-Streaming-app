import UploadComponent from '../AccountComponents/UploadComponent.js';
import userEvent from '@testing-library/user-event';
import React, { useRef, useState } from 'react'
import { Link } from 'react-router-dom';
import SongService from '../../services/SongService';
import "../MusicComponents/Songs.css"
import "./SongBodyEdit.css"


const SongBodyEdit = params =>{
    const [upload,setUpload] = useState(false)
    const [changeName, setChangeName] = useState(0);
    const[nameToSend, SetName] = useState();
    const[message, setMessage] = useState();

    const handleChange =(e)=>{
        SetName({...nameToSend, name:e.target.value})
    }
    return(
        <div>
        <div className="playlist-title">
<table>
<tbody>
                            <tr className="first-row">
                            <td><i className="gg-play-button"style={{visibility:'hidden'}} /></td>
                                <td className="nav-links2">Title </td>
                                <td><i className="gg-play-button"style={{visibility:'hidden'}} /></td>
                            </tr>
                        </tbody>
<tbody>
                            {params.songs.map((item, index) => (
                                
                                <tr key={index} className="song-list">                  
                                <td><i className="gg-play-button"style={{visibility:'hidden'}} /></td>         
                                <td >{changeName == item.id ? <div><input type="text" placeholder={item.name} onChange = {handleChange}></input><br/><button className="add-button not-so-long" 
                                onClick={(e)=>{
                                        if(nameToSend.name.length >6)
                                        {
                                             if(window.confirm("Are you sure you want to change "+ item.name+ " to " +nameToSend.name+"?"))
                                             {
                                                 SongService.UpdateSongName(item.id,nameToSend).then(res=>{
                                                    window.confirm(""+ item.name+ "was changed to " +nameToSend.name+"")
                                                    window.location.reload();
                                                 }).catch(err=>{
                                                     setMessage("Something failed")
                                                 })
                                             }
                                        }
                                        else{
                                            setMessage("Must be at least 6 characters long")
                                        }

                                }}
                                                          >Save</button><br/><h1 className="center-text">{message}</h1></div>: <div>{item.name}</div>}</td>        
                                <td><button className="center-box"
                                                                onClick={(e)=>{
                                    if(window.confirm("Do you want to delete " + item.name +" ?"))
                                    {
                                        SongService.DeleteSong(item.id).then(res=>{
                                            window.confirm(item.name+ " has been deleted")
                                            window.location.reload();
                                        }).catch(err=>{
                                            window.confirm("There was a  problem with the API")
                                        })
                                    }
                                }}>Delete</button>
                                <button className="center-box" onClick={()=>{
                                    if(changeName === item.id)
                                    {
                                    setChangeName(0)
                                    }
                                    else{

                                    setChangeName(item.id)
                                    }
                                    
                                    }} >{changeName === item.id ? <div>Close</div>:<div>Edit</div>}</button>
                                </td>
                                </tr> 
                            )
                            )
                            }
                            <tr>
                            <td><i className="gg-play-button"style={{visibility:'hidden'}} /></td>
                            <td><i className="gg-play-button"style={{visibility:'hidden'}} /></td>
                            <td><button className="center-box" onClick = {(e)=> setUpload(!upload)}>{upload
                            ? <div>Close</div>
                            : <div>Add</div>}</button></td></tr>
                        </tbody>
</table>
</div>
 {upload
                                ? <div className = "little-left"><UploadComponent requireName = {true} albumId= {params.albumId} fileTypeNeeded={"audio"}></UploadComponent></div>
                                : <div></div>
                                }
</div>


    )
                            }

                            export default SongBodyEdit