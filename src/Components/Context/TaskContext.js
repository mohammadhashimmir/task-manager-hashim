import React, { createContext, useState, useEffect } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { getTasks, createTask, updateTask, deleteTask } from '../MockAPI';

export const TaskContext = createContext();

export const TaskProvider = ({ children }) => {
  const [tasks, setTasks] = useState([]);
  const [add, setAdd] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [showLoader, setShowLoader] = useState(true);
  const [selectedFilter, setSelectedFilter] = useState("All");
  const [error, setError] = useState(null);
  const [errorModalVisible, setErrorModalVisible] = useState(false);

  const onAddClick = () => setAdd(true);
  const onModalClose = (val) => setAdd(val);
  const getSearchTerm = (val) => setSearchTerm(val);
  const getFilterType = (val) => setSelectedFilter(val);
  const closeError = (value) => setErrorModalVisible(value);

  const handleError = (error, errorMessage) => {
    setError(errorMessage);
    setErrorModalVisible(true);
  };

  useEffect(() => {
    const fetchTasks = async () => {
      try {
        setShowLoader(true);
        const data = await getTasks();
        setTasks(data);
      } catch (error) {
        handleError(error, 'Failed to load tasks');
      } finally {
        setShowLoader(false);
      }
    };
    fetchTasks();
  }, []);

  const onSaveTask = async (title, description) => {
    const newTask = {
      id: uuidv4(),
      dateTimeCreated: new Date().toLocaleString(),
      title,
      description,
      completed: false,
    };
    setShowLoader(true);
    try {
      await createTask(newTask);
      setTasks([...tasks, newTask]);
    } catch (error) {
      handleError(error, 'Failed to add task');
    } finally {
      setShowLoader(false);
    }
  };

  const onDelete = async (id) => {
    setShowLoader(true);
    try {
      await deleteTask(id);
      setTasks(tasks.filter(task => task.id !== id));
    } catch (error) {
      handleError(error, 'Failed to delete task');
    } finally {
      setShowLoader(false);
    }
  };

  const onSaveEdit = async (id, editedTitle, editedDescription) => {
    setShowLoader(true);
    try {
      const taskToUpdate = tasks.find(task => task.id === id);
      if (taskToUpdate) {
        const updatedTask = {
          ...taskToUpdate,
          title: editedTitle,
          description: editedDescription,
        };
        await updateTask(updatedTask);
        setTasks(tasks.map(task => (task.id === id ? updatedTask : task)));
      }
    } catch (error) {
      handleError(error, 'Failed to update task');
    } finally {
      setShowLoader(false);
    }
  };

  const updateTaskStatus = async (id, status) => {
    setShowLoader(true);
    try {
      const taskToUpdate = tasks.find(task => task.id === id);
      if (taskToUpdate) {
        const updatedTask = { ...taskToUpdate, completed: status };
        await updateTask(updatedTask);
        setTasks(tasks.map(task => (task.id === id ? updatedTask : task)));
      }
    } catch (error) {
      handleError(error, `Failed to ${status ? 'mark' : 'unmark'} task`);
    } finally {
      setShowLoader(false);
    }
  };

  const markTask = (id) => updateTaskStatus(id, true);
  const unmarkTask = (id) => updateTaskStatus(id, false);

  return (
    <TaskContext.Provider value={{
      tasks,
      add,
      searchTerm,
      showLoader,
      selectedFilter,
      error,
      errorModalVisible,
      onAddClick,
      onModalClose,
      getSearchTerm,
      getFilterType,
      closeError,
      handleError,
      onSaveTask,
      onDelete,
      onSaveEdit,
      markTask,
      unmarkTask,
    }}>
      {children}
    </TaskContext.Provider>
  );
};
