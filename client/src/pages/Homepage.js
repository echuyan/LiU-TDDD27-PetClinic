import React, {} from "react";
import { useNavigate} from "react-router-dom";
import profileImg from "../static/picture2.png";



function Homepage() {
 
  const navigate = useNavigate();

  function displayButton() {
    
    const element = document.getElementById("Welcome-header");
    if (sessionStorage.getItem("email") !== null) {
      if (element !== null) {
        element.textContent = "Welcome. We are here to help you.";
      }
      return "Add a new pet";
    } else {
      if (element !== null) {
        element.textContent = "Welcome. We are here to help you.";
      }
      return "Login";
    }
  }

  function buttonAction() {
   
    if (sessionStorage.getItem("email") !== null) {
      navigate("/AddPet");
    } else {
      navigate("/LogIn");
    }
  }


if (sessionStorage.getItem("token")) {
  return (
    <div id="globaldiv">
    <div id="background">
      <h3 id="Welcome-header">Welcome. We are here to help you.</h3>
      <h4>{sessionStorage.getItem("email")}</h4>
      <button className="btn btn-info" onClick={() => buttonAction()}>
        {" "}
        {displayButton()}
      </button>
    </div>
    <div className="container" style={{ marginTop: "30px" }}>
      <div className="main-body">
        <div className="row">
          <div className="col-md-6">
            <div id="userprofile">
              <img src={profileImg} alt="User Profile" width={400}/>
              <p>Hello, Name</p>
              <p>email</p>
            </div>
          </div>
          
        </div>
      </div>
    </div>
  </div>
  
  );
} 
}

export default Homepage;
