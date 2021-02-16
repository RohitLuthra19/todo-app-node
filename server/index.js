const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const cors = require("cors");
const mongoose = require("mongoose");
const todoRoutes = express.Router();
const PORT = process.env.PORT || 5000;

let Todo = require("./model/todo.model");

app.use(cors());
app.use(bodyParser.json());

mongoose.connect("mongodb://127.0.0.1:27017/todos", { useNewUrlParser: true });
const connection = mongoose.connection;

connection.once("open", () => {
  console.log("Database connection successful");
});

todoRoutes.route("/").get((req, res) => {
  Todo.find((err, todos) => {
    if (err) {
      console.log(err);
    } else {
      return res.json(todos);
    }
  });
});

todoRoutes.route("/:id").get((req, res) => {
  let id = req.params.id;
  Todo.findById(id, (err, todo) => {
    res.json(todo);
  });
});

todoRoutes.route("/add").post((req, res) => {
  let todo = new Todo(req.body);
  todo
    .save()
    .then((todo) => {
      res.status(200).json({ todo: "todo added successfully" });
    })
    .catch((err) => {
      res.status(400).send("todo add failed");
    });
});

todoRoutes.route("/update/:id").post((req, res) => {
  Todo.findById(req.params.id, (err, todo) => {
    if (!todo) res.status(404).send("data is not found");
    else todo.description = req.body.description;
    todo.bucket = req.body.bucket;
    todo.done = req.body.done;

    todo
      .save()
      .then((todo) => {
        res.json("Todo updated");
      })
      .catch((err) => {
        res.status(400).send("todo update failed");
      });
  });
});

app.use("/todos", todoRoutes);

app.listen(PORT, () => {
  console.log(`Server is running on PORT: ${PORT}`);
});
