import { v4 as uuid } from "uuid";
import {
  ADD_TODO,
  TOGGLE_TODO,
  CHANGE_TAB,
  DELETE_TODO,
  CLEAR_ALL,
} from "../types";

let initialState = JSON.parse(localStorage.getItem("myTodos")) || {
  allTodos: [],
  activeTab: "all"
};

export default function todoReducer(state = initialState, action) {
  
  switch (action.type) {
    case ADD_TODO:
      let newTodo = { text: action.payload, done: false, id: uuid() };
      return { ...state, allTodos: [...state.allTodos, newTodo] };

    case DELETE_TODO:
      return {
        ...state,
        allTodos: state.allTodos.filter((todo) => todo.id !== action.payload),
      };

    case TOGGLE_TODO:
      return {
        ...state,
        allTodos: state.allTodos.map((todo) => {
          if (todo.id === action.payload) {
            return { ...todo, done: !todo.done };
          }
          return todo;
        }),
      };

    case CHANGE_TAB:
      return {
        ...state,
        activeTab: action.payload,
      };

    case CLEAR_ALL:
       localStorage.removeItem("myTodos")
       localStorage.clear()
       return state = {...initialState}

    default:
      return state;
  }
}
