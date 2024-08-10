import { useState } from "react";
import { nanoid } from "nanoid";
import Todo from "./components/Todo";
import Form from "./components/Form";
import FilterButton from "./components/FilterButton";

function App(props) {
  //callback props- this function is expecting an input 'name' from the Form
  function addTask(name) {
    const newTask = { id: `todo-${nanoid()}`, name, completed: false };
    setTasks([...tasks, newTask]);
  }

  // toggleTaskCompleted is used to update the completed status(callback props)
  function toggleTaskCompleted(id) {
    const updatedTasks = tasks.map((task) => {
      //if this task has the same id as the edited task
      if (id === task.id) {
        //use object spread to make a new object
        // whose 'completed' props has been inverted
        return { ...task, completed: !task.completed };
      }
      return task;
    });
    setTasks(updatedTasks);
  }

  // The deleteTask callback props
  function deleteTask(id) {
    console.log(id);
    const remainingTasks = tasks.filter((task) => id !== task.id);
    setTasks(remainingTasks);
  }

  // The EditTask callback props
  function editTask(id, newName) {
    console.log(id);
    const editedTaskList = tasks.map((task) => {
      //if this task has the same ID as the edited task
      if (id === task.id) {
        // copy the task and update its name
        return { ...task, name: newName };
      }
      //Return the original task if it's not edited task
      return task;
    });
    setTasks(editedTaskList);
  }

  const [tasks, setTasks] = useState(props.tasks);
  /*console.log(props.tasks); data in index.js, <App tasks={DATA}*/
  const taskList = tasks?.map((task) => (
    <Todo
      id={task.id}
      name={task.name}
      completed={task.completed}
      key={task.id}
      toggleTaskCompleted={toggleTaskCompleted}
      deleteTask={deleteTask}
      editTask={editTask}
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
