// Function to allow dropping of tasks
function allowDrop(event) {
  event.preventDefault();
}

// Function to handle the drag start
function drag(event) {
  event.dataTransfer.setData("text", event.target.id);
}

// Function to handle the drop event (task is moved to a new category)
function drop(event) {
  event.preventDefault();
  const data = event.dataTransfer.getData("text");
  const draggedElement = document.getElementById(data);
  const targetCategory = event.target;

  // If dropping directly onto the category's title, ignore
  if (targetCategory.tagName === 'H2' || targetCategory.className !== 'task-list') {
    return;
  }

  // Append the dragged task to the new category
  targetCategory.appendChild(draggedElement);
}

// Function to add a task to the specified category
function addTask(category) {
  const taskInput = document.getElementById(category + '-input');
  const taskText = taskInput.value.trim();

  if (taskText === '') {
    alert('Please enter a task.');
    return;
  }

  const taskList = document.getElementById(category + '-tasks');
  const taskId = new Date().getTime();  // Use timestamp as task ID for uniqueness
  const taskCard = document.createElement('div');
  taskCard.classList.add('task-card');
  taskCard.id = 'task-' + taskId;
  taskCard.setAttribute('draggable', 'true');
  taskCard.setAttribute('ondragstart', 'drag(event)');
  taskCard.innerHTML = `${taskText} <button onclick="deleteTask('${taskCard.id}')">Delete</button>`;
  
  // Add the task card to the category list
  taskList.appendChild(taskCard);
  taskInput.value = ''; // Clear input field after adding task
}

// Function to delete a task
function deleteTask(taskId) {
  const taskCard = document.getElementById(taskId);
  taskCard.remove();
}
