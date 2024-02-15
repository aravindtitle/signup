import classes from "./AuthForm.module.css";
import { useState } from "react";
import axios from "axios";
import Loader, { Puff } from "react-loader-spinner";

const AuthForm = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const switchAuthModeHandler = () => {
    setIsLogin((prevState) => !prevState);
    setError(null);
  };

  const authHandler = async (event) => {
    event.preventDefault();
    setIsLoading(true);
    setError(null);

    const email = event.target.email.value;
    const password = event.target.password.value;
    const apiKey = "AIzaSyBcXjluDcYtbgf0o_kQFK191r5n3BlAwak";

    let url;
    if (isLogin) {
      url = `https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${apiKey}`;
    } else {
      url = `https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=${apiKey}`;
    }

    try {
      const response = await axios.post(url, {
        email,
        password,
        returnSecureToken: true,
      });

      console.log(response.data);

      // Check if login failed
      if (response.data.error) {
        setError(response.data.error.message);
      } else {
        // Login successful, log the JWT token (idToken)
        console.log("JWT Token:", response.data.idToken);
        // You can redirect the user to another page or show a success message
      }
    } catch (error) {
      console.error(error);
      setError("Authentication failed. Please try again.");
    }

    setIsLoading(false);
  };

  return (
    <section className={classes.auth}>
      <h1>{isLogin ? "Login" : "Sign Up"}</h1>
      <form onSubmit={authHandler}>
        <div className={classes.control}>
          <label htmlFor="email">Your Email</label>
          <input type="email" id="email" required />
        </div>
        <div className={classes.control}>
          <label htmlFor="password">Your Password</label>
          <input type="password" id="password" required />
        </div>
        <div className={classes.actions}>
          {isLoading ? (
            <Puff type="Puff" color="#00BFFF" height={50} width={50} />
          ) : (
            <button type="submit">{isLogin ? "Login" : "Sign Up"}</button>
          )}
          <button
            type="button"
            className={classes.toggle}
            onClick={switchAuthModeHandler}
          >
            {isLogin ? "Create new account" : "Login with existing account"}
          </button>
        </div>
      </form>
      {error && <p>{error}</p>}
    </section>
  );
};

export default AuthForm;
