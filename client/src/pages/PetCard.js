import React, { useEffect, useState} from "react";
import { useNavigate, useParams } from "react-router-dom";


// Creates the homepage of the application
function PetCard() {
  const navigate = useNavigate();
  const { doctorId,petId } = useParams();
  const [ownerInfo, setOwnerInfo] = useState(null);
  const [petInfo, setPetInfo] = useState();
  const [appointments, setAppointments] = useState([]);
  const [healthRecords, sethealthRecords] = useState([]);
 

  // search owner
  const searchPetOwner = async () => {
    try {
      
      const response = await fetch(
        `http://localhost:3000/Users/GetUserByPetId/${petId}`
      );

      if (response.ok) {
        const data = await response.json();
        setOwnerInfo(data.user);
      } else {
        setOwnerInfo(null);
        console.error("Failed to fetch pet owner information");
      }
    } catch (error) {
      setOwnerInfo(null);
      console.error("Error fetching pet owner information:", error);
    }
  };

  //search pet
  const fetchPet = async () => {

    try {
      
        const response = await fetch(
          `http://localhost:3000/Pets/GetPet/${petId}`
        );
  
        if (response.ok) {
          const data = await response.json();
          setPetInfo(data.pet);
        } else {
          setPetInfo(null);
          console.error("Failed to fetch pet information");
        }
      } catch (error) {
        setPetInfo(null);
        console.error("Error fetching pet  information:", error);
      }
  };

  // get appointment schedule for this pet
  const fetchAppointments = async () => {
    try {
      const response = await fetch(
        `http://localhost:3000/Pets/GetAppointmentsForAPet/${petId}`
      );
      if (response.ok) {
        const data = await response.json();
        setAppointments(data.appoints);
      } else {
        console.error("Failed to fetch appointments");
      }
    } catch (error) {
      console.error("Error fetching appointments:", error);
    }
  };

    // get pet's health records
    const fetchHealthRecords = async () => {
        try {
          const response = await fetch(
            `http://localhost:3000/Pets/GetHealthRecordsForAPet/${petId}`
          );
          if (response.ok) {
            const data = await response.json();
            sethealthRecords(data.HRs);
          } else {
            console.error("Failed to fetch health records");
          }
        } catch (error) {
          console.error("Error fetching health records:", error);
        }
      };

  useEffect(() => {
   console.log("doctorId");
   console.log(doctorId);
   
    searchPetOwner();
    fetchPet();
    fetchAppointments();
    fetchHealthRecords();
  }, [petId]);

  const goBack = () => {
    navigate(-1);
  };
    return (
      <div id="globaldiv">
       

        <div className="container" style={{ marginTop: "30px" }}>
          <div className="main-body">
            <div className="row">
              <div className="col-md-6">
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
                            {petInfo && (
                            <div className="pet-box">
                                <h4>{petInfo.name}</h4>
                                <p>Species: {petInfo.species}</p>
                                <p>Date of Birth: {petInfo.dateofbirth}</p>
                                <img src={petInfo.photo} alt="pet photo" width={200} />
                                <div className="buttons">
                                {typeof doctorId !== 'undefined' && (
                                    <button
                                      className="btn btn-info"
                                      onClick={() => {
                                        navigate(`/NewHealthRecordPage/${doctorId}/${petInfo.id}`);
                                      }}
                                    >
                                      New health record
                                    </button>
                                  )}
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
                            )}
                            
                            <h4>Appointments:</h4>
                            {appointments.map((appointment) => (
                            <div key={appointment.id}>
                                <p>
                                {appointment.startdate} - {appointment.enddate}
                                </p>
                            </div>
                            ))}

                            <h4>Health Records:</h4>
                            {healthRecords.map((record) => (
                            <div key={record.id}>
                                <p>
                                <u>Date:</u> {record.date} - <u>Record:</u> {record.record}
                                </p>
                            </div>
                            ))}
                        </div>
                        </div>
                    </div>
                    </div>

            </div>
            <button className="btn btn-primary" onClick={goBack}>
            Back
          </button>
          </div>
        </div>
      </div>
    );
  }


export default PetCard;
