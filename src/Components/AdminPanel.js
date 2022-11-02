import React, { useEffect, useState } from "react";
import { Table, Button } from "react-bootstrap";
import userDataService from "../services/crudFirestore";
import { useNavigate } from 'react-router-dom';
import { useAuth } from "../Context/AuthContext"
import './TodoList.css';

function AdminPanel() {
  const [users, setUsers] = useState([]);
  const { logout } = useAuth()
  const navigate = useNavigate()

  useEffect(() => {
    getUsers();
  }, []);

  const getUsers= async () => {
    const data = await userDataService.getAllUsers();
    console.log(data.docs);
    setUsers(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
  };

  function navigater () {
    navigate('/admin-panel-c-user')
  }

  function todoLister () {
    navigate('/todo-list-admin')
  }

  async function handleLogout() {

    try {
      await logout()
      navigate("/admin-login")
    } catch {

    }
  }

  return (
    <>
      <div className="mb-2 d-flex">
        <Button variant="dark edit" onClick={getUsers}>
          Refresh List
        </Button>
        <Button variant="primary edit" onClick={navigater}>
          Create User
        </Button>
        <Button variant="primary edit" onClick={todoLister}>
          View Todos
        </Button>
        <Button variant="dark edit" onClick={handleLogout}>
         Logout
        </Button>
      </div>

      {/* <pre>{JSON.stringify(books, undefined, 2)}</pre>} */}
      <Table striped bordered hover size="sm">
        <thead>
          <tr>
            <th>Username</th>
            <th>User email</th>
            <th>User Contact</th>
          </tr>
        </thead>
        <tbody>
          {users.map((doc) => {
            return (
              <tr key={doc.id}>
                <td>{doc.name}</td>
                <td>{doc.email}</td>
                <td>{doc.contact}</td>
              </tr>
            );
          })}
        </tbody>
      </Table>
    </>
  )
}

export default AdminPanel
