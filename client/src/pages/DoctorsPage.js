import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

// Creates the homepage of the application
function DoctorsPage() {
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [userInfo, setUserInfo] = useState();
  const [searchQuery, setSearchQuery] = useState("");
  const [ownerInfo, setOwnerInfo] = useState(null);
  const [userPets, setUserPets] = useState([]);

  // search owner
  const searchPetOwner = async () => {
    try {
      console.log(searchQuery);
      const response = await fetch(
        `http://localhost:3000/Users/GetUserByEmail/${searchQuery}`
      );

      if (response.ok) {
        const data = await response.json();
        setOwnerInfo(data.user);
        console.log(ownerInfo);
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
  };

  // get doctor's info
  const fetchUserData = async () => {
    console.log(
      JSON.stringify({
        username: sessionStorage.getItem("email"),
      })
    );

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

  useEffect(() => {
    setUsername(sessionStorage.getItem("email"));
    fetchUserData();
  }, []);

  // Returns user profile if the user is logged in.
  if (sessionStorage.getItem("token")) {
    return (
      <div id="globaldiv">
        <div id="background">
          <div id="userprofile">
            <img src="" alt="User Profile" width={400} />
            <p>Hello, Doctor {userInfo && userInfo.firstname}</p>
            <p></p>
          </div>
          <div id="myschedule">
            <p>Your schedule</p>
            <p>for this week</p>
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
                        <div className="pet-box" key={pet.id}>
                          <h4>{pet.name}</h4>
                          <p>Species: {pet.species}</p>
                          <p>Date of Birth: {pet.dateofbirth}</p>
                          <img
                            src={pet.photo}
                            alt="pet photo"
                            width={200}
                          />
                          <div className="buttons">
                            <button className="btn btn-info">
                              New Health Record
                            </button>
                            <button className="btn btn-info">
                              Make an Appointment
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
