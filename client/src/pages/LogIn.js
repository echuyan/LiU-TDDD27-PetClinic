import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

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
          sessionStorage.setItem("firstname", data.firstname);
          sessionStorage.setItem("familyname", data.familyname);
          sessionStorage.setItem("phone", data.phone);
          sessionStorage.setItem("email", data.email);
          sessionStorage.setItem("email", data.email);
          
          switch (data.role) {
            case 1:
              sessionStorage.setItem("mainpage", "/AdminsPage");
              navigate("/AdminsPage", {
                state: {
                  id: data.email,
                },
              });
              break;
            case 2:
              sessionStorage.setItem("mainpage", "/OwnersPage");
              navigate("/OwnersPage", {
                state: {
                  id: data.email,

                },
              });
              break;
            case 3:
              sessionStorage.setItem("mainpage", "/DoctorsPage");
              navigate("/DoctorsPage", {
                state: {
                  id: data.email,
                },
              });
              break;
            default:
              navigate("/", {
                state: {
                  id: data.email,
                },
              });
          }

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
    <form className="d-flex-col justify-content-center align-items-center mx-5"
      style={{ textAlign: "center" }}
      action="/action_page.php"
      onSubmit={(e) => handleSubmit(e)}
    >
      <h1 style={{ textAlign: "left" }}>Login</h1>
      <div className="form-group ">
        <div className=" mx-1" style={{ textAlign: "left" }} className="row d-flex ">
          <label>Email</label>
        </div>
        <div className="row " >
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
        <div className=" mx-1" style={{ textAlign: "left" }} className="row row d-flex ">
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
      <div style={{ textAlign: "left" }}>
        <button type="submit" className="btn btn-primary">
          Login
        </button>
      </div>
    </form>
  );
};

export default LogIn;
