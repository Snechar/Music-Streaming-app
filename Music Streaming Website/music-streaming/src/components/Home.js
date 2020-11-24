import React, { useState, useEffect, Component,useRef } from "react";
import Card from "react-bootstrap/Card";
import 'react-h5-audio-player/lib/styles.css';
import {Container, Row, Col} from 'react-bootstrap'
import AudioPlayer from 'react-h5-audio-player';
import './Home.css'
import {
    BrowserRouter as Router,
    Route,
    Redirect
  } from "react-router-dom";
  import Cookie from "js-cookie"
import { useHistory } from "react-router-dom";
import Song from "./MusicComponents/Songs"







const Home=React.memo((props)=>{
  const [songUrl, setsongUrl] = useState("");
  const [addPlaylist, setAddPlaylist] = useState("");
  const songRef = useRef();
  var playlist = React.useMemo(()=>[],[],) 
  var index = React.useMemo(()=>0,[],) 

 
  const history = useHistory();
  useEffect(() => {
    if(songRef.current == addPlaylist)
    {

    }
    else{
      songRef.current = addPlaylist; // Write it to the ref 
      playlist.push(songRef.current )
      console.log(playlist)
      console.log(index)

    }
  });
  


  if(Cookie.get('logedIn') == "false"||Cookie.get('logedIn') == null )
  {
     return null

  }
  if(window.location.pathname == "/login" || window.location.pathname == "/register")
  {
    return null;
  }

    return( 

      <div >
      <Route path = "/home">
<Song setsongUrl={setsongUrl} setAddPlaylist={setAddPlaylist}/>
</Route>
<div className ="player">
<Container>

  <AudioPlayer
  layout="horizontal-reverse"
  customAdditionalControls={[]}
  src={songUrl}
  autoPlay
  onPlay={e=>(console.log(songUrl)>console.log(playlist))}
 onEnded={()=>setsongUrl(playlist[1])>playlist.shift()>console.log(songUrl)>console.log(playlist)}
    // other props here
  />

  </Container>


</div>

</div>


    )
});



export default Home;