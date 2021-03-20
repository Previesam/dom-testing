var showTask = async (e) => {
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

      if (!localStorage.getItem("tasks")) {
        var tasks = [];
        localStorage.setItem("tasks", JSON.stringify(tasks));
      }

      var tasks = JSON.parse(localStorage.getItem("tasks"));

      var taskContainer = document.querySelector(".task-container");

      var todoForm = document.querySelector("#todoForm");

      var checkbox

      var updateTaskList = (task) => {
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

      var setInitialTaskList = () => {
        tasks.forEach((task) => {
          updateTaskList(task);
        });
      };

      setInitialTaskList();

      var createTask = (event) => {
        event.preventDefault();
        if (!event.target.todoInput.value) return;
        var task = { id: 1, details: event.target.todoInput.value, done: false };
        tasks.push(task);
        localStorage.setItem("tasks", JSON.stringify(tasks));
        updateTaskList(task);
        return false
      };

      todoForm.addEventListener("submit", createTask, false);

      var handleChange = (e) => {
        if(e.target.checked) {
          console.log("Checked")
        }
        console.log("Unchecked")
      }

    }
  };
  await xhr.open("GET", "tasks/index.html", true);
  xhr.responseText = "document";
  await xhr.send();
};

var handleInput = (e) => {
  if (e.target.value.length < 3) return;
  console.log(e.target.value);
};
