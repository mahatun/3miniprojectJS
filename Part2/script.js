// Function to update the clock and check reminders
function updateClock() {
    const now = new Date();
    const hours = String(now.getHours()).padStart(2, '0');
    const minutes = String(now.getMinutes()).padStart(2, '0');
    const seconds = String(now.getSeconds()).padStart(2, '0');
    document.getElementById('clock').textContent = `${hours}:${minutes}:${seconds}`;

    checkReminders(hours, minutes);  // Check reminders every second
}

// Check if any reminder matches the current time
function checkReminders(currentHour, currentMinute) {
    const tasks = document.querySelectorAll('#taskList li'); // Get all task items
    tasks.forEach(task => {
        const taskText = task.textContent;
        const taskTimeMatch = taskText.match(/Rappel à (\d{2}):(\d{2})/); // Extract the time from the text
        
        if (taskTimeMatch) {
            const taskHour = taskTimeMatch[1];
            const taskMinute = taskTimeMatch[2];

            // Check if the task's time matches the current time
            if (taskHour === currentHour && taskMinute === currentMinute && !task.classList.contains('alerted')) {
                task.classList.add('alerted'); // Add a flag so we don't alert multiple times
                alertTask(task);  // Show an alert and mark as done when confirmed
            }
        }
    });
}


function alertTask(task) {
    const checkbox = task.querySelector('.task-checkbox');
    const audio = document.getElementById('reminderSound');
    audio.play().catch(error => {
        console.error("Audio playback failed:", error);
    });
    alert(`It's time for your task: ${task.textContent}`);   
    checkbox.checked = true;
    audio.pause();  
    task.style.textDecoration = 'line-through'; 
}

// Handle form toggle
document.getElementById('toggleForm').addEventListener('click', () => {
    const formContainer = document.getElementById('formContainer');
    formContainer.style.display = formContainer.style.display === 'none' ? 'block' : 'none';
});

// Handling form submission
document.getElementById('reminderForm').addEventListener('submit', (event) => {
    event.preventDefault(); // Prevent default form submission

    const hour = event.target.hour.value.padStart(2, '0');
    const minute = event.target.minute.value.padStart(2, '0');
    const note = event.target.note.value;

    // Create a new list item for the task
    const taskList = document.getElementById('taskList');
    const listItem = document.createElement('li');

    // Create a checkbox
    const checkbox = document.createElement('input');
    checkbox.type = 'checkbox';
    checkbox.className = 'task-checkbox';

    // Add an event listener to the checkbox to handle marking the task as done
    checkbox.addEventListener('change', () => {
        if (checkbox.checked) {
            listItem.style.textDecoration = 'line-through'; // Mark as done
        } else {
            listItem.style.textDecoration = 'none'; // Unmark
        }
    });

    // Set the task text
    listItem.textContent = ` Rappel à ${hour}:${minute} - Note: ${note}`;
    
    // Append checkbox and text to the list item
    listItem.prepend(checkbox); // Add checkbox to the beginning of the list item

    // Append the new task to the task list
    taskList.appendChild(listItem);

    // Optionally reset the form after submission
    event.target.reset();
});

document.querySelector('.delete-button').addEventListener('click', () => {
    const form = document.getElementById('reminderForm');
    form.reset(); // Réinitialise les champs du formulaire
    const formContainer = document.getElementById('formContainer');
    formContainer.style.display = 'none'; // Cache le formulaire
});

setInterval(updateClock, 1000);
updateClock(); // Initial call to display the time right away
