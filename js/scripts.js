let categories = [
  {
    name: "Homework",
    color: "#C75050",
    ID: 0,
  },
  {
    name: "Chores",
    color: "#97C750",
    ID: 1,
  },
  {
    name: "Work",
    color: "#50B3C7",
    ID: 2,
  },
  {
    name: "Personal",
    color: "#7236AB",
    ID: 3,
  },
]
let tasks = [
  {
    name: "JS To Do App",
    status: false,
    ID: 0,
    dueDate: "8/30/2023",
    description: "Create a To Do App with a data model and functions.",
    category: categories[0],
  },
  {
    name: "Clean Bathroom",
    status: false,
    ID: 1,
    dueDate: "8/30/2023",
    description: "Deep clean the bathroom: tub, sink, toilet, floors, walls.",
    category: categories[1],
  },
  {
    name: "Video Training",
    status: false,
    ID: 2,
    dueDate: "8/30/2023",
    description: "Complete ExpandShare video training; track time spent.",
    category: categories[2],
  },
  {
    name: "Hang Art",
    status: false,
    ID: 3,
    dueDate: "8/30/2023",
    description: "Buy a frame and hang the art Lana got you in Ireland.",
    category: categories[3],
  },
]

let currCategory = "all"

// POPULATING FORMS

/* Populating the drop down in the add task form based on the current categories in the categories array */
function populateForm() {
  let dropdown = document.querySelector("#taskCategory")
  dropdown.innerHTML = "<option value=''>-Select a Category-</option>"

  categories.forEach((category) => {
    let option = document.createElement("option")
    option.value = category.name
    option.textContent = category.name
    dropdown.appendChild(option)
  })
}

/* Populating the drop down in the delete category form based on the current categories in the categories array */
function populateDeleteCatForm() {
  let deleteDropdown = document.querySelector("#deleteName")
  deleteDropdown.innerHTML = "<option value=''>-Select a Category to Delete-</option>"

  categories.forEach((category) => {
    let option = document.createElement("option")
    option.value = category.name
    option.textContent = category.name
    deleteDropdown.appendChild(option)
  })
}

/* Populating the drop down in the filter by category form based on the current categories in the categories array */
function populateFilterCatForm() {
  let filterDropdown = document.querySelector("#filterName")
  filterDropdown.innerHTML = "<option value='all'>-Filter by Category-</option>"

  categories.forEach((category) => {
    let option = document.createElement("option")
    option.value = category.name
    option.textContent = category.name
    filterDropdown.appendChild(option)
  })
}

/* Populating the drop down in the edit category form based on the current categories in the categories array */
function populateSelectCatForm() {
  let editDropdown = document.querySelector("#selectName")
  editDropdown.innerHTML = "<option value=''>-Select a Category to Edit-</option>"

  categories.forEach((category) => {
    let option = document.createElement("option")
    option.value = category.name
    option.textContent = category.name
    editDropdown.appendChild(option)
  })
}

/* Call all to populate all forms when the page loads */
function populateAllForms() {
  populateForm()
  populateDeleteCatForm()
  populateFilterCatForm()
  populateSelectCatForm()
}

populateAllForms()

// POPULATE THE DOM

/* Returns the number of tasks left to complete (to be shown later in the DOM) */
function numberLeft() {
  let count = 0
  tasks.forEach((task) => {
    if (task.status === false) {
      count++
    }
  })

  return count
}

/* Create the article element that all the task information goes into */
function createBox(task) {
  let box = document.createElement("article")
  box.classList.add("taskBox")
  box.id = task.ID
  if (task.status != true) {
    box.style.borderColor = task.category.color
  }

  return box
}

/* Create the h1 element that the task title goes into */
function createTitle(task) {
  let title = document.createElement("h2")
  if (task.status === true) {
    title.innerHTML = `<del>${task.name}</del>`
  } else {
    title.textContent = task.name
  }
  title.contentEditable = true

  return title
}

/* Create the paragraph element that the task details go into */
function createDetails(task) {
  let details = document.createElement("p")
  details.textContent = task.description
  details.contentEditable = true

  return details
}

/* Create the h3 element that the task due date goes into */
function createDate(task) {
  let date = document.createElement("h3")
  date.textContent = `Due Date: ${task.dueDate}`
  if (task.status != true) {
    date.style.borderColor = task.category.color
  }
  date.contentEditable = true

  return date
}

/* Create the h4 element that the task category goes into */
function createCategory(task) {
  let category = document.createElement("h4")
  category.textContent = `Category: ${task.category.name}`
  if (task.status != true) {
    category.style.color = task.category.color
  }

  return category
}

/* Create the button element that marks a task as complete */
function createCompleteBtn(task) {
  let completeBtn = document.createElement("button")
  if (task.status != true) {
    completeBtn.style.backgroundColor = task.category.color
  }
  completeBtn.onclick = function () {
    markComplete(task.ID)
  }
  completeBtn.innerHTML = '<i class="fa-regular fa-circle-check fa-lg" style="color:#ffffff;"></i>'

  return completeBtn
}

// Not working yet
/* Create the button element that allows the user to edit a task */
/* function createEditBtn(task) {
  let editBtn = document.createElement("button")
  if (task.status != true) { editBtn.style.backgroundColor = task.category.color }
  // Edit button function onclick added
  editBtn.innerHTML = '<i class="fa-regular fa-pen-to-square fa-lg" style="color: #ffffff;"></i>'

  return editBtn
} */

/* Create the button element that deletes a task */
function createDeleteBtn(task) {
  let deleteBtn = document.createElement("button")
  if (task.status != true) {
    deleteBtn.style.backgroundColor = task.category.color
  }
  deleteBtn.onclick = function () {
    removeTask(task.ID)
  }
  deleteBtn.innerHTML = '<i class="fa-regular fa-trash-can fa-lg" style="color: #ffffff;"></i>'

  return deleteBtn
}

/* Call all the above functions and create all the HTML elements, append them to each other, and return as an article element */
function showTask(task) {
  let box = createBox(task)
  let title = createTitle(task)
  let details = createDetails(task)
  let date = createDate(task)
  let newCategory = createCategory(task)
  let completeBtn = createCompleteBtn(task)
  // let editBtn = createEditBtn(task)
  let deleteBtn = createDeleteBtn(task)

  let text = document.createElement("div")
  text.id = "textBox"

  let buttons = document.createElement("div")
  buttons.id = "buttonsBox"

  text.appendChild(title)
  text.appendChild(details)
  text.appendChild(date)
  text.appendChild(newCategory)

  buttons.appendChild(completeBtn)
  // buttons.appendChild(editBtn)
  buttons.appendChild(deleteBtn)

  box.appendChild(text)
  box.appendChild(buttons)

  return box
}

function populateDOM(categoryName) {
  let gallery = document.querySelector("#gallery")

  // Remove all the items currently in the gallery
  gallery.innerHTML = ""

  // Loop through the array of tasks, create the HTML elements, and append to the gallery
  if (categoryName === "all") {
    tasks.forEach((task) => {
      gallery.appendChild(showTask(task))
    })
  } else {
    tasks.filter(task => task.category.name === categoryName).forEach(task => {
      gallery.appendChild(showTask(task))
    })
  }

  // Calculate the number of tasks left to complete and show on the page
  let tasksLeft = document.querySelector("#tasksLeft")
  tasksLeft.textContent = numberLeft()
  let clearAll = document.querySelector("#clearTasks")
  clearAll.onclick = function () {
    clearAllTasks()
  }
}

populateDOM(currCategory)

// ADDING A TASK

/* Getting the data from the add task form as a form data object */
const formElement = document.querySelector("#newTask")
formElement.addEventListener("submit", (event) => {
  event.preventDefault()
  new FormData(formElement)
})

/* An event listener that creates a simpler data object of the key value pairs in the form every time a form data object is created with the
add task form */
formElement.addEventListener("formdata", (event) => {
  const data = event.formData
  let userData = {}
  for (const [key, value] of data) {
    userData[key] = value
  }
  addTask(userData)
  formElement.reset()
})

/* Since categories are objects and not just a string, a match in the categories array needs to be found using the selected category from the form
and then the object from the categories array can be added to the new task */
function matchCategory(userChoice) {
  let match
  if (categories.length === 0) {
    match = {
      name: "None",
      color: "#170312",
      ID: undefined,
    }
  } else
    categories.forEach((category) => {
      if (userChoice === category.name) {
        match = category
      }
    })
  return match
}

/* If a user is deleting tasks and then adding more later, using tasks.length as the new ID for new tasks won't always create a unique ID, but since all
new tasks are pushed onto the array at the end, using a number 1 higher than the last element will always make a unique ID */
function taskIndex() {
  if (tasks.length === 0) return 0
  else return tasks[tasks.length - 1].ID + 1
}

/* To create a new task:
    - the string selected for category needs to be matched with the appropriate object in the categories array
    - the name, date, and description from the form get assigned to the appropriate properties
    - the new index is created using the taskIndex function
    - the status is assigned false by default
*/
function addTask(data) {
  let userCategory = matchCategory(data.taskCategory)

  let newTask = {
    name: data.taskName,
    status: false,
    ID: taskIndex(),
    dueDate: data.taskDate,
    description: data.taskDescription,
    category: userCategory,
  }

  tasks.push(newTask)

  // Refresh the DOM to show the added task
  populateDOM(currCategory)
}

// ADDING A CATEGORY

/* Getting the data from the add category form as a form data object */
const categoryForm = document.querySelector("#newCategory")
categoryForm.addEventListener("submit", (event) => {
  event.preventDefault()
  new FormData(categoryForm)
})

/* An event listener that creates a simpler data object of the key value pairs in the form every time a form data object is created with the
add category form */
categoryForm.addEventListener("formdata", (event) => {
  const data = event.formData
  let categoryData = {}
  for (const [key, value] of data) {
    categoryData[key] = value
  }
  addCategory(categoryData)
  categoryForm.reset()
})

/* Using the same method as the taskIndex function to create a new index for the category */
function categoryIndex() {
  if (categories.length === 0) return 0
  else return categories[categories.length - 1].ID + 1
}

/* To add a category:
    - name is assigned to appropriate property
    - hex code from color picker assigned to appropriate property
    - ID found from categoryIndex function
*/
function addCategory(data) {
  let newCategory = {
    name: data.categoryName,
    color: data.categoryColor,
    ID: categoryIndex(),
  }
  categories.push(newCategory)

  // All forms that use the categories array need to be refreshed to show the new category
  populateAllForms()
}

// FILTERING BY CATEGORY

/* Getting the data from the filter by category form as a form data object */
const filterForm = document.querySelector("#filterCategory")
filterForm.addEventListener("submit", (event) => {
  event.preventDefault()
  new FormData(filterForm)
})

/* An event listener that creates a simpler data object of the key value pairs in the form every time a form data object is created with the
filter by category form */
filterForm.addEventListener("formdata", (event) => {
  const data = event.formData
  let filterData = {}
  for (const [key, value] of data) {
    filterData[key] = value
  }
  filterDOM(filterData)
  filterForm.reset()
})

/* Change the currently selected category and filter the tasks in the DOM to just show tasks of that category */
function filterDOM(data) {
  currCategory = data.filterName
  populateDOM(currCategory)
}

/* When the show all button is clicked, the current category is reassigned to "all" */
document.querySelector("#showAll").addEventListener("click", () => {
  currCategory = "all"
  populateDOM(currCategory)
})

// COMPLETING TASKS

/* Find the task in the array that matches the task that was clicked and toggle the status */
function markComplete(completeID) {
  tasks.forEach((task) => {
    if (task.ID === completeID) {
      task.status = !task.status

      // Refresh DOM to show updated task status
      populateDOM(currCategory)
    }
  })
}

// DELETING TASKS

/* Create empty array for tasks that have been deleted */
let removedTasks = []

/* Add completed tasks to the removed tasks array and reassign the tasks array to an array with only the tasks that have status
assigned to false */
function clearAllTasks() {
  tasks.forEach((task) => {
    if (task.status == true) removedTasks.push(task)
  })
  tasks = tasks.filter((task) => task.status == false)

  // Refresh DOM to show updated task list
  populateDOM(currCategory)
}

/* Loop through tasks array to find the task that matches the one that was clicked on, mark it as complete, move it to the removed tasks
array, and reassign the tasks array to an array without that task */
function removeTask(removeID) {
  tasks.forEach((task) => {
    if (task.ID === removeID) {
      task.status = true
      removedTasks.push(task)
      tasks = tasks.filter((todo) => todo.ID != removeID)

      // Refresh DOM to show updated task list
      populateDOM(currCategory)
    }
  })
}

// DELETING A CATEGORY

/* Getting the data from the delete category form as a form data object */
const deleteForm = document.querySelector("#deleteCategory")
deleteForm.addEventListener("submit", (event) => {
  event.preventDefault()
  new FormData(deleteForm)
})

/* An event listener that creates a simpler data object of the key value pairs in the form every time a form data object is created with the
delete category form */
deleteForm.addEventListener("formdata", (event) => {
  const data = event.formData
  let deleteData = {}
  for (const [key, value] of data) {
    deleteData[key] = value
  }
  deleteCategory(deleteData)
  deleteForm.reset()
})

/* Check that the category that task is associated with still exists */
function checkCategory(task) {
  for (let i = 0; i < categories.length; i++) {
    if (task.category.name === categories[i].name) {
      return true
    }
  }
  return false
}

/* If the category for that task no longer exists, reassign it to a none category */
function reassignCategories() {
  tasks.forEach((task) => {
    let categoryExists = checkCategory(task)
    if (!categoryExists) {
      task.category = {
        name: "None",
        color: "#170312",
        ID: undefined,
      }
    }
  })
}

/* Create empty array for categories that have been deleted */
let removedCategories = []

/* Using the form data, find the category in the categories array that matches the one submitted in the form. Push it onto the removed
categories array and reassign the categories array to an array without that category */
function deleteCategory(data) {
  let categoryToDelete
  categories.forEach((category) => {
    if (category.name === data.deleteName) {
      removedCategories.push(category)
      categoryToDelete = category
    }
  })
  categories = categories.filter((category) => category.ID != categoryToDelete.ID)

  // All forms that use the categories array need to be refreshed to remove the category
  populateAllForms()

  // Tasks associated with the category that just got deleted need to show category none
  reassignCategories()

  // Refresh the DOM so tasks with the category that was deleted show category not found
  populateDOM(currCategory)
}

// EDITING A CATEGORY

/* Getting the data from the select category form as a form data object */
const selectCatForm = document.querySelector("#selectCategory")
selectCatForm.addEventListener("submit", (event) => {
  event.preventDefault()
  new FormData(selectCatForm)
})

/* An event listener that creates a simpler data object of the key value pairs in the form every time a form data object is created with the
select category form */
selectCatForm.addEventListener("formdata", (event) => {
  const data = event.formData
  let selectData = {}
  for (const [key, value] of data) {
    selectData[key] = value
  }
  populateEditForm(selectData)
  selectCatForm.reset()
})

let categoryToEdit

function populateEditForm(data) {
  categories.forEach(category => {
    if (category.name === data.selectName) {
      categoryToEdit = category
    }
  })
  let nameInput = document.querySelector("#newName")
  nameInput.placeholder = categoryToEdit.name

  let colorInput = document.querySelector("#newColor")
  colorInput.value = categoryToEdit.color
}

/* Getting the data from the edit category form as a form data object */
const editCatForm = document.querySelector("#editCategory")
editCatForm.addEventListener("submit", (event) => {
  event.preventDefault()
  new FormData(editCatForm)
})

/* An event listener that creates a simpler data object of the key value pairs in the form every time a form data object is created with the
edit category form */
editCatForm.addEventListener("formdata", (event) => {
  const data = event.formData
  let editData = {}
  for (const [key, value] of data) {
    editData[key] = value
  }
  editCategory(editData)
  editCatForm.reset()
})

function editCategory(data) {
  categories.forEach(category => {
    if (category.ID === categoryToEdit.ID) {
      category.name = data.newName
      category.color = data.newColor
    }
  })
  populateAllForms()

  populateDOM(currCategory)
}
