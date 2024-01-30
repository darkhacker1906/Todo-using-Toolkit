import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { MdDelete } from "react-icons/md";
import { FaEdit } from "react-icons/fa";
import { deleteTodo, handleCheck } from "../reduxToolkit/todoSlice";

import CheckBox from "./CheckBox";

function TodoTable({ setTodoInput, setIsEdit, setSelectedTodoId }) {
  const todoList = useSelector((state) => {
    if (state.filterType === "completed") {
      return state.list.filter((todo) => todo.checked);
    } else if (state.filterType === "incomplete") {
      return state.list.filter((todo) => !todo.checked);
    } else {
      return state.list;
    }
  });
  var dispatch = useDispatch();

  const handleDelete = (todoId) => {
    dispatch(deleteTodo(todoId));
    const existingTodos = JSON.parse(localStorage.getItem("id")) || [];
    if(Array.isArray(existingTodos)){
      const updatedTodos = existingTodos.filter((todo) => todo.id !== todoId);
    localStorage.setItem("id", JSON.stringify(updatedTodos));
    }
  };

  const handleEdit = (todoId, todoData) => {
    setTodoInput(todoData);
    setIsEdit(true);
    setSelectedTodoId(todoId);
  };
  const check_box_select = (todoId) => {
    dispatch(handleCheck({ id: todoId }));
  };

  return (
    <div className=" overflow-y-auto h-[600px]" >
      <div className="relative overflow-y-auto shadow-md sm:rounded-lg ">
        <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
          <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400"></thead>
          <tbody>
            {todoList.map((todo) => (
              <tr
                key={todo.id}
                className="odd:bg-white odd:dark:bg-gray-900 even:bg-gray-50 even:dark:bg-gray-800 border-b dark:border-gray-700"
              >
                <th
                  scope="row"
                  className=" flex justify-between px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                >
                  <p className=" text-balance  truncate break-all w-[100%] flex gap-2">
                    <CheckBox
                      todoCheck={todo.checked}
                      handleCheckBox={() => check_box_select(todo.id)}
                    />
                    {todo.data}
                  </p>
                  <div className="flex justify-between text-xl gap-2">
                    <MdDelete onClick={() => handleDelete(todo.id)} />
                    <FaEdit onClick={() => handleEdit(todo.id, todo.data)} />
                    {todo.checked && <p className="text-sm">completed</p>}
                  </div>
                </th>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default TodoTable;
