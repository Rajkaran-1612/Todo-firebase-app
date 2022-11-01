import React, { useState, useRef } from "react";
import { Button, Card, Alert, Form } from "react-bootstrap";
import userDataService from "../services/crudFirestore";
import { useAuth } from "../Context/AuthContext";
import { useNavigate } from 'react-router-dom';

function AdminPanelCreateUser() {
  const emailRef = useRef()
  const passwordRef = useRef()
  const passwordConfirmRef = useRef()
  const nameRef = useRef()
  const telRef = useRef()
  const { signup } = useAuth()
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const navigate = useNavigate()
  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [contact, setContact] = useState("")

  async function handleSubmit(e) {
    e.preventDefault()

    if (passwordRef.current.value !== passwordConfirmRef.current.value) {
      return setError('Passwords do not match!')
    }

    const newUser = {
      name,
      email,
      contact
    };

    await userDataService.addUser(newUser);

    try {
      setError('')
      setLoading(true)
      await signup(emailRef.current.value, passwordRef.current.value)
      navigate('/admin-panel')
    } catch {
      setError('Failed to create an account!')
    }

    setLoading(false)

    setName("");
    setEmail("");
    setContact("");

  }

  return (
    <>
      <Card className='mt-3'>
        <Card.Body>
            <h2 className='text-center mb-4'>Create New User</h2>
            {error && <Alert variant='danger'>{error}</Alert>}
            <Form onSubmit={handleSubmit}>
                <Form.Group id="name">
                    <Form.Label>Name</Form.Label>
                    <Form.Control type='text' value={name} onChange={(e) => setName(e.target.value)} ref={nameRef} required />
                </Form.Group>
                <Form.Group id="email">
                    <Form.Label>Email</Form.Label>
                    <Form.Control type='email' value={email} onChange={(e) => setEmail(e.target.value)} ref={emailRef} required />
                </Form.Group>
                <Form.Group id="contact">
                    <Form.Label>Contact Number</Form.Label>
                    <Form.Control type='tel' value={contact} onChange={(e) => setContact(e.target.value)} ref={telRef} required />
                </Form.Group>
                <Form.Group id="password">
                    <Form.Label>Password</Form.Label>
                    <Form.Control type='password' ref={passwordRef} required />
                </Form.Group>
                <Form.Group id="password-confirm">
                    <Form.Label>Confirm Password</Form.Label>
                    <Form.Control type='password' ref={passwordConfirmRef} required />
                </Form.Group>
                <Button disabled={loading} className='w-100 mt-4' type='submit'>Create User</Button>
            </Form>
        </Card.Body>
      </Card>
    </>
  )
}

export default AdminPanelCreateUser
