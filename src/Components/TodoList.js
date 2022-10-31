import React, { useEffect, useState } from "react";
import { Table, Button } from "react-bootstrap";
import { todoDataService } from "../services/crudFirestore";
import { useAuth } from "../Context/AuthContext"
import './TodoList.css';

const TodoList = ({ getTodoId }) => {
  const [todos, setTodos] = useState([]);
  const { currentUser } = useAuth();

  useEffect(() => {
    getTodos();
  }, []);

  const getTodos= async () => {
    const data = await todoDataService.getAllTodos();
    console.log(data.docs);
    setTodos(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
  };

  const deleteHandler = async (id) => {
    await todoDataService.deleteTodo(id);
    getTodos();
  };
  return (
    <>
      <div className="mb-2">
        <Button variant="dark edit" onClick={getTodos}>
          Refresh List
        </Button>
      </div>

      {/* <pre>{JSON.stringify(books, undefined, 2)}</pre>} */}
      <Table striped bordered hover size="sm">
        <thead>
          <tr>
            <th>Todo ID</th>
            <th>Task Name</th>
            <th>Status</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {todos.map((doc) => {
            if(doc.userid === currentUser.uid)
            return (
              <tr key={doc.id}>
                <td>{doc.todoid}</td>
                <td>{doc.taskname}</td>
                <td>{doc.status}</td>
                <td>
                <div className="d-flex">
                  <Button
                    variant="secondary"
                    className="edit"
                    onClick={(e) => getTodoId(doc.id)}
                  >
                    Edit
                  </Button>
                  <Button
                    variant="danger"
                    className="delete"
                    onClick={(e) => deleteHandler(doc.id)}
                  >
                    Delete
                  </Button>
                  </div>
                </td>
              </tr>
            );
          })}
        </tbody>
      </Table>
    </>
  );
};

export default TodoList;