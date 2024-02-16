import React from "react";
import { createRoot } from "react-dom/client";

import { BrowserRouter as Router } from "react-router-dom"; // or HashRouter
import { AuthProvider } from "./Components/AuthContext";

import App from "./App";

createRoot(document.getElementById("root")).render(<App />);
