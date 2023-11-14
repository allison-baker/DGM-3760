const express = require("express");
const app = express();
const port = 3000;

const bodyParser = require("body-parser");
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(express.static('client'));

let categories = [
  {
    name: "Personal",
    color: "#7236AB",
    id: 0,
  },
  {
    name: "Homework",
    color: "#C75050",
    id: 1,
  },
  {
    name: "Work",
    color: "#50B3C7",
    id: 2,
  },
  {
    name: "Chores",
    color: "#97C750",
    id: 3,
  },
];

let todos = [
  {
    id: 0,
    title: "Meal Prep",
    category: categories[0],
    status: false,
  },
  {
    id: 1,
    title: "Finish Onboarding",
    category: categories[2],
    status: false,
  },
  {
    id: 2,
    title: "Todo App API",
    category: categories[1],
    status: false,
  },
  {
    id: 3,
    title: "Fix Sink Disposal",
    category: categories[3],
    status: false,
  },
];

/* Calculate id number - makes sure each id number is unique even if items have been added/deleted
New id number is higher than any other number currently in the array */
function getID(array) {
  let newID = 0;
  array.forEach((item) => {
    if (item.id > newID) newID = item.id;
  });
  return newID + 1;
}

/* Find a matching category in the categories array or return category none */
function matchCategory(id) {
  let match;
  categories.forEach((category) => {
    if (id === category.id) {
      match = category;
    }
  });
  if (!match) {
    match = {
      name: "None",
      color: "#170312",
      ID: -1,
    };
  }
  return match;
}

// GET TODODS
app.get("/api/todos", (req, res) => {
  res.send(todos);
});

// POST TODOS
app.post("/api/todo", (req, res) => {
  todos.push({
    id: getID(todos),
    title: req.body.title,
    category: matchCategory(Number(req.body.category)),
    status: false,
  }); 

  res.send(todos);
});

// PUT (UPDATE) TODOS
app.put("/api/todo", (req, res) => {
  todos.forEach(todo => {
    if (todo.id === req.body.id) {
      todo.title = req.body.newTitle;
      todo.category = matchCategory(req.body.newCategory);
    }
  })

  res.send(todos);
})

// DELETE TODO
app.delete("/api/todo", (req, res) => {
  todos.filter(todo => todo.id != req.body.id);

  res.send(todos);
})

// PUT (UPDATE) TODO STATUS
app.put("/api/todo/status", (req, res) => {
  todos.forEach(todo => {
    if (todo.id === req.body.id) todo.status != todo.status;
  })

  res.send(todos);
})

// UPDATE ALL CATEGORIES for each TODO
app.put("/api/todos/category", (req, res) => {
  todos.forEach(todo => {
    todo.category = matchCategory(todo.category.name);
  })

  res.send(todos);
})

// GET CATEGORIES
app.get("/api/categories", (req, res) => {
  res.send(categories);
})

// POST CATEGORIES
app.post("/api/category", (req, res) => {
  categories.push({
    id: getID(categories),
    name: req.body.name,
    color: req.body.color,
  })

  res.send(categories);
})

// PUT (UPDATE) CATEGORIES
app.put("/api/category", (req, res) => {
  categories.forEach(category => {
    if (category.id === req.body.id) {
      category.name = req.body.newName;
      category.color = req.body.newColor;
    }
  })

  res.send(categories);
})

// DELETE CATEGORIES
app.delete("/api/category", (req, res) => {
  categories.filter(category => category.id != req.body.id);

  res.send(categories);
})

// LISTEN
app.listen(port, () => {
  console.log(`Todo app listening on port ${port}`);
});
