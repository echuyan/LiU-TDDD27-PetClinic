import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

// Creates a logIn component and a login view
export const LogIn = (props) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();


  // Sends the userdata through a POST request to the server
  // and receiving a token from server which is added to sessionStorage
  const handleSubmit = (e) => {
    e.preventDefault();
    const myData = { email, password };
    fetch("http://localhost:3000/LogIn", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(myData),
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.auth) {
          sessionStorage.setItem("token", data.token);
          sessionStorage.setItem("email", data.email);
         
          navigate("/", {
            state: {
              id: data.email,
            },
          });
          window.location.reload();
        } else if (!data.auth) {
          alert("Wrong password try again.");
        }
      })
      .catch((error) => {
        alert("error: " + error);
      });
  };

  return (
    <form  class="d-flex-col justify-content-center align-items-center mx-5"
    style={{ textAlign: "center" }}
      action="/action_page.php"
      onSubmit={(e) => handleSubmit(e)}
    >
      <h1  style={{ textAlign: "left" }}>Login</h1>
      <div    className="form-group ">
        <div class=" mx-1" style={{ textAlign: "left" }} className="row d-flex ">
          <label>Email</label>
        </div>
        <div  className="row " >
          <div className="col-4 d-flex ">
            <input 
              type="email"
              className="form-control"
              placeholder="Enter email"
              onChange={(e) => setEmail(e.target.value)}
              id="email"
              style={{ textAlign: "left" }}
            />
          </div>
        </div>
      </div>
      <div className="form-group ">
        <div class=" mx-1" style={{ textAlign: "left" }} className="row row d-flex ">
          <label>Password</label>
        </div>
        <div className="row ">
          <div className="col-4" style={{ textAlign: "left" }}>
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
      <div  style={{ textAlign: "left" }}>
      <button  type="submit" className="btn btn-primary">
        Login
      </button> 
      </div>
    </form>
  );
};

export default LogIn;
