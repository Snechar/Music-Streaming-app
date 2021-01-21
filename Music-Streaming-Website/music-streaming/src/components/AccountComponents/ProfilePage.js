import React, { useRef, useState } from 'react'
import SongService from '../../services/SongService';
import "../MusicComponents/Songs.css"
import { useHistory, Redirect, Link } from "react-router-dom";
import "../AccountComponents/ProfilePage.css"
import { Button, Card, Row, Col } from 'react-bootstrap';
import UploadComponent from "./UploadComponent.js"



const Album = params => {
    const history = useHistory();
    const [isLoading, setLoading] = useState(true);
    const [message, setMessage] = useState();
    const [firstLoad, setFirstLoading] = useState(0);
    const [upload, setUpload] = useState(false);
    const [artistName, setArtistName] = useState();
    var artistRef = useRef();
    var runOnce

    const handleChange = (e) => {
        setArtistName({ ...artistName, name: e.target.value })
    }
    console.log(isLoading)
    if (isLoading) {
        if (firstLoad !== 1) {
            SongService.GetMyArtist().then(res => {
                artistRef.current = res.data
                setLoading(false)

            }).catch(err => {
                setFirstLoading(1)
            })

        }
        return (<div>
            <input data-testid="profile-input-field-name-creation" type="test" className="center-box2" onChange={handleChange} placeholder="Artist Name" type="text" required  ></input>
            <h1 data-testid="upload-error-message" className="center-text">{message}</h1>
            <button data-testid="upload-profile-picture-button" className="center-box" onClick={(e) => {
                try {
                    var checkName = artistName
                    if (checkName.name.length > 4) {
                        SongService.CreateArtist(artistName).then(res => {
                            setMessage("Artist created, refresh page to see changes")
                        })
                    }
                    else {
                        setMessage("Artist name must be longer than 4 characters")
                    }
                }
                catch {
                    setMessage("Field can't be empty")
                }

            }}>Choose a name an become an artist!</button>
            <button data-testid="profile-log-out-button" className="center-box" onClick={() => {
                localStorage.clear()
                history.push("/login")
            }}><a>Log out</a></button>
        </div>)
    }




    return (
        <div>
            <button className="center-box" onClick={(e) => { setUpload(!upload) }}>{upload ? <div>Close</div> : <div>Upload Profile Picture</div>}</button>
            <div className="card">
                <Card data-testid="card-profile" className="card" style={{ width: '18rem' }}>

                    <Card.Img variant="top" src={"Pfp/" + artistRef.current.name + ".jpg"} onError={(e) => { console.log(); e.target.onError = null; e.target.src = "noImg.jpg" }} />
                </Card>


                <h1 className="center-text">{artistRef.current.name}</h1>
                {upload
                    ? <div><UploadComponent fileTypeNeeded={"profile"}></UploadComponent></div>
                    : <div></div>
                }
            </div>
            <button className="center-box"><a onClick={() => {
                localStorage.clear()
                history.push("/login")
            }}>Log out</a></button>
            <Link to={"/editselect"}>
                <button className="center-box">Music Management</button>
            </Link>
        </div>
    )



}


export default Album