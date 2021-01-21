import React from "react";
import { render, findByText, fireEvent, act, getByTestId, getByText } from '@testing-library/react';
import { createMemoryHistory } from 'history'
import { Router } from 'react-router-dom'
import SongService from '../services/SongService';
import UploadService from '../services/UploadService';
import AlbumEditPage from "../components/MusicComponents/AlbumEditPage"


const history = createMemoryHistory()
function sleep(ms) {
    return new Promise((resolve) => setTimeout(resolve, ms));
}
const song1= {
    albumId: 10002,
    albumName: "Snechar face bine",
    artistId: 2,
    artistName: "Snechar",
    id: 10028,
    length: 4.2,
    name: "TestSong2",
}

const song2= {
    albumId: 10002,
    albumName: "Snechar face bine",
    artistId: 2,
    artistName: "Snechar",
    id: 10027,
    length: 4.2,
    name: "TestSong",
}
const albums=[{name:"Snechar's Album",id:1,artistName:"Snechar"}]
const AlbumWithSongs={name:"Snechar's Album",id:1,artistName:"Snechar",songs:[
    {
        "id": 10026,
        "name": "Do play this audio",
        "length": 4.2,
        "albumName": "Snechar face bine",
        "albumId": 10002,
        "artistName": "Snechar",
        "artistId": 2
    },
    {
        "id": 10027,
        "name": "Soviet Anthem",
        "length": 4.2,
        "albumName": "Snechar face bine",
        "albumId": 10002,
        "artistName": "Snechar",
        "artistId": 2
    }
]}
const AlbumWithSongsParsed = JSON.parse(JSON.stringify(AlbumWithSongs))
jest.mock('../services/SongService.js');
jest.mock("../services/UploadService.js")
localStorage.setItem("token", "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJodHRwOi8vc2NoZW1hcy54bWxzb2FwLm9yZy93cy8yMDA1LzA1L2lkZW50aXR5L2NsYWltcy9uYW1lIjoiU25lY2hhciIsImp0aSI6ImM5ZjVlY2MzLWQ1Y2YtNDc0Zi05YTk3LTM4M2FlNTJkMDg1MSIsImV4cCI6MjM2ODUzNDc1MiwiaXNzIjoiaHR0cDovL2xvY2FsaG9zdDo2MTk1NSIsImF1ZCI6Imh0dHA6Ly9sb2NhbGhvc3Q6NDIwMCJ9.0Xw90nXw74W6dtLS9tbgQcu05dHPE732hDmvu__CReU")
localStorage.setItem("loggedIn", 1)
describe("Album edit tests",()=>{

it("should render",async()=>{
    const mockAlbum = SongService.GetAlbumByUserAndId.mockResolvedValue(Promise.resolve({status:200, data:albums}))
    const mockAlbum2 = SongService.GetAlbumById.mockResolvedValue(Promise.resolve({status:200, data:AlbumWithSongsParsed}))
    history.push('/account')
    const {getByTestId} = render(
        <Router history={history}>
            <AlbumEditPage id={1}/>
        </Router>
    )
    await act(()=>sleep(500))
    
    expect(mockAlbum).toHaveBeenCalled()
    expect(mockAlbum2).toHaveBeenCalled()
})
it("should not render",async()=>{
    const mockAlbum = SongService.GetAlbumByUserAndId.mockResolvedValue(Promise.reject({status:401}))
    const mockAlbum2 = SongService.GetAlbumById.mockResolvedValue(Promise.resolve({status:401}))
    history.push('/account')
    const {getByTestId} = render(
        <Router history={history}>
            <AlbumEditPage id={1}/>
        </Router>
    )
    await act(()=>sleep(500))
    
    expect(mockAlbum).toHaveBeenCalled()
    expect(mockAlbum2).toHaveBeenCalled()
    expect(getByTestId("errormessageMain").innerHTML).toBe("You do not own this album")
})

it("should delete album",async()=>{
    const mockAlbum = SongService.GetAlbumByUserAndId.mockResolvedValue(Promise.resolve({status:200, data:albums}))
    const mockAlbum2 = SongService.GetAlbumById.mockResolvedValue(Promise.resolve({status:200, data:AlbumWithSongsParsed}))
    const mockAlbum3 = SongService.DeleteAlbum.mockResolvedValue(Promise.resolve({status:200}))
    window.confirm = jest.fn(() => true)
    history.push('/account')
    const {getByTestId} = render(
        <Router history={history}>
            <AlbumEditPage id={1}/>
        </Router>
    )
    await act(()=>sleep(500))
    const deleteButton = getByTestId("delete-album-button")
    fireEvent.click(deleteButton)

    expect(mockAlbum).toHaveBeenCalled()
    expect(mockAlbum2).toHaveBeenCalled()
    expect(mockAlbum3).toHaveBeenCalled()
})

})