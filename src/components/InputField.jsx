import React from "react";

function InputField({ inputTextType, todoInput, handleTodoInput, error }) {
  const inputStyle = {
    border: error ? "1px solid red" : "1px solid #ced4da",
    color: error ? "red" : "#495057",
  };
  return (
    <div>
      <input
        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline mt-5 mb-2"
        type={inputTextType}
        value={todoInput}
        placeholder="Enter your todo"
        onChange={handleTodoInput}
        style={inputStyle}
      />
      {error && <p className="text-red-500 text-xs italic">{error}</p>}
    </div>
  );
}

export default InputField;
