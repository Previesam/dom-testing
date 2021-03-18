var showTask = async (e) => {
  var createTodo = (e) => {
    e.preventDefault;
    console.log(e.target.todoInput.value);
    return false 
  };
  var activeLink = document.querySelectorAll(".active");
  activeLink.forEach((el) => {
    el.classList.remove("active");
  });
  classList = e.target.classList;
  classList.toggle("active");
  var xhr = new XMLHttpRequest();
  xhr.onreadystatechange = () => {
    if (xhr.readyState == 4) {
      content.innerHTML = xhr.response;
      // window.history.replaceState("Task", "Task", "/tasks");
    }
  };

  await xhr.open("GET", "tasks/index.html", true);
  xhr.responseText = "document";
  await xhr.send();

  var tasks = JSON.parse(localStorage.getItem("tasks") || "[]");
  localStorage.setItem("tasks", JSON.stringify(tasks));

  var taskContainer = document.querySelector(".task-container");

  var updateTasks = () => {
    tasks.forEach((task) => {
      newTask(task);
    });
  };

  var handleInput = (e) => {
    if (e.target.value.length < 3) return;
    console.log(e.target.value);
  };

  var newTask = (task) => {
    var taskItem = document.createElement("div");

    taskItem.setAttribute("class", "task-header");

    var taskMenuBtn = document.createElement("p");

    taskMenuBtn.setAttribute("class", "menu-btn");

    taskMenuBtn.innerHTML = `<span></span><span></span><span></span>`;

    var textDiv = document.createElement("div");

    textDiv.classList.add("input-field");

    var newCheckbox = document.createElement("input");

    newCheckbox.setAttribute("type", "checkbox");

    newCheckbox.setAttribute("onchange", `updateStatus(event, ${task.id})`);

    textDiv.innerHTML = task.details;

    taskItem.appendChild(taskMenuBtn);

    taskItem.appendChild(textDiv);

    taskItem.appendChild(newCheckbox);

    taskContainer.appendChild(taskItem);
  };

  if (!tasks) {
    return;
  }
  updateTasks();
};

document.querySelector("form").addEventListener("submit");