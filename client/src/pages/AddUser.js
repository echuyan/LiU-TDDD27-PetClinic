import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import styles from "./AddUser.module.css";
const length = 8;

function generateRandomPassword(length) {
  const charset = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*()-_=+[{]}\|;:,<.>/?';
  let password = '';

  for (let i = 0; i < length; i++) {
    const randomIndex = Math.floor(Math.random() * charset.length);
    password += charset[randomIndex];
  }

  return password;
}

function AddUser() {
  const navigate = useNavigate();
  const { email } = useParams();
  const [role, setRole] = useState('');
  const [specialization, setSpecialization] = useState('');
  const [showSpecialization, setShowSpecialization] = useState(false);

  // Function to handle the form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    const firstname = document.getElementById("firstname").value;
    const familyname = document.getElementById("familyname").value;
    const email = document.getElementById("email").value;
    const photo = document.getElementById("photo").files[0];
    const role = document.getElementById("role").value;
    if (role == "Doctor") {
      const specialization = document.getElementById("specialization").value;
    }
    else {
      const specialization = null;
    }
    const phone = document.getElementById("phone").value;
    const password = generateRandomPassword(length);

    const formData = new FormData();
    formData.append("email", email);
    formData.append("firstname", firstname);
    formData.append("familyname", familyname);
    formData.append("specialization", specialization);
    formData.append("photo", photo);
    formData.append("phone", phone);
    formData.append("role", role);
    formData.append("password", password);

    // Send a POST request to the server to update the pet data
    try {
      const response = await fetch("http://localhost:3000/Users/AddUser", {
        method: "POST",
        body: formData,
      });

      if (response.ok) {
        alert("Your password: " + password);
      } else {
        console.error("Error occurred while making the API call:");
        alert("Error occured. Try again.");
      }

    } catch (error) {
      console.error("Error occurred while making the API call:", error);
      alert("Error occured. Try again.");

    }

    navigate(-1);
  };

  const handleBackButtonClick = () => {

    navigate(-1);

  };

  const handleRoleChange = (event) => {
    setRole(event.target.value);
    if (event.target.value === 'Doctor') {
      setShowSpecialization(true);
    } else {
      setShowSpecialization(false);
    }
  };

  const handleSpecializationChange = (event) => {
    setSpecialization(event.target.value);
  };




  return (
    <div className={styles.container}>
      <h1>Add User</h1>
      <form onSubmit={handleSubmit}>
        <div className={styles["form-group"]}>
          <label htmlFor="firstname">First Name:</label>
          <input type="text" id="firstname" />
        </div>
        <div className={styles["form-group"]}>
          <label htmlFor="familyname">Family Name:</label>
          <input type="text" id="familyname" />
        </div>
        <div className={styles["form-group"]}>
          <label htmlFor="email">Email:</label>
          <input type="email" id="email" />
        </div>
        <div className={styles["form-group"]}>
          <label htmlFor="phone">Phone:</label>
          <input type="phone" id="phone" />
        </div>
        <div className={styles["form-group"]}>
          <label htmlFor="role">Role:</label>
          <select id="role" value={role} onChange={handleRoleChange}>

            <option value="Pet Owner">Pet Owner</option>
            <option value="Doctor">Doctor</option>
          </select>
        </div>
        {showSpecialization && (
          <div className={styles["form-group"]}>
            <label htmlFor="specialization">Doctor's Specialization:</label>
            <input
              type="text"
              id="specialization"
              value={specialization}
              onChange={handleSpecializationChange}
            />
          </div>
        )}

        <div className={styles["form-group"]}>
          <label htmlFor="photo">Photo:</label>
          <input type="file" id="photo" accept="image/*" />
        </div>

        <button type="submit" className={styles["submit-button"]}>
          Save Changes
        </button>
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

export default AddUser;
