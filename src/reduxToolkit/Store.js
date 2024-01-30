import { configureStore } from "@reduxjs/toolkit";
import todoReducer from './todoSlice';

function saveToLocalStorage(state) {
  try {
    const serializedState = JSON.stringify(state);
    localStorage.setItem("persistentState", serializedState);
  } catch (e) {
    console.warn(e);
  }
}

function loadFromLocalStorage() {
  try {
    const serializedState = localStorage.getItem("persistentState");
    if (serializedState === null) return undefined;
    return JSON.parse(serializedState);
  } catch (e) {
    console.warn(e);
    return undefined;
  }
}

const preloadedState = loadFromLocalStorage();

export const store = configureStore({
  reducer: todoReducer,
  preloadedState: preloadedState,
});

store.subscribe(() => saveToLocalStorage(store.getState()));

export default store;
