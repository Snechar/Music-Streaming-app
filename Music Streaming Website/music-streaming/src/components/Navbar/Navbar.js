import React, { Component , NavLink , Fragment} from 'react';
import {MenuItems} from "./MenuItems";
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
    if (document.cookie.split(';').filter((item) => item.trim().startsWith('logedIn=')).length) {
      this.setState({ loggedIn: true })
    }
    window.setInterval(() => {
      if (document.cookie.split(';').filter((item) => item.trim().startsWith('logedIn=true')).length) {
        this.setState({ loggedIn: true })
      }
      else {
        this.setState({ loggedIn: false })
      }
    }, 500)
  }

    render()  {
        return(
            <nav className="NavbarItems">
               <a href="/home" className="logo-link"><h1 className="navbar-logo">Voughtify<i className="fab fa-spotify"></i></h1></a> 
                <div className="menu-icon" onClick={this.handleClick}>
                    <i className={this.state.clicked ? 'fas fa-times' : 'fas fa-bars'}></i>
                </div>
                {this.state.loggedIn ?
                    <ul className = {this.state.clicked ? 'nav-menu active' : 'nav-menu'}>
                 <li>
                    <a className="nav-links" href="/home">Songs</a>
                    <a className="nav-links" href="/account">My account</a>
                    
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
        )
    }
}

export default Navbar