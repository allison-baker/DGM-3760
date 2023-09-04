let categories = [
  {
    name: "Homework",
    color: "#C75050",
  },
  {
    name: "Chores",
    color: "#97C750",
  },
  {
    name: "Work",
    color: "#50B3C7",
  },
  {
    name: "Personal",
    color: "#7236AB",
  },
]
let tasks = [
  {
    name: "Sample To Do",
    status: false,
    ID: 0,
    dueDate: "8/30/2023",
    description: `Create a To Do App: Data model storing all the required information, functions allowing you to edit todos (status, category, due date), 
      complete todos, delete todos, add/delete categories, and add new todos.`,
    category: categories[0],
  },
  {
    name: "Sample To Do",
    status: false,
    ID: 0,
    dueDate: "8/30/2023",
    description: `Create a To Do App: Data model storing all the required information, functions allowing you to edit todos (status, category, due date), 
      complete todos, delete todos, add/delete categories, and add new todos.`,
    category: categories[1],
  },
  {
    name: "Sample To Do",
    status: false,
    ID: 0,
    dueDate: "8/30/2023",
    description: `Create a To Do App: Data model storing all the required information, functions allowing you to edit todos (status, category, due date), 
      complete todos, delete todos, add/delete categories, and add new todos.`,
    category: categories[2],
  },
  {
    name: "Sample To Do",
    status: false,
    ID: 0,
    dueDate: "8/30/2023",
    description: `Create a To Do App: Data model storing all the required information, functions allowing you to edit todos (status, category, due date), 
      complete todos, delete todos, add/delete categories, and add new todos.`,
    category: categories[3],
  },
]

function populateForm() {
  let dropdown = document.querySelector("#taskCategory")
  dropdown.innerHTML = "<option value=''>-Please Select-</option>"

  for (let i in categories) {
    let option = document.createElement("option")
    option.value = categories[i].name
    option.textContent = categories[i].name
    dropdown.appendChild(option)
  }
}

populateForm()

function populateDOM() {
  let gallery = document.querySelector("#gallery")
  gallery.innerHTML = ""

  for (let i in tasks) {
    let box = document.createElement("article")
    let title = document.createElement("h2")
    let details = document.createElement("p")
    let date = document.createElement("h3")
    let category = document.createElement("h4")
    let border = tasks[i].category.color

    box.classList.add("taskBox")
    box.style.borderColor = border

    title.textContent = tasks[i].name

    details.textContent = tasks[i].description

    date.textContent = `Due Date: ${tasks[i].dueDate}`
    date.style.borderColor = border

    category.textContent = `Category: ${tasks[i].category.name}`
    category.style.color = tasks[i].category.color

    box.appendChild(title)
    box.appendChild(details)
    box.appendChild(date)
    box.appendChild(category)
    gallery.appendChild(box)
  }
}

populateDOM()

const formElement = document.querySelector("#newTask")
formElement.addEventListener("submit", (event) => {
  event.preventDefault()
  new FormData(formElement)
})

formElement.addEventListener("formdata", (event) => {
  const data = event.formData
  let userData = {}
  for (const [key, value] of data) {
    userData[key] = value
  }
  addTask(userData)
  formElement.reset()
})

function matchCategory(userChoice) {
  for (let i in categories) {
    if (userChoice === categories[i].name) {
      return categories[i]
    }
  }
}

function addTask(data) {
  let userCategory = matchCategory(data.taskCategory)

  let newTask = {
    name: data.taskName,
    status: false,
    ID: tasks.length,
    dueDate: data.taskDate,
    description: data.taskDescription,
    category: userCategory,
  }

  tasks.push(newTask)
  populateDOM()
}

const categoryForm = document.querySelector("#newCategory")
categoryForm.addEventListener("submit", (event) => {
  event.preventDefault()
  new FormData(categoryForm)
})

categoryForm.addEventListener("formdata", (event) => {
  const data = event.formData
  let categoryData = {}
  for (const [key, value] of data) {
    categoryData[key] = value
  }
  addCategory(categoryData)
  categoryForm.reset()
})

function addCategory(data) {
  let newCategory = {
    name: data.categoryName,
    color: data.categoryColor,
  }
  categories.push(newCategory)
  populateForm()
}
