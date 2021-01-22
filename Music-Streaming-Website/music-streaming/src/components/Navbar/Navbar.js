import React, { Component} from 'react';
import { NavLink, Link} from 'react-router-dom';
import Cookie from "js-cookie"
import { useHistory, Redirect } from "react-router-dom";

import './Navbar.css';


class Navbar extends Component{
    state = {clicked: false}

    handleClick = () =>{
        this.setState({clicked : !this.state.clicked})
    }
    constructor() {
        super()
    
        this.state = {
          loggedIn: false
        }
}

componentDidMount() {
    if (localStorage.getItem("loggedIn") == 1) {
      this.setState({ loggedIn: true })
    }
    window.setInterval(() => {
      if (localStorage.getItem("loggedIn") == 1) {
        this.setState({ loggedIn: true })
      }
      else {
        this.setState({ loggedIn: false })
      }
    }, 500)
  }

    render()  {
        return(
          <div>
            <nav className="NavbarItems">
           
            <Link  className="logo-link" to={'/home'}> <h1 className="navbar-logo">Voughtify<i className="fab fa-spotify"></i></h1></Link>
              
                <div className="menu-icon" onClick={this.handleClick}>
                    <i className={this.state.clicked ? 'fas fa-times' : 'fas fa-bars'}></i>
                </div>
                {this.state.loggedIn ?
                    <ul className = {this.state.clicked ? 'nav-menu active' : 'nav-menu'}>
                 <li>
                    <NavLink  className="nav-links"  to={'/queue'}>Queue</NavLink>
                    <NavLink  className="nav-links"  to={'/playlists'}>Playlists</NavLink>
                    <NavLink  className="nav-links"  to={'/artists'}>Artists</NavLink>
                    <NavLink  className="nav-links"  to={'/albums'}>Albums</NavLink>
                    <NavLink  className="nav-links" to={'/home'}>Songs</NavLink>
                    <NavLink  className="nav-links"  to={'/account'}>Account</NavLink>
                 
                    
                    </li>
                    </ul>
                  
                  :
                  <ul className = {this.state.clicked ? 'nav-menu active' : 'nav-menu'}>
                 <li>
                    <a className="nav-links" href="/login">Login</a>
                    
                    </li>
                    </ul>
                }


            </nav>
            </div>
        )
    }
}

export default Navbar