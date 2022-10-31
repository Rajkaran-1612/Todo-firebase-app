import React, { useEffect, useState } from "react"
import { Card, Button, Alert } from "react-bootstrap"
import { useAuth } from "../Context/AuthContext"
import { Link, useNavigate } from "react-router-dom"
import userDataService from "../services/crudFirestore"; 

export default function Dashboard( { getUserId } ) {
  const [error, setError] = useState("")
  const [photoURL, setphotoURL] = useState("https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png")
  const { currentUser, logout } = useAuth()
  const navigate = useNavigate()

  const [users, setUsers] = useState([]);
  useEffect(() => {
    getUsers();
  }, []);

  const getUsers = async () => {
    const data = await userDataService.getAllUsers();
    setUsers(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
  };

  async function handleLogout() {
    setError("")

    try {
      await logout()
      navigate("/login")
    } catch {
      setError("Failed to log out")
    }
  }

  useEffect(() => {
    if(currentUser?.photoURL) {
      setphotoURL(currentUser.photoURL);
    }
  }, [currentUser])

  return (
    <>
      <Card>
        <Card.Body>
        <h2 className="text-center mb-4">Profile</h2>
        {error && <Alert variant="danger">{error}</Alert>}
          { users.map((doc, index) => {
            if(doc.email === currentUser.email) {
              return (
                <>
                <img src={photoURL} alt="Profile" className="img-fluid rounded-circle" />
                <strong>Name:</strong> {doc.name} <br />
                <strong>Email:</strong> {doc.email} <br />
                <strong>Contact:</strong> {doc.contact} <br />
                <Link to="/update-profile" onClick={(e) => getUserId(doc.id)} className="btn btn-primary w-100 mt-3">
                  Update Profile
                </Link>
                <Link to="/add-todo" className="btn btn-primary w-100 mt-3">
                  Check My Todos
                </Link>
                </>
              )
            }
            }) }  
        </Card.Body>
      </Card>
      <div className="w-100 text-center mt-2">
        <Button variant="link" onClick={handleLogout}>
          Log Out
        </Button>
      </div>
    </>
  )
}