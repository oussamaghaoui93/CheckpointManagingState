import React, { useState } from 'react';
import { Button, Form, ListGroup, Modal } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import Task from './Component/Task';

function App() {
  const [tasks, setTasks] = useState([]);
  const [newTask, setNewTask] = useState("");
  const [currentTask, setCurrentTask] = useState(null); // Task being updated
  const [showModal, setShowModal] = useState(false); // Modal state
  const [updatedTaskValue, setUpdatedTaskValue] = useState(""); // Input value in modal

  const addTask = () => {
    if (newTask.trim() !== "") {
      const taskId = Date.now();
      setTasks([...tasks, { id: taskId, text: newTask, phase: "On Hold", date: formatDate(taskId) }]);
      setNewTask("");
    }
  };

  const deleteTask = (id) => {
    setTasks(tasks.filter(task => task.id !== id));
  };

  const updatePhase = (id) => {
    setTasks(tasks.map(task => {
      if (task.id === id) {
        const phases = ["On Hold", "Running", "Finished"];
        const currentIndex = phases.indexOf(task.phase);
        const nextPhase = phases[(currentIndex + 1) % phases.length];
        return { ...task, phase: nextPhase };
      }
      return task;
    }));
  };

  const openUpdateModal = (task) => {
    setCurrentTask(task); // Set the task to be updated
    setUpdatedTaskValue(task.text); // Pre-fill modal input with current task text
    setShowModal(true); // Open the modal
  };

  const handleUpdateTask = () => {
    setTasks(tasks.map(task =>
      task.id === currentTask.id ? { ...task, text: updatedTaskValue } : task
    ));
    setShowModal(false); // Close modal after update
  };

  const formatDate = (timestamp) => {
    const date = new Date(timestamp);
    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const year = String(date.getFullYear()).slice(2);
    const hours = String(date.getHours()).padStart(2, '0');
    const minutes = String(date.getMinutes()).padStart(2, '0');
    return `${day}/${month}/${year} ${hours}:${minutes}`;
  };

  return (
    <div className="container mt-5">
      <h1 className="text-center">To-Do List</h1>
      <Form.Group className="mb-3">
        <Form.Control
          type="text"
          placeholder="Enter a new task"
          value={newTask}
          onChange={(e) => setNewTask(e.target.value)}
        />
        <Button variant="primary" className="mt-2" onClick={addTask}>
          Add Task
        </Button>
      </Form.Group>
      <ListGroup>
        {tasks.map(task => (
          <Task
            key={task.id}
            task={task}
            deleteTask={deleteTask}
            updatePhase={updatePhase}
            openUpdateModal={openUpdateModal} // Pass modal handler
          />
        ))}
      </ListGroup>

      {/* Modal for updating task */}
      <Modal show={showModal} onHide={() => setShowModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Update Task</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form.Control
            type="text"
            value={updatedTaskValue}
            onChange={(e) => setUpdatedTaskValue(e.target.value)}
          />
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowModal(false)}>
            Close
          </Button>
          <Button variant="primary" onClick={handleUpdateTask}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}

export default App;
