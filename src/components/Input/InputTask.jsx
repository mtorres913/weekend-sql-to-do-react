import axios from 'axios';
import { useEffect } from 'react';
import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import { Typography } from '@mui/material';
import Grid from '@mui/material/Grid';
import { grey } from '@mui/material/colors';

function InputTask ({task, fetchTaskList}){
    useEffect(() => {
        fetchTaskList();
    }, []);

    // DeleteTask
    const deleteTask = (e) => {
        console.log(`Deleting task ${task.id}`);
        axios.delete(`/todo/${task.id}`).then((response) => {
            fetchTaskList();
        }).catch((error) => {
            console.log(`Error in deleteTask ${error}`);
            alert('Something went wrong.');
        })
    }
    //CompleteTask
    const completeTask = (e) => {
        console.log(`Completing task ${task.id}`)
        axios.put(`/todo/${task.id}`).then((response) => {
            fetchTaskList();
        }).catch((error) => {
            console.log(`Error in completeTask ${error}`);
            alert('Something went wrong.');
        })
    }

    const getBackgroundDecoration = () => {
        if (task.completed === 'Yes'){
            return 'lightgreen';
        } else {
            return 'lightgray';
        }
    }

    const getButtonDecoration= () => {
        if (task.completed === 'Yes'){
            return 'line-through';
        } else {
            return 'none';
        }
    }

    return(
        <Grid item xs={12} md={4}>
            <Card style={{backgroundColor: getBackgroundDecoration()}} sx={{ minWidth: 275} }>
                <CardContent>
                    <Typography 
                    variant="h5"
                    >
                        {task.task}
                    </Typography>
                </CardContent>
                <CardActions>
                    <Button
                     style={{textDecorationLine: getButtonDecoration()}}
                        variant="outlined"
                        color="error"
                        onClick={(e) => completeTask(task.id)}> Complete
                    </Button> 
                    <Button
                        variant="outlined"
                        color="error"
                        onClick={(e) => deleteTask(task.id)}> Delete
                    </Button>
                </CardActions>
            </Card>
        </Grid>
    )
}

export default InputTask;