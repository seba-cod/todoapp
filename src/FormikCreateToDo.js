// eslint-disable
import React, { useContext } from 'react'
import { Formik } from 'formik';
import { CreateForm } from './components/CreateTaskContainer/CreateForm';
import { TaskListContext } from './context/TaskListContext'

{/* ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ */ }
{/*  -------------------------ERRORS-------------------------*/ }
{/* ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ */ }
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

{/* ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ */ }
{/*  ---------------------FORM PROCESS-----------------------*/ }
{/* ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ */ }
export default function FormikCreateToDo(props) {

  const { addTask, editTask } = useContext(TaskListContext);

  return (
    // Formik configuration
    <Formik
      initialValues={{
        id: null,
        title: '',
        description: '',
        priority: '',
        currentState: ''
      }}
      onSubmit={(values, actions, id) => {
        // Context State Update
        if (values.id) {
          editTask(values, id)
          actions.resetForm();
        } else if (!values.id){
          addTask(values)
          actions.resetForm();
        }

        setTimeout(() => { actions.setSubmitting(false) }, 200)
      }}
      validate={validation}
    >
      {/* Render form with Formik as props */}
      {props => < CreateForm {...props} />}
    </Formik>
  )
}