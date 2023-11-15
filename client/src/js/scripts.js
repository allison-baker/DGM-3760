let currentCategory = "all";

let colors = [
  {
    name: "Red",
    class: "border-red-800",
    id: 0,
  },
  {
    name: "Amber",
    class: "border-amber-600",
    id: 1,
  },
  {
    name: "Yellow",
    class: "border-yellow-400",
    id: 2,
  },
  {
    name: "Lime",
    class: "border-lime-500",
    id: 3,
  },
  {
    name: "Green",
    class: "border-green-900",
    id: 4,
  },
  {
    name: "Sky",
    class: "border-sky-400",
    id: 5,
  },
  {
    name: "Blue",
    class: "border-blue-800",
    id: 6,
  },
  {
    name: "Violet",
    class: "border-violet-400",
    id: 7,
  },
  {
    name: "Purple",
    class: "border-purple-900",
    id: 8,
  },
  {
    name: "Fuschia",
    class: "border-fuschia-400",
    id: 9,
  },
  {
    name: "Pink",
    class: "border-pink-500",
    id: 10,
  },
  {
    name: "Brown",
    class: "border-amber-950",
    id: 11,
  },
];

/* Get todos and categories from back end and populate DOM */
async function getData() {
  let todosPromise = fetch("/api/todos");
  let categoriesPromise = fetch("/api/categories");

  Promise.all([todosPromise, categoriesPromise])
    .then((respsArray) => {
      return Promise.all(respsArray.map((data) => data.json()));
    })
    .then(([todos, cats]) => {
      populateDOM(todos, currentCategory);
      populateDropdown(cats);
    });
}

// POPULATE THE DOM

/* Itinital function call */
getData();

/* Select important elements */
let container = document.querySelector("#todoContainer");
let current = document.querySelector("#currentlyShowing");
let tasksLeft = document.querySelector("#tasksLeft");

/* Count how many todos are incomplete */
function getCount(array) {
  let count = 0;
  array.forEach((item) => {
    if (item.status === false) count++;
  });
  return count;
}

/* Create a div for each todo that has all styling and the buttons within, and insert into the todo container */
function populateDOM(todos, sortCategory) {
  container.innerHTML = "";

  let sortedTodos = [];
  if (currentCategory === "all") sortedTodos = todos;
  else
    sortedTodos = todos.filter(
      (todo) => todo.category.id === Number(sortCategory)
    );

  sortedTodos.forEach((todo) => {
    const complete = todo.status ? " todoComplete" : "";
    const categoryExists =
      todo.category.name === "None" ? " categoryExists" : "";

    const li = `<div class="border-l-8 ${todo.category.color.class}${complete}${categoryExists} my-2 bg-slate-100 rounded-md flex justify-between" data-todoid="${todo.id}">
                  <section>
                    <p class="p-3 cursor-pointer" contenteditable="true">${todo.title}</p>
                    <input type="text" value="" class="p-2 rounded-md m-2 hidden" />
                  </section>
                  <section class="text-white rounded-md cursor-pointer grid gap-0 grid-cols-2">
                    <button id="editBtn" class="bg-emerald-600 text-center m-0 p-3"><i class="fa fa-edit"></i></button>
                    <button id="deleteBtn" class="bg-rose-600 text-center m-0 p-3 rounded-r-md"><i class="fa fa-trash"></i></button>
                  </section>
                </div>`;

    container.insertAdjacentHTML("beforeend", li);
  });

  // Update the todos left to complete
  tasksLeft.innerHTML = `Tasks left to complete: <span class="font-bold">${getCount(
    sortedTodos
  )}</span>`;

  // Update the currently showing text to reflect a change in filtering by category
  current.textContent = `Currently showing: ${sortCategory} todos.`;
}

let selectCategory = document.querySelector("#todoCategory");
let sortSelection = document.querySelector("#sortSelect");
let deleteSelection = document.querySelector("#deleteSelect");

/* Dynamically populate the category dropdowns so if the user adds/deletes categories it updates */
function populateDropdown(categories) {
  selectCategory.innerHTML = "<option value=''>--Select Category--</option>";
  sortSelection.innerHTML =
    "<option value='all'>--Filter by Category--</option>";
  deleteSelection.innerHTML = "<option value=''>--Delete a Category--</option";

  categories.forEach((category) => {
    let option = `<option value="${category.id}">${category.name}</option>`;
    selectCategory.insertAdjacentHTML("beforeend", option);
    sortSelection.insertAdjacentHTML("beforeend", option);
    deleteSelection.insertAdjacentHTML("beforeend", option);
  });
}

let colorDropdown = document.querySelector("#colorDropdown");

/* Populate color dropdown for creating a new category */
function populateColors() {
  colorDropdown.innerHTML = '<option value="">--Select Color--</option>';
  colors.forEach((color) => {
    let option = `<option value="${color.id}">${color.name}</option>`;
    colorDropdown.insertAdjacentHTML("beforeend", option);
  });
}

populateColors();

// SELECT ELEMENTS
let textInput = document.querySelector("#todoName");
let createBtn = document.querySelector("#createBtn");

/* Event listener for create button */
createBtn.addEventListener("click", () => {
  addTodo(textInput.value, selectCategory.value);
  textInput.value = "";
  selectCategory.value = "";
  getData();
});

/* Event listener for enter key in input field */
textInput.addEventListener("keyup", (event) => {
  if (event.keyCode === 13) {
    addTodo(textInput.value, selectCategory.value);
    textInput.value = "";
    selectCategory.value = "";
    getData();
  }
});

// CREATE A NEW TODO

/* Add new todo object to the array */
async function addTodo(title, category) {
  fetch("/api/todo", {
    method: "POST",
    headers: {
      "Content-Type": "application/json;charset=utf-8",
    },
    body: JSON.stringify({
      title,
      category,
    }),
  })
    .then((res) => res.json())
    .then(getData());
}

// CLICK HANDLER FOR THE ENTIRE TODO LIST - HANDLE EDIT, DELETE, AND TOGGLE

container.addEventListener("click", (event) => {
  let item = event.target;
  let selectedTodo = Number(item.closest("div").dataset.todoid);

  // Toggle todo status if clicked anything but a button
  if (item.localName != "button" && item.localName != "i" && item.localName != "p") {
    toggleStatus(selectedTodo);
    return;
  }

  // Determine if a button or the icon within was clicked
  let buttonType;
  if (item.localName === "button") buttonType = item;
  else if (item.localName === "i") buttonType = item.closest("button");

  // Determine which button was clicked and run appropriate function
  if (buttonType.id === "editBtn") editTodo(selectedTodo);
  else if (buttonType.id === "deleteBtn") deleteTodo(selectedTodo);
});

// TOGGLE TODO STATUS

function toggleStatus(clickedId) {
  fetch("/api/todo/status", {
    method: "PUT",
    headers: {
      "Content-Type": "application/json;charset=utf-8",
    },
    body: JSON.stringify({
      id: clickedId,
    }),
  })
    .then((res) => res.json())
    .then((data) => populateDOM(data, currentCategory));
}

// TOGGLE EXTRA FORMS

let extraForms = document.querySelector("#extraForms");
let toggleBtn = document.querySelector("#toggleForms");

/* Change text content on button depending on if the content is shown or not */
toggleBtn.addEventListener("click", () => {
  extraForms.classList.toggle("hidden");
  if (extraForms.classList.contains("hidden")) {
    toggleBtn.textContent = "More";
  } else {
    toggleBtn.textContent = "Less";
  }
});

// DELETE A TODO

/* Remove the selected todo from the todos array */
function deleteTodo(removeID) {
  fetch("/api/todo", {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json;charset=utf-8",
    },
    body: JSON.stringify({
      id: removeID,
    }),
  })
    .then((res) => res.json())
    .then((data) => populateDOM(data, currentCategory));
}

// DELETE ALL DONE TODOS

let clearAll = document.querySelector("#clearDone");

/* Remove all todos with a status of complete */
clearAll.addEventListener("click", () => {
  fetch("/api/todo/status", {
    method: "DELETE",
  })
    .then((res) => res.json())
    .then((data) => populateDOM(data, currentCategory));
});

// TODO: EDIT A TODO
// textInput and selectCategory and createBtn
let editTodoBtn = document.querySelector("#editTodoBtn");

/* Get todos, find the todo to edit, change the button, and call the edit function */
function editTodo(editId) {
  console.log(editId);
}

// SORT BY CATEGORY

let sortBtn = document.querySelector("#selectBtn");
let showAllBtn = document.querySelector("#showAllBtn");

/* Event listener for the sort button to change the current selected category and repopulate the DOM */
sortBtn.addEventListener("click", () => {
  currentCategory = sortSelection.value;
  sortSelection.value = "all";
  getData();
});

/* Event listener for the show all button to change the current selected category to all and repopulate the DOM */
showAllBtn.addEventListener("click", () => {
  currentCategory = "all";
  getData();
});

// TODO: EDIT A CATEGORY

// DELETE A CATEGORY

let deleteCategory = document.querySelector("#deleteBtn");

/* Push deleted category to removed categories array, remove from original categories array */
deleteCategory.addEventListener("click", () => {
  let deleteId = deleteSelection.value;
  fetch("/api/category", {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json;charset=utf-8",
    },
    body: JSON.stringify({
      id: deleteId,
    }),
  })
    .then((res) => res.json())
    .then((data) => {
      populateDOM(data[0], currentCategory);
      populateDropdown(data[1]);
    });

  deleteSelection.value = "";
});

// CREATE A NEW CATEGORY

let newName = document.querySelector("#newCatName");
let newCatBtn = document.querySelector("#newCatBtn");

newCatBtn.addEventListener("click", () => {
  fetch("/api/category", {
    method: "POST",
    headers: {
      "Content-Type": "application/json;charset=utf-8",
    },
    body: JSON.stringify({
      name: newName.value,
      color: colors[Number(colorDropdown.value)],
    }),
  })
    .then((res) => res.json())
    .then(getData());

  newName.value = "";
  colorDropdown.value = "";
});
