import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import styles from "./ChangeInfo.module.css"; 

function ChangeInfo() {
  const navigate = useNavigate();
  const { email } = useParams();
  const [userInfo, setUserInfo] = useState();
  
  // Fetch pet data using petId
  useEffect(() => {
    const fetchUserData = async () => {
      const response = await fetch(`http://localhost:3000/Users/GetUserByEmail/${email}`);
      const userData = await response.json();
     

      setUserInfo(userData.user);
    };
    
    fetchUserData();
  }, [email]);

  // Function to handle the form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    const firstname = document.getElementById("firstname").value;
    const familyname = document.getElementById("familyname").value;
   
    const photo = document.getElementById("photo").files[0];

    const formData = new FormData();
     formData.append("email", email);
     formData.append("firstname", firstname);
     formData.append("familyname", familyname);
     formData.append("photo", photo); 
    
      // Send a POST request to the server to update the pet data
      await fetch("http://localhost:3000/Users/UpdateUser", {
        method: "POST",
        body: formData, // Send the form data with the file
      });
    
    navigate("/OwnersPage");
  };

  const handleBackButtonClick = () => {
  
      navigate(-1);
  
  };

  // Render the form to change pet details
  return (
    <div className={styles.container}>
      <h1>Change User Information</h1>
      {userInfo && (
        <form onSubmit={handleSubmit}>
        <div className={styles["form-group"]}>
          <label htmlFor="firstname">Name:</label>
          <input type="text" id="firstname" defaultValue={userInfo.firstname} />
        </div>
        <div className={styles["form-group"]}>
          <label htmlFor="familyname">Last name:</label>
          <input type="text" id="familyname" defaultValue={userInfo.familyname} />
          </div>
          <div className={styles["form-group"]}>
          <label htmlFor="photo">Photo:</label>
          <img src={userInfo.photo}  alt="pet photo" width={200}/>
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

export default ChangeInfo;
