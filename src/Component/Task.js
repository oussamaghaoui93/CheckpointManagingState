// Task.js
import React from 'react';
import { Button, ListGroup } from 'react-bootstrap';

function Task({ task, deleteTask, updatePhase, openUpdateModal }) {
    return (
        <ListGroup.Item className="d-flex justify-content-between align-items-center">
            <div>
                <strong>{task.text}</strong> - <em>{task.phase}</em>
                <br />
                <small>ID: {task.date}</small>
            </div>
            <div>
                <Button
                    variant="warning"
                    className="mr-2"
                    onClick={() => updatePhase(task.id)}
                    disabled={task.phase === "Finished"}
                >
                    {task.phase === "Finished" ? "Completed" : "Next Phase"}
                </Button>
                <Button
                    variant="info"
                    className="mr-2"
                    onClick={() => openUpdateModal(task)} // Open update modal
                >
                    Update
                </Button>
                <Button
                    variant="danger"
                    onClick={() => deleteTask(task.id)}>
                    Delete
                </Button>
            </div>
        </ListGroup.Item>
    );
}

export default Task;
