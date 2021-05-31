import React, { useContext } from 'react'
import { TaskListContext } from '../../context/TaskListContext'
import "bulma/css/bulma.css";

export default function Task({task}) {
    const { removeTask, findTaskById } = useContext(TaskListContext);

    switch (task.priority) {
        case 'high':
            task.priority = "Alta"
            break;
        case 'mid':
            task.priority = "Media"
            break;
        case 'low':
            task.priority = "Baja"
            break;
    }
    switch (task.currentState) {
        case 'new':
            task.currentState = 'Nueva'
            break;
        case 'inProcess':
            task.currentState = 'Esta en progreso '
            break;
        case 'finished':
            task.currentState = '¡La termine! '
            break;
    }

    return (
        <div className="column is-4">
     
            <div className="card">
                    <div className="card-header-icon" style={{background:"#F8F8F1"}}> 
                    <div className="has-text-info" style={{display:"flex", width:"100%",  justifyContent:"space-between", fontSize:"12px"}}>
                        <h6 style={{flexBasis:"35%"}}>🌟: {task.priority}</h6>
                        <h6 style={{flexBasis:"35%"}}>🕙: {task.currentState}</h6>
                    </div>
                    </div>
                    
                    <div className="card-header" style={{background:"#f7f79b"}}>
                        <p className="card-header-title is-centered">{task.title}</p>
                    </div>
                    <div className="card-content" style={{backgroundColor:"#FFF", maxWidth:"340px", display:"flex"}}>
                        <p className="content"style={{width:"100%", textAlign:"justify"}}>
                            {task.description}
                            </p>
                    </div>
                <div style={{display:"flex", padding:"10px 0", justifyContent:'space-evenly', backgroundColor:"#F8F8F1"}} className="card-footer">
                    <button className="button is-rounded is-danger" onClick={() => removeTask(task.id)}> borrar</button>
                    <button className="button is-rounded is-secondary" onClick={() => findTaskById(task.id)}> editar</button>
                </div>
            </div>
            </div>
    )
}
