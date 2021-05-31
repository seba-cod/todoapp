import React, { createContext, useState } from 'react'
import { v1 as uuid } from 'uuid'
import "bulma/css/bulma.css";

export const TaskListContext = createContext();

const TaskListContextProvider = (props) => {
    const [taskList, setTaskList] = useState([])
    const [taskToEdit, setTaskToEdit] = useState(null)
    const [tasksUnfiltered, setTasksUnfiltered] = useState(taskList)
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
        setTasksUnfiltered(taskList)
    }

    const removeTask = (id) => {
        setTaskList(taskList.filter(task => task.id !== id))
        setTasksUnfiltered(taskList)
    }
    
    const findTaskById = (id) => {
        const taskWanted = taskList.find(task => task.id === id)
        setTaskToEdit(taskWanted)
    }

    const editTask = (values, id) => {
        const { title, description, currentState, priority } = values
        const newTaskList = taskList.filter(task => task.id !== taskToEdit.id)

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
        setTasksUnfiltered(taskList)
    }

    const filterBy = (values) => {
        const { priority, currentState } = values
        console.log(values)

        if (priority === "all" || currentState === "all") {
            setTaskList(tasksUnfiltered)
        }
        if (priority !== "all"){
            setTaskList(tasksUnfiltered)
            setTasksUnfiltered(taskList)
            const prioritizedTasks = tasksUnfiltered.filter(task => task.priority !== priority)
            setTaskList(prioritizedTasks);
        }
        if (currentState !== "all"){
            setTaskList(tasksUnfiltered)
            setTasksUnfiltered(taskList)
            const prioritizedTasks = tasksUnfiltered.filter(task => task.currentState !== currentState)
            setTaskList(prioritizedTasks);
        }
    }



    return (
        <TaskListContext.Provider value={{ taskList, taskToEdit, addTask, removeTask, editTask, findTaskById, filterBy }}>
            {props.children}
        </TaskListContext.Provider>
    )
}

export default TaskListContextProvider;