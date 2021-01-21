import React, { useState, } from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faLock,  faUserCircle, } from '@fortawesome/free-solid-svg-icons';
import AccountService from '../services/AccountService.js';
import SongService	from "../services/SongService.js"
import Cookie from "js-cookie"
import { useHistory, Redirect } from "react-router-dom";



const Login = () => {

	const history = useHistory();

	const [login, setLogin] = useState({ username: "", password: "" });
	const [message, setMessage] = useState("");
	const handleChange = (event) => {
		setLogin({ ...login, [event.target.name]: event.target.value });
		setMessage(message)
	};

	const handleSubmit = (event) => {
		event.preventDefault();

		AccountService.Login(login).then((res) => {
			localStorage.setItem("token", res.data.token)
			localStorage.setItem("loggedIn", 1)
			setMessage("Logged in");
			SongService.SetApiGateway()
			history.push("/")
		})
			.catch((error) => {

					setMessage("Invalid Credentials");
					console.log(message);

			});
	};


	return (
		<div className="login-body">
			<div className="main-login main-center">
				<h2 className="text-center">Login</h2>
				<form onSubmit={handleSubmit}>

					<div className="form-group input-group">
						<div className="input-group-prepend">
							<span className="input-group-text"> <FontAwesomeIcon icon={faUserCircle} /></span>
						</div>
						<input onChange={handleChange} data-testid="username-field" name="username" className="form-control" placeholder="Username" type="text" required />
					</div>

					<div className="form-group input-group">
						<div className="input-group-prepend">
							<span className="input-group-text"> <FontAwesomeIcon icon={faLock} /></span>
						</div>
						<input onChange={handleChange} data-testid="password-field" name="password" className="form-control" placeholder="Password" type="password" required />
					</div>
					<div className="form-group ">
						<button data-testid="login-button" type="submit" className=" btn-lg btn-block login-button">Login</button>
					</div>
					<div className="login-register">
						<a href="/register" className="l-text">Don't have an account? <br></br> Create one!</a>
					</div>
					<div data-testid="error-message"  className="text-center" role="alert">
						{message}
					</div>
				</form>
			</div>
		</div>
	);
}

export default Login;
