import React, { useState } from 'react'
import PropTypes from 'prop-types'
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'

import { login } from './actions'

function LoginForm ({ onSuccess }) {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')

  const handleChange = (e) => {
    const { name, value } = e.target
    if (name === 'email') {
      setEmail(value)
    }

    if (name === 'password') {
      setPassword(value)
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      await login(email, password)
      // trigger reload of app if login was successful
      onSuccess()
    } catch (e) {
      setError(e.message)
    }
  }

  return (
    <div id='login'>
      <header>
        <img src='https://numina.co/wp-content/themes/neve-child/images/numina_logo_mark_color.svg' alt='Numina' />

        {!error && (<div className='py-5 prompt-text'>Login using your Numina GraphQL API Credentials</div>)}
        {error && (<div className='mt-5 my-4 alert alert-warning'>{error}, please try again</div>)}
        <div style={{ width: '18rem', margin: '0 auto' }}>
          <Form onSubmit={handleSubmit}>
            <Form.Group controlId='formBasicEmail'>
              <Form.Label>Email address</Form.Label>
              <Form.Control type='email' placeholder='Enter email' name='email' value={email} onChange={handleChange}/>
            </Form.Group>

            <Form.Group controlId='formBasicPassword'>
              <Form.Label>Password</Form.Label>
              <Form.Control type='password' placeholder='Password' name='password' value={password} onChange={handleChange} />
            </Form.Group>
            <Button variant='primary' type='submit'>
            Submit
            </Button>
          </Form>
        </div>
      </header>
    </div>
  )
}

LoginForm.propTypes = {
  onSuccess: PropTypes.func
}

export default LoginForm
