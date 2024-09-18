// Function to simulate network delay
const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));

// function for local storage items retrieval 
const getTasksFromLocalStorage = () => {
    const tasks = localStorage.getItem("tasks");
    return tasks ? JSON.parse(tasks) : [];
};

// function to set items in local storage 
const setTasksToLocalStorage = (tasks) => {
    localStorage.setItem("tasks", JSON.stringify(tasks));
};

// Fetch tasks (GET request) with network delay simulation
export const getTasks = async () => {
    try {
        await delay(1000);
        return getTasksFromLocalStorage();
    } catch (error) {
        throw new Error('Failed to fetch tasks');
    }
};

// Create task (POST request) with network delay simulation
export const createTask = async (task) => {
    try {
        await delay(1000);
        const tasks = getTasksFromLocalStorage();
        tasks.push(task);
        setTasksToLocalStorage(tasks);
        return task;
    } catch (error) {
        throw new Error('Failed to create task');
    }
};

// Update/Edit task (PUT request) with network delay simulation
export const updateTask = async (updatedTask) => {
    try {
        await delay(1000);
        const tasks = getTasksFromLocalStorage();
        const updatedTasks = tasks.map(task => task.id === updatedTask.id ? updatedTask : task);
        setTasksToLocalStorage(updatedTasks);
        return updatedTask;
    } catch (error) {
        throw new Error('Failed to update task');
    }
};

// Delete task (DELETE request) with network delay simulation
export const deleteTask = async (taskId) => {
    try {
        await delay(1000);
        const tasks = getTasksFromLocalStorage();
        const updatedTasks = tasks.filter(task => task.id !== taskId);
        setTasksToLocalStorage(updatedTasks);
    } catch (error) {
        throw new Error('Failed to delete task');
    }
};

