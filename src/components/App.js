import React from 'react';
import TaskListContextProvider from '../context/TaskListContext';
import CreateTaskContainer from './CreateTaskContainer/CreateTaskContainer'
import TaskList from './TaskList/TaskList';
import "bulma/css/bulma.css";

function App() {
  return (
    <div style={{backgroundColor:"#F8F8F1"}}>
      <h1 style={{fontFamily:"Arial", fontSize:"35px", textAlign:"center", padding:"25px"}}>To Do React App</h1>
      <TaskListContextProvider>
          <div>
              <div style={{width:"100%", maxWidth:"1200px", margin:"auto"}}>
                <CreateTaskContainer/>
              </div>
          </div>
        <h2 style={{fontFamily:"Arial", fontSize:"25px", textAlign:"center", padding:"25px"}}>Listado de tareas</h2>
          <div className="box" style={{width:"100%", maxWidth:"1200px", margin:"auto", background:"white", borderRadius:"16px"}}>
            <TaskList />
          </div>
      </TaskListContextProvider>
    </div>
  );
}

export default App;


