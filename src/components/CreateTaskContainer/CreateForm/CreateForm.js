import React, { useContext } from 'react';
import { TaskListContext } from '../../../context/TaskListContext'
import "bulma/css/bulma.css";

export default function CreateForm({ handleChange, handleSubmit, isSubmitting, resetForm, values, errors, touched }) {
    const { taskToEdit } = useContext(TaskListContext);
    if (taskToEdit) { values = taskToEdit; }
    return (
        <form onSubmit={handleSubmit}>
{/* ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ */}
{/*  -------------------------FIELDS------------------------*/}
{/* ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ */}
            <div className="box">
            <div className="col-12 ">
    {/* id ref input */}
        {taskToEdit && 
        <input 
        name="id"
        type="hidden"
        value={taskToEdit.id}
        style={{display:'none'}}
        />
    }

    {/* Title */}
                <div className="column is-full">
                    <div className="field">
                        <label className="label is-large">Titulo</label>
                        <div className="control">
                            <input
                                name="title"
                                className="input"
                                onChange={handleChange}
                                value={values.title}
                            />

                        </div>
                        {touched.title && errors.title && <p className="help is-danger">{errors.title}</p>}
                    </div>
                </div>
    {/* Description */}
                <div className="column is-full">
                    <div className="field">
                        <div className="control">
                            <label className="label is-large">Descripción</label>
                            <textarea
                                name="description"
                                className="input"
                                onChange={handleChange}
                                value={values.description}
                                style={{height:"100px"}}
                            />
                        </div>
                        {touched.description && errors.description && <p className="help is-danger">{errors.description}</p>}
                    </div>
                </div>
    {/* Priority */}
                <div className="column is-full">
                    <div className="column is-5">
                        <div className="field">
                            <label className="label is-small">Prioridad</label>
                            <div className="control">
                                <div className="select is-rounded">
                                    <select
                                        id="priority"
                                        name="priority"
                                        onChange={handleChange}
                                        value={values.priority}

                                    >
                                        <option>¿Es importante?</option>
                                        <option value="high">Muy</option>
                                        <option value="mid">Un poco</option>
                                        <option value="low">No tanto</option>
                                    </select>
                                </div>
                            </div>
                            {touched.priority && errors.priority && <p className="help is-danger">{errors.priority}</p>}
                        </div>
                    </div>
    {/* Current State */}
                    <div className="column is-5">
                        <div className="field">
                            <label className="label is-small">Estado</label>
                            <div className="control">
                                <div className="select is-rounded">
                                    <select
                                        id="currentState"
                                        name="currentState"
                                        onChange={handleChange}
                                        value={values.currentState}
                                    >
                                        <option>¿Ya la estás por terminar?</option>
                                        <option value="new">Es nueva</option>
                                        <option value="inProcess">Esta en progreso</option>
                                        <option value="finished">¡La termine!</option>
                                    </select>
                                </div>
                            </div>
                            {touched.currentState && errors.currentState && <p className="help is-danger">{errors.currentState}</p>}
                        </div>
                    </div>
                </div>

{/* ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ */}
{/*  -------------------------BUTTONS------------------------*/}
{/* ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ */}

    {/* ------------ SUBMIT ------------ */}
                <div className="is-full">
                    <div className="field is-grouped is-grouped-centered">
                        <p className="control">
                            <button
                                className="button is-rounded is-primary"
                                disabled={isSubmitting}
                                type="submit"
                            > { taskToEdit ? <span>Editar tarea</span> : <span>Crear tarea</span> } 
                            </button>
                        </p>

    {/* ------------ RESET ------------ */}
                        <p className="control">
                            <button
                                className="button is-rounded is-danger"
                                type="button"
                                onClick={resetForm}
                            >Empezar de nuevo
                            </button>
                        </p>
                    </div>
                </div>
            </div>
            </div>
        </form>
    )
}
