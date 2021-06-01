import React from 'react';
import "bulma/css/bulma.css";
import { ALL, PRIORITY_HIGH, PRIORITY_MID, PRIORITY_LOW, STATE_NEW, STATE_INPROGRESS, STATE_FINISHED } from '../../../constants/Constants'

export default function CreateForm({ handleSubmit, handleChange, isSubmitting, values }) {
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
                            onChange={handleChange}
                            onMouseOut={handleSubmit}
                            value={values.priority}
                            disabled={isSubmitting}
                        >
                            <option value={ALL}>Todas</option>
                            <option value={PRIORITY_HIGH}>Alta</option>
                            <option value={PRIORITY_MID}>Media</option>
                            <option value={PRIORITY_LOW}>Baja</option>
                        </select>
                    </div>
                </div>

                <div  className="column is-2" >
                    <label className="label is-small">Estado </label>
                    <div className="select is-rounded">
                        <select
                            id="currentState"
                            name="currentState"
                            onChange={handleChange}
                            onMouseOut={handleSubmit}
                            value={values.currentState}
                            disabled={isSubmitting}
                        >
                            <option value={ALL}>Todas</option>
                            <option value={STATE_NEW}>Nuevas</option>
                            <option value={STATE_INPROGRESS}>En proceso</option>
                            <option value={STATE_FINISHED}>Terminadas</option>
                        </select>
                    </div>
                </div>
            </div>
        </form>
    )
}

