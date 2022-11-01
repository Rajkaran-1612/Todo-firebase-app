import React, { useEffect, useState } from "react";
import { Table, Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { todoDataService } from "../services/crudFirestore";
import './TodoList.css';

function TodoListAdmin() {
    const [todos, setTodos] = useState([]);
    const navigate = useNavigate();
  
    useEffect(() => {
      getTodos();
    }, []);
  
    const getTodos= async () => {
      const data = await todoDataService.getAllTodos();
      console.log(data.docs);
      setTodos(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
    };

    function back () {
        navigate('/admin-panel');
    }

    return (
      <>
        <div className="mb-2">
          <Button variant="dark edit" onClick={getTodos}>
            Refresh List
          </Button>
          <Button variant="primary edit" onClick={back}>
            View Users
          </Button>
        </div>
  
        {/* <pre>{JSON.stringify(books, undefined, 2)}</pre>} */}
        <Table striped bordered hover size="sm">
          <thead>
            <tr>
              <th>Todo ID</th>
              <th>Task Name</th>
              <th>Status</th>
              <th>User Id</th>
            </tr>
          </thead>
          <tbody>
            {todos.map((doc) => {
              return (
                <tr key={doc.id}>
                  <td>{doc.todoid}</td>
                  <td>{doc.taskname}</td>
                  <td>{doc.status}</td>
                  <td>{doc.userid}</td>
                </tr>
              );
            })}
          </tbody>
        </Table>
      </>
    );
}

export default TodoListAdmin
