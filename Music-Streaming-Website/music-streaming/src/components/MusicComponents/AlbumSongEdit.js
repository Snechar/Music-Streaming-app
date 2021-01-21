import React, { useRef, useState, useReducer } from 'react'
import { useParams } from 'react-router-dom';
import SongService from '../../services/SongService';
import { Link } from 'react-router-dom';
import UploadComponent from "../AccountComponents/UploadComponent.js"

import { Button, Card, Row, Col } from 'react-bootstrap';
import "../MusicComponents/Album.css"
import SongBodyEdit from "./SongBodyEdit"
import { useHistory, Redirect } from "react-router-dom";



const AlbumSongEdit = params => {
  const [isLoading, setLoading] = useState(true);
  const [artistName, setArtistName] = useState();
  const [upload, setUpload] = useState(false);
  let { handle } = useParams()
  const history = useHistory();



  const albumRef = useRef();
  const playlistRef = useRef();


  if (isLoading) {

    var songId
    if (params.id == null) {
      const search = window.location.search;
      const paramss = new URLSearchParams(search);
      const foo = paramss.get('id');
      songId = foo
    }
    else {
      songId = params.id
    }



    SongService.GetAlbumById(songId).then((value) => {

      albumRef.current = value.data

      setArtistName(value.data.artistName)
      setLoading(false)
    })
      .catch((err) => {


      })
    return (
      <div className="card">
        <Card className="card" style={{ width: '18rem', backgroundColor: '#F16E10' }}>
          <Card.Img variant="top" src="404.jpg" />
        </Card>

        <h1 className="center-text alert-danger">Album Not Found</h1>
      </div>
    )


  }


  return (
    <div>
      <div >
        <div data-testid="album-picture" className="card">
          <Card className="card" style={{ width: '18rem' }}>
            <Card.Img variant="top" src={"Music" + "/" + albumRef.current.artistName + "/" + albumRef.current.name + "/" + albumRef.current.name + ".jpg"} onError={(e) => { e.target.onError = null; e.target.src = "noImg.jpg" }} />
          </Card>
        </div>
        <button className="center-box" onClick={(e) => { setUpload(!upload) }}>{upload ? <div>Close</div> : <div>Upload</div>}</button>
        <button data-testid="delete-album-button" className="center-box" onClick={() => {
          if (window.confirm("Do you want to delete the album " + albumRef.current.name + " ?")) {
            SongService.DeleteAlbum(albumRef.current.id).then(res => {
              window.confirm("The album " + albumRef.current.name + " has been deleted")
              history.push("/editselect")
            }).catch(err => {
              window.confirm("An error has occured")

            })
          }
        }}>Delete</button>

        {upload
          ? <div className="card"><UploadComponent albumId={albumRef.current.id} fileTypeNeeded={"album"}></UploadComponent></div>
          : <div></div>
        }

        <h1 className="center-text">{albumRef.current.name}</h1>
        <h2 className="center-text">{artistName}</h2>

      </div>
      <SongBodyEdit songs={albumRef.current.songs} albumId={albumRef.current.id}></SongBodyEdit>
    </div>
  )

}

export default AlbumSongEdit