import React from "react";
import { render, findByText, fireEvent, act, getByTestId, getByText } from '@testing-library/react';
import { createMemoryHistory } from 'history'
import { Router } from 'react-router-dom'
import App from "../App"
import SongService from '../services/SongService';
import Song from "../components/MusicComponents/Songs"
const history = createMemoryHistory()
function sleep(ms) {
    return new Promise((resolve) => setTimeout(resolve, ms));
}

jest.mock('../services/SongService.js');

const songs = [{
    albumId: 10002,
    albumName: "Snechar face bine",
    artistId: 2,
    artistName: "Snechar",
    id: 10027,
    length: 4.2,
    name: "TestSong",
}, {
    albumId: 10002,
    albumName: "Snechar face bine",
    artistId: 2,
    artistName: "Snechar",
    id: 10028,
    length: 4.2,
    name: "TestSong2",
}];

const playlists = [{id:1,name:"playlist1"},{id:2,name:"playlist2"}]

localStorage.setItem("token", "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJodHRwOi8vc2NoZW1hcy54bWxzb2FwLm9yZy93cy8yMDA1LzA1L2lkZW50aXR5L2NsYWltcy9uYW1lIjoiU25lY2hhciIsImp0aSI6ImM5ZjVlY2MzLWQ1Y2YtNDc0Zi05YTk3LTM4M2FlNTJkMDg1MSIsImV4cCI6MjM2ODUzNDc1MiwiaXNzIjoiaHR0cDovL2xvY2FsaG9zdDo2MTk1NSIsImF1ZCI6Imh0dHA6Ly9sb2NhbGhvc3Q6NDIwMCJ9.0Xw90nXw74W6dtLS9tbgQcu05dHPE732hDmvu__CReU")
localStorage.setItem("loggedIn", 1)

describe("Song Page loads",()=>
{

    it("Song page loads", async () => {
        const mockPlaylist = SongService.GetPlaylists.mockResolvedValue(Promise.resolve({ status: 200, data:playlists }))
        const mockSong = SongService.GetAllSubjects.mockResolvedValue(Promise.resolve({ status: 200, data: songs }))
        history.push('/home')
    
        const {getByTestId} = render(
            <Router history={history}>
                <Song/>
            </Router>
        )
        expect(mockSong).toHaveBeenCalled()
        await act(()=>sleep(200))
        expect(mockPlaylist).toHaveBeenCalled()
    
        
    }
    )

    it("Playlists appear", async () => {
        const mockPlaylist = SongService.GetPlaylists.mockResolvedValue(Promise.resolve({ status: 200, data:playlists }))
        const mockSong = SongService.GetAllSubjects.mockResolvedValue(Promise.resolve({ status: 200, data: songs }))
        history.push('/home')
    
        const {getByTestId} = render(
            <Router history={history}>
                <Song/>
            </Router>
        )
        expect(mockSong).toHaveBeenCalled()
        await act(()=>sleep(200))
        expect(mockPlaylist).toHaveBeenCalled()

        var dots = getByTestId("3dots0")
        fireEvent.click(dots)
        await act(()=>sleep(200))
        var playlistAdd = getByTestId("playlistadd0")
        await act(()=>sleep(200))
        var style = window.getComputedStyle(playlistAdd)
        expect(style.display).toBe("block")
    
        
    }
    )
    
    //AudioPlayer is a package therefore it does not require tests
})
