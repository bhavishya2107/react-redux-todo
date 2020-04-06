import React from "react";
import { connect } from "react-redux";
import "./App.css";
import {
  addTodoAction,
  deleteTodoAction,
  toggleTodoAction,
  changeTabAction,
  clearAllTodos,
} from "./store/action";

class App extends React.Component {
  constructor() {
    super();
    this.state = {
      todoInput: "",
    };
  }

  handleAddTodo = ({ target }) => {
    this.setState({
      todoInput: target.value,
    });
  };

  //add todo to state array
  addTodo = () => {
    if(this.state.todoInput) {
      this.props.dispatch(addTodoAction(this.state.todoInput));
      this.setState({ todoInput: "" });
    }
  };

  //remove todo
  deleteTodo = (id) => {
    this.props.dispatch(deleteTodoAction(id));
  };

  //toggle todo
  toggleTodo = (id) => {
    this.props.dispatch(toggleTodoAction(id));
  };

  //footer button functionality
  handleTabs = (tabs) => {
    this.props.dispatch(changeTabAction(tabs));
  };


  clearAll = () => {
    this.props.dispatch(clearAllTodos());
  };

  render() {
    return (
      <>
        <div className="center">
          <h1>Todos</h1>
          <input
            type="text"
            placeholder="What is need to be done?"
            className="input_style"
            value={this.state.todoInput}
            onChange={this.handleAddTodo}
            onKeyDown={(e) => (e.keyCode === 13 ? this.addTodo() : "")}
          />
          <ul>
            {this.props.allTodos.length > 0
              ? this.props.allTodos.map((todo) => {
                  return (
                    <>
                      <li key={todo.id} className="flex center">
                        <input
                          placeholder="What needs to be done?"
                          type="checkbox"
                          onChange={() => this.toggleTodo(todo.id)}
                          checked={todo.done}
                        />
                        <p
                          style={
                            todo.done
                              ? { textDecoration: "line-through" }
                              : { textDecoration: "none" }
                          }
                        >
                          {todo.text}
                        </p>
                        <span
                          className="hover_delete"
                          onClick={() => this.deleteTodo(todo.id)}
                        >
                          X
                        </span>
                      </li>
                      <hr />
                    </>
                  );
                })
              : "No Todos"}
          </ul>
          <footer>
            <button onClick={() => this.handleTabs("all")}>All</button>
            <button onClick={() => this.handleTabs("active")}>Active</button>
            <button onClick={() => this.handleTabs("completed")}>
              Completed
            </button>
            <button className="red" onClick={this.clearAll}>
              Clear All
            </button>
          </footer>
        </div>
      </>
    );
  }
}

function mapStateToProps({ allTodos, activeTab }) {
  function filterTodos(todos, tab) {
    switch (tab) {
      case "all":
        return todos;
      case "completed":
        return todos.filter((todo) => todo.done);
      case "active":
        return todos.filter((todo) => !todo.done);
      default:
        break;
    }
  }
  return {
    allTodos: filterTodos(allTodos, activeTab),
  };
}

export default connect(mapStateToProps)(App);
