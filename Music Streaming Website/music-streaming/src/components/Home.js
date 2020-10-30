import React, { useState, useEffect } from "react";
import Card from "react-bootstrap/Card";
import './Home.css'



const Home =()=>{
    var playing;
    var audio;
    const handleClick = (event) => {
        var audio = new Audio('Music/Plini/Other Things/1.mp3',"playing");
        if(playing ==="1")
        {
            playing="0";
            console.log(playing)
            audio.pause();
            audio.currentTime = 0;
            

        }
        if(playing==="0"|| playing==null)
        {
            playing = "1"
            console.log(playing)
            audio.play();


        }
        
    }
    function Play() {
        console.log(playing)
        if(playing === "0" || playing=== undefined)
        {
             audio = new Audio('Music/Plini/Other Things/1.mp3',"playing");
            audio.play();
            playing = "1"
        }
        else if (playing==="1")
        {
            Stop(audio);
        }

      }
      function Stop(audio) {
        audio.pause();
        audio.currentTime = 0;
        playing = "0"
      }
    return(
      <div className = "Context" >
<div className="playlist-title">
<table>
<tbody>
    <tr>
        <td>Title</td>
        <td>Artist</td>
        <td>Length</td>
        </tr>
        </tbody>
  

    <tbody>
        <tr>
           <td onClick={Play}>Selenium Forest</td>
            <td>Plini</td>
            <td>3:14</td>
        </tr>
    </tbody>
</table>
</div>
</div>

    )
}
export default Home
