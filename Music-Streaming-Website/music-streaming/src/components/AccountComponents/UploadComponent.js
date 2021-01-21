import { Component } from "react";
import React from "react";
import axios from 'axios';
import "./UploadComponent.css"
import SongService from '../../services/SongService';
import UploadService from '../../services/UploadService'


class UploadComponent extends Component {

    constructor(props) {
        super(props);
        this.state = {
            selectedFile: null,
            fileName: null,
            errorMessage: null,
            nameCheck: 0,
            fileTypeNeeded: this.props.fileTypeNeeded,
            loaded: 0,
        }

    }

    checkMimeType = (event) => {
        //getting file object
        let files = event.target.files
        //define message container
        let err = ''
        // list allow mime type
        if (this.state.fileTypeNeeded === "audio") {
            var types = ['audio/mpeg', 'audio/wav', '	audio/webm']
        }
        else {
            var types = ['image/png', 'image/jpeg']

        }
        // loop access array
        for (var x = 0; x < files.length; x++) {
            // compare file type find doesn't matach
            if (types.every(type => files[x].type !== type)) {
                // create error message and assign to container   
                err += files[x].type + ' is not a supported format\n';
            }
        };

        if (err !== '') { // if message not same old that mean has error 
            event.target.value = null // discard selected file
            console.log(err)
            return false;
        }
        return true;

    }

    handleChange = event => {
        console.log(event.target.value)
        this.setState({
            fileName: event.target.value
        })
    }
    onChangeHandler = event => {
        if (this.checkMimeType(event)) {
            this.setState({
                selectedFile: event.target.files[0],
                loaded: 0,
            })
        }

    }

    onClickHandler = () => {
        if (window.confirm('Are you sure you want to upload the file?')) {

            if (this.state.selectedFile === null) {
                this.state.nameCheck = 1
                this.setState({

                    nameCheck: 1,
                    errorMessage: "Invalid File Type",
                })
            }
            if (this.state.fileName !== null && this.state.fileTypeNeeded !== "profile") {
                if (this.state.fileName.length < 6) {

                    this.state.nameCheck = 1
                    this.setState({

                        nameCheck: 1,
                        errorMessage: "Name too short(must be longer than 6 characters)",
                    }
                    )
                }
            }
            console.log()
            console.log(this.state.nameCheck === 0)
            if (this.state.nameCheck === 0) {
                if (this.state.fileTypeNeeded === "profile") {
                    SongService.GetMyArtist().then(reso => {
                        var data = new FormData()
                        data.append('file', this.state.selectedFile)
                        data.append('type', "profile")
                        data.append('artistName', reso.data.name)
                        UploadService.Upload( data, {
                            onUploadProgress: ProgressEvent => {
                                this.setState({
                                    loaded: (ProgressEvent.loaded / ProgressEvent.total * 100),
                                })
                            }
                        }

                        ).then(res => { //print response status
                            console.log(res.statusText)

                        }).catch((error) => {
                            console.log(error);

                        })
                    })


                }
                if (this.state.fileTypeNeeded !== "profile") {


                    SongService.GetAlbumByUserAndId(this.props.albumId).then(result => {
                        //Use the album to get data for the song upload, also check if user is owner of album
                        //only if the upload is for the song

                        if (this.state.fileTypeNeeded === "audio") {

                            var dataToSend = {
                                albumId: result.data.id,
                                name: this.state.fileName,
                                length: 4.20,
                            }
                            //Send the data to create the song
                            SongService.AddSong(dataToSend).then(res => {
                                //Add song to database and get data for file upload
                                console.log(res)
                                var data = new FormData()
                                data.append('file', this.state.selectedFile)
                                data.append('artistName', res.data.artistName)
                                console.log(res.data.artistName)
                                data.append('albumName', res.data.albumName)
                                data.append('songid', res.data.id)
                                data.append('type', "audio")
                                UploadService.Upload( data, {
                                    onUploadProgress: ProgressEvent => {
                                        this.setState({
                                            loaded: (ProgressEvent.loaded / ProgressEvent.total * 100),
                                        })
                                    }
                                }

                                ).then(res => { //print response status
                                    console.log(res.statusText)

                                }).catch((error) => {
                                    console.log(error);

                                })
                            }).catch(errrr => {
                                console.log("Upload Failed")
                                console.log(errrr)
                            })
                            //Upload the file to the server
                        }
                        if (this.state.fileTypeNeeded === "album") {
                            var data = new FormData()
                            data.append('file', this.state.selectedFile)
                            data.append("artistName", result.data.artistName)
                            data.append('albumName', result.data.name)
                            data.append('type', "album")

                            axios.post("http://localhost:8000/upload", data, {
                                onUploadProgress: ProgressEvent => {
                                    this.setState({
                                        loaded: (ProgressEvent.loaded / ProgressEvent.total * 100),
                                    })
                                }
                            }

                            ).then(res => { //print response status
                                console.log(res.statusText)

                            }).catch((error) => {
                                console.log(error);

                            })
                        }




                    });
                }
            }

        }
    }
    render() {

        return (

            <div data-testid="upload-boxtest" className="upload-box">
                <form method="post" action="#" id="#">
                    <div className="form-group files color">
                        <label className="center-text">Upload Your File </label>
                        <input type="file" id="fileinput" className="" onChange={this.onChangeHandler} />

                    </div>
                    {
                        this.props.requireName ? <input onChange={this.handleChange} name="username" className="upload-text" placeholder="Name of Song" type="text" required />
                            : <div></div>
                    }
                    {
                        this.props.requireAlbumName ? <input onChange={this.handleChange} name="username" className="upload-text" placeholder="Name of Album" type="text" required />
                            : <div></div>
                    }


                    <h1 className="center-text">{this.state.loaded}% Done</h1>
                </form>
                <button type="button" className="btn btn-success btn-block upload-text" onClick={this.onClickHandler}>Upload</button>
                <h1 className="center-text">{this.state.errorMessage}</h1>
            </div>


        )

    }
}


export default UploadComponent