import React, { useRef, useState } from 'react'
import { Form, Button, Card, Alert } from "react-bootstrap";
import { useAuth } from "../Context/AuthContext";
import { Link, useNavigate } from 'react-router-dom';

function AdminLogin() {
  const emailRef = useRef()
  const passwordRef = useRef()
  const { login } = useAuth()
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const navigate = useNavigate()

  async function handleSubmit(e) {
    e.preventDefault()

    try {
      setError('')
      setLoading(true)
      if(emailRef.current.value === "test@test.com" && passwordRef.current.value === "pass@123") {
        await login(emailRef.current.value, passwordRef.current.value)
        navigate('/admin-panel')
      } else {
        setError('Failed to sign in!')
      }
    } catch {
      setError('Failed to sign in!')
    }

    setLoading(false)

  }

  return (
    <>
      <Card>
        <Card.Body>
            <h2 className='text-center mb-4'>Admin Log In</h2>
            {error && <Alert variant='danger'>{error}</Alert>}
            <Form onSubmit={handleSubmit}>
                <Form.Group id="email">
                    <Form.Label>Email</Form.Label>
                    <Form.Control type='email' ref={emailRef} required />
                </Form.Group>
                <Form.Group id="password">
                    <Form.Label>Password</Form.Label>
                    <Form.Control type='password' ref={passwordRef} required />
                </Form.Group>
                <Button disabled={loading} className='w-100 mt-4' type='submit'>Sign In</Button>
            </Form>
            <div className="w-100 text-center mt-3">
            <Link to="/forgot-password">Forgot Password?</Link>
          </div>
        </Card.Body>
      </Card>
      <div className='w-100 text-center mt-2'>
        Need an account? <Link to="/signup">Sign Up</Link>
      </div>
      <div className='w-100 text-center mt-3'>
        <Link to="/login">Login as User</Link>
      </div>
      
    </>
  )
}

export default AdminLogin
