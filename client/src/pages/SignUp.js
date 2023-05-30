import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

function SignUp() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();


  const handleSubmit = async (e) => {
    e.preventDefault();
    const firstname = document.getElementById("firstname").value;
    const familyname = document.getElementById("familyname").value;
    
    const myData = {
      email: email,
      password: password,
      firstname: firstname,
      familyname: familyname
    };
    try {
      const response = await fetch("http://localhost:3000/SignUp", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(myData),
      });

      if (response.ok) {
       
        alert("User created successfully.");
        navigate("/");
        window.location.reload();
      } 
      else {
        const errorData = await response.json();
        
        if (response.status === 409) {
          alert("User already exists");
        } else {
          alert("An error occurred");
        }
        console.error('Error creating user:', errorData.error);
      }
    } catch (error) {
      alert("An error occurred");
      console.error('Error creating user:', error);
    } 
   

  };

  return (
    <form
      style={{ textAlign: "center" }}
      action="/action_page.php"
      onSubmit={handleSubmit}
    >
      <h1>Register a new pet owner</h1>
      <div className="form-group r">
        <div className="row d-flex justify-content-center">
          <label>First name</label>
        </div>
        <div className="row d-flex justify-content-center">
          <div className="col-4 d-flex justify-content-center">
            <input type="text" className="form-control" placeholder="Enter first name"  id="firstname" />
          </div>
        </div>
      </div>
      <div className="form-group r">
        <div className="row d-flex justify-content-center">
          <label>Family name</label>
        </div>
        <div className="row d-flex justify-content-center">
          <div className="col-4 d-flex justify-content-center">
            <input type="text" className="form-control" placeholder="Enter family name" id="familyname" />
          </div>
        </div>
      </div>
      <div className="form-group r">
        <div className="row d-flex justify-content-center">
          <label>Email</label>
        </div>
        <div className="row d-flex justify-content-center">
          <div className="col-4 d-flex justify-content-center">
            <input
              type="email"
              className="form-control"
              placeholder="Enter email"
              onChange={(e) => setEmail(e.target.value)}
              id="email"
            />
          </div>
        </div>
      </div>
      <div className="form-group ">
        <div className="row row d-flex justify-content-center">
          <label>Password</label>
        </div>
        <div className="row row d-flex justify-content-center">
          <div className="col-4" style={{ textAlign: "center" }}>
            <input
              type="password"
              className="form-control"
              placeholder="Enter password"
              onChange={(e) => setPassword(e.target.value)}
              id="pwd"
            />
          </div>
        </div>
      </div>

      <button type="submit" className="btn btn-primary">
        Register
      </button>
    </form>
  );
}

export default SignUp;
