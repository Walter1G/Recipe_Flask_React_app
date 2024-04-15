import React, { useState } from "react";
import { Form, Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import {useForm} from 'react-hook-form'

const SignUp = () => {
  // const [username, setUsername] = useState("");
  // const [email, setEmail] = useState("");
  // const [password, setPassword] = useState("");
  // const [confirmPassword, setConfirmPassword] = useState("");

  const { register, watch, handleSubmit, formState: { errors }, reset } = useForm();

  const submitForm = (data) => {
    console.log(data);
    reset()
  

  };

  console.log(watch("username"))
  console.log(watch("email"))
  console.log(watch("password"))
  console.log(watch("confirmPassword"))

  return (
    <div className="container">
      <div className="form">
        <h1>Sign Up Page</h1>
        <form>
          <Form.Group>
            <Form.Label>User Name</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter UserName"
            {...register('username',{required:true,maxLength:25})}
            />
             <br></br>
            {errors.username && <span style={{ color: "red" }}>Username is Required</span>}
            <br></br>
            {errors.username?.type=="maxLength"&&<span style={{ color: "red" }}>Max character should be 25</span>}
          </Form.Group>
          
          <br></br>
          <Form.Group>
            <Form.Label>Email</Form.Label>
            <Form.Control
              type="email"
              placeholder="Enter your Email"
             {...register("email",{required:true,maxLength:80})}
            />
            <br></br>
            {errors.email && <span style={{ color: "red" }}>Email is Required</span>}
            <br></br>
            {errors.email?.type=="maxLength"&&<span style={{ color: "red" }}>Max character should be 80</span>}
          </Form.Group>
         
          <br></br>
          <Form.Group>
            <Form.Label>Password</Form.Label>
            <Form.Control
              type="password"
              placeholder="Enter password"
             {...register("password",{required:true,minLength:8})}
            />
            <br></br>
            {errors.password && <span style={{color:"red"}}>Password is Required</span>} <br></br>
            {errors.password?.type=="minLength"&&<span style={{ color: "red" }}>Password should be at least 8 characters</span>}
          </Form.Group>
          <br></br>
          <Form.Group>
            <Form.Label>Confirm Password</Form.Label>
            <Form.Control
              type="password"
              placeholder="Confirm Password"
              {...register("confirmPassword",{required:true,minLength:8})}
            />
            <br></br>
            {errors.confirmPassword && <span style={{ color: "red" }}>Please Confirm Password</span>}
            <br></br>
            {errors.confirmPassword?.type=="minLength"&&<span style={{ color: "red" }}>password should have at least 8 characters</span>}
          </Form.Group>
          <br></br>
          <Form.Group>
            <Button as="sub" variant="primary" onClick={handleSubmit(submitForm)}>
              Sign Up
            </Button>
          </Form.Group>
          <br></br>
          <Form.Group>
            <small>Already have an account? <Link to='/login'>Log In</Link></small>
          </Form.Group>
        </form>
      </div>
    </div>
  );
};

export default SignUp;
