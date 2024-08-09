import { useState } from "react";

function Form(props) {
  const [name, setName] = useState("");

  function handleChange(event) { //This function handles for any input change
    setName(event.target.value);  
  }

  function handleSubmit(event){
    event.preventDefault();
    props.addTask(name);   //addTask is the callback prop passed from App.js
    setName("");      
  }

  return (
    <form onSubmit = {handleSubmit}>
      <h2 className="label-wrapper">
        <label htmlFor="new-todo-input" className="label__lg">
          What needs to be done?
        </label>
      </h2>
      <input
        type="text"
        id="new-todo-input"
        className="input input__lg"
        name="text"
        autoComplete="off"
        value={name}
        onChange={handleChange} //listen for input change
      />
      <button type="submit" className="btn btn__primary btn__lg">
        Add
      </button>
    </form>
  );
}

export default Form;
