import React from 'react'
import { Form,Button } from 'react-bootstrap';

import { useState } from 'react';
import { Link } from 'react-router-dom';


const LogIn = () => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')


  const loginUser = () => {
    console.log(username, password)

    setUsername('')
    setPassword('')
  }

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
              value={username}
              name="username"
              onChange={(e) => {
                setUsername(e.target.value);
              }}
            />
          </Form.Group>
          <br></br>
          
          <Form.Group>
            <Form.Label>Password</Form.Label>
            <Form.Control
              type="password"
              placeholder="Enter password"
              value={password}
              name="password"
              onChange={(e) => {
                setPassword(e.target.value);
              }}
            />
          </Form.Group>
         
          <br></br>
          <Form.Group>
            <Button as="sub" variant="primary" onClick={loginUser}>
             Log In
            </Button>
            </Form.Group>
            <br>
            </br>
            <Form.Group>
              <small>Don't have an account? <Link to='/signup'>Create One</Link></small>
            </Form.Group>
        </form>
      </div>
    </div>
    </>
  )
}

export default LogIn