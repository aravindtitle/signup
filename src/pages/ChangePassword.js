import React, { useState } from "react";
import axios from "axios";

const ChangePasswordPage = () => {
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const handleChangePassword = async (e) => {
    e.preventDefault();

    // Send POST request to Firebase Auth API to change password
    try {
      const response = await axios.post(
        "https://identitytoolkit.googleapis.com/v1/accounts:update?key=AIzaSyDll9GLS_DagY9AKtLdE1skrN0MHQgsw5A",
        {
          idToken: "user_id_token", // Replace 'user_id_token' with the actual user's ID token
          password: newPassword,
          returnSecureToken: true,
        }
      );

      // Display success message
      setSuccessMessage("Password changed successfully");
      setErrorMessage("");
    } catch (error) {
      // Handle error
      setErrorMessage("Failed to change password. Please try again.");
      setSuccessMessage("");
    }
  };

  const handleTestLogin = async () => {
    // Attempt to login using old token
    try {
      // Send login request with old token
      // If successful, the token is still valid
      // If unsuccessful, the token is invalid
    } catch (error) {
      // Show alert for invalid token
      alert(
        "Your session has expired. Please log in again with your new password."
      );
    }
  };

  return (
    <div>
      <h1>Change Password</h1>
      <form onSubmit={handleChangePassword}>
        <div>
          <label htmlFor="currentPassword">Current Password</label>
          <input
            type="password"
            id="currentPassword"
            value={currentPassword}
            onChange={(e) => setCurrentPassword(e.target.value)}
          />
        </div>
        <div>
          <label htmlFor="newPassword">New Password</label>
          <input
            type="password"
            id="newPassword"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
          />
        </div>
        <button type="submit">Change Password</button>
      </form>
      {successMessage && <p>{successMessage}</p>}
      {errorMessage && <p>{errorMessage}</p>}
      <button onClick={handleTestLogin}>Test Login with Old Token</button>
    </div>
  );
};

export default ChangePasswordPage;
