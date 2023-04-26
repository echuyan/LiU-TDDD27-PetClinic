import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

function SignUp() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  // Functionality after pushing submit
  const handleSubmit = (e) => {
    e.preventDefault();

    alert(
      "User created."
    );
    navigate("/");
    window.location.reload();
    const myData = { email, password };
    console.log("email:");
    console.log(email);
    // Sending userdata through a POST request to server
    fetch("http://localhost:3000/SignUp", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(myData),
    }).then(() => {});
  };

  return (
    <form
      style={{ textAlign: "center" }}
      action="/action_page.php"
      onSubmit={handleSubmit}
    >
      <h1>Register</h1>
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
              // value={email}
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
              // value={password}
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
