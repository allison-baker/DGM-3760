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
    description: 'Create a To Do App with a data model and functions.',
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

function populateForm() {
  let dropdown = document.querySelector("#taskCategory")
  let deleteDropdown = document.querySelector("#deleteName")
  dropdown.innerHTML = "<option value=''>-Select a Category-</option>"
  deleteDropdown.innerHTML = "<option value=''>-Select a Category to Delete-</option>"

  for (let i in categories) {
    let option = document.createElement("option")
    option.value = categories[i].name
    option.textContent = categories[i].name
    dropdown.appendChild(option)
  }
  for (let i in categories) {
    let option = document.createElement("option")
    option.value = categories[i].name
    option.textContent = categories[i].name
    deleteDropdown.appendChild(option)
  }
}

populateForm()

function populateDOM() {
  let gallery = document.querySelector("#gallery")
  gallery.innerHTML = ""

  for (let i in tasks) {
    let box = document.createElement("article")
    let text = document.createElement("div")
    let title = document.createElement("h2")
    let details = document.createElement("p")
    let date = document.createElement("h3")
    let category = document.createElement("h4")
    let deleteBtn = document.createElement("button")

    box.classList.add("taskBox")
    box.id = tasks[i].ID
    box.style.borderColor = tasks[i].category.color

    title.textContent = tasks[i].name

    details.textContent = tasks[i].description

    date.textContent = `Due Date: ${tasks[i].dueDate}`
    date.style.borderColor = tasks[i].category.color

    category.textContent = `Category: ${tasks[i].category.name}`
    category.style.color = tasks[i].category.color

    deleteBtn.style.backgroundColor = tasks[i].category.color
    deleteBtn.onclick = function() {removeTask(tasks[i].ID)}
    deleteBtn.innerHTML = '<i class="fa-solid fa-trash-can fa-lg" style="color: #ffffff;"></i>'

    text.appendChild(title)
    text.appendChild(details)
    text.appendChild(date)
    text.appendChild(category)

    box.appendChild(text)
    box.appendChild(deleteBtn)

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
    ID: tasks[tasks.length - 1].ID + 1,
    dueDate: data.taskDate,
    description: data.taskDescription,
    category: userCategory,
  }

  tasks.push(newTask)
  console.log(tasks)
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
    ID: categories[categories.length - 1].ID + 1,
  }
  categories.push(newCategory)
  populateForm()
}

let removedTasks = []

function removeTask(removeID) {
  for (let i in tasks) {
    if (tasks[i].ID === removeID) {
      tasks[i].status = true
      removedTasks.push(tasks[i])
      tasks = tasks.filter((task) => task.ID != removeID)
      populateDOM()
      break
    }
  }
}

const deleteForm = document.querySelector("#deleteCategory")
deleteForm.addEventListener("submit", (event) => {
  event.preventDefault()
  new FormData(deleteForm)
})

deleteForm.addEventListener("formdata", (event) => {
  const data = event.formData
  let deleteData = {}
  for (const [key, value] of data) {
    deleteData[key] = value
  }
  deleteCategory(deleteData)
  deleteForm.reset()
})

let removedCategories = []

function deleteCategory(data) {
  for (let i=0; i<categories.length; i++) {
    if (categories[i].name === data.deleteName) {
      removedCategories.push(categories[i])
      console.log(removedCategories)
      categories = categories.filter((category) => category.ID != categories[i].ID)
      populateForm()
      break
    }
  }
}
