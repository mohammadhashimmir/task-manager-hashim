import React, { useContext } from 'react';
import 'bulma/css/bulma.min.css';
import './Styles/App.css';
import Header from './Components/Header';
import LandingPage from './Components/LandingPage';
import AddTasks from './Components/AddTasks';
import TaskList from './Components/TaskList';
import Loader from './Components/Loader';
import ErrorModal from './Components/ErrorModal';
import { TaskContext } from './Components/Context/TaskContext';

function App() {
  const { tasks, add, showLoader, errorModalVisible } = useContext(TaskContext);

  return (
    <div>
      {errorModalVisible && <ErrorModal />}
      <Header />
      <LandingPage />
      <p><span className="is-size-4 counter">{tasks.length === 1 ? `1 task` : `${tasks.length} tasks`}</span></p>
      {add && <AddTasks />}
      <br />
      {showLoader ? <Loader /> : <TaskList />}
    </div>
  );
}

export default App;
