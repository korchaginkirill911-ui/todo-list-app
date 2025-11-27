// js/tasks.js
let tasks = [];

const generateId = () => `task_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;

export const addTask = (text) => {
    console.log('addTask вызван с текстом:', text);
    if (!text.trim()) {
        console.log('Пустой текст - возвращаем null');
        return null;
    }
    
    const newTask = {
        id: generateId(),
        text: text.trim(),
        completed: false,
        createdAt: new Date().toISOString()
    };
    
    tasks.push(newTask);
    console.log('Задача добавлена, всего задач:', tasks.length);
    return newTask;
};

export const deleteTask = (taskId) => {
    tasks = tasks.filter(task => task.id !== taskId);
    return tasks;
};

export const toggleTask = (taskId) => {
    const task = tasks.find(task => task.id === taskId);
    if (task) {
        task.completed = !task.completed;
    }
    return task;
};

export const getAllTasks = () => [...tasks];

export const getTasksStats = () => ({
    total: tasks.length,
    completed: tasks.filter(task => task.completed).length
});

export const setTasks = (newTasks) => {
    tasks = newTasks || [];
};
