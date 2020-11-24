import React, { Component, memo, useRef  } from 'react'
export const songs = params =>{
        return (
            <div>
                <div className="playlist-title Context">
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
           <td onClick={()=> params.setsongUrl("Music/Plini/Other Things/1.mp3")} >Selenium Forest</td>
           <td onClick={()=> params.setAddPlaylist("Music/Plini/Other Things/1.mp3")}>Plini</td>
            <td className="timer">3:14</td>
        </tr>
        <tr>
           <td onClick={()=> params.setsongUrl("Music/Plini/Other Things/2.mp3")} >Electric Sunrise</td>
            <td onClick={()=> params.setAddPlaylist("Music/Plini/Other Things/2.mp3")}>Plini</td>
            <td className="timer">5:05</td>
        </tr>
    </tbody>
</table>
</div>
            </div>
        )
        }
        export default songs

