function saveTasks(tasks) {
  localStorage.setItem(TASKS_KEY, JSON.stringify(tasks));
}

function loadTasks() {
  const saved = localStorage.getItem(TASKS_KEY);
  if (!saved) return [];

  try {
    const parsed = JSON.parse(saved);
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
}

function addTask(){
    const taskInput = document.getElementById("taskInput").value;
    let taskDescription = document.getElementById("taskDescription").value;
    let taskDueDate = document.getElementById("taskDueDate").value

    if (!taskInput){
      document.getElementById("messageDisplay").textContent = "Please enter a task name.";
      return;
    }

    if (!taskDescription){
      taskDescription = "No description"
    }
    
    document.getElementById("messageDisplay").textContent = "";
    tasks.push({
      id: crypto.randomUUID(),
      taskInput: taskInput,
      taskDescription: taskDescription,
      taskDueDate: taskDueDate,
      done: false
  });
  saveTasks(tasks);
}

function renderTasks() {
  taskList.replaceChildren();
  let tasksToDo = 0;

  for (const task of tasks) {
    const item = document.createElement("div");
    const info = document.createElement("div")
    const title = document.createElement("h2");
    const description = document.createElement("p");
    const dueDate = document.createElement("p");
    const label = document.createElement("label");

    title.textContent = task.taskInput;
    description.textContent = task.taskDescription;
    dueDate.textContent = "Due: " + formatDate(task.taskDueDate);

    if (!task.done){
      tasksToDo += 1;
    }
    
    item.classList.add("task");
    item.appendChild(title);
    taskList.appendChild(item);

    const checkbox = document.createElement("input");
    checkbox.type = "checkbox";
    checkbox.checked = task.done;
    checkbox.addEventListener("change", () => {
      task.done = checkbox.checked;
      saveTasks(tasks);
      renderTasks();
    });

    const deleteButton = document.createElement("button");
    deleteButton.type = "button";
    deleteButton.textContent = "Delete";
    deleteButton.classList.add("delete")
    deleteButton.addEventListener("click", () => {
      tasks = tasks.filter((item) => item.id !== task.id);
      saveTasks(tasks);
      renderTasks();
    });

    item.className = "task";
    item.className = task.done ? "task done" : "task";
    
    info.className = "task-info";
    title.className = "task-title";
    description.className = "task-description";
    dueDate.className = "task-duedate"

    info.append(title, description, dueDate);
    label.append(checkbox, info, deleteButton);
    item.append(label);
    taskList.append(item);
  }

  if (tasksToDo === 1){
    document.getElementById("todo").textContent = "You have 1 incomplete task."
  } else {
    document.getElementById("todo").textContent = "You have " + tasksToDo + " incomplete tasks."
    saveTasks(tasks);
  }
}

function formatDate(dateString) {
    if (!dateString) {
        return "No due date";
    }

    const date = new Date(dateString + "T00:00:00");

    if (isNaN(date.getTime())) {
        return "Invalid date";
    }

    return date.toLocaleDateString("en-GB", {
        day: "numeric",
        month: "long",
        year: "numeric"
    });
}

  const TASKS_KEY = "personal-dashboard-tasks";
  const inputForm = document.getElementById("addTask");
  const taskList = document.getElementById("taskList");

  let tasks = loadTasks();
  renderTasks();

  inputForm.addEventListener("submit", function(event) {
      event.preventDefault();
      addTask();
      renderTasks();
      inputForm.reset();
  });

saveTasks(tasks);