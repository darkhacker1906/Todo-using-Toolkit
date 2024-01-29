import { createSlice, nanoid } from "@reduxjs/toolkit";

const initialState = {
  list: [],
  filterType: "all",
};
export const todoSlice = createSlice({
  name: "todo",
  initialState,
  reducers: {
    addTodo: (state, action) => {
      const todo = { id: nanoid(), data: action.payload, checked: false };
      return {
        ...state,
        list: [...state.list, todo],
      };
    },

    deleteTodo: (state, action) => {
      state.list = state.list.filter((todo) => todo.id !== action.payload);
    },

    editTodo: (state, action) => {
      const { id, data } = action.payload;
    },
  },
});
export const { addTodo, deleteTodo, editTodo } = todoSlice.actions;
export default todoSlice.reducer;
