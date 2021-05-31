import React, { useContext } from 'react'
import { Formik } from 'formik';
import { TaskListContext } from '../../context/TaskListContext'
import { FilterForm } from './FilterForm'
import Task from '../Task/Task'
import "bulma/css/bulma.css";

export default function TaskList() {
    const { taskList, filterBy } = useContext(TaskListContext)
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
                            filterBy(values)
                            setTimeout(() => { actions.setSubmitting(false) }, 200)
                        }}
                    >
                        {props => < FilterForm {...props} />}
                    </Formik>
                </div>
            </div>
        { taskList.length>0 &&
        <label className="label is-large">Tareas pedientes</label>
        }
        { taskList.length === 0 && 
        <label className="label is-large">No hay tareas pendientes</label>
        }
            <div className="columns is-multiline">
                {taskList.map((task) => {
                    return <Task key={task.id} task={task} />
                })}
            </div>
                    
        </div>
    )
}
