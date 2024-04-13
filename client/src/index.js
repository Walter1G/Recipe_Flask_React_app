import React, { useState, useEffect } from 'react'
import {createRoot} from 'react-dom/client'
// import ReactDom from 'react-dom'

const App = () => {
    const [message, setMessage] = useState('')
    
    useEffect(() => {
        fetch('recipes/hello')
            .then(response => response.json())
            .then(data => {
                console.log(data.message)
                setMessage(data.message)
            })
        
    }, [])

    return (
        <div className='container'>
            <h1>{message} </h1>
            
        </div>
    )
}

const root = createRoot(document.getElementById('root'))
root.render(<App/>)

