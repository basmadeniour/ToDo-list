var add = document.getElementById('addToDo');     
var input = document.getElementById('inputField');  
var toDoContainer = document.getElementById('toDoContainer');  

// Add task when clicking the "Add" button or pressing Enter
add.addEventListener('click', addItem);
input.addEventListener('keypress', function(e) {
    if (e.key === "Enter") {
        addItem();
    }
});

// Load tasks from localStorage on page load
window.addEventListener('load', loadTasks);

function addItem() {
    const item = input.value.trim();
    if (item === "") return; // Prevent adding empty tasks

    // Create task container
    const task_el = document.createElement('div');
    task_el.classList.add('task');

    // Create content container
    const task_content_el = document.createElement('div');
    task_content_el.classList.add('content');
    task_el.appendChild(task_content_el);

    // Create input field for task
    const task_input_el = document.createElement('input');
    task_input_el.classList.add('text');
    task_input_el.type = 'text';
    task_input_el.value = item;
    task_input_el.setAttribute('readonly', 'readonly');
    task_content_el.appendChild(task_input_el);
    showNotification('Task added!');

    // Double-click to mark task as completed
    task_input_el.addEventListener('dblclick', function() {
        task_input_el.style.textDecoration = task_input_el.style.textDecoration === 'line-through' ? '' : 'line-through';
        saveTasks(); // Save after marking task as completed
    });

    // Create actions container
    const task_actions_el = document.createElement('div');
    task_actions_el.classList.add('actions');
    
    // Create Edit button
    const task_edit_el = document.createElement('button');
    task_edit_el.classList.add('edit', 'btn', 'btn-success');
    task_edit_el.innerText = 'Edit';
    task_actions_el.appendChild(task_edit_el);

    // Create Delete button
    const task_delete_el = document.createElement('button');
    task_delete_el.classList.add('delete', 'btn', 'btn-danger');
    task_delete_el.innerText = 'Delete';
    task_actions_el.appendChild(task_delete_el);

    task_el.appendChild(task_actions_el);
    toDoContainer.appendChild(task_el);

    // Clear input field after adding the task
    input.value = '';

    // Edit task
    task_edit_el.addEventListener('click', function() {
        if (task_edit_el.innerText.toLowerCase() === "edit") {
            task_edit_el.innerText = "Save";
            task_input_el.removeAttribute("readonly");
            task_input_el.focus();
            showNotification('Edit Task?');
        } else {
            task_edit_el.innerText = "Edit";
            task_input_el.setAttribute("readonly", "readonly");
            saveTasks(); // Save after editing the task
        }
    });

    // Delete task
    task_delete_el.addEventListener('click', function() {
        toDoContainer.removeChild(task_el);
        showNotification('Are you sure you want to delete');
        saveTasks(); // Save after deleting the task
    });

    saveTasks(); // Save the tasks after adding a new one
}

// Save tasks to localStorage
function saveTasks() {
    const tasks = [];
    document.querySelectorAll('.task .text').forEach(task => {
        tasks.push({
            content: task.value,
            completed: task.style.textDecoration === 'line-through'
        });
    });
    localStorage.setItem('tasks', JSON.stringify(tasks));
}

// Load tasks from localStorage
function loadTasks() {
    const tasks = JSON.parse(localStorage.getItem('tasks'));
    if (tasks) {
        tasks.forEach(task => {
            const item = task.content;

            // Create task container
            const task_el = document.createElement('div');
            task_el.classList.add('task');

            // Create content container
            const task_content_el = document.createElement('div');
            task_content_el.classList.add('content');
            task_el.appendChild(task_content_el);

            // Create input field for task
            const task_input_el = document.createElement('input');
            task_input_el.classList.add('text');
            task_input_el.type = 'text';
            task_input_el.value = item;
            task_input_el.setAttribute('readonly', 'readonly');
            task_content_el.appendChild(task_input_el);

            // Mark task as completed if necessary
            if (task.completed) {
                task_input_el.style.textDecoration = 'line-through';
            }

            // Double-click to mark task as completed
            task_input_el.addEventListener('dblclick', function() {
                task_input_el.style.textDecoration = task_input_el.style.textDecoration === 'line-through' ? '' : 'line-through';
                saveTasks();
            });

            // Create actions container
            const task_actions_el = document.createElement('div');
            task_actions_el.classList.add('actions');
            
            // Create Edit button
            const task_edit_el = document.createElement('button');
            task_edit_el.classList.add('edit', 'btn', 'btn-success');
            task_edit_el.innerText = 'Edit';
            task_actions_el.appendChild(task_edit_el);

            // Create Delete button
            const task_delete_el = document.createElement('button');
            task_delete_el.classList.add('delete', 'btn', 'btn-danger');
            task_delete_el.innerText = 'Delete';
            task_actions_el.appendChild(task_delete_el);

            task_el.appendChild(task_actions_el);
            toDoContainer.appendChild(task_el);

            // Edit task
            task_edit_el.addEventListener('click', function() {
                if (task_edit_el.innerText.toLowerCase() === "edit") {
                    task_edit_el.innerText = "Save";
                    task_input_el.removeAttribute("readonly");
                    task_input_el.focus();
                    showNotification('Edit Task?');
                } else {
                    task_edit_el.innerText = "Edit";
                    task_input_el.setAttribute("readonly", "readonly");
                    saveTasks();
                }
            });

            // Delete task
            task_delete_el.addEventListener('click', function() {
                toDoContainer.removeChild(task_el);
                showNotification('Are you sure you want to delete');
                saveTasks();
            });
        });
    }
}

// Simple notification function
function showNotification(message) {
    alert(message); // Simple notification, can be enhanced with custom alerts
}

