import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import styles from "./AddPet.module.css";
function AddPet() {
  const navigate = useNavigate();
  const { email } = useParams();

  // Function to handle the form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    const name = document.getElementById("name").value;
    const species = document.getElementById("species").value;
    const dateOfBirth = document.getElementById("dateOfBirth").value;
    const photo = document.getElementById("photo").files[0];

    const formData = new FormData();
    formData.append("email", email);
    formData.append("name", name);
    formData.append("species", species);
    formData.append("dateOfBirth", dateOfBirth);
    formData.append("photo", photo);

    // Send a POST request to the server to update the pet data
    await fetch("http://localhost:3000/Pets/AddPet", {
      method: "POST",
      body: formData,
    });

    navigate(-1);
  };

  const handleBackButtonClick = () => {

    navigate(-1);

  };


  return (
    <div className={styles.container}>
      <h1>Add Pet</h1>

      <form onSubmit={handleSubmit}>
        <div className={styles["form-group"]}>
          <label htmlFor="name">Name:</label>
          <input type="text" id="name" />
        </div>
        <div className={styles["form-group"]}>
          <label htmlFor="species">Species:</label>
          <input type="text" id="species" />
        </div>
        <div className={styles["form-group"]}>
          <label htmlFor="dateOfBirth">Date of Birth:</label>
          <input type="date" id="dateOfBirth" />
        </div>
        <div className={styles["form-group"]}>
          <label htmlFor="photo">Photo:</label>
          <input type="file" id="photo" accept="image/*" />
        </div>
        <button type="submit" className={styles["submit-button"]}>Save Changes</button>
        <button
          type="button"
          className={styles["back-button"]}
          onClick={handleBackButtonClick}
        >
          Back
        </button>
      </form>

    </div>
  );
}

export default AddPet;
