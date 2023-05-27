import React, { useEffect, useState } from "react";
import { useNavigate} from "react-router-dom";

//import { response } from "express";

// Creates the homepage of the application
function OwnersPage() {
 
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [userInfo, setUserInfo] = useState();
  const [userPets, setUserPets] = useState([]);

 // get user info
  const fetchUserData = async () => {

    console.log(JSON.stringify({
        username: sessionStorage.getItem("email"),
      }));

    const userInfo = await fetch(`http://localhost:3000/Users/GetUser`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        username: sessionStorage.getItem("email"),
      }),
    }).then((response) => response.json());
   
   console.log(userInfo);
   setUserInfo(userInfo.user);
  };


  const fetchUserPets = async () => {

    console.log(JSON.stringify({
        username: sessionStorage.getItem("email"),
      }));

    const userPetsData = await fetch(`http://localhost:3000/Users/GetPets`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        username: sessionStorage.getItem("email"),
      }),
    }).then((response) => response.json());
   
    console.log(typeof(userPetsData));
    console.log(userPetsData);
    setUserPets(userPetsData.pets);
  };


 // Running fetchItems  and setting the usernameState from sessionStorage
 useEffect(() => {
    fetchUserData();
    fetchUserPets();
    setUsername(sessionStorage.getItem("email"));
  }, []);

  // Returns user profile if the user is logged in.

if (sessionStorage.getItem("token")) {
  return (
    <div id="globaldiv">
    <div id="background">
      <h3 id="Welcome-header">Welcome. We are here to help you.</h3>
      
      <button className="btn btn-info" onClick={() => {
                              navigate(`/AddPet/${userInfo.email}`);
                            }}>
        Add a new pet
      </button>
      <button className="btn btn-info" onClick={() => {
                              navigate(`/MakeAppointment/${userInfo.email}`);
                            }}>
        Make an appointment
      </button>
    </div>
    <div className="container" style={{ marginTop: "30px" }}>
      <div className="main-body">
        <div className="row">
          <div className="col-md-6">
            <div id="userprofile">
             
              {userInfo && (
             <div>
            <img src={userInfo.photo} alt="User Profile" width={300}/>
            <h4>Name:</h4> 
            <p>{userInfo.firstname} {userInfo.familyname}</p>
            <h4>Email:</h4> 
            <p>{userInfo.email}</p>
           
            <button
                            className="btn btn-primary btn-sm button"
                            onClick={() => {
                              navigate(`/ChangeInfo/${userInfo.email}`);
                            }}
                          >
                            Update Profile
                          </button>
          </div>
        )}
            </div>
          </div>
          <div className="col-md-6">
            <div id="pictures">
              <div className="row">
                <div className="col-sm">
                 
                    {userPets.map((pet) => (
                    <div className="pet-box" key={pet.id}>
                    <h4>{pet.name}</h4>
                    <p>Species: {pet.species}</p>
                    <p>Date of Birth: {pet.dateofbirth}</p>
                    <img src={pet.photo} alt="pet photo" width={200}/>
                    <button
                            className="btn btn-primary btn-sm button"
                            onClick={() => {
                              navigate(`/ChangePet/${pet.id}`);
                            }}
                          >
                            Change Pet
                          </button>
                    </div>
                    
                ))}
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

export default OwnersPage;
