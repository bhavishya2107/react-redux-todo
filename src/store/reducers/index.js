import { v4 as uuid } from "uuid";

let initialState = {
  allTodos: [],
  activeTab: "all",
};

export default function todoReducer(state = initialState, action) {
  console.log(state);
  switch (action.type) {
    case "add":
      let newTodo = { text: action.todoInput, done: false, id: uuid() };
      return { ...state, allTodos: [...state.allTodos, newTodo] };

    case "del":
      return {
        ...state,
        allTodos: state.allTodos.filter((todo) => todo.id !== action.id),
      };

    case "toggle":
      return {
        ...state,
        allTodos: state.allTodos.map((todo) => {
          if (todo.id === action.id) {
            return { ...todo, done: !todo.done };
          }
          return todo
        }),
      };
    
    case "tabs":
      return{
        ...state,
        activeTab: action.tabs
      }

    default:
      return state;
  }
}
