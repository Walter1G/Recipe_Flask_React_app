import React from "react";
import Container from "react-bootstrap/Container";
import { Link } from "react-router-dom";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";

const NavBar = () => {
  return (
    <>
      <nav class="navbar navbar-expand-lg bg-dark  bg-body-tertiary" data-bs-theme="dark">
        <div class="container-fluid">
          <Link class="navbar-brand" to="/">
            Recipes 
          </Link>
          <button
            class="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarNav"
            aria-controls="navbarNav"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span class="navbar-toggler-icon"></span>
          </button>
          <div class="collapse navbar-collapse" id="navbarNav">
            <ul class="navbar-nav">
              <li class="nav-item">
                <Link class="nav-link active" aria-current="page" to="/">
                  Home
                </Link>
              </li>
              <li class="nav-item">
                <Link class="nav-link active" to="/create-recipe">
                  Create Recipe
                </Link>
              </li>
              <li class="nav-item">
                <Link class="nav-link active" to="/signup">
                  Sign Up
                </Link>
              </li>
              <li class="nav-item">
                <Link class="nav-link active" to="/login">
                  LogIn
                </Link>
              </li>
              <li class="nav-item">
                <Link class="nav-link active" to="/logout">
                  Log Out
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </>
  );
};

export default NavBar;
