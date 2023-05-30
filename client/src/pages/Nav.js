import { useNavigate, Link } from "react-router-dom";
import React, { useState} from "react";
import logo from "../static/bg1.png";
import logo1 from "../static/bg2.png";

// Navbar component
function Nav() {
  const [clicked, setClicked] = useState(true);
  const navigate = useNavigate();

 
  const handleLogout = (event) => {
    event.preventDefault();
    sessionStorage.clear();
    navigate("/");
    window.location.reload();
  };


  // If not logged in
  if (!sessionStorage.getItem("token")) {
    return (
      <nav className="navbar navbar-expand-lg navbar-light bg-light top">
        <button
          className="navbar-toggler"
          type="button"
          data-toggle="collapse"
          data-target="#navMainMenu"
          aria-controls="navMainMenu"
          onClick={(e) => {
            if (!clicked) {
              setClicked(true);
            } else {
              setClicked(false);
            }
          }}
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div
          id="navMainMenu"
          className="collapse navbar-collapse"
          hidden={clicked}
        >
           <img src={logo}  style={{height:100, width:150}}/>
          <ul className="navbar-nav  mx-auto">
            <li className="nav-item">
              <a className="nav-link" href="/">
                {" "}
                Home{" "}
              </a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="/LogIn">
                {" "}
                Login{" "}
              </a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="/SignUp">
                {" "}
                Register{" "}
              </a>
            </li>
           
          </ul>
          <img src={logo1}  style={{height:100, width:150}}/>
        </div>
      </nav>
    );
  }
  // If  logged in
  else {
    return (
      <nav className="navbar navbar-expand-lg navbar-dark bg-dark top">
        <button
          className="navbar-toggler"
          type="button"
          data-toggle="collapse"
          data-target="#navMainMenu"
          aria-controls="navMainMenu"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div id="navMainMenu" className="navbar-collapse collapse">
          <div className="navbar-nav ml-auto">
       
            
            <Link
              to="/"
              className="nav-item nav-link"
              onClick={(e) => handleLogout(e)}
            >
              Logout{" "}
            </Link>
          </div>
        </div>
      </nav>
    );
  }
}

export default Nav;
