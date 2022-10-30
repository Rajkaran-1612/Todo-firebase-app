import React, { useState } from 'react'
import { Form, Button, Card } from "react-bootstrap";
import { upload } from '../firebase';
import { useAuth } from "../Context/AuthContext";
import { useNavigate } from 'react-router-dom';

function ProfilePic() {
    const [loading, setLoading] = useState(false)
    const [photo, setPhoto] = useState(null)
    const { currentUser } = useAuth()
    const navigate = useNavigate()

    function handleChange(e) {
        if(e.target.files[0]) {
          setPhoto(e.target.files[0])
        }
    }

    function handleClick() {
        upload(photo, currentUser, setLoading);
        navigate('/')
    }

    function handleSkip() {
        navigate('/')
    }

    return (
      <>
      <Card className='mt-3'>
        <Card.Body>
            <h2 className='text-center mb-4'>Change Profile Pic</h2>
            <Form>
            <Form.Group id="profile-pic">
                    <Form.Label>Profile Picture</Form.Label>
                    <Form.Control type='file' onChange={handleChange} />
                </Form.Group>
                <Form.Group id="profile-pic" className='d-flex justify-content-around'>
                  <Button disabled={loading || !photo} onClick={handleClick} className='w-40 mt-3'>Upload</Button>
                  <Button onClick={handleSkip} className='w-40 mt-3'>Skip</Button>
                </Form.Group>  
                </Form>
        </Card.Body>
      </Card>
    </>
  )
}

export default ProfilePic
