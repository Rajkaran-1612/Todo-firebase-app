import React, { useRef, useState, useEffect } from 'react'
import { Form, Button, Alert, InputGroup, ButtonGroup } from "react-bootstrap";
import { useAuth } from "../Context/AuthContext"
import { todoDataService } from '../services/crudFirestore';


export default function AddTodo({ id, setTodoId }) {

    const nameRef = useRef()
    const idRef = useRef()
    const [todoid, setTodoid] = useState();
    const [taskname, setTaskname] = useState("");
    const [status, setStatus] = useState("Completed");
    const [flag, setFlag] = useState(true);
    const [message, setMessage] = useState({ error: false, msg: "" });
    const { currentUser } = useAuth()
    const userid = currentUser.uid;

    const handleSubmit = async (e) => {
        e.preventDefault();
        setMessage("");

        const newTodo = {
          todoid,
          taskname,
          status,
          userid
        };
        console.log(newTodo);
    
        try {
          if (id !== undefined && id !== "") {
            await todoDataService.updateTodo(id, newTodo);
            setTodoId("");
            setMessage({ error: false, msg: "Updated successfully!" });
          } else {
            await todoDataService.addTodo(newTodo);
            setMessage({ error: false, msg: "New Todo added successfully!" });
          }
        } catch (err) {
          setMessage({ error: true, msg: err.message });
        }
    
        setTodoid("");
        setTaskname("");
      };
    
      const editHandler = async () => {
        setMessage("");
        try {
          const docSnap = await todoDataService.getTodo(id);
          console.log("the record is :", docSnap.data());
          setTodoid(docSnap.data().todoid);
          setTaskname(docSnap.data().taskname);
          setStatus(docSnap.data().status);
        } catch (err) {
          setMessage({ error: true, msg: err.message });
        }
      };
    
      useEffect(() => {
        console.log("The id here is : ", id);
        if (id !== undefined && id !== "") {
          editHandler();
        }
      }, [id]);

  return (
    <>
    {<div className="p-4 box">
    <h2 className="text-center mb-4">Add/Update Todo</h2>
        {message?.msg && (
          <Alert
            variant={message?.error ? "danger" : "success"}
            dismissible
            onClose={() => setMessage("")}
          >
            {message?.msg}
          </Alert>
        )}

        <Form onSubmit={handleSubmit}>
          <Form.Group className="mb-3" controlId="todo-id">
            <InputGroup>
              <InputGroup.Text id="todo-id"></InputGroup.Text>
              <Form.Control
                type="number"
                placeholder="Todo ID"
                value={todoid}
                onChange={(e) => setTodoid(e.target.value)}
                required
              />
            </InputGroup>
          </Form.Group>

          <Form.Group className="mb-3" controlId="taskName">
            <InputGroup>
              <InputGroup.Text id="taskName"></InputGroup.Text>
              <Form.Control
                type="text"
                placeholder="Task Name"
                value={taskname}
                onChange={(e) => setTaskname(e.target.value)}
                required
              />
            </InputGroup>
          </Form.Group>
          <ButtonGroup aria-label="Basic example" className="mb-3">
            <Button
              disabled={flag}
              variant="success"
              onClick={(e) => {
                setStatus("Completed");
                setFlag(true);
              }}
            >
              Completed
            </Button>
            <Button
              variant="danger"
              disabled={!flag}
              onClick={(e) => {
                setStatus("Not Completed");
                setFlag(false);
              }}
            >
              Not Completed
            </Button>
          </ButtonGroup>
          <div className="d-grid gap-2">
            <Button variant="primary" type="Submit">
              Add/Update
            </Button>
          </div>
        </Form>
    </div>}
    </>
  )
}
