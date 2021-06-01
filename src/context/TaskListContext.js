import React, { createContext, useState, useCallback } from 'react'
import { v1 as uuid } from 'uuid'
import "bulma/css/bulma.css";
import { PRIORITIES, CURRENT_STATE, ALL } from '../constants/Constants';

export const TaskListContext = createContext();

const TaskListContextProvider = (props) => {
    const [taskList, setTaskList] = useState([])
    const [taskToEdit, setTaskToEdit] = useState(null)
    const [filterPriority, setFilterPriority] = useState(ALL)
    const [filterState, setFilterState] = useState(ALL)
    
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
    
    const findTaskById = (id) => {
        const taskWanted = taskList.find(task => task.id === id)
        setTaskToEdit(taskWanted)
    }

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

    const filterBy = (values) => {
        const { priority, currentState } = values
        console.log('this are the values: ',values)
        if (priority.length>0) {
            console.log('this is priority: ',filterPriority)
            PRIORITIES.map( prioritized => {
                if (priority === prioritized){
                    return setFilterPriority(prioritized)
                }
            })
        }
        if (currentState.length>0) {
            console.log('this is state: ',filterState)
            CURRENT_STATE.map( stated => {
                if (currentState === stated){
                    return setFilterState(stated)
                }
            })
        }
        if (priority === '') {
            setFilterPriority(ALL)
        }
        if (currentState === '') {
            setFilterPriority(ALL)
        }
    }



    return (
        <TaskListContext.Provider value={{ taskList, taskToEdit, addTask, removeTask, editTask, findTaskById, filterBy }}>
            {props.children}
        </TaskListContext.Provider>
    )
}

export default TaskListContextProvider;