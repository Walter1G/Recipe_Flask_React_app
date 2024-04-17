import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../auth";
import Recipe from "./Recipe";
import { Modal } from "react-bootstrap";
import { Button } from "react-bootstrap";
import { useForm } from "react-hook-form";
import { Form } from "react-bootstrap";
import {useNavigate} from 'react-router-dom'

const LoggedInHome = () => {
  const [recipes, setRecipes] = useState([]);
  const [show, setShow] = useState(false);
  const { register, handleSubmit, reset,setValue, formState:{errors} } = useForm();
const [recipeId, setRecipeId]=useState()
  const { user } = useAuth(0);

 
  

  const closeModal = () => {
    setShow(false)
  }

  const showModal = (recipe) => {
    console.log(recipe);
    setShow(true)
    setRecipeId(recipe.id)
    setValue("title", recipe.title)
    setValue("description", recipe.description)
    

  }

  const updateRecipe = (data) => {
    console.log(data);
    console.log(recipeId);
    let token = localStorage.getItem("REACT_TOKEN_AUTH_KEY")
    

    const requestOptions = {
      method: "PUT",
      headers: {
        "content-type": "application/json",
        "Authorization": `Bearer ${JSON.parse(token)}`
      },
      body: JSON.stringify(data)
    }

    fetch(`/recipes/recipe/${recipeId}`, requestOptions)
      .then(r => r.json())
      .then(data => {
        console.log(data)
        reset()
        const reload = window.location.reload()
        reload()
      })
    .catch(err=>console.log(err))

  }

  useEffect(() => {
    fetch("/recipes/recipes")
      .then((r) => r.json())
      .then((data) => {
        setRecipes(data);
      })
      .catch((err) => console.log(err));
  }, []);

  return (
    <>
      <div className="recipes container">
        <Modal show={show} size='lg' onHide={closeModal}>

          <Modal.Header closeButton>
            <Modal.Title>
              Update Recipe
            </Modal.Title>
            </Modal.Header>
            <Modal.Body>
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
      <br></br>
        <Form.Group>
          <Button variant="primary" onClick={handleSubmit(updateRecipe)} >
            Save
          </Button>
              </Form.Group>
              </form>
            </Modal.Body>

         

        </Modal>

        <h1>List of Recipes</h1>
        {recipes.map((recipe,i) => {
          return (
            <Recipe
              key={i}
              title={recipe.title}
              description={recipe.description}
              onClick={()=>showModal(recipe)}
            />
          );
        })}
      </div>
    </>
  );
};

const LoggedOutHome = () => {
  return (
    <div className="home container">
      <h1 className="heading">Welcome to the Recipe World</h1>
      <Link to="/signup" className="btn btn-primary btn-lg">
        Get Started
      </Link>
    </div>
  );
};

const HomePage = () => {
  const [logged] = useAuth();
  return <div>{logged ? <LoggedInHome /> : <LoggedOutHome />}</div>;
};

export default HomePage;
