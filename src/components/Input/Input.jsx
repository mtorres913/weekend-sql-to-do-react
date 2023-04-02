import { useState, useEffect } from 'react';
import axios from 'axios';
import './Input.css';
import InputTask from './InputTask.jsx';
import Grid from '@mui/material/Grid';
import Container from '@mui/material/Container';

function Input() {
    const [toDoTask, setToDoTask] = useState('');
    const [toDoList, setToDoList] = useState([]);

    const fetchTaskList = () => {
        axios.get('/todo').then((response) => {
            setToDoList(response.data);
        }).catch((error) => {
            console.log(`Error in GET ${error}`);
            alert('Somethin went wrong.');
        });
    }
    useEffect(() => {
        fetchTaskList();
    }, []);

    const submitForm = (e) => {
        e.preventDefault();
        axios.post('/todo', {
            task: toDoTask,
        }).then((response) => {
            setToDoTask('');
            fetchTaskList();
        }).catch((error) => {
            console.log(`Error in Post ${error}`)
            alert('Something went wrong.');
        })
    }

    return (
        <Container>
            <form className="form" onSubmit={submitForm}>
                Task:<input type="text"
                value={toDoTask}
                onChange={(e) => setToDoTask(e.target.value)} />
                <input type="submit" />
            </form>
            <br />
            <Grid container spacing={2}>
                {
                    toDoList.map((task) => (
                        <InputTask
                        key={task.id}
                        task={task}
                        fetchTaskList={fetchTaskList}
                        />
                    ))
                }
            </Grid>
        </Container>
    )
}

export default Input;