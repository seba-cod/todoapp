import React, { createContext, useState, useCallback } from 'react'
import { v1 as uuid } from 'uuid'
import "bulma/css/bulma.css";

export const TaskListContext = createContext();

const TaskListContextProvider = (props) => {

    /* States */
    const [taskList, setTaskList] = useState([])
    const [taskToEdit, setTaskToEdit] = useState(null)

    /* Functionality */
    const addTask = (values) => {
        const { title, description, currentState, priority } = values
        setTaskList([
            ...taskList, 
            { 
                title, 
                description, 
                currentState, 
                priority, 
                id: uuid()
            }
        ])
    }
    const removeTask = useCallback( (id) => {
        setTaskList(taskList.filter(task => task.id !== id))
    }, [taskList] )
    
    const findTaskById = useCallback( (id) => {
        const taskWanted = taskList.find(task => task.id === id)
        setTaskToEdit(taskWanted)
    }, [taskList] )

    const editTask = (values) => {
        const { title, description, currentState, priority, id } = values
        const newTaskList = taskList.filter(task => task.id !== values.id)

        setTaskList([
            ...newTaskList, 
            { 
                title, 
                description, 
                currentState, 
                priority,
                id
            }
        ])
        setTaskToEdit(null)
    }

    return (
        <TaskListContext.Provider value={{ taskList, taskToEdit, addTask, removeTask, editTask, findTaskById }}>
            {props.children}
        </TaskListContext.Provider>
    )
}

export default TaskListContextProvider;