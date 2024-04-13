import "bootstrap/dist/css/bootstrap.min.css";
import React from "react";
import { createRoot } from "react-dom/client";
import NavBar from "./components/Navbar";
// import ReactDom from 'react-dom'
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import HomePage from "./components/HomePage";
import SignUp from "./components/SignUp";
import LogIn from "./components/LogIn";
import CreateRecipe from "./components/CreateRecipe";
import LogOut from "./components/LogOut";

const App = () => {
  return (
    <Router>
      <div className="container">
        <NavBar />
        <Routes>
          <Route path="/create-recipe" element={<CreateRecipe />} />
          <Route path="/logout" element={<LogOut />} />
          <Route path="/login" element={<LogIn />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/" element={<HomePage />} />
        </Routes>
      </div>
    </Router>
  );
};

const root = createRoot(document.getElementById("root"));
root.render(<App />);
