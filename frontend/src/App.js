import React, { useState } from 'react';
import "../node_modules/bootstrap/dist/css/bootstrap.min.css";
import {
  BrowserRouter as Router,
  Routes,
  Route,
} from "react-router-dom";
// import LoginScreen from "./Component/LoginScreen";
import LoginScreen from "./Component/Loginscreen";
import Dashboard from "./Component/Dashboard";
import SideBar from './Component/SideBar';
import Logout from './Component/Logout';
import User from './Component/Users'
function App() {
  const token = localStorage.getItem("token");

  const [loggedIn, setLoggedIn] = useState(false);
  const handleLogin = () => {
    setLoggedIn(true);
  };
  return (
    <Router>
      {!token ? (
        <LoginScreen onLogin={handleLogin} />
      ) : (
        <SideBar>
          <Routes>

            <Route path="/" element={<Dashboard />} />
            <Route path='/Logout' element={<Logout />} />
            <Route path='/Users' element={<User />} />
          </Routes>
        </SideBar>
      )}
    </Router>
  );
}

export default App;