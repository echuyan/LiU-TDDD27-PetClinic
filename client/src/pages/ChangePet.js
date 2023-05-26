import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import styles from "./ChangePet.module.css"; 
function ChangePet() {
  const navigate = useNavigate();
  const { petId } = useParams();
  const [petData, setPetData] = useState();
  
  // Fetch pet data using petId
  useEffect(() => {
    const fetchPetData = async () => {
      const response = await fetch(`http://localhost:3000/Pets/GetPet/${petId}`);
      const petData = await response.json();
     

      setPetData(petData.pet);
    };
    
    fetchPetData();
  }, [petId]);

  // Function to handle the form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    const name = document.getElementById("name").value;
    const species = document.getElementById("species").value;
    const dateOfBirth = document.getElementById("dateOfBirth").value;
    const photo = document.getElementById("photo").files[0];

    const formData = new FormData();
     formData.append("petId", petId);
     formData.append("name", name);
     formData.append("species", species);
     formData.append("dateOfBirth", dateOfBirth);
     formData.append("photo", photo); 
    
      // Send a POST request to the server to update the pet data
      await fetch("http://localhost:3000/Pets/UpdatePet", {
        method: "POST",
        body: formData, // Send the form data with the file
      });
    
    navigate("/OwnersPage");
  };

  const handleBackButtonClick = () => {
    navigate("/OwnersPage");
  };

  // Render the form to change pet details
  return (
    <div className={styles.container}>
      <h1>Change Pet</h1>
      {petData && (
        <form onSubmit={handleSubmit}>
        <div className={styles["form-group"]}>
          <label htmlFor="name">Name:</label>
          <input type="text" id="name" defaultValue={petData.name} />
        </div>
        <div className={styles["form-group"]}>
          <label htmlFor="species">Species:</label>
          <input type="text" id="species" defaultValue={petData.species} />
          </div>
          <div className={styles["form-group"]}>
          <label htmlFor="dateOfBirth">Date of Birth:</label>
          <input type="date" id="dateOfBirth"defaultValue={petData.dateofbirth}/>
          </div>
          <div className={styles["form-group"]}>
          <label htmlFor="photo">Photo:</label>
          <img src={petData.photo}  alt="pet photo" width={200}/>
          <input type="file" id="photo" accept="image/*" />
          </div>
          <button type="submit"  className={styles["submit-button"]}>Save Changes</button>
          <button
              type="button"
              className={styles["back-button"]}
              onClick={handleBackButtonClick}
            >
              Back
            </button>
        </form>
      )}
    </div>
  );
}

export default ChangePet;
