import React, { useContext, useState } from 'react';
import { Formik } from 'formik';
import { TaskListContext } from '../../context/TaskListContext';
import { FilterForm } from './FilterForm';
import Task from '../Task/Task';
import { PRIORITIES, CURRENT_STATE, ALL } from '../../constants/Constants';
import "bulma/css/bulma.css";


export default function TaskList() {
    /* States */
    const [filterPriority, setFilterPriority] = useState(ALL)
    const [filterState, setFilterState] = useState(ALL)
    const { taskList } = useContext(TaskListContext)

    /* Functionality */
    const filterBy = (values) => {
        /* Destruct incoming values from filter form */
        const { priority, currentState } = values

        /* Cases of filter */
        /* If no option selected */
        if (priority === '') {
            setFilterPriority(ALL)
        }
        if (currentState === '') {
            setFilterState(ALL)
        }

        /* Options that has been selected */
        /* Map through an array of constants; ask if there's a match with the value selected */
        if (priority.length>0) {
            PRIORITIES.map( prioritized => {
                if (priority === prioritized){
                    return setFilterPriority(prioritized)
                }
                return console.log(filterPriority)
            })
        }
        if (currentState.length>0) {
            CURRENT_STATE.map( stated => {
                if (currentState === stated){
                    return setFilterState(stated)
                }
                return console.log(filterState)
            })
        }
    }

    return (
        <div>
            <div className="columns">
                <div className="column">
                { /* Filter FORM */ }
                    <Formik
                        initialValues={{
                            priority: ALL,
                            currentState: ALL
                        }}
                        onSubmit={(values, actions) => {
                            console.log('estas son las values en el OnSubmit: ', values)
                            filterBy(values)
                            setTimeout(() => { actions.setSubmitting(false) }, 200)
                        }}
                    >
                        {props => < FilterForm {...props} /> }
                    </Formik>
                </div>
            </div>

            {/* Tasks labels */}
            { 
                taskList && taskList.length>0 &&
                    <label className="label is-large">Tareas pedientes</label>
            }

            { 
                taskList && taskList.length === 0 && 
                    <label className="label is-large">No hay tareas pendientes</label>
            }

            {/* Tasks to show */}
            <div className="columns is-multiline">
                {
                    taskList &&  
                        taskList
                        .filter(task => {
                            if (filterPriority !== ALL){
                                return task.priority === filterPriority
                            } else { return task }
                        }) 
                        .filter(task => {
                            if (filterState !== ALL){
                            return task.currentState === filterState
                            } else { return task }
                        }).map((task) => {
                            return <Task key={task.id} task={task} />
                        })
                }

            </div>
                    
        </div>
    )
}
