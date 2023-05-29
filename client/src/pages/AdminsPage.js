import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";

// Creates the homepage of the application
function AdminsPage() {

  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [userInfo, setUserInfo] = useState();
  const [userPets, setUserPets] = useState([]);
 
  const [doctorsData, setDoctorsData] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [ownerInfo, setOwnerInfo] = useState(null);


  // get owner info
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

  


  // search owner
  const searchPetOwner = async () => {
    try {
      console.log(searchQuery);
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

        console.log(typeof userPetsData);
        console.log(userPetsData);
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

  //useEffect hook
  useEffect(() => {
    setUsername(sessionStorage.getItem("email"));
    setSearchQuery(sessionStorage.getItem("currentsearchedowner"));
    fetchUserData();

  
    
    setUsername(sessionStorage.getItem("email"));
  }, []);

  useEffect(() => {
    console.log("DOCTORS:", doctorsData);
  }, [doctorsData]);


  if (sessionStorage.getItem("token")) {
    return (
      <div id="globaldiv">
        <div id="background">
          <h3 id="Welcome-header">Admin interface. </h3>
          <h3 id="Welcome-header">Grant access to new users.</h3>

          <button className="btn btn-info" onClick={() => {
            navigate(`/AddUser/`);
          }}>
            Add a new user
          </button>

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
                    <button className="btn btn-info" onClick={() => {
                      navigate(`/AddPet/${ownerInfo.email}`);
                    }}>
                      Add a new pet
                    </button>
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
                          <Link to={`/PetCard/${pet.id}`} className="pet-link" key={pet.id}>
                            <img src={pet.photo} alt="pet photo" width={200} />
                          </Link>
                          <div className="buttons">


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

export default AdminsPage;
