document.addEventListener('DOMContentLoaded', () => {
    const taskInput = document.getElementById('new-task');
    const taskList = document.getElementById('task-list');
    const addTaskButton = document.getElementById('add-task');

    // Load tasks from localStorage
    const tasks = JSON.parse(localStorage.getItem('tasks')) || [];

    const saveTasks = () => {
        localStorage.setItem('tasks', JSON.stringify(tasks));
    };

    const renderTasks = () => {
        taskList.innerHTML = '';
        tasks.forEach((task, index) => {
            const li = document.createElement('li');
            const taskSpan = document.createElement('span');
            taskSpan.textContent = task;
            const removeButton = document.createElement('button');
            removeButton.textContent = 'Remove';
            removeButton.addEventListener('click', () => {
                tasks.splice(index, 1);
                saveTasks();
                renderTasks();
            });
            li.appendChild(taskSpan);
            li.appendChild(removeButton);
            taskList.appendChild(li);
        });
    };

    addTaskButton.addEventListener('click', () => {
        const task = taskInput.value.trim();
        if (task) {
            tasks.push(task);
            saveTasks();
            renderTasks();
            taskInput.value = '';
        }
    });

    renderTasks();
});
