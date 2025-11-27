const STORAGE_KEY = 'todo_app_tasks';

// Сохранение задач в localStorage
export const saveTasksToStorage = (tasks) => {
    try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(tasks));
        return true;
    } catch (error) {
        console.error('Ошибка сохранения:', error);
        return false;
    }
};

// Загрузка задач из localStorage
export const loadTasksFromStorage = () => {
    try {
        const stored = localStorage.getItem(STORAGE_KEY);
        return stored ? JSON.parse(stored) : [];
    } catch (error) {
        console.error('Ошибка загрузки:', error);
        return [];
    }
};

// Очистка хранилища
export const clearStorage = () => {
    localStorage.removeItem(STORAGE_KEY);
};
