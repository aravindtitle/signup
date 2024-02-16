import classes from "./AuthForm.module.css";
import { useState } from "react";
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "firebase/auth";
import Loader, { Puff } from "react-loader-spinner";
import app from "../firebaseConfig";

const AuthForm = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const auth = getAuth(app);

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

    try {
      if (isLogin) {
        await signInWithEmailAndPassword(auth, email, password);
        console.log("Signed in successfully");
      } else {
        await createUserWithEmailAndPassword(auth, email, password);
        console.log("Signed up successfully");
      }
    } catch (error) {
      console.error(error);
      setError(error.message);
    }

    setIsLoading(false);
  };

  return (
    <section>
      <h1>{isLogin ? "Login" : "Sign Up"}</h1>
      <form onSubmit={authHandler}>
        <div>
          <label htmlFor="email">Your Email</label>
          <input type="email" id="email" required />
        </div>
        <div>
          <label htmlFor="password">Your Password</label>
          <input type="password" id="password" required />
        </div>
        <div>
          {isLoading ? (
            <Puff type="Puff" color="#00BFFF" height={50} width={50} />
          ) : (
            <button type="submit">{isLogin ? "Login" : "Sign Up"}</button>
          )}
          <button type="button" onClick={switchAuthModeHandler}>
            {isLogin ? "Create new account" : "Login with existing account"}
          </button>
        </div>
      </form>
      {error && <p>{error}</p>}
    </section>
  );
};

export default AuthForm;
