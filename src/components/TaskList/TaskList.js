import React, { useContext, useState } from 'react';
import { Formik } from 'formik';
import { TaskListContext } from '../../context/TaskListContext';
import { FilterForm } from './FilterForm';
import Task from '../Task/Task';
import { PRIORITIES, CURRENT_STATE, ALL } from '../../constants/Constants';
import "bulma/css/bulma.css";


export default function TaskList() {

    const [filterPriority, setFilterPriority] = useState(ALL)
    const [filterState, setFilterState] = useState(ALL)
    const { taskList } = useContext(TaskListContext)

    const filterBy = (values) => {
        const { priority, currentState } = values
        console.log('esto hay en values: ', values)
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
        if (priority === '') {
            setFilterPriority(ALL)
        }
        if (currentState === '') {
            setFilterPriority(ALL)
        }
    }

    return (
        <div>
            <div className="columns">
                <div className="column">
                    <Formik
                        initialValues={{
                            priority: '',
                            currentState: ''
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

            { 
                taskList && taskList.length>0 &&
                    <label className="label is-large">Tareas pedientes</label>
            }

            { 
                taskList && taskList.length === 0 && 
                    <label className="label is-large">No hay tareas pendientes</label>
            }

            <div className="columns is-multiline">
                {
                    taskList &&  
                        taskList
                        .filter(task => {
                            if (filterPriority !== ALL){
                                return task.priority === filterPriority
                            }
                        }) 
                        .filter(task => {
                            if (filterState !== ALL){
                            return task.currentState === filterState
                            }
                        }).map((task) => {
                            return <Task key={task.id} task={task} />
                        })
                }

            </div>
                    
        </div>
    )
}
