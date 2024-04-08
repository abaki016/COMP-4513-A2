import React, { useState } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import Login from "./components/Login.jsx";
import Home from "./Home.jsx"; // Import the Home component

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const navigate = useNavigate();

  const handleLogin = () => {
    // Simulate successful login
    console.log("Simulating successful login...");
    // Set isLoggedIn to true
    setIsLoggedIn(true);
    // Navigate to Home view after successful login
    navigate("/home");
  };

  return (
    <div>
      <Routes>
        <Route
          path="/"
          element={<Login onLogin={handleLogin} />}
        />
        <Route
          path="/home/*"
          element={isLoggedIn ? <Home /> : <Navigate to="/" replace />}
        />
      </Routes>
    </div>
  );
}

export default App;