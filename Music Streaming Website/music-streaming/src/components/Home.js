import React, { useState, useEffect, useRef} from "react";
import 'react-h5-audio-player/lib/styles.css';
import { Container,} from 'react-bootstrap'
import AudioPlayer from 'react-h5-audio-player';
import './Home.css'
import {
  Route,
} from "react-router-dom";
import Cookie from "js-cookie"
import Song from "./MusicComponents/Songs"
import Album from "./MusicComponents/Album"
import Profile from "./AccountComponents/ProfilePage"
import "../components/MusicComponents/Songs.css"
import AlbumEditSelection from "./MusicComponents/AlbumEditSelection.js"


import { useHistory, Redirect } from "react-router-dom";
import Artist from "./MusicComponents/Artist";
import Albums from "./MusicComponents/Albums.js"
import Artists from "./MusicComponents/Artists.js"
import UploadComponent from "./AccountComponents/UploadComponent.js"
import FullEditPage from "./MusicComponents/FullEditPage";








const Home = React.memo((props) => {
  const [songUrl, setsongUrl] = useState();
  const [songData, setSongData] = useState([]);
  const [addPlaylist, setAddPlaylist] = useState();
  const[deletePlaylist, setDeletePlaylist] = useState();
  const songRef = useRef();
  const playlistRef = useRef();
  var playlist = React.useMemo(() => [], [],)
  var playlistFull = React.useMemo(() => [], [],)
  var run = false
  var firstClick = 0
  useEffect(() => {
    if (playlist.includes(addPlaylist)) {
    console.log("already added")
    }
    else if(!playlist.includes(addPlaylist)) {
      if(addPlaylist != undefined)
      {
      songRef.current = addPlaylist; // Write it to the ref 
      playlistRef.current = songData;
      playlistFull.push(playlistRef.current)
      playlist.push(songRef.current)
      }


    }
if(deletePlaylist===1){
  console.log("playlist resetted" )
      playlistFull.length=0;
      playlist.length=0;
      setDeletePlaylist(0);
   
     }



  });

  if(localStorage.getItem('token')  !== null)
  {
var jwt = require('jsonwebtoken');
const token = localStorage.getItem('token');
var dateNow = new Date();

if(jwt.decode(token).exp !==null)
{
  if(jwt.decode(token).exp * 1000 < dateNow.getTime())
  {
    localStorage.clear("token")
  }
}
else{
  localStorage.clear();
}
  }




  if (window.location.pathname === "/login" || window.location.pathname === "/register") {
    return null;
  }

  if (localStorage.getItem('token') === "false" || localStorage.getItem('token')  == null) {
    console.log("this should redirect")
    return (<Redirect push to="/login" />)
  }


  window.onclick = function (event) {
    if (firstClick == 0) {
        var ele = document.getElementsByClassName("dropdown-content")
        for (var i = 0; i < ele.length; i++) {
            if (ele[i].style.display == "block") {
                firstClick = 1
            }
        }
    }
    else {
        var ele = document.getElementsByClassName("dropdown-content")
        for (var i = 0; i < ele.length; i++) {
            ele[i].style.display = "none";
            firstClick = 0
        }



    }
}
  return (

    <div >


      <Route path="/home">
        <Song setsongUrl={setsongUrl} setSongData={setSongData} setAddPlaylist={setAddPlaylist} setDeletePlaylist={setDeletePlaylist} />
      </Route>
      <Route path = "/album">
        <Album setsongUrl={setsongUrl} setSongData={setSongData} setAddPlaylist={setAddPlaylist} setDeletePlaylist ={setDeletePlaylist}></Album>
        </Route>
      <Route path = "/account" component ={Profile}/>
      <Route path="/artist">
        <Artist setsongUrl={setsongUrl} setSongData={setSongData} setAddPlaylist={setAddPlaylist} setDeletePlaylist ={setDeletePlaylist}/>
      </Route>
      <Route path="/albums">
        <Albums setsongUrl={setsongUrl} setSongData={setSongData} setAddPlaylist={setAddPlaylist} setDeletePlaylist ={setDeletePlaylist}/>
      </Route>
      <Route path="/artists">
        <Artists setsongUrl={setsongUrl} setSongData={setSongData} setAddPlaylist={setAddPlaylist} setDeletePlaylist ={setDeletePlaylist}/>
      </Route>
      <Route path="/editselect">
<AlbumEditSelection/>
      </Route>
      <Route path="/albumedit">
<FullEditPage></FullEditPage>
      </Route>
      <a>.</a>

  
      <div className="player">
        <Container>

          <AudioPlayer
           showSkipControls
           showJumpControls={false}
            layout="horizontal-reverse"
            customAdditionalControls={[]}
            src={songUrl}
            onEnded={() =>  {if(playlist.length >1)
              {
              setsongUrl(playlist[0])
            playlist.shift()
            playlistFull.shift()
            }}}
            onClickNext={()=>{
              if(playlist.length >1)
              {
              setsongUrl(playlist[0])
            playlist.shift()
            playlistFull.shift()
            }
            else{ console.log("there's no playlist")}
            }}

          // other props here
          />

        </Container>


      </div>

    </div>


  )
});



export default Home;