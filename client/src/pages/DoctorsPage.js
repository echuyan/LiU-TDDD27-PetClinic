import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import { Link } from "react-router-dom";

function DoctorsPage() {
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [userInfo, setUserInfo] = useState();
  const [searchQuery, setSearchQuery] = useState("");
  const [ownerInfo, setOwnerInfo] = useState(null);
  const [userPets, setUserPets] = useState([]);
  const [appointments, setAppointments] = useState([]);
 
  // search owner
  const searchPetOwner = async () => {
    try {
      
      const response = await fetch(`http://localhost:3000/Users/GetUserByEmail/${searchQuery}`);

      if (response.ok) {
        const data = await response.json();
        setOwnerInfo(data.user);
        sessionStorage.setItem("currentsearchedowner", searchQuery);
        const userPetsData = await fetch(
          `http://localhost:3000/Users/GetPets`,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ username: searchQuery }),
          }
        ).then((response) => response.json());

        
        setUserPets(userPetsData.pets);
      } else {
        setOwnerInfo(null);
        console.error("Failed to fetch pet owner information");
      }
    } catch (error) {
      setOwnerInfo(null);
      console.error("Error fetching pet owner information:", error);
    }
  };

  // clear search
  const clearSearch = () => {
    setOwnerInfo(null);
    setUserPets([]);
    setSearchQuery("");
    sessionStorage.removeItem("currentsearchedowner");
  };

  // get doctor's info and appointment schedule for this doctor
  const fetchUserData = async () => {
    

    const userInfo = await fetch(`http://localhost:3000/Users/GetUser`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        username: sessionStorage.getItem("email"),
      }),
    }).then((response) => response.json());
    setUserInfo(userInfo.user);

    const id = userInfo.user.id;
    
    const response = await fetch(`http://localhost:3000/Pets/GetAppointmentsForADoctor/${id}`);
    const appoints = await response.json();
    
    setAppointments(appoints.appoints);

    //now we get full info on pets for which appointments are planned
    const petAppointments = [];

    for (const appointment of appoints.appoints) {
      const petId = appointment.pet_id;
      const petResponse = await fetch(`http://localhost:3000/Pets/GetPet/${petId}`);
      const petData = await petResponse.json();
      appointment.pet = petData.pet;
      petAppointments.push(appointment);
    }
    setAppointments(petAppointments);
    
   

  };

  useEffect(() => {
    setUsername(sessionStorage.getItem("email"));
    setSearchQuery(sessionStorage.getItem("currentsearchedowner"));
    searchPetOwner();
    fetchUserData();

  }, []);

if (sessionStorage.getItem("token")) {
    return (
      <div id="globaldiv">
        <div id="background">
          
          <div id="userprofile">
            <img src="" alt="" width={400} />
            <p>Hello, Doctor {userInfo && userInfo.firstname}</p>
            
          </div>
          <div id="myschedule">
              <p>Your schedule</p>
              <h4>Appointments:</h4>
              {appointments.map((appointment) => {
                return (
                  <div key={appointment.id}>
                    <p>
                    <b><i>{appointment.pet &&  appointment.pet.name}:</i></b>
                    {appointment.startdate} - {appointment.enddate}
                     
                    </p>
                  </div>
                );
              })}
            </div>
        
        </div>

        <div className="container" style={{ marginTop: "30px" }}>
          <div className="main-body">
            <div className="row">
              <div className="col-md-6">
                <div>
                  <input
                    type="text"
                    id="ownersemail"
                    placeholder="Search pet owner's email"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                  />
                  <button
                    className="btn btn-primary"
                    onClick={searchPetOwner}
                  >
                    Search
                  </button>
                  <button className="btn btn-secondary" onClick={clearSearch}>
                    Clear search
                  </button>
                </div>
                {ownerInfo && (
                  <div>
                    <h3>Pet Owner's Information:</h3>
                    <img
                      src={ownerInfo.photo}
                      alt="User Profile"
                      width={150}
                    />
                    <p>Email: {ownerInfo.email}</p>
                    <p>First Name: {ownerInfo.firstname}</p>
                    <p>Last Name: {ownerInfo.familyname}</p>
                    <p>Phone: {ownerInfo.phone}</p>
                  </div>
                )}
              </div>
              <div className="col-md-6">
                <div id="pictures">
                  <div className="row">
                  <div className="col-sm">
                  {userPets.map((pet) => (
                   
                      <div className="pet-box">
                        <h4>{pet.name}</h4>
                        <p>Species: {pet.species}</p>
                        <p>Date of Birth: {pet.dateofbirth}</p>
                        <Link to={`/PetCard/${userInfo.id}/${pet.id}`} className="pet-link" key={pet.id}>
                        <img src={pet.photo} alt="pet photo" width={200} />
                        </Link>
                        <div className="buttons">
                        <button
                            className="btn btn-info"
                            onClick={() => {
                              navigate(`/NewHealthRecordPage/${userInfo.id}/${pet.id}`);
                            }}
                          >
                            New health record
                          </button>
                         
                          <button
                            className="btn btn-info"
                            onClick={() => {
                              navigate(`/MakeAppointment/${ownerInfo.email}`);
                            }}
                          >
                            Make an appointment
                          </button>
                        </div>
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


export default DoctorsPage;