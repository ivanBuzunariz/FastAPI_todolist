// Configuración de la API
const API_URL = '';

// Variables globales
let tasks = [];
let editingTaskId = null;

// Referencias del DOM
const taskForm = document.getElementById('taskForm');
const editForm = document.getElementById('editForm');
const tasksContainer = document.getElementById('tasksContainer');
const emptyState = document.getElementById('emptyState');
const editModal = document.getElementById('editModal');
const loadingSpinner = document.getElementById('loadingSpinner');

// Elementos del formulario principal
const taskTitleInput = document.getElementById('taskTitle');
const taskDescriptionInput = document.getElementById('taskDescription');

// Elementos del modal de edición
const editTitleInput = document.getElementById('editTitle');
const editDescriptionInput = document.getElementById('editDescription');
const editCompletedInput = document.getElementById('editCompleted');

// Elementos de estadísticas
const totalTasksSpan = document.getElementById('totalTasks');
const completedTasksSpan = document.getElementById('completedTasks');

// Event Listeners
document.addEventListener('DOMContentLoaded', initApp);
taskForm.addEventListener('submit', handleCreateTask);
editForm.addEventListener('submit', handleEditTask);
document.getElementById('closeModal').addEventListener('click', closeEditModal);
document.getElementById('cancelEdit').addEventListener('click', closeEditModal);

// Cerrar modal al hacer click fuera
editModal.addEventListener('click', (e) => {
    if (e.target === editModal) {
        closeEditModal();
    }
});

// Inicializar la aplicación
async function initApp() {
    console.log('Iniciando aplicación Todo List');
    await loadTasks();
}

// Funciones de utilidad
function showLoading() {
    loadingSpinner.classList.add('active');
}

function hideLoading() {
    loadingSpinner.classList.remove('active');
}

function showError(message) {
    alert(`Error: ${message}`);
}

function showSuccess(message) {
    // Crear notificación de éxito
    const notification = document.createElement('div');
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background: #28a745;
        color: white;
        padding: 1rem 1.5rem;
        border-radius: 8px;
        z-index: 10000;
        animation: slideInRight 0.3s ease;
    `;
    notification.textContent = message;
    document.body.appendChild(notification);
    
    setTimeout(() => {
        notification.remove();
    }, 3000);
}

// Funciones de API
async function apiRequest(endpoint, options = {}) {
    const url = `${API_URL}${endpoint}`;
    const config = {
        headers: {
            'Content-Type': 'application/json',
            ...options.headers,
        },
        ...options,
    };

    try {
        console.log(`Realizando petición: ${config.method || 'GET'} ${url}`);
        const response = await fetch(url, config);
        
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        
        const data = await response.json();
        console.log('Respuesta recibida:', data);
        return data;
    } catch (error) {
        console.error('Error en la petición:', error);
        throw error;
    }
}

async function loadTasks() {
    showLoading();
    try {
        tasks = await apiRequest('/tasks');
        renderTasks();
        updateStats();
    } catch (error) {
        showError('No se pudieron cargar las tareas. Asegúrate de que el servidor esté ejecutándose en el puerto 8000.');
        console.error('Error cargando tareas:', error);
    } finally {
        hideLoading();
    }
}

async function createTask(taskData) {
    showLoading();
    try {
        const newTask = await apiRequest('/tasks', {
            method: 'POST',
            body: JSON.stringify(taskData),
        });
        
        tasks.push(newTask);
        renderTasks();
        updateStats();
        showSuccess('Tarea creada exitosamente');
        return newTask;
    } catch (error) {
        showError('No se pudo crear la tarea');
        console.error('Error creando tarea:', error);
        throw error;
    } finally {
        hideLoading();
    }
}

async function updateTask(taskId, taskData) {
    showLoading();
    try {
        const updatedTask = await apiRequest(`/tasks/${taskId}`, {
            method: 'PUT',
            body: JSON.stringify(taskData),
        });
        
        if (updatedTask.error) {
            throw new Error(updatedTask.error);
        }
        
        const taskIndex = tasks.findIndex(task => task.id === taskId);
        if (taskIndex !== -1) {
            tasks[taskIndex] = updatedTask;
        }
        
        renderTasks();
        updateStats();
        showSuccess('Tarea actualizada exitosamente');
        return updatedTask;
    } catch (error) {
        showError('No se pudo actualizar la tarea');
        console.error('Error actualizando tarea:', error);
        throw error;
    } finally {
        hideLoading();
    }
}

async function deleteTask(taskId) {
    if (!confirm('¿Estás seguro de que quieres eliminar esta tarea?')) {
        return;
    }
    
    showLoading();
    try {
        const result = await apiRequest(`/tasks/${taskId}`, {
            method: 'DELETE',
        });
        
        if (result.error) {
            throw new Error(result.error);
        }
        
        tasks = tasks.filter(task => task.id !== taskId);
        renderTasks();
        updateStats();
        showSuccess('Tarea eliminada exitosamente');
    } catch (error) {
        showError('No se pudo eliminar la tarea');
        console.error('Error eliminando tarea:', error);
    } finally {
        hideLoading();
    }
}

// Funciones de renderizado
function renderTasks() {
    console.log('Renderizando tareas:', tasks);
    
    if (tasks.length === 0) {
        tasksContainer.innerHTML = '<div class="empty-state" id="emptyState"><i class="fas fa-clipboard-list"></i><h3>No hay tareas todavía</h3><p>¡Agrega tu primera tarea para comenzar!</p></div>';
        return;
    }
    
    const tasksHTML = tasks.map(task => createTaskHTML(task)).join('');
    tasksContainer.innerHTML = tasksHTML;
}

function createTaskHTML(task) {
    const completedClass = task.completed ? 'completed' : '';
    const statusClass = task.completed ? 'completed' : 'pending';
    const statusText = task.completed ? 'Completada' : 'Pendiente';
    const statusIcon = task.completed ? 'fas fa-check-circle' : 'far fa-clock';
    const description = task.description ? `<p class="task-description">${escapeHtml(task.description)}</p>` : '';
    
    return `
        <div class="task-item ${completedClass}" data-task-id="${task.id}">
            <div class="task-header">
                <div class="task-info">
                    <h3 class="task-title">${escapeHtml(task.title)}</h3>
                    <span class="task-id">ID: ${task.id}</span>
                </div>
            </div>
            ${description}
            <div class="task-status ${statusClass}">
                <i class="${statusIcon}"></i>
                ${statusText}
            </div>
            <div class="task-actions">
                <button class="btn btn-success" onclick="toggleTaskStatus(${task.id}, ${!task.completed})">
                    <i class="fas ${task.completed ? 'fa-undo' : 'fa-check'}"></i>
                    ${task.completed ? 'Reactivar' : 'Completar'}
                </button>
                <button class="btn btn-secondary" onclick="openEditModal(${task.id})">
                    <i class="fas fa-edit"></i>
                    Editar
                </button>
                <button class="btn btn-danger" onclick="deleteTask(${task.id})">
                    <i class="fas fa-trash"></i>
                    Eliminar
                </button>
            </div>
        </div>
    `;
}

function escapeHtml(text) {
    const div = document.createElement('div');
    div.textContent = text;
    return div.innerHTML;
}

function updateStats() {
    const totalTasks = tasks.length;
    const completedTasks = tasks.filter(task => task.completed).length;
    
    totalTasksSpan.textContent = `${totalTasks} tarea${totalTasks !== 1 ? 's' : ''}`;
    completedTasksSpan.textContent = `${completedTasks} completada${completedTasks !== 1 ? 's' : ''}`;
}

// Funciones de manejo de eventos
async function handleCreateTask(e) {
    e.preventDefault();
    
    const formData = new FormData(e.target);
    const taskData = {
        title: taskTitleInput.value.trim(),
        description: taskDescriptionInput.value.trim() || null,
        completed: false,
    };
    
    // Validaciones
    if (!taskData.title) {
        showError('El título es obligatorio');
        return;
    }
    
    try {
        await createTask(taskData);
        e.target.reset();
    } catch (error) {
        // El error ya se maneja en createTask
    }
}

async function handleEditTask(e) {
    e.preventDefault();
    
    if (!editingTaskId) return;
    
    const taskData = {
        id: editingTaskId,
        title: editTitleInput.value.trim(),
        description: editDescriptionInput.value.trim() || null,
        completed: editCompletedInput.checked,
    };
    
    if (!taskData.title) {
        showError('El título es obligatorio');
        return;
    }
    
    try {
        await updateTask(editingTaskId, taskData);
        closeEditModal();
    } catch (error) {
        // El error ya se maneja en updateTask
    }
}

function openEditModal(taskId) {
    const task = tasks.find(t => t.id === taskId);
    if (!task) return;
    
    editingTaskId = taskId;
    editTitleInput.value = task.title;
    editDescriptionInput.value = task.description || '';
    editCompletedInput.checked = task.completed;
    
    editModal.classList.add('active');
    editTitleInput.focus();
}

function closeEditModal() {
    editModal.classList.remove('active');
    editingTaskId = null;
    editForm.reset();
}

async function toggleTaskStatus(taskId, completed) {
    const task = tasks.find(t => t.id === taskId);
    if (!task) return;
    
    const updatedTaskData = {
        ...task,
        completed: completed,
    };
    
    try {
        await updateTask(taskId, updatedTaskData);
    } catch (error) {
        // El error ya se maneja en updateTask
    }
}

// Funciones de utilidad adicionales
function generateNextId() {
    if (tasks.length === 0) return 1;
    return Math.max(...tasks.map(task => task.id)) + 1;
}

// Atajos de teclado
document.addEventListener('keydown', (e) => {
    // ESC para cerrar modal
    if (e.key === 'Escape' && editModal.classList.contains('active')) {
        closeEditModal();
    }
    
    // Ctrl/Cmd + Enter para enviar formulario
    if ((e.ctrlKey || e.metaKey) && e.key === 'Enter') {
        if (editModal.classList.contains('active')) {
            handleEditTask(e);
        } else if (document.activeElement && document.activeElement.form === taskForm) {
            handleCreateTask(e);
        }
    }
});

// Validación en tiempo real
taskTitleInput.addEventListener('input', (e) => {
    const submitButton = taskForm.querySelector('button[type="submit"]');
    if (e.target.value.trim()) {
        submitButton.disabled = false;
        submitButton.style.opacity = '1';
    } else {
        submitButton.disabled = true;
        submitButton.style.opacity = '0.6';
    }
});

// Inicialización adicional
console.log('Script de Todo List cargado correctamente');
console.log('API URL configurada:', API_URL);