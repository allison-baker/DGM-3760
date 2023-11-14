let currentCategory = "all";

let colors = [
  {
    name: 'Red',
    class: 'border-red-800',
    id: 0
  },
  {
    name: 'Amber',
    class: 'border-amber-600',
    id: 1
  },
  {
    name: 'Yellow',
    class: 'border-yellow-400',
    id: 2
  },
  {
    name: 'Lime',
    class: 'border-lime-500',
    id: 3
  },
  {
    name: 'Green',
    class: 'border-green-900',
    id: 4
  },
  {
    name: 'Sky',
    class: 'border-sky-400',
    id: 5
  },
  {
    name: 'Blue',
    class: 'border-blue-800',
    id: 6
  },
  {
    name: 'Violet',
    class: 'border-violet-400',
    id: 7
  },
  {
    name: 'Purple',
    class: 'border-purple-900',
    id: 8
  },
  {
    name: 'Fuschia',
    class: 'border-fuschia-400',
    id: 9
  },
  {
    name: 'Pink',
    class: 'border-pink-500',
    id: 10
  },
  {
    name: 'Brown',
    class: 'border-amber-950',
    id: 11
  },
]

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
    sortedTodos = todos.filter((todo) => todo.category.id === Number(sortCategory));

  sortedTodos.forEach((todo) => {
    const complete = todo.status ? " todoComplete" : "";
    const categoryExists =
      todo.category.name === "None" ? " categoryExists" : "";

    const li = `<div class="border-l-8 ${todo.category.color.class}${complete}${categoryExists} my-2 bg-slate-100 rounded-md flex justify-between" data-todoid="${todo.id}">
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
  colorDropdown.innerHTML = '<option value="">--Select Color--</option>'
  colors.forEach(color => {
    let option = `<option value="${color.id}">${color.name}</option>`;
    colorDropdown.insertAdjacentHTML('beforeend', option);
  })
}

populateColors();

// SELECT ELEMENTS
let textInput = document.querySelector("#todoName");
let createBtn = document.querySelector("#createBtn");

/* Event listener for create button */
createBtn.addEventListener("click", () => {
  addTodo(textInput.value, selectCategory.value);
  getData();
});

/* Event listener for enter key in input field */
textInput.addEventListener("keyup", (event) => {
  if (event.keyCode === 13) {
    addTodo(textInput.value, selectCategory.value);
    getData();
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
  if (item.localName != "button" && item.localName != "i") {
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

// TODO: TOGGLE TODO STATUS

function toggleStatus(clickedId) {
  console.log("toggle me");
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

// TODO: DELETE A TODO

let clearAll = document.querySelector("#clearDone");

/* Push to the removed todos array and remove from the current todos array */
function deleteTodo(removeID) {
  console.log("delete clicked");
}

// TODO: EDIT A TODO

function editTodo(editID) {
  console.log("edit clicked");
}

// SORT BY CATEGORY

let sortBtn = document.querySelector("#selectBtn");
let showAllBtn = document.querySelector("#showAllBtn");

/* Event listener for the sort button to change the current selected category and repopulate the DOM */
sortBtn.addEventListener("click", () => {
  currentCategory = sortSelection.value;
  getData();
});

/* Event listener for the show all button to change the current selected category to all and repopulate the DOM */
showAllBtn.addEventListener("click", () => {
  currentCategory = "all";
  getData();
});

// TODO: DELETE A CATEGORY

let deleteCategory = document.querySelector("#deleteBtn");

/* Push deleted category to removed categories array, remove from original categories array */
deleteCategory.addEventListener("click", () => {
  console.log("delete category");
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

  newName.value = '';
  colorDropdown.value = '';
});
