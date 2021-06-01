// eslint-disable
import React, { useContext, useState, useEffect } from 'react'
import { Formik } from 'formik';
import { CreateForm } from '.';
import { TaskListContext } from '../../../context/TaskListContext'


{/*  ------------------FORMIK ERRORS DECLARATION--------------------*/ }
function validation(values) {

  let errors = {};

  if (!values.title) {
    errors.title = 'Por favor indica un título para la tarea';
  }
  if (values.description.length < 3) {
    errors.description = 'Por favor agrega una descripción!';
  } else if (values.description.length >= 3 && values.description.length < 10)
    errors.description = 'Sigue así!';
  if (!values.priority) {
    errors.priority = 'Selecciona el nivel de prioridad de la tarea';
  }
  if (!values.currentState) {
    errors.currentState = 'Por favor selecciona el estado actual';
  }
  return errors;
}

{/*  ---------------------FORM PROCESS-----------------------*/ }
export default function FormikCreateToDo(props) {

  const { addTask, editTask, taskToEdit } = useContext(TaskListContext);
  const [isEditing, setIsEditing] = useState(false);

  // Using an effect to manage label on Create/Edit button
  useEffect( () => {
      setIsEditing(taskToEdit!==null)
  }, [taskToEdit] ) 

  return (
    // Formik configuration
    // If there's an item to edit, values are inherit as initial in form
    <Formik
      initialValues={{
        id:  taskToEdit ? taskToEdit.id : null,
        title: taskToEdit ? taskToEdit.title : '',
        description: taskToEdit ? taskToEdit.description : '',
        priority: taskToEdit ? taskToEdit.priority : '',
        currentState: taskToEdit ? taskToEdit.currentState : ''
      }}
      onSubmit={(values, actions) => {
        // Context State Update acording to case. ID is set on addTask at Context file, if no id found, task is new.
        if (values.id) {
          editTask(values)
          actions.resetForm();
        } else if (!values.id){
          addTask(values)
          actions.resetForm();
        }
        setTimeout(() => { actions.setSubmitting(false) }, 200)
      }}
      enableReinitialize={true}
      validate={validation}
    >
      {/* Render form with Formik as props */}
      {props => < CreateForm {...props} isEditing={isEditing} /> }
    </Formik>
  )
}