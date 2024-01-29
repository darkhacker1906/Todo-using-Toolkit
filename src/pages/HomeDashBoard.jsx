import React, { useState } from "react";
import Button from "../components/Button";
import InputField from "../components/InputField";
import { useDispatch, useSelector } from "react-redux";
import { editTodo } from "../reduxToolkit/todoSlice";
import { addTodo } from "../reduxToolkit/todoSlice";
import TodoTable from "../components/TodoTable";

function HomeDashBoard() {
  const dispatch = useDispatch();
  var todoList = useSelector((state) => state.list);
  const [todoInput, setTodoInput] = useState("");
  const [isEdit, setIsEdit] = useState(false);
  const [selectedTodoId, setSelectedTodoId] = useState(null);
  const [error, setError] = useState("");

  const handleTodoInput = (e) => {
    setTodoInput(e.target.value);
    setError("");
  };

  const handleSubmit = () => {
    if (todoInput.trim() == "") {
      setError("Please enter todo");
      setTodoInput("");
    }
     else {
      dispatch(addTodo(todoInput));
      setTodoInput("");
    }
  };
  const handleUpdate = (selectedTodoId, todoInput) => {
    if (todoInput.trim() !== "" && selectedTodoId !== null) {
      dispatch(editTodo({id:selectedTodoId, data:todoInput}));
    }
    setSelectedTodoId(null);
    setIsEdit(false);
    setTodoInput("");
  };
  const handleCancel = () => {
    setSelectedTodoId(null);
    setIsEdit(false);
    setTodoInput("");
  };
  const handleFilter = (filterType) => {
  };
  return (
    <div className="w-7/12 m-auto">
      <form onSubmit={(e) => e.preventDefault()}>
        <h1 className="text-2xl text-center mt-4">Todo App</h1>
        <InputField
          InputFieldType="text"
          todoInput={todoInput}
          handleTodoInput={handleTodoInput}
          error={error}
        />

        {!isEdit ? (
          <Button title="Submit" handleClick={handleSubmit} />
        ) : (
          <>
            <div className="flex gap-2">
              <Button
                title="UPDATE"
                handleClick={() => handleUpdate(selectedTodoId, todoInput)}
              />
              <Button title="CANCEL" handleClick={handleCancel} />
            </div>
          </>
        )}
      </form>
      {todoList.length > 0 && (
        <div className="flex gap-2 mt-4 mb-1">
          <Button title="All" handleClick={() => handleFilter("all")}></Button>
          <Button
            title="Completed"
            handleClick={() => handleFilter("completed")}
          ></Button>
          <Button
            title="Incomplete"
            handleClick={() => handleFilter("incomplete")}
          ></Button>
        </div>
      )}
      <TodoTable
        setTodoInput={setTodoInput}
        setIsEdit={setIsEdit}
        setSelectedTodoId={setSelectedTodoId}
      />
    </div>
  );
}

export default HomeDashBoard;

