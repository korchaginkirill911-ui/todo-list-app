// js/main.js - исправленная версия
import { 
    addTask, 
    deleteTask, 
    toggleTask, 
    getAllTasks, 
    setTasks,
    getTasksStats 
} from './tasks.js';

import { 
    saveTasksToStorage, 
    loadTasksFromStorage 
} from './storage.js';

import { 
    renderTasks, 
    updateStats 
} from './ui.js';

// Элементы DOM
const taskInput = document.getElementById('taskInput');
const addBtn = document.getElementById('addBtn');
const taskList = document.getElementById('taskList');

// Отладочное сообщение
console.log('Скрипт загружен! Элементы:', { taskInput, addBtn, taskList });

// Инициализация приложения
const initApp = () => {
    console.log('Инициализация приложения...');
    
    // Загрузка задач из localStorage
    const savedTasks = loadTasksFromStorage();
    console.log('Загружено задач:', savedTasks.length);
    setTasks(savedTasks);
    
    // Отрисовка задач
    renderTasks(getAllTasks());
    updateStats();
    
    console.log('Приложение инициализировано!');
};

// Обработчик добавления задачи
const handleAddTask = () => {
    console.log('Кнопка нажата! Текст:', taskInput.value);
    
    const taskText = taskInput.value.trim();
    
    if (taskText) {
        console.log('Добавляем задачу:', taskText);
        const newTask = addTask(taskText);
        
        if (newTask) {
            console.log('Задача создана:', newTask);
            renderTasks(getAllTasks());
            saveTasksToStorage(getAllTasks());
            updateStats();
            taskInput.value = '';
            taskInput.focus();
        }
    } else {
        console.log('Пустой текст задачи');
        // Добавим анимацию shake для пустого ввода
        taskInput.style.animation = 'shake 0.5s ease-in-out';
        setTimeout(() => {
            taskInput.style.animation = '';
        }, 500);
    }
};

// Обработчики событий
addBtn.addEventListener('click', handleAddTask);

taskInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
        console.log('Нажата Enter');
        handleAddTask();
    }
});

// Делегирование событий для динамических элементов
taskList.addEventListener('click', (e) => {
    const taskItem = e.target.closest('.task-item');
    if (!taskItem) return;
    
    const taskId = taskItem.dataset.id;
    console.log('Клик по задаче:', taskId);
    
    // Обработка переключения статуса
    if (e.target.classList.contains('toggle-btn')) {
        console.log('Переключаем задачу:', taskId);
        toggleTask(taskId);
        renderTasks(getAllTasks());
        saveTasksToStorage(getAllTasks());
        updateStats();
    }
    
    // Обработка удаления
    if (e.target.classList.contains('delete-btn')) {
        console.log('Удаляем задачу:', taskId);
        // Анимация удаления
        taskItem.style.animation = 'slideOut 0.3s ease-in forwards';
        setTimeout(() => {
            deleteTask(taskId);
            renderTasks(getAllTasks());
            saveTasksToStorage(getAllTasks());
            updateStats();
        }, 300);
    }
});

// Запуск приложения
document.addEventListener('DOMContentLoaded', initApp);

// Глобальная функция для отладки (можно удалить после тестирования)
window.debugApp = () => {
    console.log('=== DEBUG INFO ===');
    console.log('Tasks:', getAllTasks());
    console.log('Stats:', getTasksStats());
    console.log('Elements found:', {
        taskInput: !!taskInput,
        addBtn: !!addBtn,
        taskList: !!taskList
    });
};

// Временная функция для теста (удалите после)
function testButton() {
    console.log('Тест: кнопка работает!');
    handleAddTask();
}

// Вызовите в консоли: testButton()
