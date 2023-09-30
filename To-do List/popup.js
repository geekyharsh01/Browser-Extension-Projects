document.addEventListener('DOMContentLoaded', function () {
  const taskInput = document.getElementById('taskInput');
  const taskList = document.getElementById('taskList');

  loadTasks();

  taskInput.addEventListener('keyup', function (event) {
    if (event.key === 'Enter' && taskInput.value.trim() !== '') {
      addTask(taskInput.value);
      taskInput.value = '';
    }
  });

  taskList.addEventListener('change', function (event) {
    if (event.target.tagName === 'INPUT') {
      const listItem = event.target.parentNode;
      listItem.classList.toggle('completed');
      setTimeout(() => {
        taskList.removeChild(listItem);
        saveTasks();
      }, 2000);
    }
  });

  function addTask(taskText) {
    const listItem = document.createElement('li');
    listItem.innerHTML = `
      <input type="checkbox">
      <span>${taskText}</span>
    `;
    taskList.appendChild(listItem);
    saveTasks();
  }

  function saveTasks() {
    const tasks = [];
    const items = taskList.querySelectorAll('li');
    items.forEach(item => {
      const task = {
        text: item.querySelector('span').textContent,
        completed: item.classList.contains('completed')
      };
      tasks.push(task);
    });
    chrome.storage.sync.set({ tasks: tasks });
  }

  function loadTasks() {
    chrome.storage.sync.get('tasks', function (data) {
      if (data.tasks) {
        data.tasks.forEach(task => {
          addTask(task.text);
          if (task.completed) {
            const listItem = taskList.lastChild;
            listItem.classList.add('completed');
          }
        });
      }
    });
  }
});
