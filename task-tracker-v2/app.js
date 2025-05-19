document.addEventListener("DOMContentLoaded", () => {
  const taskForm = document.getElementById("task-form");
  const taskInput = document.getElementById('taskInput');
  const taskList = document.getElementById('taskList');

  function loadTasks() {
    const tasks = JSON.parse(localStorage.getItem('tasks')) || [];
    tasks.forEach((taskText, index) => {
      createTaskElement(taskText, index);
    });
  }

  function saveTasks() {
    const tasks = [];
    document.querySelectorAll('#taskList li span').forEach(span => {
      tasks.push(span.textContent);
    });
    localStorage.setItem('tasks', JSON.stringify(tasks));
  }

  function createTaskElement(text, index) {
    const li = document.createElement('li');

    const span = document.createElement('span');
    span.textContent = text;
    span.contentEditable = true;
    span.onblur = saveTasks;
    span.title = 'Click to edit the task : ' + text;
    span.onkeydown = (e) => {
      if (e.key == 'Enter') {
        e.preventDefault();
        taskInput.focus();
      }
    }
    li.appendChild(span);

    const delBtn = document.createElement('button');
    delBtn.textContent = 'Delete';
    delBtn.onclick = () => {
      li.remove();
      saveTasks();
    };
    li.appendChild(delBtn);

    const upBtn = document.createElement('button');
    upBtn.textContent = '↑';
    upBtn.onclick = () => {
      if (li.previousElementSibling) {
        taskList.insertBefore(li, li.previousElementSibling);
        saveTasks();
      }
    };
    li.appendChild(upBtn);

    const downBtn = document.createElement('button');
    downBtn.textContent = '↓';
    downBtn.onclick = () => {
      if (li.nextElementSibling) {
        taskList.insertBefore(li.nextElementSibling, li);
        saveTasks();
      }
    };
    li.appendChild(downBtn);

    taskList.appendChild(li);
  }

  function addTask() {
    const text = taskInput.value.trim();
    if (text) {
      createTaskElement(text);
      saveTasks();
      taskInput.value = '';
    }
  }

  taskForm.addEventListener("submit", (e) => {
    e.preventDefault();
    addTask();
  });

  loadTasks();
});
