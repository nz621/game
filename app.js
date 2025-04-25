const taskInput = document.getElementById('taskInput');
const addTaskBtn = document.getElementById('addTaskBtn');
const taskList = document.getElementById('taskList');


window.addEventListener('DOMContentLoaded', loadTasksFromStorage);

addTaskBtn.addEventListener('click', addTask);

taskInput.addEventListener('keypress', function (event) {
    if (event.key === "Enter") {
        addTask();
    }
});

function addTask() {
    const taskText = taskInput.value.trim();

    if (taskText !== "") {
        const task = {
            text: taskText,
            completed: false
        };

        addTaskToDOM(task);
        saveTaskToStorage(task);

        taskInput.value = "";
    } else {
        alert("You can't add a blank task.");
    }
}

function addTaskToDOM(task) {
    const list = document.createElement('li');

    const span = document.createElement('span');
    span.textContent = task.text;
    if (task.completed) {
        span.style.textDecoration = "line-through";
    }

    const deleteBtn = document.createElement('button');
    deleteBtn.textContent = "Delete";
    deleteBtn.classList.add('delete-btn');
    deleteBtn.addEventListener('click', function () {
        list.remove();
        deleteTaskFromStorage(task.text);
    });

    const completeBtn = document.createElement('button');
    completeBtn.textContent = "Complete";
    completeBtn.classList.add('complete-btn');
    completeBtn.addEventListener('click', function () {
        task.completed = !task.completed;
        span.style.textDecoration = task.completed ? "line-through" : "none";
        updateTaskInStorage(task.text, task.completed);
    });

    list.append(span, deleteBtn, completeBtn);
    taskList.appendChild(list);
}

function saveTaskToStorage(task) {
    let tasks = JSON.parse(localStorage.getItem('tasks')) || [];
    tasks.push(task);
    localStorage.setItem('tasks', JSON.stringify(tasks));
}

function deleteTaskFromStorage(taskText) {
    let tasks = JSON.parse(localStorage.getItem('tasks')) || [];
    tasks = tasks.filter(t => t.text !== taskText);
    localStorage.setItem('tasks', JSON.stringify(tasks));
}

function updateTaskInStorage(taskText, isCompleted) {
    let tasks = JSON.parse(localStorage.getItem('tasks')) || [];
    tasks = tasks.map(task =>
        task.text === taskText ? { ...task, completed: isCompleted } : task
    );
    localStorage.setItem('tasks', JSON.stringify(tasks));
}

function loadTasksFromStorage() {
    const tasks = JSON.parse(localStorage.getItem('tasks')) || [];
    tasks.forEach(task => {
        addTaskToDOM(task);
    });
}
