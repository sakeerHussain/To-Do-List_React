import "./App.css";
import Form from "./components/Form";
import FilterButton from "./components/FilterButton";
import Todo from "./components/Todo";
import { nanoid } from "nanoid";
import { useState } from "react";

function App(props) {

  const[tasks, setTasks] = useState(props.tasks);
  console.log(props.tasks); //data in index.js, <App tasks={DATA}

  //callback props- this function is expecting an input 'name' from the Form
  function addTask(name){
    const newTask = { id: `todo-${nanoid()}`, name, completed: false};
    setTasks([...tasks, newTask]);
  }
  function toggleTaskCompleted(id) {
   const updatedTasks = tasks.map((task) => {
    // if this task has the same ID as the edited task
    if(id === task.id) {
      //use object spread to make a new object
      // whose 'completed' prps has been inverted
      return { ...task, completed: !task.completed };
    }
      return task;
   });
   setTasks(updatedTasks);
  }
  const taskList = tasks?.map((task) => (
    <Todo
      id={task.id}
      name={task.name}
      completed={task.completed}
      key={task.id}
      toggleTaskCompleted={toggleTaskCompleted}
    />
  ));
  //For counting the no: tasks 
  const taskNoun = taskList.length !== 1 ? "tasks" : "task";
  const headingText = `${taskList.length} ${taskNoun} remaining`;

  return (
    <div className="todoapp stack-large">
      <h1>TodoMatic</h1>

      <Form addTask={addTask} />
      <div className="filters btn-group stack-exception">
        <FilterButton />
        <FilterButton />
        <FilterButton />
      </div>
      <h2 id="list-heading">{headingText}</h2>
      <ul
        role="list"
        className="todo-list stack-large stack-exception"
        aria-labelledby="list-heading"
      >
        {taskList}
      </ul>
    </div>
  );
}

export default App;

