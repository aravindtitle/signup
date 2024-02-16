import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Layout from "./Components/Layout/Layout";
import AuthPage from "./pages/AuthPage";
import HomePage from "./pages/HomePage";
import UserProfile from "./Components/Profile/UserProfile";
import { initializeApp } from "firebase/app";
import firebaseConfig from "./Components/firebaseConfig";
import ChangePasswordPage from "./pages/ChangePassword";

function App() {
  return (
    <Router>
      <Layout>
        <Switch>
          <Route path="/" exact>
            <HomePage />
          </Route>
          <Route path="/auth">
            <AuthPage />
          </Route>
          <Route path="/profile">
            <UserProfile />
          </Route>
          <Route path="/change-password">
            {" "}
            {/* Add a route for the change password page */}
            <ChangePasswordPage />
          </Route>
        </Switch>
      </Layout>
    </Router>
  );
}

export default App;
