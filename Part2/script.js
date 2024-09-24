function updateClock() {
    const now = new Date();
    const hours = String(now.getHours()).padStart(2, '0');
    const minutes = String(now.getMinutes()).padStart(2, '0');
    const seconds = String(now.getSeconds()).padStart(2, '0');
    document.getElementById('clock').textContent = `${hours}:${minutes}:${seconds}`;
}

document.getElementById('toggleForm').addEventListener('click', () => {
    const formContainer = document.getElementById('formContainer');
    formContainer.style.display = formContainer.style.display === 'none' ? 'block' : 'none';
});

// Handling form submission
document.getElementById('reminderForm').addEventListener('submit', (event) => {
    event.preventDefault(); // Prevent default form submission

    const hour = event.target.hour.value;
    const minute = event.target.minute.value;
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

// Supprimer la ligne du formulaire du rappel
document.querySelector('.delete-button').addEventListener('click', () => {
    const form = document.getElementById('reminderForm');
    form.reset(); // Réinitialise les champs du formulaire
    const formContainer = document.getElementById('formContainer');
    formContainer.style.display = 'none'; // Cache le formulaire
});

setInterval(updateClock, 1000);
updateClock(); // Appel initial pour afficher l'heure tout de suite
