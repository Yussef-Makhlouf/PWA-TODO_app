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

    // Request Notification permission
    if ('Notification' in window && 'serviceWorker' in navigator) {
        Notification.requestPermission(status => {
            console.log('Notification permission status:', status);
        });
    } else {
        console.error('Notifications or Service Worker not supported');
    }

    const showNotification = (task) => {
        if (Notification.permission === 'granted') {
            const options = {
                body: `Task "${task}" has been added.`,
                icon: '/icons/icon-192x192.png',
                vibrate: [100, 50, 100]
            };
            navigator.serviceWorker.ready.then(registration => {
                registration.showNotification('New Task Added!', options)
                .then(() => console.log('Notification shown successfully'))
                .catch(err => console.error('Error showing notification:', err));
            });
        } else {
            console.error('Notification permission not granted');
        }
    };

    addTaskButton.addEventListener('click', () => {
        const task = taskInput.value.trim();
        if (task) {
            tasks.push(task);
            saveTasks();
            renderTasks();
            taskInput.value = '';

            // Show notification when a task is added
            showNotification(task);
        }
    });

    renderTasks();
});
