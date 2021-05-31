import React from 'react';
import "bulma/css/bulma.css";

export default function CreateForm({ handleChange, handleSubmit, isSubmitting, resetForm, values, errors, touched }) {
    return (
        <form onSubmit={handleSubmit}>
        <label className="label is-medium">Filtrar por:</label>
            <div className="columns is-multiline">
                <div className="column is-2">
                    <label className="label is-small">Prioridad </label>
                    <div className="select is-rounded">

                        <select
                            id="priority"
                            name="priority"
                            onChange={handleSubmit}
                            value={values.priority}
                            disabled={isSubmitting}
                        >
                            <option value="all">Todas</option>
                            <option value="high">Alta</option>
                            <option value="mid">Media</option>
                            <option value="low">Baja</option>
                        </select>
                    </div>
                </div>

                <div  className="column is-2" >
                    <label className="label is-small">Estado </label>
                    <div className="select is-rounded">
                        <select
                            id="currentState"
                            name="currentState"
                            onChange={handleSubmit}
                            value={values.currentState}
                            disabled={isSubmitting}
                        >
                            <option value="all">Todas</option>
                            <option value="new">Nuevas</option>
                            <option value="inProcess">En proceso</option>
                            <option value="finished">Terminadas</option>
                        </select>
                    </div>
                </div>
            </div>
        </form>
    )
}

