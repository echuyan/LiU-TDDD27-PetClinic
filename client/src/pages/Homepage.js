import React, {} from "react";
import { useNavigate} from "react-router-dom";
import "../components/OwnerProfile.css";
import "../components/PetCard.css";
import profileImg from "../static/picture2.png";
import pic1 from "../static/ElC_happy_red_cat.png";
import pic2 from "../static/ElC_happy_scottish_terrier.png";
import pic3 from "../static/ElC_happy_scottish_terrier_dog.png";

// Creates the homepage of the application
function Homepage() {
 
  const navigate = useNavigate();

  // Changes the text for the button if the user has logged in.
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

  // Changes the action of the main button if the user is logged in or not.
  function buttonAction() {
   
    if (sessionStorage.getItem("email") !== null) {
      navigate("/AddPet");
    } else {
      navigate("/LogIn");
    }
  }

  // Returns user profile if the user is logged in.

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
              <p>Name</p>
              <p>email</p>
            </div>
          </div>
          <div className="col-md-6">
            <div id="pictures">
              <div className="row">
                <div className="col-sm">
                  <img src={pic1} alt="Picture 1" width={400}/>
                </div>
                <div className="col-sm">
                  <img src={pic2} alt="Picture 2" width={400}/>
                </div>
                <div className="col-sm">
                  <img src={pic3} alt="Picture 3" width={400}/>
                </div>
              </div>
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
