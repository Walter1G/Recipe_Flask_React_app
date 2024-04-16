import React from 'react'

const Recipe = ({title,description}) => {
  return (
      <div className='recipe'>
          <h1>{title}</h1>
          <p>{description}</p>
    </div>
  )
}

export default Recipe