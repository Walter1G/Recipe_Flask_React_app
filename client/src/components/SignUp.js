import React, { useState } from "react";
import { Form, Button, Alert } from "react-bootstrap";
import { Link } from "react-router-dom";
import { useForm } from "react-hook-form";

const SignUp = () => {
  // const [username, setUsername] = useState("");
  // const [email, setEmail] = useState("");
  // const [password, setPassword] = useState("");
  // const [confirmPassword, setConfirmPassword] = useState("");
  const [show, setShow] = useState(true);
  const [serverRes, setServerRes] = useState("");

  const {
    register,
    watch,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();

  const submitForm = (data) => {
    if (data.password === data.confirmPassword) {
      const body = {
        username: data.username,
        email: data.email,
        password: data.password,
      };

      const requestOptions = {
        method: "POST",
        headers: {
          "content-type": "application/json",
        },
        body: JSON.stringify(body),
      };

      fetch("/auth/signup", requestOptions)
        .then((response) => {
          return response.json();
        })
        .then((data) => {
          console.log("data", data);
          setServerRes(data.message);
          console.log(serverRes);
          setShow(true);
          reset();
        })
        .catch((err) => console.log(err));
    } else {
      alert("Passwords do not match");
    }
  };

  return (
    <div className="container">
      <div className="form">
        {show ? (
          <>
            <Alert variant="success" onClose={() => setShow(false)} dismissible>
              <p>{serverRes}</p>
            </Alert>

            <h1>Sign Up </h1>
          </>
        ) : (
          <h1>Sign Up </h1>
        )}

        <form>
          <Form.Group>
            <Form.Label>User Name</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter UserName"
              {...register("username", { required: true, maxLength: 25 })}
            />

            {errors.username && (
              <p style={{ color: "red" }}>
                <small>Username is Required</small>
              </p>
            )}

            {errors.username?.type === "maxLength" && (
              <p style={{ color: "red" }}>
                <small>Max character should be 25</small>
              </p>
            )}
          </Form.Group>
          <br></br>

          <Form.Group>
            <Form.Label>Email</Form.Label>
            <Form.Control
              type="email"
              placeholder="Enter your Email"
              {...register("email", { required: true, maxLength: 80 })}
            />

            {errors.email && (
              <p style={{ color: "red" }}>
                <small>Email is Required</small>
              </p>
            )}

            {errors.email?.type === "maxLength" && (
              <p style={{ color: "red" }}>
                <small>Max character should be 80</small>
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

            {errors.password && (
              <p style={{ color: "red" }}>
                <small>Password is Required</small>
              </p>
            )}
            {errors.password?.type === "minLength" && (
              <p style={{ color: "red" }}>
                <small>Password should be at least 8 characters</small>
              </p>
            )}
          </Form.Group>
          <br></br>
          <Form.Group>
            <Form.Label>Confirm Password</Form.Label>
            <Form.Control
              type="password"
              placeholder="Confirm Password"
              {...register("confirmPassword", { required: true, minLength: 8 })}
            />

            {errors.confirmPassword && (
              <p style={{ color: "red" }}>
                <small>Please Confirm Password</small>
              </p>
            )}

            {errors.confirmPassword?.type === "minLength" && (
              <p style={{ color: "red" }}>
                <small>password should have at least 8 characters</small>
              </p>
            )}
          </Form.Group>
          <br></br>
          <Form.Group>
            <Button
              as="sub"
              variant="primary"
              onClick={handleSubmit(submitForm)}
            >
              Sign Up
            </Button>
          </Form.Group>
          <br></br>
          <Form.Group>
            <small>
              Already have an account? <Link to="/login">Log In</Link>
            </small>
          </Form.Group>
        </form>
      </div>
    </div>
  );
};

export default SignUp;
