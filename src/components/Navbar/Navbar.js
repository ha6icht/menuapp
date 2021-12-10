import React from "react";
//import {Link} from "react-router-dom";
import './Navbar.css';

class Navbar extends React.Component{
    render() {
        return (
            <header>
                <div className="logo"></div>
            </header>
            /*<div>
            <Link className="nav" to="/">Home </Link>
            <Link className="nav" to="/about">About Us </Link>
            <Link className="nav" to="/shop">Shop Now </Link>
            </div>*/
        );
    };
}

export default Navbar;