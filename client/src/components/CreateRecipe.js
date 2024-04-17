import React from "react";
import { Form, Button } from "react-bootstrap";
import { useForm } from "react-hook-form";
import { useEffect, useState } from "react";
const CreateRecipe = () => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const token=localStorage.getItem("REACT_TOKEN_AUTH_KEY");

  

  const createRecipe = (data) => {
    console.log(data);
    const requestOptions = {
      method: "POST",
      headers: {
        "content-type": "application/json",
        "Authorization":  `Bearer ${JSON.parse(token)}`
      },
      body:JSON.stringify(data)
      
      
    }

    fetch('/recipes/recipes', requestOptions)
      .then(res => res.json())
      .then(data => {
        reset()
      })
    .catch(err=>console.log(err))
  };
  return (
    <div className="container">
      <h3>Create A Recipe</h3>
      <form>
        <Form.Group>
          <Form.Label>Title</Form.Label>
          <Form.Control
            type="text"
            placeholder="Recipe Title"
            {...register("title", { required: true, maxLength: 25 })}
          />

          {errors.title?.type === "required" && (
            <p style={{ color: "red" }}>
              <small>Title is required</small>
            </p>
          )}

          {
            errors.title?.type==="maxLength" && <p style={{color:"red"}}><small>Title should not exceed 25 character</small></p>
          }
        </Form.Group>
        {/* <br> </br> */}
        <Form.Group>
          <Form.Label>description</Form.Label>
          <Form.Control
            type="text"
            as="textarea"
            rows={5}
            placeholder="Enter Description"
            {...register("description", {
              required: true,
              maxLength: 255,
              minLength: 20,
            })}
          />

          {
            errors.description?.type === "required" &&
            <p style={{color:"red"}}><small>Please enter description</small></p>
          }

          
{
            errors.description?.type === "minLength" &&
            <p style={{color:"red"}}><small>Description should be more than 20 character</small></p>
          }

          
{
            errors.description?.type === "maxLength" &&
            <p style={{color:"red"}}><small>Description should be less than 255 characters</small></p>
          }
        </Form.Group>
        {/* <br></br> */}
        <Form.Group>
          <Button variant="primary" onClick={handleSubmit(createRecipe)} >
            Save
          </Button>
        </Form.Group>
      </form>
    </div>
  );
};

export default CreateRecipe;