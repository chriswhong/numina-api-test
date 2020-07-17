import React, { useState } from 'react'

import Main from './Main'
import LoginForm from './LoginForm'

import 'bootstrap/dist/css/bootstrap.min.css'
import './App.scss'

const App = () => {
  const [token, setToken] = useState(localStorage.getItem('token'))

  const handleLoginSuccess = () => {
    setToken(localStorage.getItem('token'))
  }

  // content is either the login screen or the Main component
  let content = <LoginForm onSuccess={handleLoginSuccess}/>

  if (token) {
    content = <Main setToken={setToken}/>
  }

  return (
    <div className='App'>
      {content}
    </div>
  )
}

export default App
