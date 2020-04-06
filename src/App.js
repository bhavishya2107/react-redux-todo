import React from "react";
import { connect } from "react-redux";
import "./App.css";

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
    this.props.dispatch({ type: "add", todoInput: this.state.todoInput });
    this.setState({ todoInput: "" });
  };

  //remove todo
  deleteTodo = (id) => {
    this.props.dispatch({ type: "del", id });
  };

  //toggle todo
  toggleTodo = (id) => {
    this.props.dispatch({ type: "toggle", id });
  };

  //footer button functionality
  handleTabs = (tabs) => {
    this.props.dispatch({ type: "tabs", tabs });
  };

  clearAll = () => {
    this.props.dispatch({ type: "clearAll" });
  };

  render() {
    console.log(this.props.allTodos);
    return (
      <>
        <div className="center">
          <h1>Todo</h1>
          <input
            type="text"
            className="input_style"
            value={this.state.todoInput}
            onChange={this.handleAddTodo}
            onKeyDown={(e) => (e.keyCode === 13 ? this.addTodo() : "")}
          />
          <ul>
            {this.props.allTodos !== ""
              ? this.props.allTodos.map((todo) => {
                  return (
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
                  );
                })
              : "No todos"}
          </ul>
          <footer>
            <button onClick={() => this.handleTabs("all")}>All</button>
            <button onClick={() => this.handleTabs("active")}>Active</button>
            <button onClick={() => this.handleTabs("completed")}>
              Completed
            </button>
            <button onClick={() => this.clearAll()}>Clear All</button>
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
