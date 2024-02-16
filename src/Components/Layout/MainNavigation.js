import { Link } from "react-router-dom";
import { useAuth } from "../AuthContext";

import classes from "./MainNavigation.module.css";

const MainNavigation = () => {
  const { logout } = useAuth(); // Get the logout function from the authentication context

  const handleLogout = () => {
    console.log("Logging out...");
    console.log(logout); // Check if logout function is defined
    logout(); // Call the logout function when the logout button is clicked
  };

  return (
    <header className={classes.header}>
      <Link to="/">
        <div className={classes.logo}>React Auth</div>
      </Link>
      <nav>
        <ul>
          <li>
            <Link to="/auth">Login</Link>
          </li>
          <li>
            <Link to="/profile">Profile</Link>
          </li>
          <li>
            <button onClick={handleLogout}>Logout</button>{" "}
            {/* Call handleLogout when logout button is clicked */}
          </li>
        </ul>
      </nav>
    </header>
  );
};

export default MainNavigation;
