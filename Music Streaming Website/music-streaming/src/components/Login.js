import React, { useState, useEffect } from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEnvelope, faHome, faLock, faSearch, faTimes, faUser, faUserCircle, faUsers } from '@fortawesome/free-solid-svg-icons';
import AccountService from '../services/AccountService.js';
import Cookie from "js-cookie"
import { useHistory } from "react-router-dom";


const Login = () => {
	
	const history = useHistory();
	if(Cookie.get('logedIn') == "true")
	{
		history.push("/home");

	}
	const [login, setLogin] = useState({ username: "", password: "" });
	const [message, setMessage] = useState("");
  
	const handleChange = (event) => {
	  setLogin({ ...login, [event.target.name]: event.target.value });
	};
  
	const handleSubmit = (event) => {
	  event.preventDefault();
  
	  AccountService.Login(login).then((res) => {
		Cookie.set("token", res.data.token);
		Cookie.set('logedIn' , "true")
	
		console.log(Cookie.get("token"))		
		setMessage("Logged in");
		history.push("/");

	  })
	  .catch((error) => {
		  console.log(error);
		  setMessage("Yes, it did fail");
	  });
	};
  return (
      <div className="login-body">
				<div className="main-login main-center">
                    <h2 className="text-center">Login</h2>
					<form onSubmit={handleSubmit}>

						<div className="form-group input-group">
							<div className="input-group-prepend">
		    					<span className="input-group-text"> <FontAwesomeIcon icon={faUserCircle}/></span>
		 					</div>
        					<input onChange={handleChange} name="username" className="form-control" placeholder="Username" type="text" required/>
    					</div>

						<div className="form-group input-group">
							<div className="input-group-prepend">
		    					<span className="input-group-text"> <FontAwesomeIcon icon={faLock}/></span>
		 					</div>
        					<input onChange={handleChange} name="password" className="form-control" placeholder="Password" type="password" required/>
    					</div>
						<div className="form-group ">
							<button type="submit" className=" btn-lg btn-block login-button">Login</button>
						</div>
						<div className="login-register">
				            <a href="/register" className="l-text">Don't have an account? <br></br> Create one!</a>	
				         </div>
						 <div className="text-center" role="alert">
        					{message}
      					</div>
					</form>
				</div>
                </div>
  );
}

export default Login;
