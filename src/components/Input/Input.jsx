import { useState, useEffect } from 'react';
import axios from 'axios';
import './Input.css';
// import InputItem  from './InputItem.jsx';
// import Grid from '@mui/material/Grid';
// import Container from '@mui/material/Container';

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

    return (
        <>

        </>
    )
}

export default Input;