import React, { useState, useEffect } from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";
import Login from './components/Login';
import Navbar from './components/Navbar/Navbar.js';
import Register from './components/Register';
import './App.css';
import Cookie from "js-cookie"
import jwt from 'jsonwebtoken'
import { useHistory } from "react-router-dom";
import Home from "./components/Home";



function App() {
	const history = useHistory();
  var isExpired = false;
  console.log(Cookie.get("token"))
  const token = Cookie.getJSON("token")
  var decodedToken=jwt.decode(token, {complete: true});
  var dateNow = new Date();


  if(decodedToken == null)
  {

  }
  else{
    if(decodedToken.expiration < dateNow.getTime()){
      isExpired = true;
    }

  }
  
    const [loginMessage, setLoginMessage] = useState("");



  return (
    <div className="App">
   <Navbar />
   <Router>
   <Route path="/home">
            <Home />
    </Route>
   <Route path="/login">
            <Login />
    </Route>
    <Route path="/register">
            <Register />
    </Route>
   </Router>
  </div>
   );
}

export default App;
