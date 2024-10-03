// var add = document.getElementById('addToDo');     
// //add: Refers to the "Add" button that will be used to add tasks to the list.
// var input = document.getElementById('inputField');  
// //input: Refers to the input field where users type in their tasks.
// var toDoContainer = document.getElementById('toDoContainer');  
// //toDoContainer: Refers to the container (probably a div) where the tasks will be displayed after being added.

// // Add task when clicking the "Add" button or pressing Enter
// add.addEventListener('click', addItem);
// input.addEventListener('keypress', function(e) {
//     if (e.key === "Enter") {
//         addItem();
//     }
// });

// function addItem() {
//     const item = input.value.trim();
//     if (item === "") return; // Prevent adding empty tasks
//     //The function addItem is triggered. It retrieves the value from the input field, trims any extra spaces, and checks if it's empty. If the input is empty, the function stops here.


//     // Create task container
//     const task_el = document.createElement('div');
//     task_el.classList.add('task');

//     // Create content container
//     const task_content_el = document.createElement('div');
//     task_content_el.classList.add('content');
//     task_el.appendChild(task_content_el);

//     // Create input field for task
//     const task_input_el = document.createElement('input');
//     task_input_el.classList.add('text');
//     task_input_el.type = 'text';
//     task_input_el.value = item;
//     task_input_el.setAttribute('readonly', 'readonly');
//     task_content_el.appendChild(task_input_el);
//     showNotification('Task added!');
//     // Inside the task container, another div is created to hold the task content. Then, an input field is created to display the task text, and it is set to "readonly", meaning the user cannot edit it directly (unless they click "Edit").


//     // Double-click to mark task as completed
//     task_input_el.addEventListener('dblclick', function() {
//         task_input_el.style.textDecoration = task_input_el.style.textDecoration === 'line-through' ? '' : 'line-through';
//     });
//     //Double-clicking on the task text strikes it through, indicating that the task is complete. Double-clicking again will unmark it.



//     // Create actions container
//     const task_actions_el = document.createElement('div');
//     task_actions_el.classList.add('actions');
    

//     // Create Edit button
//     const task_edit_el = document.createElement('button');
//     task_edit_el.classList.add('edit', 'btn', 'btn-success');
//     task_edit_el.innerText = 'Edit';
//     task_actions_el.appendChild(task_edit_el);

//     // Create Delete button
//     const task_delete_el = document.createElement('button');
//     task_delete_el.classList.add('delete', 'btn', 'btn-danger');
//     task_delete_el.innerText = 'Delete';
//     task_actions_el.appendChild(task_delete_el);
//     // A container for buttons (actions) is created. Two buttons are added: one for editing the task and another for deleting it.


//     task_el.appendChild(task_actions_el);
//     toDoContainer.appendChild(task_el);
//      //The task container and its actions are added to the toDoContainer. 
//     // Clear input field after adding the task
//     input.value = '';

//     // Edit task
//     task_edit_el.addEventListener('click', function() {
//         if (task_edit_el.innerText.toLowerCase() === "edit") {
//             task_edit_el.innerText = "Save";
//             task_input_el.removeAttribute("readonly");
//             task_input_el.focus();
//             showNotification('Edit Task?');
//         } else {
//             task_edit_el.innerText = "Edit";
//             task_input_el.setAttribute("readonly", "readonly");
//         }
//     });
//     //When the "Edit" button is clicked, the task text becomes editable (i.e., the readonly attribute is removed). The button text changes to "Save". After making changes, clicking "Save" will revert the task text back to read-only mode.



//     // Delete task
//     task_delete_el.addEventListener('click', function() {
//         toDoContainer.removeChild(task_el);
//          showNotification('Are you sure you want to delete');
//     });
// //Clicking the "Delete" button removes the task from the toDoContainer.
//     function showNotification(message) {
//     alert(message); // Simple notification, can be enhanced with custom alerts
// }
// }


 Save tasks to localStorage after any change (Add/Edit/Delete)

Each time a task is added, edited, completed, or deleted, the function saveTasks is called to store the tasks in localStorage. This allows the browser to remember the task list even after the page is reloaded.

Code Added:

javascript

function saveTasks() {
    const tasks = [];
    document.querySelectorAll('.task .text').forEach(task => {
        tasks.push({
            content: task.value,  // Store the task content
            completed: task.style.textDecoration === 'line-through'  // Track if the task is completed
        });
    });
    localStorage.setItem('tasks', JSON.stringify(tasks));  // Save to localStorage as JSON string
}