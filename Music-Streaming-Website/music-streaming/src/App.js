import React from "react";
import {Route} from "react-router-dom";
import Login from './components/Login';
import Navbar from './components/Navbar/Navbar.js';
import Register from './components/Register';
import './App.css';
import Cookie from "js-cookie"
import jwt from 'jsonwebtoken'
import Home from "./components/Home";




function App() {
  const token = Cookie.getJSON("token")
  var decodedToken = jwt.decode(token, { complete: true });
  var dateNow = new Date();



  if (decodedToken == null) {

  }
  else {
    if (decodedToken.expiration < dateNow.getTime()) {
      Cookie.remove("token")


    }

  }



  return (
    <div className="App">
      <Navbar />

      <Route path="/register">
        <Register />
      </Route>
      <Route path="/login">
        <Login />
      </Route>
      <Route path='/' component={Home} />




    </div>
  );
}


export default App;
