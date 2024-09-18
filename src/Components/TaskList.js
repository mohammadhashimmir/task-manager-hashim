import { useContext } from "react";
import ToDisplay from "./ToDisplay";
import { TaskContext } from '../Components/Context/TaskContext';
import "../Styles/TaskList.css"

function TaskList() {
    const { tasks, searchTerm, selectedFilter } = useContext(TaskContext);

    // Filtering by status (Active/ completed)
    const filteredTasks = tasks.filter((val, index) => {
        if (selectedFilter === "Active") {
            return val.completed === false
        } else if (selectedFilter === "Completed") {
            return val.completed === true
        } else {
            return true
        }
    })

    // search through notes 
    const searchedTasks = filteredTasks.filter((task) =>
        task.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        task.description.toLowerCase().includes(searchTerm.toLowerCase())
    );

    // sort by date created
    const sortedTasks = searchedTasks.sort((a, b) => {
        const dateA = new Date(a.dateTimeCreated).getTime();
        const dateB = new Date(b.dateTimeCreated).getTime();
        return dateB - dateA;
    });
    // final render 
    const renderNotes = () => {
        return sortedTasks.map((task) => (
            <ToDisplay task={task} key={task.id}/>
        ));
    };
    return (
        <div>
            <div className="columns is-multiline">{renderNotes()}</div>
        </div>
    );
};
export default TaskList;