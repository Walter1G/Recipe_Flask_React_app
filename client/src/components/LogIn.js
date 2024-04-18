import React from "react";
import { Form, Button } from "react-bootstrap";

// import { useState } from "react";
import { Link } from "react-router-dom";
import { useForm } from "react-hook-form";
import { login } from "../auth";
import { useNavigate } from "react-router-dom";
const LogIn = () => {
  const {
    register,
    handleSubmit,
    watch,
    reset,
    formState: { errors },
  } = useForm();

  const navigate = useNavigate();

  console.log(watch("username"));
  console.log(watch("password"));

  const loginUser = (data) => {
    console.log(data);

    const requestOptions = {
      method: "POST",
      headers: {
        "content-type": "application/json",
        accept: "application/json",
      },
      body: JSON.stringify(data),
    };

    // fetch("/auth/login", requestOptions)
    //   .then((r) => r.json())
    //   .then((data) => {
    //     // console.log(data);
    //     login(data.access_token);
    //     navigate("/");
    //   })
    //   .catch((error) => {
    //     console.log(error);
    //   });
    (async () => {
      try {
        const response = await fetch("/auth/login", requestOptions);
        if (!response.ok) {
          throw new Error("Failed to login");
        }
        const data = await response.json();
        console.log(data);
        login(data.access_token);
        navigate("/");
      } catch (error) {
        console.error(error);
      }
    })();

    reset();
  };

  return (
    <>
      <div className="container">
        <div className="form">
          <h1>Log In</h1>
          <form>
            <Form.Group>
              <Form.Label>User Name</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter UserName"
                {...register("username", { required: true, maxLength: 25 })}
              />

              {errors.username?.type === "required" && (
                <p style={{ color: "red" }}>
                  <small>Username is required</small>
                </p>
              )}
              {errors.username?.type === "maxLength" && (
                <p
                  style={{
                    color: "red",
                  }}
                >
                  <small>Username cannot exceed 25 characters</small>
                </p>
              )}
            </Form.Group>
            <br></br>

            <Form.Group>
              <Form.Label>Password</Form.Label>
              <Form.Control
                type="password"
                placeholder="Enter password"
                {...register("password", { required: true, minLength: 8 })}
              />
              {errors.password?.type === "required" && (
                <p style={{ color: "red" }}>
                  <small>Password is required</small>
                </p>
              )}
              {errors.password?.type === "minLength" && (
                <p style={{ color: "red" }}>
                  <small>Password must be at least 8 Characters</small>
                </p>
              )}
            </Form.Group>

            <br></br>
            <Form.Group>
              <Button
                as="sub"
                variant="primary"
                onClick={handleSubmit(loginUser)}
              >
                Log In
              </Button>
            </Form.Group>
            <br></br>
            <Form.Group>
              <small>
                Don't have an account? <Link to="/signup">Create One</Link>
              </small>
            </Form.Group>
          </form>
        </div>
      </div>
    </>
  );
};

export default LogIn;
