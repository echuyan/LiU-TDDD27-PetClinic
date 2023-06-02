import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";

function OwnersPage() {

  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [userInfo, setUserInfo] = useState();
  const [userPets, setUserPets] = useState([]);
  const [appointments, setAppointments] = useState([]);
  const [doctorsData, setDoctorsData] = useState([]);

  // get user info
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
  };


  const fetchUserPets = async () => {

    

    const userPetsData = await fetch(`http://localhost:3000/Users/GetPets`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        username: sessionStorage.getItem("email"),
      }),
    }).then((response) => response.json());

  
    setUserPets(userPetsData.pets);
  };

  const fetchAppointments = async () => {
    const username = sessionStorage.getItem("email");
    
    const response = await fetch(`http://localhost:3000/Pets/GetAppointments/${username}`);
    const appoints = await response.json();
    
    setAppointments(appoints.appoints);

  };

  const fetchDoctors = async () => {
    try {
      const response = await fetch('http://localhost:3000/Users/GetAllDoctors');
      const data = await response.json();
      setDoctorsData(data);
    } catch (error) {
      console.error('Error fetching doctors data:', error);
    }
  };


  useEffect(() => {
    setUsername(sessionStorage.getItem("email"));
    fetchUserData();
    fetchUserPets();
    fetchAppointments();
    fetchDoctors();
    setUsername(sessionStorage.getItem("email"));
  }, []);

  useEffect(() => {
    
  }, [doctorsData]);


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
                      <img src={userInfo.photo} alt="User Profile" width={300} />
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
                        <div className="pet-box" key={pet?.id}>
                          <h4>{pet.name}</h4>
                          <p>Species: {pet.species}</p>
                          <p>Date of Birth: {pet.dateofbirth}</p>
                          <Link to={`/PetCard/${userInfo.id}/${pet.id}`} className="pet-link" key={pet.id}>
                        <img src={pet.photo} alt="pet photo" width={200} />
                        </Link>
                          <button
                            className="btn btn-primary btn-sm button"
                            onClick={() => {
                              navigate(`/ChangePet/${pet.id}`);
                            }}
                          >
                            Change Pet
                          </button>
                          {}
                          <h4>Appointments:</h4>
                          {appointments
                            .filter((appointment) => appointment.pet_id === pet.id)
                            .map((appointment) => {
                              const doctor = doctorsData.find((doctor) => doctor.id === appointment.doctor_id);
                              return (
                                <div key={appointment.id}>
                                  <p>{appointment.startdate} - {appointment.enddate}, {doctor ? doctor.firstname : 'Unknown'}</p>
                                </div>
                              );
                            })}
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
