import React from 'react'
import { CreateForm } from './CreateForm';
import FormikCreateToDo from './CreateForm/FormikCreateToDo';

export default function Form() {
    return (
        <FormikCreateToDo>
            <CreateForm />
        </FormikCreateToDo>
    )
}
