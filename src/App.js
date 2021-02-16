import React from "react";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";

import TodoList from "./components/list";
import EditTodo from "./components/edit";
import CreateTodo from "./components/create";
import "./App.css";

function App() {
  return (
    <Router>
      <nav>
        <ul>
          <li>
            <Link to="/">Todos</Link>
          </li>
          <li>
            <Link to="/create">Create Todo</Link>
          </li>
        </ul>
      </nav>
      <Route path="/" exact component={TodoList} />
      <Route path="/edit/:id" component={EditTodo} />
      <Route path="/create" component={CreateTodo} />
    </Router>
  );
}

export default App;
