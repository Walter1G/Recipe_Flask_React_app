import React,{useEffect,useState} from 'react'
import { Link } from 'react-router-dom'
import { useAuth } from '../auth'
import Recipe from './Recipe'

const LoggedInHome = () => {
  const [recipes, setRecipes] = useState([])
  
  useEffect(() => {
    fetch('/recipes/recipes')
      .then(r => r.json())
      .then(data => {
      setRecipes(data)
      })
    .catch(err=>console.log(err))
  },[])


  return (
    <>
      <div className='recipes'>
        <h1>List of Recipes</h1>
        {
          recipes.map(recipe => {
            return <Recipe key={recipe.id} title={recipe.title} description={recipe.description}/>
          })
        }
      </div>
    </>
  )
}

const LoggedOutHome = () => {
  return (
    <div className='home container'>
      <h1 className='heading'>Welcome to the Recipe World</h1>
      <Link to='/signup'  className='btn btn-primary btn-lg'>Get Started</Link>
    </div>
  )
}

const HomePage = () => {
  const[logged] = useAuth()
  return (
  <div>
    {
      logged?<LoggedInHome /> : <LoggedOutHome />

      }
      </div>
  )
}

export default HomePage