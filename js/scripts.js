let categories = [
    {
        name: "Homework",
        color: "#C75050"
    },
    {
        name: "Chores",
        color: "#97C750",
    },
    {
        name: "Work",
        color: "#50B3C7"
    },
    {
        name: "Personal",
        color: "#7236AB"
    }
]
let tasks = [
    {
        name: "Sample To Do",
        status: false,
        ID: 0,
        dueDate: "8/30/2023",
        category: categories[0],
    }
];

function addCategory() {
    console.log(categories);
}

function addTask() {
    console.log(tasks);
}

addCategory();
addTask();
