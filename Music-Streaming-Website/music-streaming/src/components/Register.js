import React, { useState,  } from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEnvelope, faLock, faUsers } from '@fortawesome/free-solid-svg-icons';
import AccountService from "../services/AccountService";

const Register = () => {
	const [register, setRegister] = useState({ username: "", email: "", password: ""});
	const [message, setMessage] = useState("");
  
	const handleChange = (event) => {
	  setRegister({ ...register, [event.target.name]: event.target.value });
	};
  
	const handleSubmit = (event) => {
	  event.preventDefault();
  
	  AccountService.Register(register).then((res) => {
		setMessage("Account Created Succesfully");
	  })
	  .catch((error) => {
		console.log(error.response.data.message);
		setMessage(error.response.data.message);
	});
	};
  return (
    <div className="login-body">
			<div className="row main my-auto">
				<div className="main-login main-center">
                    <h2 className="text-center">Register</h2>
					<form onSubmit={handleSubmit}>
						{/* <div className="form-group input-group">
							<div className="input-group-prepend">
		    					<span className="input-group-text" style={{width:"45px"}}> <FontAwesomeIcon icon={faUser}/></span>
		 					</div>
        					<input name="name" className="form-control" placeholder="Full name (optional)" type="text"/>
    					</div> */}
						
						<div className="form-group input-group">
							<div className="input-group-prepend">
		    					<span className="input-group-text" style={{width:"45px"}}> <FontAwesomeIcon icon={faUsers}/></span>
		 					</div>
        					<input onChange={handleChange} data-testid="username-field" name="username" className="form-control" placeholder="Username" type="text" required/>
    					</div>

						<div className="form-group input-group">
							<div className="input-group-prepend">
		    					<span className="input-group-text" style={{width:"45px"}}> <FontAwesomeIcon icon={faEnvelope}/></span>
		 					</div>
        					<input onChange={handleChange} data-testid="email-field" name="email" className="form-control" placeholder="Email" type="email" required/>
    					</div>

						<div className="form-group input-group">
							<div className="input-group-prepend">
		    					<span className="input-group-text" style={{width:"45px"}}> <FontAwesomeIcon icon={faLock}/></span>
		 					</div>
        					<input onChange={handleChange} data-testid="password-field" name="password" className="form-control" placeholder="Password" type="password" required
							        />
    					</div>

						<div className="form-group input-group">
							<div className="input-group-prepend">
		    					<span className="input-group-text" style={{width:"45px"}}> <FontAwesomeIcon icon={faLock}/></span>
		 					</div>
        					<input data-testid="repeatpassword-field" name="repeatPassword" className="form-control" placeholder="Repeat password" type="password" required
							  />
    					</div>
						<div className="form-group ">
							<button data-testid="register-button" type="sumbit" className=" btn-lg btn-block login-button">Register</button>
						</div>
						<div className="login-register">
				            <a href="/login" className="l-text">Login</a>
				         </div>
						 <div className="text-center" role="alert">
        					{message}
      					</div>
					</form>
				</div>
			</div>
		</div>
  );
}

export default Register;
