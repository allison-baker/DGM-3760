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

let currentCategory = "all";

// SELECT ELEMENTS

let container = document.querySelector("#todoContainer");
let textInput = document.querySelector("#todoName");
let selectCategory = document.querySelector("#todoCategory");
let createBtn = document.querySelector("#createBtn");
let sortSelection = document.querySelector("#sortSelect");
let current = document.querySelector("#currentlyShowing");
let deleteSelection = document.querySelector("#deleteSelect");
let tasksLeft = document.querySelector("#tasksLeft");

/* Event listener for create button */
createBtn.addEventListener("click", () => {
  addTodo(textInput.value, selectCategory.value);
  populateDOM(todos, categories, currentCategory);
});

/* Event listener for enter key in input field */
textInput.addEventListener("keyup", (event) => {
  if (event.keyCode === 13) {
    addTodo(textInput.value, selectCategory.value);
    populateDOM(todos, categories, currentCategory);
  }
});

// CREATE A NEW TODO

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
function matchCategory(name) {
  let match;
  categories.forEach((category) => {
    if (name === category.name) {
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

/* Add new todo object to the array */
function addTodo(title, category) {
  todos.push({
    id: getID(todos),
    title,
    category: matchCategory(category),
    status: false,
  });
}

// POPULATE THE DOM

/* Count how many todos are incomplete */
function getCount(array) {
  let count = 0;
  array.forEach((item) => {
    if (item.status === false) count++;
  });
  return count;
}

/* Create a div for each todo that has all styling and the buttons within, and insert into the todo container */
function populateDOM(todos, categories, sortCategory) {
  container.innerHTML = "";

  let sortedTodos = [];
  if (currentCategory === "all") sortedTodos = todos;
  else
    sortedTodos = todos.filter((todo) => todo.category.name === sortCategory);

  sortedTodos.forEach((todo) => {
    const complete = todo.status ? "todoComplete" : "";
    const categoryExists = todo.category.name === "None" ? "categoryExists" : "";

    const li = `<div class="border-[${todo.category.color}] ${complete}  ${categoryExists} border-l-8 my-2 bg-slate-100 rounded-md flex justify-between" data-todoid="${todo.id}">
                  <section>
                    <p class="p-3 cursor-pointer">${todo.title}</p>
                    <input type="text" value="" class="p-2 rounded-md m-2 hidden" />
                  </section>
                  <section class="text-white rounded-md cursor-pointer grid gap-0 grid-cols-2">
                    <button id="editBtn" class="bg-emerald-600 text-center m-0 p-3"><i class="fa fa-edit"></i></button>
                    <button id="deleteBtn" class="bg-rose-600 text-center m-0 p-3 rounded-r-md"><i class="fa fa-trash"></i></button>
                  </section>
                </div>`;

    container.insertAdjacentHTML("beforeend", li);
  });

  // Update the categories dropdown when the DOM updates
  populateDropdown(categories);

  // Update the todos left to complete
  tasksLeft.innerHTML = `Tasks left to complete: <span class="font-bold">${getCount(
    sortedTodos
  )}</span>`;

  // Update the currently showing text to reflect a change in filtering by category
  current.textContent = `Currently showing: ${sortCategory} todos.`;
}

/* Dynamically populate the category dropdowns so if the user adds/deletes categories it updates */
function populateDropdown(categories) {
  selectCategory.innerHTML = "<option value=''>--Select Category--</option>";
  sortSelection.innerHTML =
    "<option value='all'>--Filter by Category--</option>";
  deleteSelection.innerHTML = "<option value=''>--Delete a Category--</option";

  categories.forEach((category) => {
    let option = `<option value="${category.name}">${category.name}</option>`;
    selectCategory.insertAdjacentHTML("beforeend", option);
    sortSelection.insertAdjacentHTML("beforeend", option);
    deleteSelection.insertAdjacentHTML("beforeend", option);
  });
}

/* Initial population of the DOM */
populateDOM(todos, categories, currentCategory);

// CLICK HANDLER FOR THE ENTIRE TODO LIST - HANDLE EDIT, DELETE, AND TOGGLE

container.addEventListener("click", (event) => {
  let item = event.target;
  let selectedTodo = Number(item.closest("div").dataset.todoid);
  console.log(selectedTodo);

  // Toggle todo status if clicked anything but a button
  if (item.localName != "button" && item.localName != "i") {
    toggleStatus(selectedTodo);
    return
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
  todos.forEach((todo) => {
    if (todo.id === clickedId) {
      todo.status = !todo.status;
    }
  });

  populateDOM(todos, categories, currentCategory);
}

// TOGGLE EXTRA FORMS

let extraForms = document.querySelector("#extraForms");
let toggleBtn = document.querySelector("#toggleForms");
toggleBtn.addEventListener("click", () => {
  extraForms.classList.toggle("hidden");
  if (extraForms.classList.contains("hidden")) {
    toggleBtn.textContent = "More";
  } else {
    toggleBtn.textContent = "Less";
  }
});

// DELETE A TODO

let removedTodos = [];

/* Push to the removed todos array and remove from the current todos array */
function deleteTodo(removeID) {
  console.log("delete clicked");
}

// EDIT A TODO

function editTodo(editID) {
  console.log("edit clicked");
}

// SORT BY CATEGORY

let sortBtn = document.querySelector("#selectBtn");
let showAllBtn = document.querySelector("#showAllBtn");

/* Event listener for the sort button to change the current selected category and repopulate the DOM */
sortBtn.addEventListener("click", () => {
  currentCategory = sortSelection.value;
  populateDOM(todos, categories, currentCategory);
});

/* Event listener for the show all button to change the current selected category to all and repopulate the DOM */
showAllBtn.addEventListener("click", () => {
  currentCategory = "all";
  populateDOM(todos, categories, currentCategory);
});

// DELETE A CATEGORY

let removedCategories = [];
let deleteCategory = document.querySelector("#deleteBtn");

/* Push deleted category to removed categories array, remove from original categories array */
deleteCategory.addEventListener("click", () => {
  categories.forEach((category) => {
    if (category.name === deleteSelection.value) {
      removedCategories.push(category);
      removeCategory();
      return;
    }
  });
});

/* Separate function to filter the categories array and then reassign the todo categories */
function removeCategory() {
  categories = categories.filter(
    (category) => category.name != deleteSelection.value
  );
  reassignTodos(todos);
  populateDOM(todos, categories, currentCategory);
}

/* Check all the categories of the todos and reassign if the category doesn't exist anymore */
function reassignTodos() {
  todos.forEach((todo) => {
    todo.category = matchCategory(todo.category.name);
  });
}

// CREATE A NEW CATEGORY

let newName = document.querySelector("#newCatName");
let newColor = document.querySelector("#newCatColor");
let newCatBtn = document.querySelector("#newCatBtn");

newCatBtn.addEventListener("click", () => {
  categories.push({
    name: newName.value,
    color: newColor.value,
    id: getID(categories),
  });
  newName.value = "";
  newColor.value = "#c24c8d";

  populateDropdown(categories);
});
