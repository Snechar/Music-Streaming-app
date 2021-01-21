import React from "react";
import { render, getByTestId,findByText, fireEvent, act, waitForDomChange  } from '@testing-library/react';
import { createMemoryHistory } from 'history'
import { Router } from 'react-router-dom'
import App from "../App"
import AccountService from '../services/AccountService';
import Login from "../components/Login"
const history = createMemoryHistory()

function sleep(ms) {
    return new Promise((resolve) => setTimeout(resolve, ms));
  }

jest.mock('../services/AccountService');
it('Test if Login component renders and sends data with success', async() => {
    const mockFn = AccountService.Login.mockResolvedValue(Promise.resolve({ status: 200, data: { token: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJodHRwOi8vc2NoZW1hcy54bWxzb2FwLm9yZy93cy8yMDA1LzA1L2lkZW50aXR5L2NsYWltcy9uYW1lIjoiU25lY2hhciIsImp0aSI6ImM5ZjVlY2MzLWQ1Y2YtNDc0Zi05YTk3LTM4M2FlNTJkMDg1MSIsImV4cCI6MjM2ODUzNDc1MiwiaXNzIjoiaHR0cDovL2xvY2FsaG9zdDo2MTk1NSIsImF1ZCI6Imh0dHA6Ly9sb2NhbGhvc3Q6NDIwMCJ9.0Xw90nXw74W6dtLS9tbgQcu05dHPE732hDmvu__CReU", } }));
    history.push('/login')
    const { getByTestId } = render(
        <Router history={history}>
            <Login/>
        </Router>
    )
    var inputEmail = getByTestId("username-field");
    var inputPassword = getByTestId("password-field");
    var inputSubmit = getByTestId("login-button")
        fireEvent.change(inputEmail, { target: { value: 'test@email.com' } });
        fireEvent.change(inputPassword, { target: { value: 'secretP@ssw0rd!' } });
      
        fireEvent.click(inputSubmit)
    expect(inputEmail.value).toBe("test@email.com");
    expect(inputPassword.value).toBe("secretP@ssw0rd!");
    expect(mockFn).toHaveBeenCalledWith({ username: 'test@email.com', password: 'secretP@ssw0rd!' });


});

it('Test if Login component renders and sends data with fail',async() => {
    const mockFn = AccountService.Login.mockResolvedValue(Promise.reject({ status: 401, message: "Invalid Credentials" }));
    history.push('/login')
    const { getByTestId,findByText , message } = render(
        <Router history={history}>
            <Login />
        </Router>
    )

    var inputEmail = getByTestId("username-field");
    var inputPassword = getByTestId("password-field");
    var inputSubmit = getByTestId("login-button")
    fireEvent.change(inputEmail, { target: { value: 'test2@email.com' } });
    expect(inputEmail.value).toBe("test2@email.com");
    fireEvent.change(inputPassword, { target: { value: 'secretP@ssw0rd!' } });
    expect(inputPassword.value).toBe("secretP@ssw0rd!");
    fireEvent.click(inputSubmit)
    expect(mockFn).toHaveBeenCalledWith({ username: 'test2@email.com', password: 'secretP@ssw0rd!' });
    await act(()=>sleep(500))
    var errorm = await findByText("Invalid Credentials")
    expect(errorm.innerHTML).toBe("Invalid Credentials")

  
    
})
