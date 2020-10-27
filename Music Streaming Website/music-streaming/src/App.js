import React from 'react';
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


function App() {
  return (
    <div className="App">
   <Navbar />
   <Router>
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
