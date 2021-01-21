import React from "react";
import { render, findByText, fireEvent, act, getByTestId, getByText } from '@testing-library/react';
import { createMemoryHistory } from 'history'
import { Router } from 'react-router-dom'
import SongService from '../services/SongService';
import UploadService from '../services/UploadService';
import AlbumEditSelection from "../components/MusicComponents/AlbumEditSelection"
import { faItalic } from "@fortawesome/free-solid-svg-icons";

const history = createMemoryHistory()
function sleep(ms) {
    return new Promise((resolve) => setTimeout(resolve, ms));
}

const albums=[{name:"Snechar's Album",id:1,artistName:"Snechar"}]

jest.mock('../services/SongService.js');
jest.mock("../services/UploadService.js")
localStorage.setItem("token", "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJodHRwOi8vc2NoZW1hcy54bWxzb2FwLm9yZy93cy8yMDA1LzA1L2lkZW50aXR5L2NsYWltcy9uYW1lIjoiU25lY2hhciIsImp0aSI6ImM5ZjVlY2MzLWQ1Y2YtNDc0Zi05YTk3LTM4M2FlNTJkMDg1MSIsImV4cCI6MjM2ODUzNDc1MiwiaXNzIjoiaHR0cDovL2xvY2FsaG9zdDo2MTk1NSIsImF1ZCI6Imh0dHA6Ly9sb2NhbGhvc3Q6NDIwMCJ9.0Xw90nXw74W6dtLS9tbgQcu05dHPE732hDmvu__CReU")
localStorage.setItem("loggedIn", 1)

describe("Album select edit screen", ()=>{

    it("should load", async()=>{
        const mockArtist = SongService.GetAlbumByUser.mockResolvedValue(Promise.resolve({status:200, data:albums}))
        history.push('/account')
        
        const {getByTestId} = render(
            <Router history={history}>
                <AlbumEditSelection/>
            </Router>
        )
        expect(mockArtist).toHaveBeenCalled()
        await act(()=>sleep(200))
        expect(getByTestId("albumbox0")).toBeTruthy()
    })
    it("should fail to load", async()=>{
        const mockArtist = SongService.GetAlbumByUser.mockResolvedValue(Promise.reject({status:401}))
        history.push('/account')
        
        const {getByTestId} = render(
            <Router history={history}>
                <AlbumEditSelection/>
            </Router>
        )
        expect(mockArtist).toHaveBeenCalled()
        await act(()=>sleep(200))
        expect(getByTestId("errormessage2").innerHTML).toBe("You are not an artist")
    })

    it("should upload", async()=>{
        const mockArtist = SongService.GetAlbumByUser.mockResolvedValue(Promise.resolve({status:200, data:albums}))
        const mockAlbumCreate = SongService.CreateAlbum.mockResolvedValue(Promise.resolve({status:200}))
        history.push('/account')
        window.confirm = jest.fn(() => true)
        const {getByTestId} = render(
            <Router history={history}>
                <AlbumEditSelection/>
            </Router>
        )
        expect(mockArtist).toHaveBeenCalled()
        await act(()=>sleep(200))
        var albumBoxAdd = getByTestId("card-click-to-add")
        fireEvent.click(albumBoxAdd)
        await act(()=>sleep(200))
        expect(getByTestId("album-create-input")).toBeTruthy()
        expect(getByTestId("create-album-button")).toBeTruthy()
        var inputAdd=getByTestId("album-create-input")
        var addButton= getByTestId("create-album-button")
        fireEvent.change(inputAdd,{target:{value:"Snechar's Album"}})
        expect(inputAdd.value).toBe("Snechar's Album")
        fireEvent.click(addButton)
        await act(()=>sleep(200))
        expect(mockAlbumCreate).toHaveBeenCalled()
    })
    it("should not upload due to name too short", async()=>{
        const mockArtist = SongService.GetAlbumByUser.mockResolvedValue(Promise.resolve({status:200, data:albums}))
        history.push('/account')
        window.confirm = jest.fn(() => true)
        const {getByTestId} = render(
            <Router history={history}>
                <AlbumEditSelection/>
            </Router>
        )
        expect(mockArtist).toHaveBeenCalled()
        await act(()=>sleep(200))
        var albumBoxAdd = getByTestId("card-click-to-add")
        fireEvent.click(albumBoxAdd)
        await act(()=>sleep(200))
        expect(getByTestId("album-create-input")).toBeTruthy()
        expect(getByTestId("create-album-button")).toBeTruthy()
        var inputAdd=getByTestId("album-create-input")
        var addButton= getByTestId("create-album-button")
        fireEvent.change(inputAdd,{target:{value:"123"}})
        expect(inputAdd.value).toBe("123")
        fireEvent.click(addButton)
        await act(()=>sleep(200))
        expect(getByTestId("errormessage").innerHTML).toBe("Album name too short (4 characters minimum)")
    })
    it("should not upload due to input empty", async()=>{
        const mockArtist = SongService.GetAlbumByUser.mockResolvedValue(Promise.resolve({status:200, data:albums}))
        history.push('/account')
        window.confirm = jest.fn(() => true)
        const {getByTestId} = render(
            <Router history={history}>
                <AlbumEditSelection/>
            </Router>
        )
        expect(mockArtist).toHaveBeenCalled()
        await act(()=>sleep(200))
        var albumBoxAdd = getByTestId("card-click-to-add")
        fireEvent.click(albumBoxAdd)
        await act(()=>sleep(200))
        expect(getByTestId("album-create-input")).toBeTruthy()
        expect(getByTestId("create-album-button")).toBeTruthy()
        var inputAdd=getByTestId("album-create-input")
        var addButton= getByTestId("create-album-button")
        fireEvent.change(inputAdd,{target:{value:""}})
        expect(inputAdd.value).toBe("")
        fireEvent.click(addButton)
        await act(()=>sleep(200))
        expect(getByTestId("errormessage").innerHTML).toBe("Input field can't be empty")
    })


})