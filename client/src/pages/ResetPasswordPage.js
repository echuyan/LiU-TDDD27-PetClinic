import React, { useState } from "react";

const ResetPasswordPage = () => {
  const [newPassword, setNewPassword] = useState("");
  const [repeatPassword, setRepeatPassword] = useState("");
  const [resetError, setResetError] = useState("");

  const handleReset = (e) => {
    e.preventDefault();

    if (newPassword !== repeatPassword) {
      setResetError("Passwords do not match.");
      return;
    }

    const urlParams = new URLSearchParams(window.location.search);
    const token = urlParams.get("token");

    const requestBody = {
      token: token,
      password: newPassword
    };

    fetch("/reset-password", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(requestBody)
    })
      .then(response => response.json())
      .then(data => {
        if (data.message) {
          alert(data.message);
        } else {
          setResetError("Password reset failed. Please try again.");
        }
      })
      .catch(error => {
        console.error("Error resetting password:", error);
        setResetError("An error occurred. Please try again later.");
      });
  };

  return (
    <div>
      <h1>Password Reset</h1>
      <form onSubmit={handleReset}>
        <label htmlFor="newPassword">New Password:</label>
        <input
          type="password"
          id="newPassword"
          value={newPassword}
          onChange={(e) => setNewPassword(e.target.value)}
          required
        /><br />
        <label htmlFor="repeatPassword">Repeat New Password:</label>
        <input
          type="password"
          id="repeatPassword"
          value={repeatPassword}
          onChange={(e) => setRepeatPassword(e.target.value)}
          required
        /><br />
        <button type="submit">Reset Password</button>
      </form>
      {resetError && <p>{resetError}</p>}
    </div>
  );
};

export default ResetPasswordPage;
