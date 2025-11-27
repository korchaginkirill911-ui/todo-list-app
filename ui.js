// В ui.js замените функцию updateStats на эту:
export const updateStats = () => {
    const { total, completed } = getTasksStats();
    const pending = total - completed;
    
    totalTasksEl.textContent = total;
    completedTasksEl.textContent = completed;
    document.getElementById('pendingTasks').textContent = pending;
};
