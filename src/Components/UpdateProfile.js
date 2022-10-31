import React, { useEffect, useRef, useState } from 'react'
import { Form, Button, Card, Alert } from "react-bootstrap";
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from "../Context/AuthContext";
import userDataService from "../services/crudFirestore"; 

function UpdateProfile( { id, setUserId } ) {
  const emailRef = useRef()
  const passwordRef = useRef()
  const passwordConfirmRef = useRef()
  const nameRef = useRef()
  const telRef = useRef()
  const { currentUser } = useAuth()
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const navigate = useNavigate()
  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [contact, setContact] = useState("")


  async function submitHandler(e) {

    e.preventDefault()

    const newUser = {
        name,
        email,
        contact
    };

    await userDataService.updateUser(id, newUser);
    setUserId("")
    alert("Updated the profile!");
    navigate('/')
  }

  const editHandler = async () => {
    setError("");
    try {
      const docSnap = await userDataService.getUser(id);
      console.log("the record is :", docSnap.data());
      setName(docSnap.data().name);
      setEmail(docSnap.data().email);
      setContact(docSnap.data().contact);
    } catch (err) {
      setError(err.message);
    }
  };

  useEffect(() => {
    if (id !== undefined && id !== "") {
        editHandler();
    }
  }, [id])

  return (
    <>
      <Card className='mt-3'>
        <Card.Body>
            <h2 className='text-center mb-4'>Update Profile</h2>
            {error && <Alert variant='danger'>{error}</Alert>}
            <Form onSubmit={submitHandler}>
                <Form.Group id="name">
                    <Form.Label>Name</Form.Label>
                    <Form.Control type='text' value={name} onChange={(e) => setName(e.target.value)} ref={nameRef} placeholder='Leave blank to keep the same' />
                </Form.Group>
                <Form.Group id="email">
                    <Form.Label>Email</Form.Label> 
                    <Form.Control type='email' onChange={(e) => setEmail(e.target.value)} ref={emailRef} required defaultValue={currentUser.email} placeholder={currentUser.email} disabled />
                </Form.Group>
                <Form.Group id="contact">
                    <Form.Label>Contact Number</Form.Label>
                    <Form.Control type='tel' value={contact} onChange={(e) => setContact(e.target.value)} ref={telRef} placeholder='Leave blank to keep the same' />
                </Form.Group>
                <Form.Group id="password">
                    <Form.Label>Password</Form.Label>
                    <Form.Control type='password' ref={passwordRef} placeholder='Leave blank to keep the same' />
                </Form.Group>
                <Form.Group id="password-confirm">
                    <Form.Label>Confirm Password</Form.Label>
                    <Form.Control type='password' ref={passwordConfirmRef} placeholder='Leave blank to keep the same' />
                </Form.Group>
                <Button disabled={loading} className='w-100 mt-4' type='submit'>Update</Button>
            </Form>
        </Card.Body>
      </Card>
      <div className='w-100 text-center mt-2 mb-3'>
        <Link to="/">Cancel</Link>
      </div>
    </>
  )
}

export default UpdateProfile
