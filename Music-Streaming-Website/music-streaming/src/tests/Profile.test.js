import React from "react";
import { render, findByText, fireEvent, act, getByTestId, getByText } from '@testing-library/react';
import { createMemoryHistory } from 'history'
import { Router } from 'react-router-dom'
import SongService from '../services/SongService';
import UploadService from '../services/UploadService';
import Profile from "../components/AccountComponents/ProfilePage"

const history = createMemoryHistory()
function sleep(ms) {
    return new Promise((resolve) => setTimeout(resolve, ms));
}

jest.mock('../services/SongService.js');
jest.mock("../services/UploadService.js")
localStorage.setItem("token", "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJodHRwOi8vc2NoZW1hcy54bWxzb2FwLm9yZy93cy8yMDA1LzA1L2lkZW50aXR5L2NsYWltcy9uYW1lIjoiU25lY2hhciIsImp0aSI6ImM5ZjVlY2MzLWQ1Y2YtNDc0Zi05YTk3LTM4M2FlNTJkMDg1MSIsImV4cCI6MjM2ODUzNDc1MiwiaXNzIjoiaHR0cDovL2xvY2FsaG9zdDo2MTk1NSIsImF1ZCI6Imh0dHA6Ly9sb2NhbGhvc3Q6NDIwMCJ9.0Xw90nXw74W6dtLS9tbgQcu05dHPE732hDmvu__CReU")
localStorage.setItem("loggedIn", 1)

const Artist = {
    id: 10002,
    name: "Snechar",

}


describe("Profile page tests",()=>{
it("Sould Render Correctly if the user is not an artist",async()=>
{
    const mockArtist = SongService.GetMyArtist.mockResolvedValue(Promise.reject({status:401}))
    history.push('/account')
    
    const {getByTestId} = render(
        <Router history={history}>
            <Profile/>
        </Router>
    )
    expect(mockArtist).toHaveBeenCalled()
    expect(getByTestId("profile-input-field-name-creation")).toBeTruthy()

})
it("Should send the upload request",async()=>
{
    const mockArtist = SongService.GetMyArtist.mockResolvedValue(Promise.reject({status:401}))
    const mockArtistCreation = SongService.CreateArtist.mockResolvedValue(Promise.resolve({status:200}))
    history.push('/account')
    
    const {getByTestId} = render(
        <Router history={history}>
            <Profile/>
        </Router>
    )
    expect(mockArtist).toHaveBeenCalled()
    var inputField = getByTestId("profile-input-field-name-creation")
    var uploadButton= getByTestId("upload-profile-picture-button")
    fireEvent.change(inputField, { target: { value: 'Snechar' } })
    expect(inputField.value).toBe("Snechar")
    fireEvent.click(uploadButton)
    expect(mockArtistCreation).toHaveBeenCalledWith({"name": "Snechar"})

})
it("Fail to send upload when name is shorter than 4",async()=>
{
    const mockArtist = SongService.GetMyArtist.mockResolvedValue(Promise.reject({status:401}))
    const mockArtistCreation = SongService.CreateArtist.mockResolvedValue(Promise.resolve({status:200}))
    history.push('/account')
    
    const {getByTestId} = render(
        <Router history={history}>
            <Profile/>
        </Router>
    )
    expect(mockArtist).toHaveBeenCalled()
    var inputField = getByTestId("profile-input-field-name-creation")
    var uploadButton= getByTestId("upload-profile-picture-button")
    fireEvent.change(inputField, { target: { value: '123' } })
    expect(inputField.value).toBe("123")
    fireEvent.click(uploadButton)
    await act(()=>{
        sleep(500)
    })
    var errorMessage = getByTestId("upload-error-message")
    expect(errorMessage.innerHTML).toBe("Artist name must be longer than 4 characters")
})
it("Fail to send upload when name field is empty",async()=>
{
    const mockArtist = SongService.GetMyArtist.mockResolvedValue(Promise.reject({status:401}))
    const mockArtistCreation = SongService.CreateArtist.mockResolvedValue(Promise.resolve({status:200}))
    history.push('/account')
    
    const {getByTestId} = render(
        <Router history={history}>
            <Profile/>
        </Router>
    )
    expect(mockArtist).toHaveBeenCalled()
    var inputField = getByTestId("profile-input-field-name-creation")
    var uploadButton= getByTestId("upload-profile-picture-button")
    fireEvent.change(inputField, { target: { value: '' } })
    expect(inputField.value).toBe("")
    fireEvent.click(uploadButton)
    await act(()=>{
        sleep(500)
    })
    var errorMessage = getByTestId("upload-error-message")
    expect(errorMessage.innerHTML).toBe("Field can't be empty")
})

it("Sould Render Correctly if the user is an artist",async()=>
{
    const mockArtist = SongService.GetMyArtist.mockResolvedValue(Promise.resolve({status:200, data :{name:"Snechar"}}))
    history.push('/account')
    
    const {getByTestId} = render(
        <Router history={history}>
            <Profile />
        </Router>
    )
    expect(mockArtist).toHaveBeenCalled()
    await act(()=>sleep(500))
    expect(getByTestId("card-profile")).toBeTruthy()
})
it("Should log out the user",async()=>{
    const mockArtist = SongService.GetMyArtist.mockResolvedValue(Promise.resolve({status:200, data :{name:"Snechar"}}))
    history.push('/account')
    
    const {getByTestId} = render(
        <Router history={history}>
            <Profile />
        </Router>
    )
    expect(mockArtist).toHaveBeenCalled()
    var logoutButton =  getByTestId("profile-log-out-button" )
    fireEvent.click(logoutButton)
    fireEvent.click(logoutButton)
    await act(()=>sleep(500))
    expect(localStorage.getItem('token')).toBe(null)
})


})