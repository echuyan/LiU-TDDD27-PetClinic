import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";

function ChangePet() {
  const navigate = useNavigate();
  const { petId } = useParams();
  const [petData, setPetData] = useState(null);
  
  // Fetch pet data using petId
  useEffect(() => {
    const fetchPetData = async () => {
      const response = await fetch(`http://localhost:3000/Pets/GetPet/${petId}`);
      const petData = await response.json();
      setPetData(petData);
    };
    
    fetchPetData();
  }, [petId]);

  // Function to handle the form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    // Update the pet data with the submitted values
    // Submit the updated pet data to the server
    // ...

    // After the update is successful, navigate back to the owner's page
    navigate("/OwnersPage");
  };

  // Render the form to change pet details
  return (
    <div>
      <h1>Change Pet</h1>
      {petData && (
        <form onSubmit={handleSubmit}>
          <label htmlFor="name">Name:</label>
          <input type="text" id="name" defaultValue={petData.name} />

          <label htmlFor="species">Species:</label>
          <input type="text" id="species" defaultValue={petData.species} />

          <label htmlFor="dateOfBirth">Date of Birth:</label>
          <input type="date" id="dateOfBirth" defaultValue={petData.dateOfBirth} />

          <button type="submit">Save Changes</button>
        </form>
      )}
    </div>
  );
}

export default ChangePet;
