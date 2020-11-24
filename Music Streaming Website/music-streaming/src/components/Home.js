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








const Home=()=>{

  const [songUrl, setsongUrl] = useState("No song playing");
  const songRef = useRef();
  console.log(songUrl)
 
  const history = useHistory();
  useEffect(() => {
    songRef.current = songUrl; // Write it to the ref
    console.log(songRef)
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
<Song setsongUrl={setsongUrl}/>
</Route>
<div className ="player">
<Container>

  <AudioPlayer
  layout="horizontal-reverse"
  customAdditionalControls={[]}
 src={songRef}
 onPlay={e => console.log("onPlay")}
    // other props here
  />

  </Container>


</div>

</div>


    )
}



export default Home;