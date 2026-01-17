/**
 * To Do List Application - JavaScript File
 * Main application logic for task management
 */

// ===== DOM ELEMENTS =====
const taskInput = document.getElementById('taskInput');
const addBtn = document.getElementById('addBtn');
const taskList = document.getElementById('taskList');
const emptyState = document.getElementById('emptyState');
const filterBtns = document.querySelectorAll('.filter-btn');
const totalTasksEl = document.getElementById('totalTasks');
const completedTasksEl = document.getElementById('completedTasks');
const pendingTasksEl = document.getElementById('pendingTasks');
const highPriorityTasksEl = document.getElementById('highPriorityTasks');
const priorityOptions = document.querySelectorAll('.priority-option');
const exportBtn = document.getElementById('exportBtn');
const importBtn = document.getElementById('importBtn');
const viewFileBtn = document.getElementById('viewFileBtn');
const clearAllBtn = document.getElementById('clearAllBtn');
const currentFileName = document.getElementById('currentFileName');
const fileModal = document.getElementById('fileModal');
const closeModal = document.getElementById('closeModal');
const closeModalBtn = document.getElementById('closeModalBtn');
const copyJsonBtn = document.getElementById('copyJsonBtn');
const jsonPreview = document.getElementById('jsonPreview');
const helpLink = document.getElementById('helpLink');
const aboutLink = document.getElementById('aboutLink');
const backupLink = document.getElementById('backupLink');
const helpModal = document.getElementById('helpModal');
const closeHelpModal = document.getElementById('closeHelpModal');
const aboutModal = document.getElementById('aboutModal');
const closeAboutModal = document.getElementById('closeAboutModal');
const modalTabs = document.querySelectorAll('.modal-tab');
const tabContents = document.querySelectorAll('.tab-content');
const faqItems = document.querySelectorAll('.faq-item');
const currentYear = document.getElementById('currentYear');
const copyrightYear = document.getElementById('copyrightYear');

// ===== APPLICATION STATE =====
let tasks = [];
let currentFilter = 'all';
let currentPriority = 'medium';
const DATA_FILE_NAME = 'todo_list_tasks.json';

// ===== INITIALIZATION =====
/**
 * Initialize the application when DOM is loaded
 */
function initApp() {
    // Set current year in footer
    const year = new Date().getFullYear();
    currentYear.textContent = year;
    copyrightYear.textContent = year;
    
    // Load tasks from local storage
    loadTasksFromStorage();
    
    // Set up event listeners
    setupEventListeners();
    
    // Update UI with loaded data
    updateStats();
    renderTasks();
    
    // Set focus to input field
    taskInput.focus();
}

// ===== EVENT LISTENERS SETUP =====
/**
 * Set up all event listeners for the application
 */
function setupEventListeners() {
    // Add task button
    addBtn.addEventListener('click', addTask);
    
    // Enter key in input field
    taskInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
            addTask();
        }
    });
    
    // Filter buttons
    filterBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            // Update active button
            filterBtns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            
            // Update filter and render tasks
            currentFilter = btn.getAttribute('data-filter');
            renderTasks();
        });
    });
    
    // Priority options
    priorityOptions.forEach(option => {
        option.addEventListener('click', () => {
            priorityOptions.forEach(opt => opt.classList.remove('active'));
            option.classList.add('active');
            currentPriority = option.getAttribute('data-priority');
        });
    });
    
    // Export button
    exportBtn.addEventListener('click', exportToJsonFile);
    
    // Import button
    importBtn.addEventListener('click', importFromJsonFile);
    
    // View file button
    viewFileBtn.addEventListener('click', showJsonPreview);
    
    // Clear all button
    clearAllBtn.addEventListener('click', clearAllTasks);
    
    // Modal buttons
    closeModal.addEventListener('click', () => fileModal.classList.remove('active'));
    closeModalBtn.addEventListener('click', () => fileModal.classList.remove('active'));
    
    // Copy JSON button
    copyJsonBtn.addEventListener('click', copyJsonToClipboard);
    
    // Help modal
    helpLink.addEventListener('click', (e) => {
        e.preventDefault();
        helpModal.classList.add('active');
    });
    
    closeHelpModal.addEventListener('click', () => helpModal.classList.remove('active'));
    
    // About modal
    aboutLink.addEventListener('click', (e) => {
        e.preventDefault();
        aboutModal.classList.add('active');
    });
    
    closeAboutModal.addEventListener('click', () => aboutModal.classList.remove('active'));
    
    // Backup link
    backupLink.addEventListener('click', (e) => {
        e.preventDefault();
        showNotification('Auto-backup feature will be available in the next version!', 'info');
    });
    
    // Close modals on overlay click
    document.querySelectorAll('.modal-overlay').forEach(modal => {
        modal.addEventListener('click', (e) => {
            if (e.target === modal) {
                modal.classList.remove('active');
            }
        });
    });
    
    // Modal tabs
    modalTabs.forEach(tab => {
        tab.addEventListener('click', () => {
            const tabId = tab.getAttribute('data-tab');
            
            // Update active tab
            modalTabs.forEach(t => t.classList.remove('active'));
            tab.classList.add('active');
            
            // Show corresponding content
            tabContents.forEach(content => {
                content.classList.remove('active');
                if (content.id === tabId) {
                    content.classList.add('active');
                }
            });
        });
    });
    
    // FAQ accordion
    faqItems.forEach(item => {
        const question = item.querySelector('.faq-question');
        question.addEventListener('click', () => {
            item.classList.toggle('active');
        });
    });
    
    // Keyboard shortcuts
    document.addEventListener('keydown', (e) => {
        // Close modals with Escape key
        if (e.key === 'Escape') {
            document.querySelectorAll('.modal-overlay.active').forEach(modal => {
                modal.classList.remove('active');
            });
        }
        
        // Quick add with Ctrl+Enter or Cmd+Enter
        if ((e.ctrlKey || e.metaKey) && e.key === 'Enter') {
            addTask();
        }
        
        // Focus search with Ctrl+F or Cmd+F
        if ((e.ctrlKey || e.metaKey) && e.key === 'f') {
            e.preventDefault();
            taskInput.focus();
        }
    });
}

// ===== TASK MANAGEMENT FUNCTIONS =====
/**
 * Add a new task to the list
 */
function addTask() {
    const text = taskInput.value.trim();
    
    if (text === '') {
        showNotification('Please enter a task!', 'warning');
        taskInput.focus();
        return;
    }
    
    // Create task object
    const task = {
        id: Date.now() + Math.random(), // Unique ID
        text: text,
        completed: false,
        priority: currentPriority,
        createdAt: new Date().toISOString(),
        dueDate: null
    };
    
    // Add to tasks array
    tasks.push(task);
    
    // Save to local storage
    saveTasksToStorage();
    
    // Clear input
    taskInput.value = '';
    
    // Update UI
    updateStats();
    renderTasks();
    
    // Hide empty state
    emptyState.classList.remove('show');
    
    // Show confirmation
    showNotification('Task added successfully!', 'success');
    
    // Pulse animation on stats
    pulseAnimation(totalTasksEl);
}

/**
 * Toggle task completion status
 * @param {number} id - Task ID to toggle
 */
function toggleTask(id) {
    tasks = tasks.map(task => {
        if (task.id === id) {
            return { ...task, completed: !task.completed };
        }
        return task;
    });
    
    saveTasksToStorage();
    updateStats();
    renderTasks();
    
    // Show encouragement message for every 5 completed tasks
    const completed = tasks.filter(task => task.completed).length;
    if (completed % 5 === 0 && completed > 0) {
        showNotification(`Great job! You've completed ${completed} tasks!`, 'success');
    }
}

/**
 * Delete a task from the list
 * @param {number} id - Task ID to delete
 */
function deleteTask(id) {
    if (!confirm('Are you sure you want to delete this task?')) {
        return;
    }
    
    tasks = tasks.filter(task => task.id !== id);
    
    saveTasksToStorage();
    updateStats();
    renderTasks();
    
    // Show empty state if no tasks
    if (tasks.length === 0) {
        emptyState.classList.add('show');
    }
    
    showNotification('Task deleted!', 'info');
}

/**
 * Edit an existing task
 * @param {number} id - Task ID to edit
 */
function editTask(id) {
    const task = tasks.find(task => task.id === id);
    if (!task) return;
    
    const newText = prompt('Edit your task:', task.text);
    if (newText !== null && newText.trim() !== '') {
        task.text = newText.trim();
        
        // Ask for priority update
        const newPriority = prompt('Update priority (low, medium, high):', task.priority);
        if (newPriority && ['low', 'medium', 'high'].includes(newPriority.toLowerCase())) {
            task.priority = newPriority.toLowerCase();
        }
        
        saveTasksToStorage();
        renderTasks();
        showNotification('Task updated!', 'success');
    }
}

/**
 * Clear all tasks from the list
 */
function clearAllTasks() {
    if (tasks.length === 0) {
        showNotification('No tasks to clear!', 'info');
        return;
    }
    
    if (confirm('Are you sure you want to delete ALL tasks? This action cannot be undone.')) {
        tasks = [];
        saveTasksToStorage();
        updateStats();
        renderTasks();
        emptyState.classList.add('show');
        showNotification('All tasks have been cleared!', 'info');
    }
}

// ===== TASK RENDERING =====
/**
 * Render tasks to the DOM based on current filter
 */
function renderTasks() {
    // Filter tasks based on current filter
    let filteredTasks = tasks;
    
    switch(currentFilter) {
        case 'pending':
            filteredTasks = tasks.filter(task => !task.completed);
            break;
        case 'completed':
            filteredTasks = tasks.filter(task => task.completed);
            break;
        case 'high':
            filteredTasks = tasks.filter(task => task.priority === 'high');
            break;
        default:
            filteredTasks = tasks;
    }
    
    // Clear task list
    taskList.innerHTML = '';
    
    // Show empty state if no tasks
    if (filteredTasks.length === 0) {
        emptyState.classList.add('show');
        return;
    }
    
    // Hide empty state
    emptyState.classList.remove('show');
    
    // Add tasks to list
    filteredTasks.forEach(task => {
        const taskItem = document.createElement('li');
        taskItem.className = `task-item ${task.completed ? 'completed' : ''} ${task.priority === 'high' ? 'high-priority' : ''}`;
        
        // Format date
        const date = new Date(task.createdAt);
        const formattedDate = date.toLocaleDateString('en-US', { 
            month: 'short', 
            day: 'numeric',
            year: date.getFullYear() !== new Date().getFullYear() ? 'numeric' : undefined
        });
        
        taskItem.innerHTML = `
            <input type="checkbox" class="task-checkbox" ${task.completed ? 'checked' : ''}>
            <div class="task-content">
                <div class="task-text">${escapeHtml(task.text)}</div>
                <div class="task-meta">
                    <span class="task-priority priority-${task.priority}">
                        <i class="fas fa-flag"></i> ${task.priority} priority
                    </span>
                    <span><i class="far fa-calendar"></i> Added: ${formattedDate}</span>
                    ${task.completed ? '<span><i class="fas fa-check-circle"></i> Completed</span>' : ''}
                </div>
            </div>
            <div class="task-actions">
                <button class="task-action-btn edit-btn" title="Edit task">
                    <i class="fas fa-edit"></i>
                </button>
                <button class="task-action-btn delete-btn" title="Delete task">
                    <i class="fas fa-trash"></i>
                </button>
            </div>
        `;
        
        // Add event listeners
        const checkbox = taskItem.querySelector('.task-checkbox');
        checkbox.addEventListener('change', () => toggleTask(task.id));
        
        const editBtn = taskItem.querySelector('.edit-btn');
        editBtn.addEventListener('click', () => editTask(task.id));
        
        const deleteBtn = taskItem.querySelector('.delete-btn');
        deleteBtn.addEventListener('click', () => deleteTask(task.id));
        
        taskList.appendChild(taskItem);
    });
}

// ===== STATISTICS FUNCTIONS =====
/**
 * Update statistics display
 */
function updateStats() {
    const total = tasks.length;
    const completed = tasks.filter(task => task.completed).length;
    const pending = total - completed;
    const highPriority = tasks.filter(task => task.priority === 'high').length;
    
    totalTasksEl.textContent = total;
    completedTasksEl.textContent = completed;
    pendingTasksEl.textContent = pending;
    highPriorityTasksEl.textContent = highPriority;
}

// ===== STORAGE MANAGEMENT FUNCTIONS =====
/**
 * Load tasks from local storage
 */
function loadTasksFromStorage() {
    try {
        const storedData = localStorage.getItem(DATA_FILE_NAME);
        if (storedData) {
            const parsedData = JSON.parse(storedData);
            
            // Check if it's an array
            if (Array.isArray(parsedData)) {
                tasks = parsedData;
                showNotification(`Loaded ${tasks.length} tasks from storage`, 'success');
            } else if (parsedData.tasks && Array.isArray(parsedData.tasks)) {
                tasks = parsedData.tasks;
                showNotification(`Loaded ${tasks.length} tasks from storage`, 'success');
            } else {
                tasks = [];
                showNotification('Invalid data format in storage. Starting fresh.', 'warning');
            }
        } else {
            tasks = [];
            // Create initial storage
            saveTasksToStorage();
        }
    } catch (error) {
        console.error('Error loading tasks:', error);
        tasks = [];
        showNotification('Error loading tasks. Starting fresh.', 'error');
    }
}

/**
 * Save tasks to local storage
 */
function saveTasksToStorage() {
    try {
        const dataToSave = {
            version: '1.0',
            generatedAt: new Date().toISOString(),
            totalTasks: tasks.length,
            completedTasks: tasks.filter(task => task.completed).length,
            tasks: tasks
        };
        
        localStorage.setItem(DATA_FILE_NAME, JSON.stringify(dataToSave, null, 2));
        
        // Update filename display
        const timestamp = new Date().toISOString().slice(0, 10).replace(/-/g, '');
        currentFileName.textContent = `todo_list_${timestamp}.json`;
        
    } catch (error) {
        console.error('Error saving tasks:', error);
        showNotification('Error saving tasks to storage!', 'error');
    }
}

// ===== FILE MANAGEMENT FUNCTIONS =====
/**
 * Export tasks to a JSON file
 */
function exportToJsonFile() {
    if (tasks.length === 0) {
        showNotification('No tasks to export!', 'warning');
        return;
    }
    
    try {
        const dataToExport = {
            version: '1.0',
            generatedAt: new Date().toISOString(),
            totalTasks: tasks.length,
            completedTasks: tasks.filter(task => task.completed).length,
            tasks: tasks
        };
        
        const jsonString = JSON.stringify(dataToExport, null, 2);
        const timestamp = new Date().toISOString().slice(0, 10).replace(/-/g, '');
        const fileName = `todo_list_${timestamp}.json`;
        
        // Create download link
        const blob = new Blob([jsonString], { type: 'application/json' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = fileName;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        URL.revokeObjectURL(url);
        
        showNotification(`Tasks exported to ${fileName}`, 'success');
    } catch (error) {
        console.error('Error exporting tasks:', error);
        showNotification('Error exporting tasks!', 'error');
    }
}

/**
 * Import tasks from a JSON file
 */
function importFromJsonFile() {
    // Create file input element
    const input = document.createElement('input');
    input.type = 'file';
    input.accept = '.json';
    
    input.onchange = function(event) {
        const file = event.target.files[0];
        if (!file) return;
        
        const reader = new FileReader();
        reader.onload = function(e) {
            try {
                const fileContent = e.target.result;
                const parsedData = JSON.parse(fileContent);
                
                let importedTasks = [];
                
                // Handle different JSON structures
                if (Array.isArray(parsedData)) {
                    importedTasks = parsedData;
                } else if (parsedData.tasks && Array.isArray(parsedData.tasks)) {
                    importedTasks = parsedData.tasks;
                } else {
                    showNotification('Invalid JSON format. File must contain a tasks array.', 'error');
                    return;
                }
                
                // Validate each task has required fields
                const validTasks = importedTasks.filter(task => 
                    task.text !== undefined && 
                    typeof task.text === 'string'
                );
                
                if (validTasks.length === 0) {
                    showNotification('No valid tasks found in the file.', 'warning');
                    return;
                }
                
                // Ask user what to do
                const action = confirm(`Found ${validTasks.length} valid tasks. Replace current tasks? (Cancel to merge)`);
                
                if (action) {
                    // Replace
                    tasks = validTasks.map(task => ({
                        ...task,
                        id: task.id || Date.now() + Math.random(),
                        completed: task.completed || false,
                        priority: task.priority || 'medium',
                        createdAt: task.createdAt || new Date().toISOString()
                    }));
                } else {
                    // Merge
                    const existingIds = tasks.map(t => t.id);
                    const newTasks = validTasks
                        .filter(task => !existingIds.includes(task.id))
                        .map(task => ({
                            ...task,
                            id: task.id || Date.now() + Math.random(),
                            completed: task.completed || false,
                            priority: task.priority || 'medium',
                            createdAt: task.createdAt || new Date().toISOString()
                        }));
                    
                    tasks = [...tasks, ...newTasks];
                }
                
                saveTasksToStorage();
                updateStats();
                renderTasks();
                emptyState.classList.remove('show');
                
                showNotification(`Successfully imported ${validTasks.length} tasks!`, 'success');
            } catch (error) {
                console.error('Error importing file:', error);
                showNotification('Error reading JSON file. Please check the format.', 'error');
            }
        };
        
        reader.readAsText(file);
    };
    
    input.click();
}

/**
 * Show JSON preview in modal
 */
function showJsonPreview() {
    if (tasks.length === 0) {
        showNotification('No tasks to preview!', 'warning');
        return;
    }
    
    try {
        const dataToShow = {
            version: '1.0',
            generatedAt: new Date().toISOString(),
            totalTasks: tasks.length,
            completedTasks: tasks.filter(task => task.completed).length,
            tasks: tasks
        };
        
        jsonPreview.textContent = JSON.stringify(dataToShow, null, 2);
        fileModal.classList.add('active');
    } catch (error) {
        console.error('Error generating preview:', error);
        showNotification('Error generating JSON preview!', 'error');
    }
}

/**
 * Copy JSON data to clipboard
 */
function copyJsonToClipboard() {
    if (tasks.length === 0) {
        showNotification('No tasks to copy!', 'warning');
        return;
    }
    
    try {
        const dataToCopy = {
            version: '1.0',
            generatedAt: new Date().toISOString(),
            totalTasks: tasks.length,
            completedTasks: tasks.filter(task => task.completed).length,
            tasks: tasks
        };
        
        const jsonString = JSON.stringify(dataToCopy, null, 2);
        
        navigator.clipboard.writeText(jsonString)
            .then(() => {
                showNotification('JSON copied to clipboard!', 'success');
                copyJsonBtn.innerHTML = '<i class="fas fa-check"></i> Copied!';
                copyJsonBtn.style.backgroundColor = '#28a745';
                copyJsonBtn.style.color = 'white';
                
                setTimeout(() => {
                    copyJsonBtn.innerHTML = '<i class="fas fa-copy"></i> Copy JSON';
                    copyJsonBtn.style.backgroundColor = '';
                    copyJsonBtn.style.color = '';
                }, 2000);
            })
            .catch(err => {
                console.error('Error copying to clipboard:', err);
                showNotification('Failed to copy to clipboard!', 'error');
            });
    } catch (error) {
        console.error('Error copying JSON:', error);
        showNotification('Error copying JSON!', 'error');
    }
}

// ===== UTILITY FUNCTIONS =====
/**
 * Show notification to user
 * @param {string} message - Notification message
 * @param {string} type - Notification type (success, warning, error, info)
 */
function showNotification(message, type = 'info') {
    // Create notification element
    const notification = document.createElement('div');
    
    // Set styles based on type
    let bgColor, icon;
    switch(type) {
        case 'success':
            bgColor = '#28a745';
            icon = 'fas fa-check-circle';
            break;
        case 'warning':
            bgColor = '#ffc107';
            icon = 'fas fa-exclamation-triangle';
            break;
        case 'error':
            bgColor = '#dc3545';
            icon = 'fas fa-times-circle';
            break;
        default:
            bgColor = '#4b6cb7';
            icon = 'fas fa-info-circle';
    }
    
    notification.style.cssText = `
        position: fixed;
        top: 30px;
        right: 30px;
        background: ${bgColor};
        color: white;
        padding: 18px 25px;
        border-radius: 10px;
        box-shadow: 0 10px 25px rgba(0,0,0,0.15);
        z-index: 10000;
        transform: translateX(150%);
        transition: transform 0.4s ease;
        display: flex;
        align-items: center;
        gap: 15px;
        max-width: 400px;
        font-weight: 500;
    `;
    
    notification.innerHTML = `
        <i class="${icon}" style="font-size: 1.3rem;"></i>
        <span>${message}</span>
    `;
    
    document.body.appendChild(notification);
    
    // Animate in
    setTimeout(() => {
        notification.style.transform = 'translateX(0)';
    }, 10);
    
    // Remove after 4 seconds
    setTimeout(() => {
        notification.style.transform = 'translateX(150%)';
        setTimeout(() => {
            if (notification.parentNode) {
                document.body.removeChild(notification);
            }
        }, 400);
    }, 4000);
}

/**
 * Add pulse animation to element
 * @param {HTMLElement} element - Element to animate
 */
function pulseAnimation(element) {
    element.classList.add('pulse-animation');
    setTimeout(() => {
        element.classList.remove('pulse-animation');
    }, 500);
}

/**
 * Escape HTML to prevent XSS
 * @param {string} text - Text to escape
 * @returns {string} Escaped text
 */
function escapeHtml(text) {
    const div = document.createElement('div');
    div.textContent = text;
    return div.innerHTML;
}

// ===== INITIALIZE APPLICATION =====
// Initialize app when DOM is fully loaded
document.addEventListener('DOMContentLoaded', initApp);