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
    li.className = 'flex items-center justify-between bg-gray-50 px-4 py-2 rounded-lg shadow-sm';
    const span = document.createElement('span');
    span.className = 'flex-1 mr-2 focus:outline-none cursor-text text-gray-700';
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
    delBtn.className = 'text-sm text-white bg-red-500 hover:bg-red-600 px-2 py-1 mx-1 rounded';
    delBtn.textContent = 'Delete';
    delBtn.onclick = () => {
      li.remove();
      saveTasks();
    };
    li.appendChild(delBtn);

    const upBtn = document.createElement('button');
    upBtn.textContent = '↑';
    upBtn.className = 'text-sm text-white bg-gray-400 hover:bg-gray-500 px-2 py-1 mx-1 rounded';
    upBtn.onclick = () => {
      if (li.previousElementSibling) {
        taskList.insertBefore(li, li.previousElementSibling);
        saveTasks();
      }
    };
    li.appendChild(upBtn);

    const downBtn = document.createElement('button');
    downBtn.textContent = '↓';
    downBtn.className = 'text-sm text-white bg-gray-400 hover:bg-gray-500 px-2 py-1 mx-1 rounded mx-2';
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
