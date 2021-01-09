import React, {  useRef, useState} from 'react'
import SongService from '../../services/SongService';
import "../MusicComponents/Songs.css"
import Cookie from "js-cookie"
import Login from '../Login';
import { useHistory, Redirect } from "react-router-dom";
import "../AccountComponents/ProfilePage.css"


const Album = params => {
	const history = useHistory();
    var runOnce 
    function LogOut(){
        if(runOnce !==1)
        {
            localStorage.clear()
            history.push("/login")
        }
        else{
            runOnce = 0;
        }
    
    }
    return(
        <div>
           <button className="btn-lg button-center"><a onClick={ ()=>LogOut()}>Log out</a></button>
        </div>
    )

}

export default Album