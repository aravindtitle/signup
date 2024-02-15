import classes from "./AuthForm.module.css";
import { Puff } from "react-loader-spinner";
import { useState } from "react";
import axios from "axios";

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
    const apiKey = "YOUR_API_KEY"; // Replace with your Firebase API key

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

      // Show success message to the user or redirect to another page
    } catch (error) {
      console.error(error.response.data.error.message);
      setError(error.response.data.error.message);
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
