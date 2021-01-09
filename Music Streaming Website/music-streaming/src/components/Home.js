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



import { useHistory, Redirect } from "react-router-dom";








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
var decodedToken=jwt.decode(token, {complete: true});
var dateNow = new Date();

if(decodedToken.exp < dateNow.getTime())
{
  localStorage.clear("token")
}
  }





  if (localStorage.getItem('token') === "false" || localStorage.getItem('token')  == null) {
    console.log("this should redirect")
    return (<Redirect push to="/login" />)
  }

  if (window.location.pathname === "/login" || window.location.pathname === "/register") {
    return null;
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
      <a>.</a>

  
      <div className="player">
        <Container>

          <AudioPlayer
           showSkipControls
           showJumpControls={false}
            layout="horizontal-reverse"
            customAdditionalControls={[]}
            src={songUrl}
            onPlay={e => (console.log(songUrl) > console.log(playlist)>console.log(playlistFull)>console.log(deletePlaylist))}
            onEnded={() => setsongUrl(playlist[0]) > playlist.shift() > console.log(songUrl) > console.log(playlist)}
            onClickNext={()=>{
              if(playlist.length >1)
              {
              setsongUrl(playlist[0])
            playlist.shift()
            playlistFull.shift()

            console.log(songUrl)
            
            console.log(playlist)
            console.log(playlistFull)
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