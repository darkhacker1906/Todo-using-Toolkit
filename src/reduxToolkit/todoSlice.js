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
      const updateList = state.list.map((todo) =>
      todo.id === id ? { ...todo, data } : todo
    );
      return{
        ...state,list:updateList,
      };
    },

    handleCheck:(state,action)=>{
        const{id}=action.payload;
        const updateList=state.list.map((todo)=>
        todo.id === id ? {...todo,checked:!todo.checked}:todo);
        return{
            ...state,list:updateList,
        };
    },

    setFilter:(state,action)=>{
      const {filterType}=action.payload;
      state.filterType = filterType;
      }

  },
});
export const { addTodo, deleteTodo, editTodo,handleCheck,setFilter } = todoSlice.actions;
export default todoSlice.reducer;
